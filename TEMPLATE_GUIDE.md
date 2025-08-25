# 基于此模板创建新网站指南

本文档详细说明如何基于 Crazy Cattle 3D 网站模板创建全新的游戏网站。

## 1. 基础配置修改

### 站点配置

修改 `config/site.ts` 文件中的基本信息：

```typescript
export const siteConfig = {
  name: "你的游戏名称",
  description: "你的游戏描述",
  domain: "你的域名.com",
  url: "https://你的域名.com",
  email: "support@你的域名.com",
  author: "你的游戏名称",
  social: {
    twitter: "你的Twitter账号",
    facebook: "你的Facebook账号",
  },
  metadata: {
    keywords: ["关键词1", "关键词2", "关键词3"],
    themeColor: "#你的主题颜色",
    manifestPath: "/assets/img/site.webmanifest",
  },
  images: {
    icon: {
      favicon: "/assets/img/favicon.ico",
      favicon16: "/assets/img/favicon-16x16.png",
      favicon32: "/assets/img/favicon-32x32.png",
      apple: "/assets/img/apple-touch-icon.png",
    },
    og: "/assets/img/你的游戏-og-image.png",
  },
};
```

### 内容配置

修改 `config/content.ts` 文件中的内容配置：

```typescript
export const content = {
  header: {
    title: "你的游戏名称",
    search: {
      placeholder: "搜索游戏...",
      // 其他搜索配置
    },
    navigation: {
      links: [
        // 自定义导航链接
        { text: "游戏", href: "#game-section" },
        { text: "特性", href: "#features" },
        // 添加更多链接
      ]
    }
  },
  // 修改其他内容部分
  whatIs: {
    title: "关于你的游戏",
    description: "详细描述你的游戏...",
    // 其他配置
  },
  // 继续修改其他部分
};
```

### 布局配置

修改 `config/layout.ts` 文件中的布局配置：

```typescript
export const layout = {
  header: {
    // 修改头部布局配置
    logo: {
      src: "/assets/img/你的logo.png",
      size: "w-12 h-12",
    }
  },
  // 修改其他布局配置
};
```

## 2. 游戏配置

### 创建游戏配置文件

在 `app/games` 目录下创建新游戏的配置文件，例如 `your-game-config.ts`：

```typescript
export const yourGameConfig = {
  metadata: {
    title: "你的游戏名称",
    description: "你的游戏描述",
    url: "/games/your-game",
  },
  content: {
    // 游戏区域配置
    gameSection: {
      title: "你的游戏名称",
      game: {
        url: '/your-game.embed',
        title: "你的游戏名称",
        externalUrl: '/game/your-game/index.html'
      }
    },
    
    // 特性区域配置
    features: {
      title: "游戏特性",
      items: [
        {
          title: "特性1",
          description: "特性1的详细描述",
          icon: "icon-name",
        },
        // 添加更多特性
      ],
    },
    
    // 其他配置部分
  },
};
```

### 更新游戏数据索引

在 `app/games/game-data.ts` 文件中导入并添加新游戏配置：

```typescript
import { yourGameConfig } from './your-game-config';

export const allGames = [
  {
    id: "your-game",
    title: yourGameConfig.metadata.title,
    description: yourGameConfig.metadata.description,
    url: yourGameConfig.metadata.url,
    image: "/assets/games/your-game/thumbnail.jpg",
  },
  // 其他游戏
];
```

### 创建游戏页面

在 `app/games/your-game` 目录下创建 `page.tsx` 文件：

```typescript
import { GamePageTemplate } from "@/components/templates/GamePageTemplate";
import { yourGameConfig } from "@/app/games/your-game-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: yourGameConfig.metadata.title,
  description: yourGameConfig.metadata.description,
  // 其他元数据
};

export default function YourGamePage() {
  return <GamePageTemplate gameConfig={yourGameConfig} />;
}
```

## 3. 游戏资源准备

### 准备游戏文件

1. 创建 `public/game/your-game/index.html` 文件：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <base href="/game/your-game/">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
    <title>你的游戏名称</title>
    <meta name="robots" content="noindex">
    <style>
        html, body {
            margin: 0;
            padding: 0;
            border: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        
        iframe {
            width: 100%;
            height: 100%;
            border: none;
            display: block;
        }
    </style>
</head>
<body>
    <iframe 
        id="game-frame" 
        src="https://你的游戏URL/"
        allowfullscreen="true"
        allow="autoplay; fullscreen; gamepad; keyboard-map; xr-spatial-tracking"
        title="你的游戏名称">
    </iframe>
</body>
</html>
```

### 添加 Next.js 重写规则

在 `next.config.js` 文件中添加重写规则：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 其他配置...
  async rewrites() {
    return [
      // 现有重写规则...
      {
        source: '/your-game.embed',
        destination: '/game/your-game/index.html',
      },
    ]
  }
};
```

### 准备图片资源

在 `public/assets/games/your-game/` 目录下放置以下图片：
- `thumbnail.jpg` - 游戏缩略图 (建议尺寸: 300x200px)
- `og-image.jpg` - 社交分享图片 (建议尺寸: 1200x630px)
- `intro.jpg` - 游戏介绍图片 (建议尺寸: 600x400px)
- `gameplay.jpg` - 游戏玩法图片 (建议尺寸: 600x400px)

## 4. AI 爬虫优化

### 更新 AI 爬虫文件

修改 `public/llms.txt` 和 `public/llms-full.txt` 文件，添加新游戏的信息。

### 更新 Sitemap 配置

如需修改 sitemap 配置，更新 `next-sitemap.config.js` 文件。

## 5. 网站清单和图标

### 更新网站清单

修改 `public/assets/img/site.webmanifest` 文件：

```json
{
  "name": "你的游戏名称",
  "short_name": "简称",
  "icons": [
    {
      "src": "/assets/img/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/img/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": "https://你的域名.com",
  "theme_color": "#你的主题颜色",
  "background_color": "#你的背景颜色",
  "display": "standalone"
}
```

### 准备网站图标

替换 `public/assets/img/` 目录下的以下图标：
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

## 6. 社交媒体预览图片

使用 `OG_IMAGE_README.md` 中的指南生成社交媒体预览图片，并将其放置在 `public/assets/img/` 目录下。

## 7. 自定义组件（可选）

如果需要更深度的自定义，可以修改以下组件：

- `components/game-section/GameSection.tsx` - 游戏展示区
- `components/features/Features.tsx` - 特性展示
- `components/what-is/WhatIs.tsx` - 游戏介绍
- `components/how-to-play/HowToPlay.tsx` - 游戏玩法
- `components/faq/FAQ.tsx` - 常见问题
- `components/layout/Header.tsx` - 页面头部
- `components/layout/Footer.tsx` - 页面底部

## 注意事项

- 确保所有图片资源都经过压缩，以提高页面加载速度
- 测试网站在不同设备上的响应式显示效果
- 确保所有链接和路径都正确配置
- 检查 SEO 元数据是否正确设置