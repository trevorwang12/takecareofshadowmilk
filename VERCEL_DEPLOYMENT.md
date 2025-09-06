# Vercel Deployment Guide

## 🚀 Deployment Optimizations Applied

### 1. **Performance Improvements**
- **Regional deployment**: Configured for Singapore region (`sin1`) for optimal Asia-Pacific performance
- **Function timeouts**: Specialized timeouts for different API endpoints
  - File uploads: 30s
  - iframe checking: 15s  
  - Backup operations: 60s
  - Standard APIs: 10s

### 2. **Caching Strategy**
- **Static assets**: 1 year cache with immutable flag
- **Images**: 30 day cache with 1 day stale-while-revalidate
- **Game data**: 5 minute cache with 10 minute stale-while-revalidate
- **Categories**: 1 hour cache with 2 hour stale-while-revalidate
- **Admin APIs**: No cache for real-time data

### 3. **Security Headers**
- **HSTS**: Enforced HTTPS with subdomain inclusion
- **Content Security**: Enhanced CSP for XSS protection
- **Frame Options**: SAMEORIGIN to prevent clickjacking
- **DNS Prefetch Control**: Enabled for better performance

### 4. **Build Optimizations**
- **Clean URLs**: Enabled for SEO-friendly URLs
- **Trailing Slash**: Disabled for consistency
- **Static generation**: Optimized for game pages and categories

## 📦 Environment Variables Setup

### Required Variables
Copy these to your Vercel dashboard:

```bash
# Core Application
NODE_ENV=production
ENABLE_ADMIN=true
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=TakeCare Games

# Admin Authentication
NEXT_PUBLIC_ADMIN_USERNAME=your_admin_username
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
ADMIN_TOKEN=your-secure-token

# Data Persistence (Required)
GITHUB_TOKEN=your_github_token

# Performance & Security
CACHE_TTL_GAMES=300
JWT_SECRET=your-32-character-secret
API_RATE_LIMIT=100
```

### Optional Enhancement Variables
```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# External Services
DATABASE_URL=your-database-url
REDIS_URL=your-redis-url
CLOUDINARY_URL=your-image-service-url
```

## 🔧 Deployment Steps

### 1. **Prepare Repository**
```bash
# Ensure all optimizations are committed
git add .
git commit -m "Deploy optimizations for Vercel"
git push origin main
```

### 2. **Import to Vercel**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Vercel will auto-detect Next.js configuration

### 3. **Configure Environment Variables**
1. Go to Project Settings → Environment Variables
2. Add all required variables from `.env.example`
3. Set different values for Production/Preview/Development

### 4. **Deploy**
- Vercel will automatically deploy from your main branch
- Monitor deployment logs for any issues

## 🎯 Performance Monitoring

### Metrics to Watch
- **Page Load Speed**: Should be < 3s for initial load
- **API Response Times**: < 500ms for game data
- **Image Loading**: Optimized with Next.js Image component
- **Lighthouse Score**: Target 90+ for Performance

### Vercel Analytics
Enable in Project Settings → Analytics to monitor:
- Core Web Vitals
- Page load performance  
- User engagement metrics

## 🛠️ Troubleshooting

### Common Issues
1. **Build Failures**
   - Check TypeScript errors (currently ignored but should be fixed)
   - Verify all dependencies are in package.json

2. **Function Timeouts**
   - Check vercel.json function configurations
   - Optimize heavy operations in API routes

3. **Environment Variable Issues**
   - Ensure all NEXT_PUBLIC_ variables are set correctly
   - Redeploy after adding new variables

4. **Cache Issues**
   - Use Vercel CLI to purge cache: `vercel --purge-cache`
   - Check cache headers in Network tab

### Debug Commands
```bash
# Local development with production settings
npm run build && npm start

# Analyze bundle size
npm run build:analyze

# Test production build locally
vercel dev

# Deploy with specific environment
vercel --prod
```

## 📊 File Structure Optimizations

### Static Assets
- Images: Placed in `/public/` for optimal caching
- Uploads: Served via `/uploads/` with 30-day cache
- Next.js static files: Automatically optimized by framework

### API Routes
- Admin routes: No caching for real-time updates
- Public data routes: Cached based on update frequency
- Upload routes: Extended timeout for large files

## 🚀 Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test admin panel functionality
- [ ] Check game iframe loading
- [ ] Validate image uploads
- [ ] Monitor error logs
- [ ] Test cache performance
- [ ] Verify SEO meta tags
- [ ] Check mobile responsiveness
- [ ] Test API rate limiting

## 🔄 Continuous Deployment

Vercel will automatically:
- Deploy on every push to main branch
- Run build checks and tests
- Generate preview deployments for PRs
- Rollback on deployment failures

For manual deployment control, use Vercel CLI:
```bash
vercel --prod  # Deploy to production
vercel         # Deploy to preview
```

---

**Next Steps**: Consider implementing monitoring with services like Sentry for error tracking and Hotjar for user analytics.