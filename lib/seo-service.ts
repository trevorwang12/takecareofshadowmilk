// SEO数据服务 - 分离SEO逻辑
import { DataService } from './data-service'
import type { Metadata } from 'next'

export interface SeoSettings {
  siteName: string
  siteDescription: string
  siteUrl: string
  siteLogo: string
  favicon: string
  keywords: string[]
  author: string
  twitterHandle: string
  ogImage: string
  ogTitle: string
  ogDescription: string
  canonicalUrl?: string
  metaTags: {
    viewport: string
    themeColor: string
    appleMobileWebAppTitle?: string
    appleMobileWebAppCapable?: string
  }
  googleAnalyticsId?: string
  googleSearchConsoleId?: string
  yandexWebmasterToolsId?: string
  baiduWebmasterToolsId?: string
}

export class SeoService {
  static async generateMetadata(): Promise<Metadata> {
    try {
      const { seoSettings } = await DataService.getSeoSettings()
      
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
          ...(seoSettings.metaTags.appleMobileWebAppTitle && {
            'apple-mobile-web-app-title': seoSettings.metaTags.appleMobileWebAppTitle
          }),
          ...(seoSettings.metaTags.appleMobileWebAppCapable && {
            'mobile-web-app-capable': seoSettings.metaTags.appleMobileWebAppCapable
          }),
          ...(seoSettings.googleSearchConsoleId && {
            'google-site-verification': seoSettings.googleSearchConsoleId
          }),
        }
      }
    } catch (error) {
      console.error('Failed to generate metadata:', error)
      
      // 返回安全的默认metadata
      return {
        title: 'GAMES',
        description: 'Best Online Gaming Platform - Play hundreds of free browser games',
        generator: 'Next.js',
      }
    }
  }
  
  static async getAnalyticsId(): Promise<string | null> {
    try {
      const { seoSettings } = await DataService.getSeoSettings()
      
      // 只返回安全的GA ID，拒绝自定义脚本
      const gaId = seoSettings.googleAnalyticsId
      if (gaId && gaId.startsWith('G-') && gaId.length > 10) {
        return gaId
      }
      
      return null
    } catch (error) {
      console.error('Failed to get analytics ID:', error)
      return null
    }
  }
  
  static async getVerificationTags(): Promise<{
    yandex?: string
    baidu?: string
  }> {
    try {
      const { seoSettings } = await DataService.getSeoSettings()
      
      return {
        ...(seoSettings.yandexWebmasterToolsId && { yandex: seoSettings.yandexWebmasterToolsId }),
        ...(seoSettings.baiduWebmasterToolsId && { baidu: seoSettings.baiduWebmasterToolsId })
      }
    } catch (error) {
      console.error('Failed to get verification tags:', error)
      return {}
    }
  }
}