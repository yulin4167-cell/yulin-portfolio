const { chromium } = require('/Users/shuitashiliujin/Desktop/yulin-portfolio/node_modules/playwright-core');

async function scrapePortfolio() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  console.log('=== Navigating to main page ===');
  await page.goto('https://ditch-decor-08467863.figma.site', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Get all links on the main page
  const mainPageText = await page.evaluate(() => document.body.innerText);
  console.log('--- Main page text ---');
  console.log(mainPageText.substring(0, 3000));

  // Get all links
  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a'));
    return anchors.map(a => ({
      text: a.innerText.trim(),
      href: a.href,
      title: a.title
    })).filter(l => l.href && l.href !== '#');
  });

  console.log('\n--- All links on main page ---');
  links.forEach(l => console.log(JSON.stringify(l)));

  await browser.close();
}

scrapePortfolio().catch(console.error);
