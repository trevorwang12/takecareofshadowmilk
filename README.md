# Incredibox Vitals - Mild As Spring Music Game

🎵 **Official Website**: [Incredibox Vitals](https://incrediboxvitals.com/)

This is the official website for Incredibox Vitals, featuring the beautiful Mild As Spring theme. Built with Next.js and designed for music creation and sharing.

## Project Overview

Increedibox Vitals is a music creation game where players can create amazing compositions using the serene Mild As Spring theme. The website provides an intuitive platform for music creation directly in the browser, no downloads required.

### Available Music Games

1. **[Incredibox Vitals](/)** - Main game featuring Mild As Spring theme
2. **[Sprunki Incredibox](/sprunki-incredibox)** - Colorful music creation with fun characters
3. **[Incredibox Original](/incredibox-original)** - Classic Incredibox experience
4. **[Incredibox Little Miss](/incredibox-little-miss)** - Charming character theme
5. **[Incredibox Sunrise](/incredibox-sunrise)** - Bright and energetic theme
6. **[Incredibox The Love](/incredibox-love)** - Romantic and heartfelt melodies
7. **[Incredibox Dystopia](/incredibox-dystopia)** - Futuristic electronic sounds
8. **[Music Maker Online](/music-maker-online)** - Simple music creation tool

### Key Features

- **Intuitive Music Creation** - Drag and drop interface for easy music making
- **Mild As Spring Theme** - Gentle, nature-inspired sounds and visuals
- **Cross-Platform Compatibility** - Works on all modern devices and browsers
- **Creative Sharing** - Record and share your musical creations
- **SEO Optimized** - Complete meta tags and structured data
- **AI Crawler Optimized** - Dedicated llms.txt files for AI indexing
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Music Game Recommendations** - Discover related music creation games

## 技术栈

- **框架**: Next.js 13.5.1 (App Router)
- **语言**: TypeScript 5.2.2
- **样式**: Tailwind CSS 3.3.3
- **UI组件**: Radix UI (完整无障碍组件库)
- **部署**: Vercel
- **SEO**: next-sitemap 4.2.3
- **表单**: React Hook Form + Zod
- **图标**: Lucide React

## 项目结构

```
/
├── app/                    # Next.js 应用目录 (App Router)
│   ├── crazy-cow-3d/       # Crazy Cow 3D 游戏页面
│   ├── crazy-chicken-3d/   # Crazy Chicken 3D 游戏页面
│   ├── cheese-chompers-3d/ # Cheese Chompers 3D 游戏页面
│   ├── brainrot-clicker/   # Italian Brainrot Clicker 游戏页面
│   ├── basketball-bros-unblocked/ # Basketball Bros 游戏页面
│   ├── pokemon-gamma-emerald/     # Pokemon Gamma Emerald 游戏页面
│   ├── games/              # 游戏列表和数据配置
│   ├── about/              # 关于页面
│   ├── contact/            # 联系页面
│   ├── privacy-policy/     # 隐私政策页面
│   ├── terms-of-service/   # 服务条款页面
│   ├── layout.tsx          # 全局布局
│   ├── page.tsx            # 首页 (Crazy Cattle 3D)
│   ├── schema.ts           # 结构化数据配置
│   └── globals.css         # 全局样式
├── components/             # React 组件库
│   ├── game-section/       # 游戏展示组件
│   ├── layout/             # 布局组件 (Header, Footer)
│   ├── templates/          # 页面模板 (GamePageTemplate)
│   ├── home/               # 首页组件
│   ├── features/           # 游戏特性组件
│   ├── what-is/            # 游戏介绍组件
│   ├── how-to-play/        # 玩法说明组件
│   ├── faq/                # FAQ组件
│   ├── other-games/        # 其他游戏推荐组件
│   ├── rating/             # 评分组件
│   └── ui/                 # 基础UI组件 (基于Radix UI)
├── config/                 # 配置文件
│   ├── site.ts/js          # 站点基本配置
│   ├── content.ts          # 游戏内容配置
│   ├── layout.ts           # 布局配置
│   └── theme.ts            # 主题配置
├── hooks/                  # 自定义React Hooks
├── lib/                    # 工具函数库
├── public/                 # 静态资源
│   ├── assets/             # 图片和其他资源
│   │   ├── crazy-cow-3d/   # Crazy Cow 3D 相关图片
│   │   ├── crazy-chicken-3d/ # Crazy Chicken 3D 相关图片
│   │   ├── cheese-chompers-3d/ # Cheese Chompers 3D 相关图片
│   │   ├── brainrot-clicker/ # Brainrot Clicker 相关图片
│   │   ├── basketball-bros-unblocked/ # Basketball Bros 相关图片
│   │   ├── pokemon-gamma-emerald/ # Pokemon 相关图片
│   │   └── img/            # 站点通用图片
│   ├── game/               # 游戏文件目录
│   │   ├── crazycattle3d/  # Crazy Cattle 3D 游戏文件
│   │   ├── crazycow3d/     # Crazy Cow 3D 游戏文件
│   │   ├── crazy-chicken-3d/ # Crazy Chicken 3D 游戏文件
│   │   ├── cheesechompers3d/ # Cheese Chompers 3D 游戏文件
│   │   ├── brainrot-clicker/ # Brainrot Clicker 游戏文件
│   │   ├── basketball-bros-unblocked/ # Basketball Bros 游戏文件
│   │   └── pokemon-gamma-emerald/ # Pokemon 游戏文件
│   ├── llms.txt            # AI 爬虫专用内容摘要
│   ├── llms-full.txt       # AI 爬虫专用完整内容
│   ├── robots.txt          # 搜索引擎爬虫规则
│   └── sitemap.xml         # 网站地图
├── next.config.js          # Next.js 配置 (包含游戏路由重写)
├── next-sitemap.config.js  # Sitemap 和 robots.txt 配置
├── tailwind.config.ts      # Tailwind CSS 配置
├── tsconfig.json           # TypeScript 配置
└── components.json         # shadcn/ui 组件配置
```

## 开发指南

### 环境要求

- Node.js 16.x 或更高版本
- npm 或 yarn

### 环境变量配置

在项目根目录创建 `.env.local` 文件：

```bash
# Google Analytics Configuration
# 请替换为您自己的 Google Analytics ID
# 获取方式: https://analytics.google.com/ → 管理 → 数据流 → 衡量ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 其他可选配置
# NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**注意**: 
- `.env.local` 文件已在 `.gitignore` 中，不会被提交到代码库
- 请将 `G-XXXXXXXXXX` 替换为您自己的 Google Analytics 衡量ID

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 本地开发

```bash
npm run dev
# 或
yarn dev
```

访问 http://localhost:3000 查看网站。

### 构建项目

```bash
npm run build
# 或
yarn build
```

### 生成 Sitemap

```bash
npm run sitemap
# 或
yarn sitemap
```

### 清理 Sitemap

```bash
npm run clean-sitemap
```

## 游戏嵌入指南

网站通过 iframe 嵌入游戏，每个游戏都有对应的嵌入路由：

- `/crazy-cattle-3d.embed` → `/game/crazycattle3d/index.html`
- `/crazy-cow-3d.embed` → `/game/crazycow3d/index.html`
- `/cheese-chompers-3d.embed` → `/game/cheesechompers3d/index.html`
- `/brainrot-clicker.embed` → `/game/brainrot-clicker/index.html`
- `/basketball-bros-unblocked.embed` → `/game/basketball-bros-unblocked/index.html`
- `/pokemon-gamma-emerald.embed` → `/game/pokemon-gamma-emerald/index.html`
- `/crazy-chicken-3d.embed` → `/game/crazy-chicken-3d/index.html`

详细的游戏本地化部署指南可参考 `IFRAME_DOWNLOAD_README.md`。

## 添加新游戏指南

要添加新游戏，需要以下步骤：

1. **添加游戏文件**: 将游戏文件放入 `public/game/[游戏名]/` 目录
2. **创建游戏页面**: 在 `app/[游戏名]/` 创建页面目录和文件
3. **配置游戏数据**: 在 `app/games/game-data.ts` 中添加游戏信息
4. **添加游戏内容**: 创建游戏的 `content.ts` 配置文件
5. **配置路由重写**: 在 `next.config.js` 中添加嵌入路由
6. **添加游戏资源**: 在 `public/assets/[游戏名]/` 添加相关图片

## 相关链接和资源

### 官方页面
- 🏠 **主页**: [Crazy Cattle 3D 官方网站](https://crazy-cattle.net/)
- 📞 **联系我们**: [联系我们](https://crazy-cattle.net/contact)
- ℹ️ **关于我们**: [关于我们](https://crazy-cattle.net/about)
- 🔒 **隐私政策**: [隐私政策](https://crazy-cattle.net/privacy-policy)
- 📋 **服务条款**: [服务条款](https://crazy-cattle.net/terms-of-service)

### 外部链接 (Footer Quick Links)
- 🐍 **Snake Game**: [在线贪吃蛇游戏](https://snake-game.online)
- 📝 **Evernote**: [Evernote 笔记](https://lite.evernote.com/note/a7633e02-bcf7-d080-171a-a858eec4a9d2)
- 📅 **CAL**: [Vincent AI 日历预约](https://cal.com/vincent-ai)
- 💰 **Patreon**: [Patreon 支持页面](https://www.patreon.com/posts/crazy-cattle-3d-129397709)
- 📌 **Pinterest**: [Pinterest 图片分享](https://www.pinterest.com/pin/581245895696208484/)
- 🔗 **Linktr**: [Linktr 链接树](https://linktr.ee/vincent20250520)
- 📰 **Substack**: [Substack 博客](https://substack.com/@vincent879601/posts)
- 🎨 **Creem**: [Creem 创作平台](https://www.creem.io/bip/vincent-ai)
- 💻 **CrazyCattle3d Github**: [项目英文文档](https://github.com/WeiWenxing/crazycattle3d/blob/main/README_EN.md)

## AI 爬虫优化

本项目针对 AI 爬虫进行了特殊优化：

1. **专用内容文件**: 提供了 `llms.txt` 和 `llms-full.txt` 文件，包含结构化的游戏信息
2. **robots.txt 配置**: 引导 AI 爬虫访问专用文件，限制对网站其他部分的访问
3. **支持的AI爬虫**: GPTBot, ChatGPT-User, Claude-Web, PerplexityBot, DeepseekBot 等

详细配置可查看 `next-sitemap.config.js`。

## OG 图片生成

社交媒体预览图片生成指南可参考 `OG_IMAGE_README.md`。

## 部署

项目配置为通过 Vercel 自动部署。推送到主分支的更改将自动部署到生产环境。

### Vercel 环境变量配置

在 Vercel 控制台中配置以下环境变量：

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目
3. 进入 **Settings** → **Environment Variables**
4. 添加以下变量：

```
Name: NEXT_PUBLIC_GA_ID
Value: G-XXXXXXXXXX
Environment: Production, Preview, Development
```

**或者使用 Vercel CLI：**

```bash
# 安装 Vercel CLI
npm i -g vercel

# 设置环境变量
vercel env add NEXT_PUBLIC_GA_ID
# 输入值: G-XXXXXXXXXX
# 选择环境: Production, Preview, Development
```

### 自动部署

- **生产环境**: 推送到 `main` 分支自动部署
- **预览环境**: 创建 Pull Request 自动生成预览链接
- **开发环境**: 使用 `vercel dev` 本地开发

## 许可证

© 2025 Crazy Cattle 3D. 保留所有权利。