import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Cache for SEO data with 5 minute TTL
let seoCache: { data: any; timestamp: number } | null = null
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

const DEFAULT_SEO = {
  seoSettings: {
    siteName: 'GAMES',
    siteDescription: 'Best Online Gaming Platform',
    siteKeywords: 'games, online games, free games',
    siteAuthor: 'GAMES Team',
    ogImage: '/og-image.jpg',
    twitterCard: 'summary_large_image',
    favicon: '/favicon.ico'
  }
}

async function loadFromFile() {
  // Check cache first
  if (seoCache && (Date.now() - seoCache.timestamp) < CACHE_TTL) {
    return seoCache.data
  }
  
  try {
    const filePath = path.join(process.cwd(), 'data', 'seo-settings.json')
    const fileContent = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContent)
    
    // Update cache
    seoCache = { data, timestamp: Date.now() }
    return data
  } catch (error) {
    console.log('Failed to load SEO data from file, using default:', error)
    const data = DEFAULT_SEO
    
    // Cache default data too
    seoCache = { data, timestamp: Date.now() }
    return data
  }
}

export async function GET() {
  try {
    const seoData = await loadFromFile()
    
    // Add aggressive caching headers
    return NextResponse.json(seoData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
        'CDN-Cache-Control': 'public, s-maxage=300',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=300'
      }
    })
  } catch (error) {
    console.error('Error fetching SEO data:', error)
    return NextResponse.json(DEFAULT_SEO, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400'
      }
    })
  }
}