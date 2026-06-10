const { chromium } = require('/Users/shuitashiliujin/Desktop/yulin-portfolio/node_modules/playwright-core');

async function scrapePortfolio() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  // Intercept JSON data
  const jsonData = {};
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('/_json/') && url.endsWith('.json')) {
      try {
        const body = await response.text();
        jsonData[url] = body.substring(0, 500);
        console.log(`JSON URL: ${url}`);
      } catch(e) {}
    }
  });

  console.log('=== Navigating to main page ===');
  await page.goto('https://ditch-decor-08467863.figma.site', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(5000);

  // Try clicking "View My Work"
  const allText = await page.evaluate(() => document.body.innerText);
  console.log('Body text:', allText.substring(0, 2000));

  // Get all elements with links
  const allLinks = await page.evaluate(() => {
    const result = [];
    // Look for all anchor elements
    document.querySelectorAll('a').forEach(el => {
      result.push({
        text: el.innerText.trim().substring(0, 100),
        href: el.href,
        onclick: el.getAttribute('onclick')
      });
    });
    // Also look for elements with data attributes
    document.querySelectorAll('[data-href],[data-link],[data-url]').forEach(el => {
      result.push({
        tag: el.tagName,
        text: el.innerText.trim().substring(0, 100),
        dataHref: el.dataset.href,
        dataLink: el.dataset.link
      });
    });
    return result;
  });
  console.log('\nAll links:', JSON.stringify(allLinks, null, 2));

  // Try scrolling down to load more content
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);

  const scrolledText = await page.evaluate(() => document.body.innerText);
  console.log('\nScrolled body text:', scrolledText.substring(0, 3000));

  // Get all images
  const images = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({
      src: img.src,
      alt: img.alt,
      title: img.title,
      width: img.width,
      height: img.height
    }));
  });
  console.log('\nAll images on main page:', JSON.stringify(images.slice(0, 20), null, 2));

  await browser.close();
}

scrapePortfolio().catch(console.error);
