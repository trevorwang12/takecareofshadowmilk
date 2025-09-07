'use client'

import { useEffect, useState } from 'react'
import { SITE_CONSTANTS } from '@/lib/constants'

interface SEOHeadProps {
  pageType?: 'home' | 'game' | 'category'
  gameData?: any
  categoryData?: any
}

export default function SEOHead({ pageType = 'home', gameData, categoryData }: SEOHeadProps) {
  const [seoSettings, setSeoSettings] = useState<any>(null)

  useEffect(() => {
    // 只在客户端执行
    if (typeof window === 'undefined') return


    const loadSEOSettings = async () => {
      try {
        // 从API获取SEO设置
        const response = await fetch('/api/seo')
        if (response.ok) {
          const data = await response.json()
          setSeoSettings(data.seoSettings || null)
        } else {
          // 使用默认设置
          setSeoSettings({
            siteName: SITE_CONSTANTS.DEFAULT_SITE_NAME,
            siteDescription: SITE_CONSTANTS.DEFAULT_SITE_DESCRIPTION,
            keywords: ['online games', 'browser games', 'free games'],
            author: 'Gaming Platform',
            ogTitle: SITE_CONSTANTS.DEFAULT_OG_TITLE,
            ogDescription: SITE_CONSTANTS.DEFAULT_OG_DESCRIPTION,
            metaTags: {
              themeColor: '#475569'
            }
          })
        }
      } catch (error) {
        console.log('SEO settings load error:', error)
        // 使用默认设置
        setSeoSettings({
          siteName: SITE_CONSTANTS.DEFAULT_SITE_NAME,
          siteDescription: SITE_CONSTANTS.DEFAULT_SITE_DESCRIPTION,
          keywords: ['online games', 'browser games', 'free games'],
          author: 'Gaming Platform',
          ogTitle: SITE_CONSTANTS.DEFAULT_OG_TITLE,
          ogDescription: SITE_CONSTANTS.DEFAULT_OG_DESCRIPTION,
          metaTags: {
            themeColor: '#475569'
          }
        })
      }
    }

    loadSEOSettings()

    // 监听SEO设置变化
    const handleSEOUpdate = async () => {
      await loadSEOSettings()
    }

    // 监听自定义事件
    window.addEventListener('seoSettingsUpdated', handleSEOUpdate)

    return () => {
      window.removeEventListener('seoSettingsUpdated', handleSEOUpdate)
    }
  }, [])

  useEffect(() => {
    // 只更新 document.title，其他 meta 标签由 Next.js 处理
    if (typeof window === 'undefined' || typeof document === 'undefined' || !seoSettings) return

    try {
      let title = seoSettings.siteName || SITE_CONSTANTS.DEFAULT_SITE_NAME

      // 根据页面类型调整标题
      if (pageType === 'game' && gameData) {
        title = `${gameData.name} - Play Free Online | ${seoSettings.siteName}`
      } else if (pageType === 'category' && categoryData) {
        title = `${categoryData.name} Games - Free Online | ${seoSettings.siteName}`
      }

      // 只更新标题，不操作 meta 标签
      document.title = title
    } catch (error) {
      console.log('SEO update error:', error)
    }
  }, [seoSettings, pageType, gameData, categoryData])


  return null
}