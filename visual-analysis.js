const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const BASE_URL = 'http://localhost:3000';
const RESULTS_DIR = './visual-analysis-results';
const VIEWPORT = { width: 1920, height: 1080 };

// Pages to analyze
const PAGES_TO_ANALYZE = [
  { name: 'Homepage', path: '/' },
  { name: 'Contact', path: '/kontakt' },
  { name: 'Packages', path: '/paket' },
  { name: 'Blog', path: '/blogg' }
];

// Analysis results structure
const analysisResults = {
  timestamp: new Date().toISOString(),
  pages: {}
};

// Ensure results directory exists
async function ensureResultsDir() {
  try {
    await fs.access(RESULTS_DIR);
  } catch {
    await fs.mkdir(RESULTS_DIR, { recursive: true });
    console.log(`✅ Created results directory: ${RESULTS_DIR}`);
  }
}

// Extract color information from elements
async function extractColors(page) {
  return await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const colors = new Set();
    const colorUsage = {};
    
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const bgColor = styles.backgroundColor;
      const textColor = styles.color;
      
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
        colors.add(bgColor);
        colorUsage[bgColor] = (colorUsage[bgColor] || 0) + 1;
      }
      if (textColor) {
        colors.add(textColor);
        colorUsage[textColor] = (colorUsage[textColor] || 0) + 1;
      }
    });
    
    return {
      uniqueColors: Array.from(colors),
      colorUsage: Object.entries(colorUsage)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([color, count]) => ({ color, count }))
    };
  });
}

// Analyze visual hierarchy
async function analyzeVisualHierarchy(page) {
  return await page.evaluate(() => {
    const headings = {
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: []
    };
    
    // Collect all headings
    for (let i = 1; i <= 6; i++) {
      const elements = document.querySelectorAll(`h${i}`);
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const styles = window.getComputedStyle(el);
        headings[`h${i}`].push({
          text: el.textContent.trim(),
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          color: styles.color,
          position: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          },
          visible: rect.top < window.innerHeight
        });
      });
    }
    
    // Analyze z-index layers
    const zIndexElements = [];
    document.querySelectorAll('*').forEach(el => {
      const styles = window.getComputedStyle(el);
      const zIndex = styles.zIndex;
      if (zIndex && zIndex !== 'auto' && parseInt(zIndex) !== 0) {
        const rect = el.getBoundingClientRect();
        zIndexElements.push({
          tagName: el.tagName,
          className: el.className,
          zIndex: parseInt(zIndex),
          position: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          }
        });
      }
    });
    
    return {
      headings,
      zIndexLayers: zIndexElements.sort((a, b) => b.zIndex - a.zIndex).slice(0, 10),
      headingCount: Object.entries(headings).reduce((acc, [key, val]) => {
        acc[key] = val.length;
        return acc;
      }, {})
    };
  });
}

// Analyze spacing and typography
async function analyzeSpacingAndTypography(page) {
  return await page.evaluate(() => {
    const elements = document.querySelectorAll('p, div, section, article, main, header, footer');
    const spacingData = [];
    const typographyData = new Map();
    
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      
      // Collect spacing data for visible elements
      if (rect.height > 0 && rect.width > 0) {
        spacingData.push({
          element: el.tagName,
          margin: {
            top: styles.marginTop,
            right: styles.marginRight,
            bottom: styles.marginBottom,
            left: styles.marginLeft
          },
          padding: {
            top: styles.paddingTop,
            right: styles.paddingRight,
            bottom: styles.paddingBottom,
            left: styles.paddingLeft
          }
        });
      }
      
      // Collect typography data
      if (el.textContent.trim().length > 0) {
        const fontKey = `${styles.fontFamily}|${styles.fontSize}|${styles.lineHeight}`;
        if (!typographyData.has(fontKey)) {
          typographyData.set(fontKey, {
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize,
            lineHeight: styles.lineHeight,
            fontWeight: styles.fontWeight,
            count: 0
          });
        }
        typographyData.get(fontKey).count++;
      }
    });
    
    // Calculate common spacing patterns
    const marginPatterns = {};
    const paddingPatterns = {};
    
    spacingData.forEach(item => {
      const marginKey = `${item.margin.top} ${item.margin.right} ${item.margin.bottom} ${item.margin.left}`;
      const paddingKey = `${item.padding.top} ${item.padding.right} ${item.padding.bottom} ${item.padding.left}`;
      
      marginPatterns[marginKey] = (marginPatterns[marginKey] || 0) + 1;
      paddingPatterns[paddingKey] = (paddingPatterns[paddingKey] || 0) + 1;
    });
    
    return {
      commonMargins: Object.entries(marginPatterns)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([pattern, count]) => ({ pattern, count })),
      commonPaddings: Object.entries(paddingPatterns)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([pattern, count]) => ({ pattern, count })),
      typography: Array.from(typographyData.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)
    };
  });
}

