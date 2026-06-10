const { chromium } = require('/Users/shuitashiliujin/Desktop/yulin-portfolio/node_modules/playwright-core');

async function scrapeProject(page, url, name) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`=== ${name} ===`);
  console.log(`URL: ${url}`);
  console.log('='.repeat(60));

  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(4000);

  // Scroll down incrementally
  for (let i = 0; i < 10; i++) {
    await page.evaluate((fraction) => window.scrollTo(0, document.body.scrollHeight * fraction), (i + 1) / 10);
    await page.waitForTimeout(500);
  }
  await page.waitForTimeout(2000);

  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('\n--- Page Text ---');
  console.log(bodyText);

  const images = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => {
      const parent = img.closest('section, div, article, figure') || img.parentElement;
      const contextText = parent ? parent.innerText.trim().substring(0, 200) : '';
      let nextText = '';
      let next = img.nextElementSibling;
      if (next) nextText = next.innerText ? next.innerText.trim().substring(0, 100) : '';
      let prevText = '';
      let prev = img.previousElementSibling;
      if (prev) prevText = prev.innerText ? prev.innerText.trim().substring(0, 100) : '';
      return {
        src: img.src.substring(0, 200),
        alt: img.alt,
        title: img.title,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        contextText: contextText.substring(0, 150),
        prevText,
        nextText
      };
    });
  });

  console.log(`\n--- Images (${images.length} total) ---`);
  images.forEach((img, i) => {
    console.log(`\nImage ${i + 1}:`);
    console.log(`  src: ${img.src}`);
    console.log(`  alt: "${img.alt}"`);
    console.log(`  dimensions: ${img.width}x${img.height}`);
    console.log(`  context: "${img.contextText}"`);
    if (img.prevText) console.log(`  prevText: "${img.prevText}"`);
    if (img.nextText) console.log(`  nextText: "${img.nextText}"`);
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  await scrapeProject(page, 'https://ditch-decor-08467863.figma.site/project-4', 'NMDP (project-4)');

  await browser.close();
}

main().catch(console.error);
