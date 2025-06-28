const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = './test-screenshots';
const VIEWPORT_DESKTOP = { width: 1920, height: 1080 };
const VIEWPORT_MOBILE = { width: 375, height: 667 };

// Pages to test
const PAGES = [
  { name: 'Homepage', path: '/' },
  { name: 'Blog', path: '/blogg' },
  { name: 'Contact', path: '/kontakt' },
  { name: 'Packages', path: '/paket' },
  { name: 'Case Studies', path: '/case' },
  { name: 'Terms', path: '/villkor' },
  { name: 'Before/After Demo', path: '/before-after-demo' }
];

// Test results collector
const testResults = {
  passed: 0,
  failed: 0,
  errors: [],
  warnings: [],
  pageLoadTimes: {}
};

// Console message collector
let consoleMessages = [];

async function ensureScreenshotDir() {
  try {
    await fs.access(SCREENSHOT_DIR);
  } catch {
    await fs.mkdir(SCREENSHOT_DIR, { recursive: true });
    console.log(`✅ Created screenshot directory: ${SCREENSHOT_DIR}`);
  }
}

async function testPage(page, pageInfo, viewport = 'desktop') {
  const testName = `${pageInfo.name} (${viewport})`;
  console.log(`\n🔍 Testing: ${testName}`);
  console.log(`   URL: ${BASE_URL}${pageInfo.path}`);
  
  try {
    // Clear console messages for this page
    consoleMessages = [];
    
    // Set viewport
    await page.setViewport(viewport === 'mobile' ? VIEWPORT_MOBILE : VIEWPORT_DESKTOP);
    
    // Navigate to page and measure load time
    const startTime = Date.now();
    const response = await page.goto(`${BASE_URL}${pageInfo.path}`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    const loadTime = Date.now() - startTime;
    
    testResults.pageLoadTimes[testName] = loadTime;
    console.log(`   ⏱️  Load time: ${loadTime}ms`);
    
    // Check response status
    const status = response.status();
    if (status >= 400) {
      throw new Error(`Page returned status ${status}`);
    }
    console.log(`   ✅ Status: ${status}`);
    
    // Wait for main content
    await page.waitForSelector('body', { timeout: 5000 });
    
    // Check page title
    const title = await page.title();
    if (!title || title.trim() === '') {
      testResults.warnings.push(`${testName}: Page has no title`);
      console.log(`   ⚠️  Warning: No page title found`);
    } else {
      console.log(`   ✅ Title: ${title}`);
    }
    
    // Check for main content elements
    const hasHeader = await page.$('header') !== null;
    const hasMain = await page.$('main') !== null;
    const hasFooter = await page.$('footer') !== null;
    
    console.log(`   ✅ Structure: Header=${hasHeader}, Main=${hasMain}, Footer=${hasFooter}`);
    
    // Test specific page functionality
    await testPageSpecificFunctionality(page, pageInfo, testName);
    
    // Take screenshot
    const screenshotName = `${pageInfo.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${viewport}.png`;
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, screenshotName),
      fullPage: true
    });
    console.log(`   📸 Screenshot saved: ${screenshotName}`);
    
    // Check console messages
    if (consoleMessages.length > 0) {
      const errors = consoleMessages.filter(msg => msg.type === 'error');
      const warnings = consoleMessages.filter(msg => msg.type === 'warning');
      
      if (errors.length > 0) {
        console.log(`   ❌ Console errors: ${errors.length}`);
        errors.forEach(err => {
          console.log(`      - ${err.text}`);
          testResults.errors.push(`${testName}: Console error - ${err.text}`);
        });
      }
      
      if (warnings.length > 0) {
        console.log(`   ⚠️  Console warnings: ${warnings.length}`);
        warnings.forEach(warn => {
          testResults.warnings.push(`${testName}: Console warning - ${warn.text}`);
        });
      }
    }
    
    testResults.passed++;
    console.log(`   ✅ Test passed!`);
    
  } catch (error) {
    testResults.failed++;
    testResults.errors.push(`${testName}: ${error.message}`);
    console.log(`   ❌ Test failed: ${error.message}`);
  }
}