// Analyze Call-to-Action buttons
async function analyzeCTAButtons(page) {
  return await page.evaluate(() => {
    // Find potential CTA elements
    const ctaSelectors = [
      'button',
      'a[href*="kontakt"]',
      'a[href*="contact"]',
      '[class*="cta"]',
      '[class*="button"]',
      '[class*="btn"]',
      'input[type="submit"]'
    ];
    
    const ctaElements = [];
    const seenElements = new Set();
    
    ctaSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!seenElements.has(el)) {
          seenElements.add(el);
          const rect = el.getBoundingClientRect();
          const styles = window.getComputedStyle(el);
          
          // Only include visible elements
          if (rect.width > 0 && rect.height > 0) {
            ctaElements.push({
              text: el.textContent.trim() || el.value || el.getAttribute('aria-label') || '',
              type: el.tagName,
              href: el.href || null,
              position: {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                centerX: rect.left + rect.width / 2,
                centerY: rect.top + rect.height / 2
              },
              styles: {
                backgroundColor: styles.backgroundColor,
                color: styles.color,
                fontSize: styles.fontSize,
                fontWeight: styles.fontWeight,
                borderRadius: styles.borderRadius,
                padding: `${styles.paddingTop} ${styles.paddingRight} ${styles.paddingBottom} ${styles.paddingLeft}`
              },
              visibility: {
                aboveFold: rect.top < window.innerHeight,
                completelyVisible: rect.top >= 0 && rect.bottom <= window.innerHeight,
                percentageVisible: Math.max(0, Math.min(100, 
                  ((Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)) / rect.height) * 100
                ))
              }
            });
          }
        }
      });
    });
    
    // Sort by visual prominence (size and position)
    ctaElements.sort((a, b) => {
      // Prioritize above-fold elements
      if (a.visibility.aboveFold !== b.visibility.aboveFold) {
        return a.visibility.aboveFold ? -1 : 1;
      }
      // Then by size
      const aSize = a.position.width * a.position.height;
      const bSize = b.position.width * b.position.height;
      return bSize - aSize;
    });
    
    return {
      totalCTAs: ctaElements.length,
      aboveFoldCTAs: ctaElements.filter(cta => cta.visibility.aboveFold).length,
      ctaElements: ctaElements.slice(0, 20) // Top 20 most prominent
    };
  });
}

// Run accessibility tests with axe-core
async function runAccessibilityTests(page) {
  try {
    const results = await new AxePuppeteer(page).analyze();
    
    // Focus on color contrast issues
    const contrastIssues = results.violations.filter(violation => 
      violation.id.includes('color-contrast') || 
      violation.id.includes('contrast')
    );
    
    return {
      violations: results.violations.length,
      passes: results.passes.length,
      contrastIssues: contrastIssues.map(issue => ({
        id: issue.id,
        impact: issue.impact,
        description: issue.description,
        occurrences: issue.nodes.length,
        examples: issue.nodes.slice(0, 3).map(node => ({
          html: node.html,
          target: node.target,
          failureSummary: node.failureSummary
        }))
      })),
      summary: {
        totalIssues: results.violations.length,
        byImpact: {
          critical: results.violations.filter(v => v.impact === 'critical').length,
          serious: results.violations.filter(v => v.impact === 'serious').length,
          moderate: results.violations.filter(v => v.impact === 'moderate').length,
          minor: results.violations.filter(v => v.impact === 'minor').length
        }
      }
    };
  } catch (error) {
    console.error('Accessibility test error:', error);
    return { error: error.message };
  }
}

