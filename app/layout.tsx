import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import HydrationErrorBoundary from '@/components/HydrationErrorBoundary'
import HydrationFix from '@/components/HydrationFix'
import SafePreloadManager from '@/components/optimization/SafePreloadManager'
import { seoManager } from '@/lib/seo-manager'
import './globals.css'

// 动态生成metadata
export async function generateMetadata(): Promise<Metadata> {
  // 尝试从SEO API获取设置，fallback到默认值
  let seoSettings = {
    siteName: 'GAMES',
    siteDescription: 'Best Online Gaming Platform - Play hundreds of free browser games',
    siteUrl: 'https://yourgamesite.com',
    siteLogo: '/placeholder-logo.png',
    favicon: '/favicon.ico',
    keywords: ['online games', 'browser games', 'free games'],
    author: 'Gaming Platform',
    twitterHandle: '@yourgames',
    ogImage: '/og-image.png',
    ogTitle: 'GAMES - Best Free Online Games',
    ogDescription: 'Play the best free online games. No download required!',
    metaTags: {
      viewport: 'width=device-width, initial-scale=1.0',
      themeColor: '#475569'
    }
  }

  try {
    // 在服务端直接从文件系统读取SEO设置
    const fs = require('fs').promises
    const path = require('path')
    const seoFilePath = path.join(process.cwd(), 'data', 'seo-settings.json')
    
    try {
      const fileContent = await fs.readFile(seoFilePath, 'utf8')
      const data = JSON.parse(fileContent)
      if (data.seoSettings) {
        seoSettings = { ...seoSettings, ...data.seoSettings }
      }
    } catch (fileError) {
      // 文件不存在或解析失败，使用默认设置
      console.log('Using default SEO settings')
    }
  } catch (error) {
    console.error('Failed to load SEO settings:', error)
    // 使用默认设置
  }

  return {
    title: seoSettings.siteName,
    description: seoSettings.siteDescription,
    keywords: seoSettings.keywords,
    authors: [{ name: seoSettings.author }],
    generator: 'Next.js',
    metadataBase: new URL(seoSettings.siteUrl),
    alternates: {
      canonical: seoSettings.canonicalUrl || seoSettings.siteUrl,
    },
    openGraph: {
      title: seoSettings.ogTitle || seoSettings.siteName,
      description: seoSettings.ogDescription || seoSettings.siteDescription,
      url: seoSettings.siteUrl,
      siteName: seoSettings.siteName,
      images: [{
        url: seoSettings.ogImage,
        width: 1200,
        height: 630,
        alt: seoSettings.siteName,
      }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoSettings.ogTitle || seoSettings.siteName,
      description: seoSettings.ogDescription || seoSettings.siteDescription,
      site: seoSettings.twitterHandle,
      images: [seoSettings.ogImage],
    },
    icons: {
      icon: seoSettings.favicon,
      apple: seoSettings.siteLogo,
    },
    other: {
      'theme-color': seoSettings.metaTags.themeColor,
      'apple-mobile-web-app-title': seoSettings.metaTags.appleMobileWebAppTitle,
      'mobile-web-app-capable': seoSettings.metaTags.appleMobileWebAppCapable || 'yes',
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body 
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
        suppressHydrationWarning={true}
      >
        <div id="__next" suppressHydrationWarning={true}>
          <HydrationErrorBoundary>
            <HydrationFix />
            <SafePreloadManager />
            {children}
          </HydrationErrorBoundary>
        </div>
      </body>
    </html>
  )
}
