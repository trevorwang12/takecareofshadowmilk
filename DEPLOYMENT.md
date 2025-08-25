# Take Care of Shadow Milk - Deployment Guide

## 🚀 Production Deployment to Vercel

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Domain**: `takecareofshadowmilk.cc` configured in Vercel
3. **Node.js**: Version 18.x or higher
4. **Git Repository**: Code pushed to GitHub/GitLab

### Quick Deploy

```bash
# 1. Install Vercel CLI (if not already installed)
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy with verification
npm run deploy:verify
```

### Step-by-Step Deployment

#### 1. Pre-deployment Check
```bash
npm run pre-deploy
```
This checks:
- ✅ Environment files exist
- ✅ Site configuration is correct
- ✅ Essential assets are present
- ✅ Game files are available
- ✅ Critical images exist

#### 2. Build for Production
```bash
npm run build:prod
```

#### 3. Deploy to Vercel
```bash
# First time deployment
vercel --prod

# Subsequent deployments
vercel --prod --confirm
```

#### 4. Verify Deployment
```bash
npm run verify
```
Tests all critical endpoints and functionality.

### Environment Configuration

#### Production Environment (`.env.production`)
```env
NEXT_PUBLIC_SITE_URL=https://takecareofshadowmilk.cc
NEXT_PUBLIC_DOMAIN=takecareofshadowmilk.cc
NODE_ENV=production
```

#### Vercel Environment Variables
Set these in your Vercel dashboard:
- `NEXT_PUBLIC_SITE_URL`: `https://takecareofshadowmilk.cc`
- `NEXT_PUBLIC_DOMAIN`: `takecareofshadowmilk.cc`
- `NODE_ENV`: `production`

### Domain Configuration

#### 1. Add Custom Domain in Vercel
1. Go to your project dashboard
2. Settings → Domains
3. Add `takecareofshadowmilk.cc`
4. Add `www.takecareofshadowmilk.cc` (redirects to main)

#### 2. DNS Settings
Point your domain to Vercel:
- **A Record**: `76.76.19.61`
- **CNAME for www**: `cname.vercel-dns.com`

### Vercel Configuration

The `vercel.json` file includes:
- ✅ **Performance optimizations**: Caching, compression
- ✅ **Security headers**: CSP, XSS protection
- ✅ **SEO redirects**: Common variations to main domain
- ✅ **Asset optimization**: Long-term caching for static assets

### Build Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build with optimizations |
| `npm run build:prod` | Production build |
| `npm run pre-deploy` | Pre-deployment checks |
| `npm run deploy` | Check + build + deploy |
| `npm run deploy:force` | Deploy without checks |
| `npm run verify` | Verify live deployment |

### Performance Optimizations

- **Image optimization**: WebP/AVIF formats, lazy loading
- **Code splitting**: Vendor and common chunks
- **Static assets**: Long-term caching (1 year)
- **Compression**: Gzip enabled
- **Critical CSS**: Inlined for faster rendering

### Security Features

- **CSP**: Content Security Policy for XSS protection
- **iframe sandbox**: Restricted permissions for game embeds
- **HTTPS only**: All traffic redirected to secure connections
- **Security headers**: XSS, clickjacking, MIME-type protection

### Monitoring & Analytics

After deployment, consider adding:
- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: User behavior tracking
- **Core Web Vitals**: Performance metrics

### Troubleshooting

#### Common Issues

**Build Fails**
```bash
# Clean cache and rebuild
rm -rf .next node_modules
npm ci
npm run build:prod
```

**Domain Not Working**
- Check DNS propagation (can take up to 48 hours)
- Verify domain settings in Vercel dashboard
- Check SSL certificate status

**Game Not Loading**
- Verify iframe sandbox settings
- Check Content Security Policy
- Test game files directly: `/game/take-care-of-shadow-milk/index.html`

**Images Not Displaying**
- Check asset paths in config files
- Verify image optimization settings
- Test direct asset URLs

#### Debug Commands
```bash
# Analyze bundle size
npm run analyze

# Type checking
npm run type-check

# Lint code
npm run lint:fix

# Local preview of production build
npm run preview
```

### Rollback Strategy

If deployment fails:
1. Check Vercel dashboard for error logs
2. Use previous deployment: `vercel --prod --confirm`
3. Or rollback via Vercel dashboard

### Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Project Issues**: Check GitHub issues or create new one

---

## 📋 Deployment Checklist

Before going live:
- [ ] Domain configured and DNS propagated
- [ ] Environment variables set in Vercel
- [ ] SSL certificate active
- [ ] All game files accessible
- [ ] Images loading correctly
- [ ] SEO meta tags complete
- [ ] Analytics/monitoring configured
- [ ] Performance optimizations enabled
- [ ] Security headers active
- [ ] Sitemap and robots.txt generated

## 🎉 Go Live!

Once everything is verified:
1. Announce on social media
2. Submit to search engines
3. Monitor performance and user feedback
4. Plan future updates and improvements