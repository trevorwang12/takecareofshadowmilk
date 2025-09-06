import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// GET /api/sitemapindex - 返回sitemapindex.xml的内容
export async function GET(request: NextRequest) {
  try {
    const { sitemapManager } = await import('@/lib/sitemap-manager')
    const settings = await sitemapManager.getSettings()
    
    // 检查是否启用了sitemapindex生成
    if (!settings.generateSitemapIndex) {
      // 如果没有启用，重定向到sitemap.xml
      return NextResponse.redirect(new URL('/sitemap.xml', request.url))
    }
    
    const sitemapIndexPath = path.join(process.cwd(), 'public', 'sitemapindex.xml')
    
    let sitemapIndexContent: string
    
    // 尝试读取现有的sitemapindex.xml
    try {
      sitemapIndexContent = await fs.readFile(sitemapIndexPath, 'utf8')
    } catch (error) {
      // 如果文件不存在，生成一个新的
      const now = new Date().toISOString()
      sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${settings.baseUrl}/sitemap-0.xml</loc>
    <lastmod>${now.split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`

      // 保存生成的sitemapindex.xml
      await fs.writeFile(sitemapIndexPath, sitemapIndexContent, 'utf8')
    }
    
    return new NextResponse(sitemapIndexContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' // 1小时缓存
      }
    })
    
  } catch (error) {
    console.error('Error serving sitemapindex:', error)
    
    // 返回基本的sitemapindex
    const errorSitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://takecareofshadowmilk.cc/sitemap-0.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`

    return new NextResponse(errorSitemapIndex, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-cache'
      }
    })
  }
}