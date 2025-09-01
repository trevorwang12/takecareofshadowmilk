import { NextRequest, NextResponse } from 'next/server'
import { createAdminResponse, logAdminAccess } from '@/lib/admin-security'

// 导入默认数据作为备份内容（因为内存数据重启后会丢失）
import defaultGames from '@/data/games.json'
import defaultCategories from '@/data/categories.json'
import defaultSEO from '@/data/seo-settings.json'
import defaultHomepage from '@/data/homepage-content.json'
import defaultAds from '@/data/ads.json'
import defaultRecommendations from '@/data/recommended-games.json'
import defaultFeaturedGames from '@/data/featured-games.json'
import defaultFooter from '@/data/footer.json'
import defaultFriendlyLinks from '@/data/friendly-links.json'

export async function GET(request: NextRequest) {
  const adminCheck = createAdminResponse()
  if (adminCheck) {
    logAdminAccess('/api/admin/backup', false)
    return NextResponse.json(adminCheck, { status: adminCheck.status })
  }

  logAdminAccess('/api/admin/backup', true)
  try {
    // 备份当前默认配置（内存中的数据在重启后会丢失）
    const allData = {
      games: defaultGames,
      categories: defaultCategories,
      seo: defaultSEO,
      homepage: defaultHomepage,
      ads: defaultAds,
      recommendations: defaultRecommendations,
      featuredGames: defaultFeaturedGames,
      footer: defaultFooter,
      friendlyLinks: defaultFriendlyLinks,
      backupDate: new Date().toISOString(),
      note: "This backup contains the default configuration. Memory-stored changes are lost on server restart."
    }

    // 返回可下载的JSON文件
    return new NextResponse(JSON.stringify(allData, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="site-backup-${new Date().toISOString().split('T')[0]}.json"`
      }
    })
  } catch (error) {
    console.error('Backup error:', error)
    return NextResponse.json({ error: 'Failed to create backup' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const adminCheck = createAdminResponse()
  if (adminCheck) {
    logAdminAccess('/api/admin/backup', false)
    return NextResponse.json(adminCheck, { status: adminCheck.status })
  }

  logAdminAccess('/api/admin/backup', true)
  try {
    const backupData = await request.json()
    
    // 这里我们只返回成功信息，因为真正的数据恢复需要重启服务器
    // 在实际使用中，用户需要手动将备份的数据复制到对应的JSON文件中
    
    return NextResponse.json({ 
      success: true, 
      message: '备份数据已接收。要完全恢复数据，请将备份内容复制到对应的 /data/*.json 文件中，然后重启服务器。',
      instructions: [
        '1. 将 games 数据复制到 /data/games.json',
        '2. 将 categories 数据复制到 /data/categories.json', 
        '3. 将其他数据复制到对应的 JSON 文件',
        '4. 重启开发服务器: npm run dev'
      ]
    })
  } catch (error) {
    console.error('Restore error:', error)
    return NextResponse.json({ error: 'Failed to restore backup' }, { status: 500 })
  }
}