# 🍼 Take Care of Shadow Milk

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-13+-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC.svg)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black.svg)](https://vercel.com)

> 🎮 **The Ultimate Virtual Pet Simulator** - Take care of Shadow Milk Cookie from Cookie Run: Kingdom! Feed, care for, or playfully prank your digital companion with complete creative freedom.

## 🌐 Live Demo

🚀 **[Play Now - takecareofshadowmilk.cc](https://takecareofshadowmilk.cc)**

## ✨ Features

### 🎮 Game Features
- **Shadow Milk Cookie Character** - Official Cookie Run: Kingdom character
- **Multiple Interactive Rooms** - Bedroom, kitchen, bathroom environments
- **Drag & Drop Interface** - Intuitive pet interaction mechanics
- **No Rules Gameplay** - Complete creative freedom
- **Fullscreen Support** - Proper game scaling in fullscreen mode
- **Cross-Platform** - Works on desktop, mobile, and tablet

### 🔗 Social Features
- **Share Buttons** - Twitter, Facebook, WhatsApp, Copy Link
- **Viral Content** - TikTok sensation with millions of views
- **Social Media Integration** - Easy content sharing

### 🎯 Additional Games
- **Pou Online** - Classic virtual pet care
- **My DOGY Virtual Pet** - Dog care simulation
- **Pet Salon Series** - Pet grooming simulators
- **My Pet Care Salon** - Complete pet spa experience

### 🛠️ Technical Features
- **Next.js 13+** - Modern React framework with App Router
- **TypeScript** - Full type safety
- **Tailwind CSS + shadcn/ui** - Beautiful, responsive design
- **SEO Optimized** - Perfect meta tags and structured data
- **Performance Optimized** - Image optimization, lazy loading, caching
- **PWA Ready** - Progressive Web App capabilities

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/trevorwang12/takecareofshadowmilk.git

# Navigate to project directory
cd takecareofshadowmilk

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5678` to see the application.

## 📱 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start          # Start production server

# Quality Assurance
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint errors
npm run type-check     # TypeScript type checking

# Deployment
npm run pre-deploy     # Pre-deployment checks
npm run deploy         # Deploy to production
npm run verify         # Verify live deployment

# Optimization
npm run optimize       # Performance optimizations
npm run analyze        # Bundle analysis
```

## 🏗️ Project Structure

```
takecareofshadowmilk/
├── app/                    # Next.js App Router pages
│   ├── (games)/           # Game-specific pages
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── game-section/      # Game embed component
│   ├── ui/               # shadcn/ui components
│   └── layout/           # Layout components
├── config/               # Configuration files
│   ├── site.js          # Site metadata
│   ├── content.ts       # Content configuration
│   └── theme.ts         # Theme settings
├── public/              # Static assets
│   ├── assets/          # Images and media
│   └── game/           # Game HTML files
├── scripts/            # Build and deployment scripts
└── vercel.json        # Vercel deployment config
```

## 🎯 Key Components

### GameSection
The main game component with fullscreen support and social sharing:
```tsx
<GameSection content={gameContent} />
```

### Social Share
Integrated social media sharing:
- Twitter/X sharing
- Facebook sharing  
- WhatsApp sharing
- Copy link functionality

### Responsive Design
Mobile-first design with Tailwind CSS:
- Responsive navigation
- Touch-friendly game controls
- Optimized for all screen sizes

## 🔧 Configuration

### Environment Variables

Create `.env.local` for development:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:5678
NEXT_PUBLIC_DOMAIN=localhost:5678
```

Production variables (`.env.production`):
```env
NEXT_PUBLIC_SITE_URL=https://takecareofshadowmilk.cc
NEXT_PUBLIC_DOMAIN=takecareofshadowmilk.cc
```

### Site Configuration
Edit `config/site.js`:
```javascript
export const siteConfig = {
  name: "Take Care of Shadow Milk",
  domain: "takecareofshadowmilk.cc",
  url: "https://takecareofshadowmilk.cc",
  email: "support@takecareofshadowmilk.cc"
}
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
npm run deploy
```

### Manual Deployment
```bash
# Build for production
npm run build:prod

# Deploy build folder to your hosting service
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🎨 Customization

### Adding New Games
1. Create game HTML file in `public/game/[game-name]/`
2. Add game data in `app/games/game-data.ts`
3. Create game page in `app/[game-name]/`

### Styling
- **Theme**: Edit `config/theme.ts`
- **Global Styles**: Edit `app/globals.css`
- **Components**: Use Tailwind classes and shadcn/ui

### Content
- **Site Content**: Edit `config/content.ts`
- **Meta Data**: Edit `config/site.js`

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Image Optimization**: WebP/AVIF formats with lazy loading
- **Code Splitting**: Automatic chunk optimization
- **Caching**: Long-term asset caching (1 year)
- **Bundle Size**: Optimized with tree shaking

## 🔒 Security

- **Content Security Policy**: Strict CSP headers
- **iframe Sandbox**: Secure game embedding
- **XSS Protection**: Headers and input sanitization
- **HTTPS Only**: All traffic encrypted

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadow Milk Cookie** - Character from Cookie Run: Kingdom by Devsisters
- **Original Game** - Created by GPE_sb3 on Scratch
- **TikTok Community** - For making this game viral
- **Next.js Team** - For the amazing framework
- **Vercel** - For seamless deployment

## 📞 Contact

- **Website**: [takecareofshadowmilk.cc](https://takecareofshadowmilk.cc)
- **Email**: support@takecareofshadowmilk.cc
- **GitHub**: [@trevorwang12](https://github.com/trevorwang12)

## 🎮 Game Credits

**Take Care of Shadow Milk** is based on the popular Scratch game by GPE_sb3, featuring Shadow Milk Cookie from Cookie Run: Kingdom. This web version provides enhanced features and accessibility while maintaining the original's chaotic charm.

---

<div align="center">

**🍼 Take Care of Shadow Milk - Where Virtual Pet Care Meets Chaos! 🍼**

Made with ❤️ by the community | Powered by Next.js & Vercel

</div>