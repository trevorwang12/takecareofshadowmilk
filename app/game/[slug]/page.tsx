import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GamePageClient from './GamePageClient'
import gamesData from '@/data/games.json'
import { promises as fs } from 'fs'
import path from 'path'
import { SITE_CONSTANTS } from '@/lib/constants'

interface PageProps {
  params: { slug: string }
}

interface GameData {
  id: string
  name: string
  description: string
  thumbnailUrl: string
  category: string
  tags: string[]
  rating: number
  playCount: number
  viewCount: number
  developer?: string
  releaseDate: string
  addedDate: string
  isActive: boolean
  isFeatured: boolean
  gameType: string
  gameUrl?: string
}

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
      },
      gamePageSEO: {
        titleTemplate: '{gameName} - Play Free Online | {siteName}',
        descriptionTemplate: 'Play {gameName} for free online! {gameDescription} No download required - start playing now!',
        keywordsTemplate: '{gameName}, {category}, free game, online game, browser game'
      }
    }
  }
}

function getGameById(gameId: string): GameData | null {
  const games = gamesData as GameData[]
  return games.find(game => game.id === gameId && game.isActive) || null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // 直接从静态数据获取游戏
  const game = getGameById(params.slug)
  
  if (!game) {
    return {
      title: `Game Not Found - ${SITE_CONSTANTS.DEFAULT_SITE_NAME}`,
      description: 'Sorry, the game you are looking for could not be found.',
    }
  }
  
  // 获取SEO配置
  const seoData = await loadSEOSettings()
  const { seoSettings, gamePageSEO } = seoData
  
  // 生成动态标题
  const title = gamePageSEO?.titleTemplate
    ?.replace('{gameName}', game.name)
    ?.replace('{siteName}', seoSettings?.siteName || SITE_CONSTANTS.DEFAULT_SITE_NAME) || `${game.name} - Play Free Online | ${SITE_CONSTANTS.DEFAULT_SITE_NAME}`
    
  // 生成动态描述
  const description = gamePageSEO?.descriptionTemplate
    ?.replace('{gameName}', game.name)
    ?.replace('{gameDescription}', game.description || '') || `Play ${game.name} for free online! No download required.`
    
  // 生成动态关键词
  const keywords = gamePageSEO?.keywordsTemplate
    ?.replace('{gameName}', game.name)
    ?.replace('{category}', game.category || 'game') || `${game.name}, free game, online game`
  
  const gameUrl = `${(seoSettings?.siteUrl || 'https://worldguessr.pro').replace(/\/$/, '')}/game/${params.slug}`
  
  // 生成结构化数据
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": game.name,
    "description": game.description || description,
    "url": gameUrl,
    "image": game.thumbnailUrl || '/placeholder-game.png',
    "genre": game.category,
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "publisher": {
      "@type": "Organization",
      "name": seoSettings?.siteName || SITE_CONSTANTS.DEFAULT_SITE_NAME
    }
  }
  
  return {
    title,
    description,
    keywords: keywords.split(', '),
    authors: [{ name: seoSettings?.author || 'Gaming Platform' }],
    robots: 'index, follow',
    openGraph: {
      title,
      description,
      url: gameUrl,
      siteName: seoSettings?.siteName || SITE_CONSTANTS.DEFAULT_SITE_NAME,
      images: [{
        url: game.thumbnailUrl || seoSettings?.ogImage || '/placeholder-game.png',
        width: 1200,
        height: 630,
        alt: `${game.name} - Play Online Free`,
      }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [game.thumbnailUrl || seoSettings?.ogImage || '/placeholder-game.png'],
      site: seoSettings?.twitterHandle || '@worldguessr',
    },
    alternates: {
      canonical: gameUrl,
    },
    other: {
      'application-ld+json': JSON.stringify(jsonLd)
    }
  }
}

export default async function GamePage({ params }: PageProps) {
  // 直接从静态数据获取游戏
  const game = getGameById(params.slug)
  
  if (!game) {
    notFound()
  }

  return (
    <>
      {/* 服务端渲染的SEO标签，对搜索引擎可见 */}
      <div style={{ display: 'none' }}>
        <h1>{game.name}</h1>
        <h2>About This Game</h2>
        <h2>Game Features</h2>
      </div>
      <GamePageClient params={params} />
    </>
  )
}