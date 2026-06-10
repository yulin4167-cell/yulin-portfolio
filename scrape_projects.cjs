const { chromium } = require('/Users/shuitashiliujin/Desktop/yulin-portfolio/node_modules/playwright-core');

const projectUrls = [
  { name: 'Kindred Care', url: 'https://ditch-decor-08467863.figma.site/project-1' },
  { name: 'Scent Library', url: 'https://ditch-decor-08467863.figma.site/project-2' },
  { name: 'Listable', url: 'https://ditch-decor-08467863.figma.site/project-3' },
  { name: 'NMDP', url: null }, // Need to find this one
  { name: 'MoMo', url: 'https://ditch-decor-08467863.figma.site/momo' },
  { name: 'Silver Linings', url: 'https://ditch-decor-08467863.figma.site/silver-linings' },
  { name: 'Species Symphony', url: 'https://ditch-decor-08467863.figma.site/species-symphony' },
  { name: 'RainVeil', url: 'https://ditch-decor-08467863.figma.site/rainveil' },
  { name: 'Hidden UI', url: 'https://ditch-decor-08467863.figma.site/experiment-1' },
  { name: 'Kinetic Grove', url: 'https://ditch-decor-08467863.figma.site/experiment-2' },
];

async function scrapeProject(page, projectInfo) {
  if (!projectInfo.url) {
    console.log(`\n=== ${projectInfo.name}: URL not found ===`);
    return;
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`=== ${projectInfo.name} ===`);
  console.log(`URL: ${projectInfo.url}`);
  console.log('='.repeat(60));

  const jsonResponses = {};
  const responseHandler = async (response) => {
    const url = response.url();
    if (url.includes('/_json/')) {
      try {
        const body = await response.text();
        jsonResponses[url] = body;
      } catch(e) {}
    }
  };
  page.on('response', responseHandler);

  await page.goto(projectInfo.url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(4000);

  // Scroll down incrementally to trigger lazy loading
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let i = 0; i < 10; i++) {
    await page.evaluate((fraction) => window.scrollTo(0, document.body.scrollHeight * fraction), (i + 1) / 10);
    await page.waitForTimeout(500);
  }
  await page.waitForTimeout(2000);

  // Get full page text
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('\n--- Page Text ---');
  console.log(bodyText.substring(0, 5000));

  // Get all images with context
  const images = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => {
      // Get surrounding text context
      const parent = img.closest('section, div, article, figure') || img.parentElement;
      const contextText = parent ? parent.innerText.trim().substring(0, 200) : '';
      const grandParent = parent ? (parent.closest('section, div, article') || parent.parentElement) : null;
      const grandContextText = grandParent ? grandParent.innerText.trim().substring(0, 200) : '';

      // Get next sibling text
      let nextText = '';
      let next = img.nextElementSibling;
      if (next) nextText = next.innerText ? next.innerText.trim().substring(0, 100) : '';

      // Get previous sibling text
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

  page.removeListener('response', responseHandler);

  // Print captured JSON URLs
  console.log('\n--- Captured JSON URLs ---');
  Object.keys(jsonResponses).forEach(url => console.log(url));

  return { bodyText, images };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  // First navigate to main page and find the NMDP link
  const mainPageJsonResponses = {};
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('/_json/') && url.endsWith('view-my-work.json')) {
      try {
        const body = await response.text();
        mainPageJsonResponses['view-my-work'] = body;
      } catch(e) {}
    }
  });

  await page.goto('https://ditch-decor-08467863.figma.site', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.click('text=View My Work');
  await page.waitForTimeout(3000);

  // Find NMDP link
  const allLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.innerText.trim(),
      href: a.href
    }));
  });
  console.log('All project links:', JSON.stringify(allLinks, null, 2));

  // Look for NMDP link
  const nmdpLink = allLinks.find(l => l.text.includes('NMDP') || l.href.includes('nmdp') || l.href.includes('project-4'));
  if (nmdpLink) {
    const nmdpProject = projectUrls.find(p => p.name === 'NMDP');
    nmdpProject.url = nmdpLink.href;
    console.log('Found NMDP URL:', nmdpLink.href);
  }

  for (const project of projectUrls) {
    if (project.url) {
      await scrapeProject(page, project);
    }
  }

  await browser.close();
}

main().catch(console.error);
