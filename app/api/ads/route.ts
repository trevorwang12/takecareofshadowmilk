import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

interface AdSlot {
  id: string
  name: string
  htmlContent: string
  isActive: boolean
  position: string
  createdAt: string
  updatedAt: string
}

function getDefaultAds(): AdSlot[] {
  return []
}

// 从文件加载广告数据
async function loadFromFile(): Promise<AdSlot[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'ads.json')
    const fileContent = await fs.readFile(filePath, 'utf8')
    const loadedData = JSON.parse(fileContent)
    return loadedData
  } catch (error) {
    console.log('Failed to load ads data from file, using default:', error)
    return getDefaultAds()
  }
}

// GET - 获取活跃广告（公共接口，无需管理员权限）
export async function GET() {
  try {
    const ads = await loadFromFile()
    // 只返回活跃的广告，并且只包含必要的字段
    const activeAds = ads
      .filter(ad => ad.isActive)
      .map(ad => ({
        id: ad.id,
        htmlContent: ad.htmlContent,
        position: ad.position,
        createdAt: ad.createdAt,
        updatedAt: ad.updatedAt
      }))
    
    return NextResponse.json(activeAds)
  } catch (error) {
    console.error('GET ads error:', error)
    return NextResponse.json([], { status: 200 }) // 返回空数组而不是错误，避免影响页面加载
  }
}