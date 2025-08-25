#!/usr/bin/env node

const https = require('https');
const { URL } = require('url');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://takecareofshadowmilk.cc';

console.log('🔍 Verifying deployment...');
console.log(`Testing URL: ${SITE_URL}`);

async function testEndpoint(url, expectedStatus = 200) {
  return new Promise((resolve) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname,
      method: 'GET',
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      resolve({
        url,
        status: res.statusCode,
        success: res.statusCode === expectedStatus
      });
    });

    req.on('error', () => {
      resolve({
        url,
        status: 'ERROR',
        success: false
      });
    });

    req.on('timeout', () => {
      resolve({
        url,
        status: 'TIMEOUT',
        success: false
      });
    });

    req.end();
  });
}

async function runTests() {
  const tests = [
    { url: `${SITE_URL}`, name: 'Homepage' },
    { url: `${SITE_URL}/pou-online`, name: 'Pou Online page' },
    { url: `${SITE_URL}/my-dogy-virtual-pet`, name: 'My DOGY page' },
    { url: `${SITE_URL}/pet-salon`, name: 'Pet Salon page' },
    { url: `${SITE_URL}/assets/img/shadow-milk-logo-512-v3.svg`, name: 'Main logo' },
    { url: `${SITE_URL}/game/take-care-of-shadow-milk/index.html`, name: 'Main game' },
    { url: `${SITE_URL}/sitemap.xml`, name: 'Sitemap' },
    { url: `${SITE_URL}/robots.txt`, name: 'Robots.txt' }
  ];

  console.log('\nTesting endpoints...\n');

  const results = await Promise.all(
    tests.map(async ({ url, name }) => {
      const result = await testEndpoint(url);
      const status = result.success ? '✅' : '❌';
      console.log(`${status} ${name}: ${result.status}`);
      return result;
    })
  );

  const passed = results.filter(r => r.success).length;
  const total = results.length;

  console.log('\n' + '='.repeat(50));
  console.log(`📊 Results: ${passed}/${total} tests passed`);

  if (passed === total) {
    console.log('🎉 Deployment verification successful!');
    console.log(`🌐 Site is live at: ${SITE_URL}`);
    return true;
  } else {
    console.log('⚠️  Some tests failed. Please check the deployment.');
    return false;
  }
}

if (require.main === module) {
  runTests()
    .then(success => process.exit(success ? 0 : 1))
    .catch(error => {
      console.error('❌ Verification failed:', error.message);
      process.exit(1);
    });
}

module.exports = { testEndpoint, runTests };