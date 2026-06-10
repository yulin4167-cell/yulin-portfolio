const { chromium } = require('/Users/shuitashiliujin/Desktop/yulin-portfolio/node_modules/playwright-core');
const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function scrapePortfolio() {
  // First fetch the index JSON
  console.log('=== Fetching index JSON ===');
  const indexJson = await fetchUrl('https://ditch-decor-08467863.figma.site/_json/0256fafd-c1dd-486e-8998-6b0d2334e90b/_index.json');
  console.log('Index JSON (first 3000):', indexJson.substring(0, 3000));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  // Intercept all JSON responses
  const jsonResponses = {};
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('/_json/')) {
      try {
        const body = await response.text();
        jsonResponses[url] = body;
        console.log(`\nCaptured JSON: ${url} (${body.length} chars)`);
      } catch(e) {}
    }
  });

  console.log('\n=== Navigating to main page ===');
  await page.goto('https://ditch-decor-08467863.figma.site', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Try clicking "View My Work" button
  try {
    await page.click('text=View My Work');
    console.log('Clicked "View My Work"');
    await page.waitForTimeout(3000);
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log('After click body text:', bodyText.substring(0, 3000));

    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).map(a => ({
        text: a.innerText.trim().substring(0, 100),
        href: a.href
      }));
    });
    console.log('Links after click:', JSON.stringify(links, null, 2));

    const images = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src.substring(0, 200),
        alt: img.alt,
        width: img.width,
        height: img.height
      }));
    });
    console.log('Images after click:', JSON.stringify(images.slice(0, 30), null, 2));
  } catch(e) {
    console.log('Error clicking View My Work:', e.message);
  }

  await browser.close();
}

scrapePortfolio().catch(console.error);
