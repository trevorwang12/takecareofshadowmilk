import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { createAdminResponse, logAdminAccess } from '@/lib/admin-security'
import { adManager } from '@/lib/ad-manager'

interface AdSlot {
  id: string
  name: string
  htmlContent: string
  isActive: boolean
  position: 'header' | 'footer' | 'sidebar' | 'hero-bottom' | 'content-top' | 'game-details-bottom' | 'content-bottom' | 'recommendations-top'
  createdAt: string
  updatedAt: string
}

function getDefaultAds(): AdSlot[] {
  return [
    {
      id: 'header-banner',
      name: 'Header Banner',
      htmlContent: '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 20px; border-radius: 8px;"><h3 style="margin: 0 0 10px 0;">🎮 Welcome to GAMES Platform!</h3><p style="margin: 0;">Discover thousands of free games - Play instantly in your browser</p></div>',
      isActive: true,
      position: 'header',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'footer-banner',
      name: 'Footer Banner',
      htmlContent: '<div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; text-align: center; padding: 20px; border-radius: 8px;"><h3 style="margin: 0 0 10px 0;">🎮 Thanks for Playing!</h3><p style="margin: 0;">Visit us again for more amazing games</p></div>',
      isActive: true,
      position: 'footer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

// 内存中的广告数据，服务重启后会恢复默认值
let adsData: AdSlot[] = getDefaultAds()

// 从文件加载最新数据
async function loadFromFile(): Promise<AdSlot[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'ads.json')
    const fileContent = await fs.readFile(filePath, 'utf8')
    const loadedData = JSON.parse(fileContent)
    console.log('Ads data loaded from file:', filePath)
    return loadedData
  } catch (error) {
    console.log('Failed to load ads data from file, using default:', error)
    return getDefaultAds()
  }
}

// 将数据保存到 JSON 文件
async function saveToFile(data: AdSlot[]) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'ads.json')
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
    console.log('Data saved to file:', filePath)
  } catch (error) {
    console.error('Failed to save data to file:', error)
    // 不抛出错误，让内存更新继续进行
  }
}


export async function GET() {
  const adminCheck = createAdminResponse()
  if (adminCheck) {
    logAdminAccess('/api/admin/ads', false)
    return NextResponse.json(adminCheck, { status: adminCheck.status })
  }
  
  try {
    logAdminAccess('/api/admin/ads', true)
    adsData = await loadFromFile()
    return NextResponse.json(adsData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const adminCheck = createAdminResponse()
  if (adminCheck) {
    logAdminAccess('/api/admin/ads', false)
    return NextResponse.json(adminCheck, { status: adminCheck.status })
  }
  
  try {
    logAdminAccess('/api/admin/ads', true)
    // Load latest data from file before making changes
    adsData = await loadFromFile()
    
    const newAd: Omit<AdSlot, 'id' | 'createdAt' | 'updatedAt'> = await request.json()
    
    // Validate HTML content for security
    const validation = adManager.validateHtmlContent(newAd.htmlContent)
    if (!validation.isValid) {
      console.log('[Admin API] Ad validation failed:', validation.message)
      return NextResponse.json({ 
        error: 'Ad content validation failed', 
        message: validation.message 
      }, { status: 400 })
    }
    
    const ad: AdSlot = {
      ...newAd,
      id: `ad_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    adsData.push(ad)
    await saveToFile(adsData)
    
    return NextResponse.json(ad, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add ad' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const adminCheck = createAdminResponse()
  if (adminCheck) {
    logAdminAccess('/api/admin/ads', false)
    return NextResponse.json(adminCheck, { status: adminCheck.status })
  }
  
  try {
    logAdminAccess('/api/admin/ads', true)
    // Load latest data from file before making changes
    adsData = await loadFromFile()
    
    const { adId, updates } = await request.json()
    
    const adIndex = adsData.findIndex(a => a.id === adId)
    if (adIndex === -1) {
      return NextResponse.json({ error: 'Ad not found' }, { status: 404 })
    }
    
    // Validate HTML content if it's being updated
    if (updates.htmlContent) {
      const validation = adManager.validateHtmlContent(updates.htmlContent)
      if (!validation.isValid) {
        console.log('[Admin API] Ad update validation failed:', validation.message)
        return NextResponse.json({ 
          error: 'Ad content validation failed', 
          message: validation.message 
        }, { status: 400 })
      }
    }
    
    adsData[adIndex] = {
      ...adsData[adIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    await saveToFile(adsData)
    
    return NextResponse.json(adsData[adIndex])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update ad' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const adminCheck = createAdminResponse()
  if (adminCheck) {
    logAdminAccess('/api/admin/ads', false)
    return NextResponse.json(adminCheck, { status: adminCheck.status })
  }
  
  try {
    logAdminAccess('/api/admin/ads', true)
    // Load latest data from file before making changes
    adsData = await loadFromFile()
    
    const { searchParams } = new URL(request.url)
    const adId = searchParams.get('id')
    
    if (!adId) {
      return NextResponse.json({ error: 'Ad ID is required' }, { status: 400 })
    }
    
    const adIndex = adsData.findIndex(a => a.id === adId)
    
    if (adIndex === -1) {
      return NextResponse.json({ error: 'Ad not found' }, { status: 404 })
    }
    
    adsData.splice(adIndex, 1)
    await saveToFile(adsData)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete ad' }, { status: 500 })
  }
}