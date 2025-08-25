#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Running pre-deployment checks...');

const checks = [
  {
    name: 'Environment files',
    check: () => {
      const envProd = fs.existsSync('.env.production');
      const vercelJson = fs.existsSync('vercel.json');
      
      if (!envProd) console.warn('⚠️  .env.production not found');
      if (!vercelJson) console.warn('⚠️  vercel.json not found');
      
      return envProd && vercelJson;
    }
  },
  {
    name: 'Site configuration',
    check: () => {
      try {
        const { siteConfig } = require('../config/site.js');
        const correctDomain = siteConfig.domain === 'takecareofshadowmilk.cc';
        const correctUrl = siteConfig.url === 'https://takecareofshadowmilk.cc';
        const correctEmail = siteConfig.email === 'support@takecareofshadowmilk.cc';
        
        if (!correctDomain) console.warn('⚠️  Domain should be takecareofshadowmilk.cc');
        if (!correctUrl) console.warn('⚠️  URL should be https://takecareofshadowmilk.cc');
        if (!correctEmail) console.warn('⚠️  Email should be support@takecareofshadowmilk.cc');
        
        return correctDomain && correctUrl && correctEmail;
      } catch (e) {
        console.error('❌ Site config check failed:', e.message);
        return false;
      }
    }
  },
  {
    name: 'Essential assets',
    check: () => {
      const favicon = fs.existsSync('public/favicon.ico');
      const manifest = fs.existsSync('public/assets/img/site.webmanifest');
      const robots = fs.existsSync('public/robots.txt');
      const sitemap = fs.existsSync('public/sitemap.xml');
      
      if (!favicon) console.warn('⚠️  favicon.ico not found');
      if (!manifest) console.warn('⚠️  site.webmanifest not found');
      if (!robots) console.warn('⚠️  robots.txt not found (will be generated)');
      if (!sitemap) console.warn('⚠️  sitemap.xml not found (will be generated)');
      
      return favicon && manifest;
    }
  },
  {
    name: 'Game files',
    check: () => {
      const gameDir = 'public/game/take-care-of-shadow-milk';
      const gameIndex = fs.existsSync(path.join(gameDir, 'index.html'));
      
      if (!gameIndex) console.warn('⚠️  Main game file not found');
      
      return gameIndex;
    }
  },
  {
    name: 'Critical images',
    check: () => {
      const logo = fs.existsSync('public/assets/img/android-chrome-512x512.png');
      const ogImage = fs.existsSync('public/assets/img/take-care-of-shadow-milk-og-image.svg');
      
      if (!logo) console.warn('⚠️  Main logo not found');
      if (!ogImage) console.warn('⚠️  OG image not found');
      
      return logo; // OG image is optional
    }
  }
];

let allPassed = true;

checks.forEach(({ name, check }) => {
  const passed = check();
  console.log(`${passed ? '✅' : '❌'} ${name}`);
  if (!passed) allPassed = false;
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 All checks passed! Ready for deployment.');
  process.exit(0);
} else {
  console.log('⚠️  Some checks failed. Please review before deploying.');
  console.log('\nTo deploy anyway, run: npm run deploy');
  process.exit(1);
}