// Analyze a single page
async function analyzePage(page, pageInfo) {
  console.log(`\n🔍 Analyzing: ${pageInfo.name} (${pageInfo.path})`);
  
  try {
    // Navigate to page
    await page.goto(`${BASE_URL}${pageInfo.path}`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Wait for content to stabilize
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Take screenshot
    const screenshotPath = path.join(RESULTS_DIR, `${pageInfo.name.toLowerCase().replace(/\s+/g, '-')}-screenshot.png`);
    await page.screenshot({
      path: screenshotPath,
      fullPage: true
    });
    console.log(`   📸 Screenshot saved`);
    
    // Run all analyses
    console.log(`   🎨 Analyzing colors...`);
    const colors = await extractColors(page);
    
    console.log(`   📐 Analyzing visual hierarchy...`);
    const hierarchy = await analyzeVisualHierarchy(page);
    
    console.log(`   📏 Analyzing spacing and typography...`);
    const spacingTypography = await analyzeSpacingAndTypography(page);
    
    console.log(`   🎯 Analyzing CTAs...`);
    const ctas = await analyzeCTAButtons(page);
    
    console.log(`   ♿ Running accessibility tests...`);
    const accessibility = await runAccessibilityTests(page);
    
    // Compile results
    analysisResults.pages[pageInfo.name] = {
      url: `${BASE_URL}${pageInfo.path}`,
      screenshot: screenshotPath,
      timestamp: new Date().toISOString(),
      analysis: {
        colors,
        hierarchy,
        spacingTypography,
        ctas,
        accessibility
      }
    };
    
    console.log(`   ✅ Analysis complete!`);
    
  } catch (error) {
    console.error(`   ❌ Error analyzing ${pageInfo.name}:`, error.message);
    analysisResults.pages[pageInfo.name] = {
      error: error.message
    };
  }
}

// Generate HTML report
async function generateHTMLReport() {
  const reportHTML = `
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visual Analysis Report - ${new Date().toLocaleDateString('sv-SE')}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { margin-bottom: 1rem; }
        h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 1rem; }
        h2 { color: #1e40af; margin-top: 2rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; }
        h3 { color: #1e3a8a; margin-top: 1.5rem; }
        .page-section { background: white; border-radius: 8px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .metric { background: #f3f4f6; padding: 1rem; border-radius: 4px; margin-bottom: 1rem; }
        .metric-label { font-weight: bold; color: #4b5563; }
        .color-swatch { display: inline-block; width: 30px; height: 30px; border-radius: 4px; margin-right: 10px; vertical-align: middle; border: 1px solid #e5e7eb; }
        .cta-item { background: #fef3c7; padding: 1rem; border-radius: 4px; margin-bottom: 0.5rem; border-left: 4px solid #f59e0b; }
        .issue { background: #fee2e2; padding: 1rem; border-radius: 4px; margin-bottom: 0.5rem; border-left: 4px solid #ef4444; }
        .warning { background: #fef3c7; padding: 1rem; border-radius: 4px; margin-bottom: 0.5rem; border-left: 4px solid #f59e0b; }
        .success { background: #d1fae5; padding: 1rem; border-radius: 4px; margin-bottom: 0.5rem; border-left: 4px solid #10b981; }
        table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: #f9fafb; font-weight: 600; }
        .screenshot { max-width: 100%; height: auto; border: 1px solid #e5e7eb; border-radius: 4px; margin: 1rem 0; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0; }
        .summary-card { background: #f9fafb; padding: 1.5rem; border-radius: 8px; text-align: center; }
        .summary-number { font-size: 2rem; font-weight: bold; color: #2563eb; }
        .typography-sample { padding: 0.5rem; margin: 0.5rem 0; border-left: 3px solid #e5e7eb; }
        pre { background: #f3f4f6; padding: 1rem; border-radius: 4px; overflow-x: auto; }
        .visibility-indicator { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem; font-weight: 500; }
        .above-fold { background: #d1fae5; color: #065f46; }
        .below-fold { background: #fee2e2; color: #991b1b; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Visuell Analys Rapport</h1>
        <p style="color: #6b7280; margin-bottom: 2rem;">Genererad: ${new Date().toLocaleString('sv-SE')}</p>
        
        ${Object.entries(analysisResults.pages).map(([pageName, data]) => {
          if (data.error) {
            return `
                <div class="page-section">
                    <h2>${pageName}</h2>
                    <div class="issue">
                        <strong>Fel vid analys:</strong> ${data.error}
                    </div>
                </div>
            `;
          }
          
          const { analysis } = data;
          return `
            <div class="page-section">
                <h2>${pageName}</h2>
                <p style="color: #6b7280; margin-bottom: 1rem;">URL: ${data.url}</p>
                
                <h3>📊 Sammanfattning</h3>
                <div class="summary-grid">
                    <div class="summary-card">
                        <div class="summary-number">${analysis.colors.uniqueColors.length}</div>
                        <div>Unika färger</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-number">${Object.values(analysis.hierarchy.headingCount).reduce((a, b) => a + b, 0)}</div>
                        <div>Rubriker totalt</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-number">${analysis.ctas.totalCTAs}</div>
                        <div>CTA-element</div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-number">${analysis.accessibility.summary?.totalIssues || 0}</div>
                        <div>Tillgänglighetsproblem</div>
                    </div>
                </div>
                
                <h3>🎨 Färganalys</h3>
                <div class="metric">
                    <div class="metric-label">Mest använda färger:</div>
                    ${analysis.colors.colorUsage.slice(0, 5).map(({ color, count }) => `
                        <div style="margin: 0.5rem 0;">
                            <span class="color-swatch" style="background-color: ${color};"></span>
                            <code>${color}</code> - används ${count} gånger
                        </div>
                    `).join('')}
                </div>
                
                <h3>📐 Visuell Hierarki</h3>
                <div class="metric">
                    <div class="metric-label">Rubrikstruktur:</div>
                    <table>
                        <tr>
                            <th>Nivå</th>
                            <th>Antal</th>
                            <th>Exempel</th>
                        </tr>
                        ${Object.entries(analysis.hierarchy.headings).map(([level, headings]) => `
                            <tr>
                                <td>${level.toUpperCase()}</td>
                                <td>${headings.length}</td>
                                <td>${headings[0]?.text || '-'}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
                
                <h3>📏 Typografi</h3>
                <div class="metric">
                    <div class="metric-label">Vanligaste typografiska kombinationer:</div>
                    ${analysis.spacingTypography.typography.slice(0, 3).map(typo => `
                        <div class="typography-sample">
                            <strong>Font:</strong> ${typo.fontFamily}<br>
                            <strong>Storlek:</strong> ${typo.fontSize}<br>
                            <strong>Linjehöjd:</strong> ${typo.lineHeight}<br>
                            <strong>Vikt:</strong> ${typo.fontWeight}<br>
                            <small>Används ${typo.count} gånger</small>
                        </div>
                    `).join('')}
                </div>
                
                <h3>🎯 Call-to-Action Analys</h3>
                <div class="metric">
                    <div class="metric-label">CTA-element (${analysis.ctas.aboveFoldCTAs} av ${analysis.ctas.totalCTAs} above fold):</div>
                    ${analysis.ctas.ctaElements.slice(0, 5).map(cta => `
                        <div class="cta-item">
                            <strong>${cta.text || '(Ingen text)'}</strong> 
                            <span class="visibility-indicator ${cta.visibility.aboveFold ? 'above-fold' : 'below-fold'}">
                                ${cta.visibility.aboveFold ? 'Above fold' : 'Below fold'}
                            </span><br>
                            <small>
                                Typ: ${cta.type} | 
                                Storlek: ${Math.round(cta.position.width)}x${Math.round(cta.position.height)}px |
                                Synlighet: ${Math.round(cta.visibility.percentageVisible)}%
                            </small><br>
                            <small>Färger: ${cta.styles.backgroundColor} text på ${cta.styles.color} bakgrund</small>
                        </div>
                    `).join('')}
                </div>
                
                <h3>♿ Tillgänglighet - Färgkontrast</h3>
                ${analysis.accessibility.contrastIssues && analysis.accessibility.contrastIssues.length > 0 ? `
                    <div class="issue">
                        <div class="metric-label">Kontrastproblem hittade:</div>
                        ${analysis.accessibility.contrastIssues.map(issue => `
                            <div style="margin: 1rem 0;">
                                <strong>${issue.description}</strong><br>
                                <small>Påverkan: ${issue.impact} | ${issue.occurrences} förekomster</small>
                                ${issue.examples.slice(0, 2).map(ex => `
                                    <pre style="margin-top: 0.5rem;">${ex.html}</pre>
                                `).join('')}
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="success">
                        ✅ Inga färgkontrastproblem hittades!
                    </div>
                `}
                
                ${analysis.accessibility.summary ? `
                    <div class="metric">
                        <div class="metric-label">Tillgänglighetsöversikt:</div>
                        <div class="summary-grid">
                            <div class="summary-card">
                                <div class="summary-number" style="color: #dc2626;">${analysis.accessibility.summary.byImpact.critical}</div>
                                <div>Kritiska</div>
                            </div>
                            <div class="summary-card">
                                <div class="summary-number" style="color: #ea580c;">${analysis.accessibility.summary.byImpact.serious}</div>
                                <div>Allvarliga</div>
                            </div>
                            <div class="summary-card">
                                <div class="summary-number" style="color: #ca8a04;">${analysis.accessibility.summary.byImpact.moderate}</div>
                                <div>Måttliga</div>
                            </div>
                            <div class="summary-card">
                                <div class="summary-number" style="color: #65a30d;">${analysis.accessibility.summary.byImpact.minor}</div>
                                <div>Mindre</div>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
          `;
        }).join('')}
        
        <div class="page-section" style="background: #f0f9ff;">
            <h2>💡 Rekommendationer</h2>
            <ul style="margin-left: 2rem;">
                <li>Kontrollera att alla CTA-knappar har tillräcklig färgkontrast enligt WCAG-riktlinjer</li>
                <li>Se till att viktiga CTA-element är synliga "above the fold"</li>
                <li>Använd konsekvent spacing och typografi genom hela webbplatsen</li>
                <li>Åtgärda eventuella tillgänglighetsproblem, särskilt kritiska och allvarliga</li>
                <li>Överväg att minska antalet unika färger för bättre visuell enhetlighet</li>
            </ul>
        </div>
    </div>
</body>
</html>
  `;
  
  const reportPath = path.join(RESULTS_DIR, 'visual-analysis-report.html');
  await fs.writeFile(reportPath, reportHTML);
  console.log(`\n📄 HTML report saved to: ${reportPath}`);
  
  return reportPath;
}

// Main analysis function
async function runVisualAnalysis() {
  console.log('🚀 Starting Visual Analysis of Next.js App\n');
  console.log(`📍 Analyzing URL: ${BASE_URL}`);
  console.log(`📁 Results will be saved to: ${RESULTS_DIR}\n`);
  
  await ensureResultsDir();
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    
    // Analyze each page
    for (const pageInfo of PAGES_TO_ANALYZE) {
      await analyzePage(page, pageInfo);
    }
    
    // Save JSON results
    const jsonPath = path.join(RESULTS_DIR, 'analysis-data.json');
    await fs.writeFile(jsonPath, JSON.stringify(analysisResults, null, 2));
    console.log(`\n📊 JSON data saved to: ${jsonPath}`);
    
    // Generate HTML report
    const reportPath = await generateHTMLReport();
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ VISUAL ANALYSIS COMPLETE!');
    console.log('='.repeat(60));
    console.log(`\n📁 Results saved in: ${RESULTS_DIR}/`);
    console.log(`📄 Open the HTML report: ${reportPath}`);
    console.log(`📊 Raw data available in: ${jsonPath}`);
    
    // Print quick insights
    console.log('\n🔍 Quick Insights:');
    Object.entries(analysisResults.pages).forEach(([pageName, data]) => {
      if (!data.error && data.analysis) {
        console.log(`\n${pageName}:`);
        console.log(`  - Colors: ${data.analysis.colors.uniqueColors.length} unique colors`);
        console.log(`  - CTAs: ${data.analysis.ctas.totalCTAs} total (${data.analysis.ctas.aboveFoldCTAs} above fold)`);
        console.log(`  - Accessibility issues: ${data.analysis.accessibility.summary?.totalIssues || 0}`);
      }
    });
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    await browser.close();
  }
}

// Run the analysis
runVisualAnalysis().catch(error => {
  console.error('❌ Analysis failed:', error);
  process.exit(1);
});