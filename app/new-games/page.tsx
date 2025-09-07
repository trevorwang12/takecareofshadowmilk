import type { Metadata } from 'next'
import NewGamesClient from './NewGamesClient'
import { promises as fs } from 'fs'
import path from 'path'
import { SITE_CONSTANTS } from '@/lib/constants'

async function loadSEOSettings() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'seo-settings.json')
    const fileContent = await fs.readFile(filePath, 'utf8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('Failed to load SEO settings:', error)
    return {
      seoSettings: {
        siteName: SITE_CONSTANTS.DEFAULT_SITE_NAME,
        siteUrl: 'https://worldguessr.pro',
        author: 'Gaming Platform',
        ogImage: '/og-image.png',
        twitterHandle: '@worldguessr'
      }
    }
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await loadSEOSettings()
  const { seoSettings } = seoData
  
  const title = `New Games - ${seoSettings?.siteName || SITE_CONSTANTS.DEFAULT_SITE_NAME}`
  const description = 'Discover the latest and newest games! Play fresh games added to our collection.'
  const pageUrl = `${(seoSettings?.siteUrl || 'https://worldguessr.pro').replace(/\/$/, '')}/new-games`
  
  return {
    title,
    description,
    keywords: ['new games', 'latest games', 'fresh games', 'online games', 'browser games'],
    authors: [{ name: seoSettings?.author || 'Gaming Platform' }],
    robots: 'index, follow',
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: seoSettings?.siteName || SITE_CONSTANTS.DEFAULT_SITE_NAME,
      images: [{
        url: seoSettings?.ogImage || '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'New Games - Latest Online Games',
      }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [seoSettings?.ogImage || '/og-image.png'],
      site: seoSettings?.twitterHandle || '@worldguessr',
    },
    alternates: {
      canonical: pageUrl,
    },
  }
}

export default function NewGamesPage() {
  return <NewGamesClient />
}