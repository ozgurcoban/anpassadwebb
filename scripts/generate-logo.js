const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateLogoPng() {
  try {
    const svgPath = path.join(__dirname, '../public/favicon.svg');
    const svgBuffer = await fs.readFile(svgPath);
    
    // Generate 512x512 logo for JSON-LD and general use
    // Sharp should respect the SVG viewBox, but let's ensure we get the full image
    await sharp(svgBuffer, { density: 300 })
      .resize(400, 400, {
        fit: 'inside',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .extend({
        top: 56,
        bottom: 56,
        left: 56,
        right: 56,
        background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent padding
      })
      .png({ 
        quality: 100,
        compressionLevel: 9
      })
      .toFile(path.join(__dirname, '../public/logo.png'));
    
    console.log('✅ Generated logo.png (512x512)');
    
    // Generate 192x192 for PWA and other uses
    await sharp(svgBuffer, { density: 300 })
      .resize(150, 150, {
        fit: 'inside',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .extend({
        top: 21,
        bottom: 21,
        left: 21,
        right: 21,
        background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent padding
      })
      .png({ 
        quality: 100,
        compressionLevel: 9
      })
      .toFile(path.join(__dirname, '../public/logo-192.png'));
    
    console.log('✅ Generated logo-192.png (192x192)');
    
    // Update existing favicon PNGs - smaller sizes don't need padding
    await sharp(svgBuffer)
      .resize(32, 32)
      .png({ 
        quality: 100,
        compressionLevel: 9
      })
      .toFile(path.join(__dirname, '../public/favicon-32x32.png'));
    
    console.log('✅ Updated favicon-32x32.png');
    
    await sharp(svgBuffer)
      .resize(16, 16)
      .png({ 
        quality: 100,
        compressionLevel: 9
      })
      .toFile(path.join(__dirname, '../public/favicon-16x16.png'));
    
    console.log('✅ Updated favicon-16x16.png');
    
    // Generate Apple touch icon
    await sharp(svgBuffer, { density: 300 })
      .resize(140, 140, {
        fit: 'inside',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .extend({
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
        background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent padding
      })
      .png({ 
        quality: 100,
        compressionLevel: 9
      })
      .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
    
    console.log('✅ Updated apple-touch-icon.png');
    
  } catch (error) {
    console.error('Error generating PNG files:', error);
    console.log('\n💡 To run this script, first install sharp:');
    console.log('   npm install --save-dev sharp');
  }
}

generateLogoPng();