async function testPageSpecificFunctionality(page, pageInfo, testName) {
  switch (pageInfo.path) {
    case '/kontakt':
      // Test contact form
      console.log(`   🧪 Testing contact form...`);
      const formExists = await page.$('form') !== null;
      if (formExists) {
        // Check form fields
        const nameField = await page.$('input[name="name"], input[id*="name"]') !== null;
        const emailField = await page.$('input[name="email"], input[type="email"]') !== null;
        const messageField = await page.$('textarea') !== null;
        const submitButton = await page.$('button[type="submit"], input[type="submit"]') !== null;
        
        console.log(`      Form fields: Name=${nameField}, Email=${emailField}, Message=${messageField}, Submit=${submitButton}`);
        
        if (!nameField || !emailField || !messageField || !submitButton) {
          testResults.warnings.push(`${testName}: Contact form is missing required fields`);
        }
      } else {
        testResults.warnings.push(`${testName}: No contact form found`);
      }
      break;
      
    case '/blogg':
      // Test blog listing
      console.log(`   🧪 Testing blog listing...`);
      const blogPosts = await page.$$('article, [class*="blog-post"], [class*="post-card"]');
      console.log(`      Found ${blogPosts.length} blog posts`);
      
      if (blogPosts.length === 0) {
        testResults.warnings.push(`${testName}: No blog posts found`);
      }
      
      // Test if we can click on a blog post
      if (blogPosts.length > 0) {
        const firstPostLink = await blogPosts[0].$('a');
        if (firstPostLink) {
          const href = await page.evaluate(el => el.getAttribute('href'), firstPostLink);
          console.log(`      First blog post link: ${href}`);
        }
      }
      break;
      
    case '/':
      // Test homepage specific elements
      console.log(`   🧪 Testing homepage elements...`);
      const heroSection = await page.$('[class*="hero"], section:first-child') !== null;
      const ctaButtons = await page.$$('a[href="/kontakt"], button[class*="cta"]');
      console.log(`      Hero section: ${heroSection}, CTA buttons: ${ctaButtons.length}`);
      break;
  }
}

async function testNavigation(page) {
  console.log('\n🔍 Testing Navigation Links');
  
  try {
    // Go to homepage first
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    
    // Find all navigation links
    const navLinks = await page.$$eval('nav a, header a', links => 
      links.map(link => ({
        text: link.textContent.trim(),
        href: link.href
      }))
    );
    
    console.log(`   Found ${navLinks.length} navigation links`);
    
    // Test a few key navigation links
    for (const link of navLinks.slice(0, 5)) {
      if (link.href.startsWith(BASE_URL)) {
        console.log(`   Testing link: ${link.text} -> ${link.href}`);
        
        try {
          await page.goto(link.href, { waitUntil: 'networkidle2', timeout: 10000 });
          console.log(`   ✅ Link works: ${link.text}`);
        } catch (error) {
          testResults.errors.push(`Navigation link failed: ${link.text} - ${error.message}`);
          console.log(`   ❌ Link failed: ${link.text}`);
        }
      }
    }
    
  } catch (error) {
    testResults.errors.push(`Navigation test failed: ${error.message}`);
    console.log(`   ❌ Navigation test failed: ${error.message}`);
  }
}

async function runTests() {
  console.log('🚀 Starting Puppeteer tests for Next.js app\n');
  console.log(`📍 Testing URL: ${BASE_URL}`);
  console.log(`📸 Screenshots will be saved to: ${SCREENSHOT_DIR}\n`);
  
  // Ensure screenshot directory exists
  await ensureScreenshotDir();
  
  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set up console message listener
    page.on('console', message => {
      consoleMessages.push({
        type: message.type(),
        text: message.text()
      });
    });
    
    // Set up request failure listener
    page.on('requestfailed', request => {
      testResults.warnings.push(`Request failed: ${request.url()} - ${request.failure().errorText}`);
    });
    
    // Test all pages in desktop view
    console.log('📱 Testing Desktop View');
    for (const pageInfo of PAGES) {
      await testPage(page, pageInfo, 'desktop');
    }
    
    // Test key pages in mobile view
    console.log('\n📱 Testing Mobile View');
    const mobilePages = PAGES.filter(p => ['/', '/kontakt', '/blogg'].includes(p.path));
    for (const pageInfo of mobilePages) {
      await testPage(page, pageInfo, 'mobile');
    }
    
    // Test navigation
    await testNavigation(page);
    
    // Test a blog post if available
    console.log('\n🔍 Testing Blog Post Page');
    await page.goto(`${BASE_URL}/blogg`, { waitUntil: 'networkidle2' });
    const firstBlogLink = await page.$eval('article a, [class*="blog-post"] a, [class*="post-card"] a', el => el.href).catch(() => null);
    
    if (firstBlogLink) {
      await testPage(page, { name: 'Blog Post', path: firstBlogLink.replace(BASE_URL, '') }, 'desktop');
    } else {
      console.log('   ⚠️  No blog posts found to test');
    }
    
  } finally {
    await browser.close();
  }
  
  // Print test summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`⚠️  Warnings: ${testResults.warnings.length}`);
  console.log(`🚨 Errors: ${testResults.errors.length}`);
  
  // Print page load times
  console.log('\n⏱️  Page Load Times:');
  Object.entries(testResults.pageLoadTimes).forEach(([page, time]) => {
    const emoji = time < 1000 ? '🚀' : time < 3000 ? '✅' : '🐌';
    console.log(`   ${emoji} ${page}: ${time}ms`);
  });
  
  // Print errors if any
  if (testResults.errors.length > 0) {
    console.log('\n🚨 Errors:');
    testResults.errors.forEach((error, i) => {
      console.log(`   ${i + 1}. ${error}`);
    });
  }
  
  // Print warnings if any
  if (testResults.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    testResults.warnings.forEach((warning, i) => {
      console.log(`   ${i + 1}. ${warning}`);
    });
  }
  
  console.log('\n✅ Testing complete! Check the test-screenshots folder for visual results.');
  
  // Exit with appropriate code
  process.exit(testResults.failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});