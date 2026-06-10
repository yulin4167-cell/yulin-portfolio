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

// Extract image/asset references from JSON to understand what they depict
function analyzeProjectJson(jsonStr, projectName) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`=== ${projectName} JSON Analysis ===`);
  console.log('='.repeat(60));

  try {
    // Look for image fills and their names/context
    const data = JSON.parse(jsonStr);
    const nodeById = data.nodeById || {};

    // Find all nodes with image fills
    const imageNodes = [];
    const textNodes = [];

    for (const [id, node] of Object.entries(nodeById)) {
      // Find image fills
      if (node.fills) {
        const imageFills = node.fills.filter(f => f.type === 'IMAGE');
        if (imageFills.length > 0) {
          imageNodes.push({
            id,
            name: node.name,
            type: node.type,
            y: node.absoluteBoundingBox ? node.absoluteBoundingBox.y : 0,
            width: node.absoluteBoundingBox ? node.absoluteBoundingBox.width : 0,
            height: node.absoluteBoundingBox ? node.absoluteBoundingBox.height : 0,
            imageFills
          });
        }
      }

      // Find text nodes for context
      if (node.type === 'TEXT' && node.characters) {
        textNodes.push({
          id,
          name: node.name,
          text: node.characters.substring(0, 100),
          y: node.absoluteBoundingBox ? node.absoluteBoundingBox.y : 0
        });
      }
    }

    // Sort by Y position (top to bottom)
    imageNodes.sort((a, b) => a.y - b.y);
    textNodes.sort((a, b) => a.y - b.y);

    console.log(`\nImage nodes (${imageNodes.length}) sorted top to bottom:`);
    imageNodes.forEach((node, i) => {
      console.log(`\n  ${i + 1}. Name: "${node.name}" (${node.type})`);
      console.log(`     Y: ${node.y}, Size: ${node.width}x${node.height}`);
      node.imageFills.forEach(fill => {
        if (fill.imageRef) console.log(`     imageRef: ${fill.imageRef}`);
      });
    });

    console.log(`\nText nodes (${textNodes.length}) sorted top to bottom (first 30):`);
    textNodes.slice(0, 30).forEach((node, i) => {
      console.log(`  ${i + 1}. Y:${node.y} "${node.text}"`);
    });

  } catch(e) {
    console.log('Error parsing JSON:', e.message);
    // Search for image refs manually
    const imageRefMatches = [...jsonStr.matchAll(/"imageRef":"([^"]+)"/g)];
    console.log(`\nFound ${imageRefMatches.length} imageRef values`);

    // Also look for node names near image refs
    const namePattern = /"name":"([^"]+)"[^}]+?"imageRef":"([^"]+)"/g;
    for (const match of jsonStr.matchAll(/"name":"([^"]+)"/g)) {
      const name = match[1];
      if (name.includes('image') || name.includes('Image') || name.includes('hero') || name.includes('Hero') || name.includes('cover') || name.includes('Cover') || name.includes('photo') || name.includes('Photo')) {
        const context = jsonStr.substring(Math.max(0, match.index - 50), match.index + 200);
        console.log(`\nImage-related node name: "${name}"`);
      }
    }
  }
}

async function main() {
  const baseUrl = 'https://ditch-decor-08467863.figma.site/_json/0256fafd-c1dd-486e-8998-6b0d2334e90b';
  const projects = [
    { name: 'Kindred Care', path: 'project-1' },
    { name: 'Scent Library', path: 'project-2' },
    { name: 'Listable', path: 'project-3' },
    { name: 'NMDP', path: 'project-4' },
    { name: 'MoMo', path: 'momo' },
    { name: 'Silver Linings', path: 'silver-linings' },
    { name: 'Species Symphony', path: 'species-symphony' },
    { name: 'RainVeil', path: 'rainveil' },
    { name: 'Hidden UI', path: 'experiment-1' },
    { name: 'Kinetic Grove', path: 'experiment-2' },
  ];

  for (const p of projects) {
    try {
      const json = await fetchUrl(`${baseUrl}/${p.path}.json`);
      analyzeProjectJson(json, p.name);
    } catch(e) {
      console.log(`Error fetching ${p.name}:`, e.message);
    }
  }
}

main().catch(console.error);
