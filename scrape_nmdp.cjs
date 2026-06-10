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
      res.on('end', () => resolve({ data, status: res.statusCode }));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function tryUrl(url) {
  try {
    const result = await fetchUrl(url);
    console.log(`${url} -> status ${result.status}`);
    if (result.status === 200) {
      console.log('  Content:', result.data.substring(0, 200));
    }
  } catch(e) {
    console.log(`${url} -> error: ${e.message}`);
  }
}

async function main() {
  // Try various possible NMDP URLs
  const possibleUrls = [
    'https://ditch-decor-08467863.figma.site/project-4',
    'https://ditch-decor-08467863.figma.site/nmdp',
    'https://ditch-decor-08467863.figma.site/nmdp-project',
    'https://ditch-decor-08467863.figma.site/bone-marrow',
    'https://ditch-decor-08467863.figma.site/graduate-4',
  ];

  for (const url of possibleUrls) {
    await tryUrl(url);
  }

  // Also check the view-my-work JSON to see if NMDP appears there
  console.log('\n=== Checking view-my-work JSON for NMDP ===');
  const vmwResult = await fetchUrl('https://ditch-decor-08467863.figma.site/_json/0256fafd-c1dd-486e-8998-6b0d2334e90b/view-my-work.json');
  // Search for NMDP in JSON
  const jsonStr = vmwResult.data;
  const nmdpIdx = jsonStr.indexOf('NMDP');
  if (nmdpIdx >= 0) {
    console.log('Found NMDP at index', nmdpIdx);
    console.log('Context:', jsonStr.substring(Math.max(0, nmdpIdx - 200), nmdpIdx + 500));
  } else {
    console.log('NMDP not found in view-my-work JSON');
    // Look for project-4
    const p4idx = jsonStr.indexOf('project-4');
    if (p4idx >= 0) {
      console.log('Found project-4 at index', p4idx);
      console.log('Context:', jsonStr.substring(Math.max(0, p4idx - 100), p4idx + 300));
    }
    // Look for nmdp
    const nmdpLower = jsonStr.indexOf('nmdp');
    if (nmdpLower >= 0) {
      console.log('Found nmdp (lowercase):', jsonStr.substring(Math.max(0, nmdpLower - 100), nmdpLower + 300));
    }
    // Show all connectionURL values
    const urlMatches = [...jsonStr.matchAll(/"connectionURL":"([^"]+)"/g)];
    console.log('\nAll connectionURLs in view-my-work JSON:');
    urlMatches.forEach(m => console.log(' ', m[1]));
  }

  // Use Playwright to check if NMDP link appears somewhere when scrolling
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  const page = await context.newPage();

  await page.goto('https://ditch-decor-08467863.figma.site', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.click('text=View My Work');
  await page.waitForTimeout(3000);

  // Scroll down to see if there are more projects
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);

  const allText = await page.evaluate(() => document.body.innerText);
  console.log('\n=== All text on view-my-work page (checking for NMDP) ===');
  console.log(allText);

  // Check all href links
  const allLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a, [onclick], [data-href]')).map(el => ({
      tag: el.tagName,
      text: el.innerText.trim().substring(0, 100),
      href: el.href || el.getAttribute('data-href') || '',
      onclick: el.getAttribute('onclick') || ''
    }));
  });
  console.log('\nAll links including data-href:', JSON.stringify(allLinks, null, 2));

  await browser.close();
}

main().catch(console.error);
