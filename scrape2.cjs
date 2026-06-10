const { chromium } = require('/Users/shuitashiliujin/Desktop/yulin-portfolio/node_modules/playwright-core');

async function scrapePortfolio() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  console.log('=== Navigating to main page ===');
  await page.goto('https://ditch-decor-08467863.figma.site', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(5000);

  // Get full HTML to understand structure
  const html = await page.content();
  console.log('--- HTML snippet (first 5000 chars) ---');
  console.log(html.substring(0, 5000));

  console.log('\n--- HTML snippet (5000-10000) ---');
  console.log(html.substring(5000, 10000));

  await browser.close();
}

scrapePortfolio().catch(console.error);
