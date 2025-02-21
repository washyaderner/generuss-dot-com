const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateOGImage() {
  // Launch browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to OG image dimensions
  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 2, // Retina quality
  });

  // HTML content with our site's styling
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            width: 1200px;
            height: 630px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #000000 0%, #0A0A1E 100%);
            font-family: system-ui, -apple-system, sans-serif;
            color: white;
            position: relative;
            overflow: hidden;
          }

          .gradient-overlay {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%);
            pointer-events: none;
          }

          .content {
            position: relative;
            z-index: 1;
            text-align: center;
            padding: 2rem;
          }

          .title {
            font-size: 72px;
            font-weight: bold;
            margin: 0 0 1rem;
            background: linear-gradient(to right, #2DD4BF, #8B5CF6, #2DD4BF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.2;
          }

          .subtitle {
            font-size: 32px;
            color: #94A3B8;
            margin: 0;
            max-width: 800px;
          }

          .accent {
            position: absolute;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.15;
          }

          .accent-1 {
            background: #2DD4BF;
            top: -200px;
            left: -200px;
          }

          .accent-2 {
            background: #8B5CF6;
            bottom: -200px;
            right: -200px;
          }
        </style>
      </head>
      <body>
        <div class="accent accent-1"></div>
        <div class="accent accent-2"></div>
        <div class="gradient-overlay"></div>
        <div class="content">
          <h1 class="title">Generuss Blog</h1>
          <p class="subtitle">Insights, tips, and strategies to elevate your sales and business processes</p>
        </div>
      </body>
    </html>
  `;

  // Set content
  await page.setContent(html);

  // Ensure the output directory exists
  const outputDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Take screenshot
  await page.screenshot({
    path: path.join(outputDir, 'blog-og.jpg'),
    quality: 100,
    type: 'jpeg',
  });

  // Close browser
  await browser.close();

  console.log('OpenGraph image generated successfully!');
}

generateOGImage().catch(console.error); 