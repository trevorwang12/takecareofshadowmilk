"use client"

import { useState, useEffect } from 'react'
import { SITE_CONSTANTS } from '@/lib/constants'

interface PageH1Props {
  pageType: 'homepage' | 'gamePage' | 'categoryPage'
  template?: string
  data?: {
    siteName?: string
    gameName?: string
    categoryName?: string
  }
  className?: string
}

export default function PageH1({ pageType, template, data = {}, className = '' }: PageH1Props) {
  const [headingText, setHeadingText] = useState<string>('')
  const [headingStructure, setHeadingStructure] = useState<any>(null)
  
  useEffect(() => {
    loadHeadingStructure()
  }, [])
  
  useEffect(() => {
    if (headingStructure) {
      generateHeading()
    }
  }, [headingStructure, pageType, template, data])
  
  const loadHeadingStructure = async () => {
    try {
      // 尝试从SEO设置加载标题结构
      const response = await fetch('/api/seo')
      if (response.ok) {
        const seoData = await response.json()
        setHeadingStructure(seoData.headingStructure)
      }
    } catch (error) {
      console.error('Failed to load heading structure:', error)
    }
  }
  
  const generateHeading = () => {
    let text = template
    
    // 如果没有提供template，从配置获取或使用默认值
    if (!text) {
      if (headingStructure) {
        switch (pageType) {
          case 'homepage':
            text = headingStructure.homepage?.h1 || '{siteName} - Best Free Online Games'
            break
          case 'gamePage':
            text = headingStructure.gamePage?.h1 || '{gameName}'
            break
          case 'categoryPage':
            text = headingStructure.categoryPage?.h1 || '{categoryName} Games'
            break
          default:
            text = data.siteName || SITE_CONSTANTS.DEFAULT_SITE_NAME
        }
      } else {
        // 如果没有headingStructure配置，使用默认模板
        switch (pageType) {
          case 'homepage':
            text = '{siteName} - Best Free Online Games'
            break
          case 'gamePage':
            text = '{gameName}'
            break
          case 'categoryPage':
            text = '{categoryName} Games'
            break
          default:
            text = data.siteName || SITE_CONSTANTS.DEFAULT_SITE_NAME
        }
      }
    }
    
    // 替换占位符
    if (text) {
      text = text.replace('{siteName}', data.siteName || SITE_CONSTANTS.DEFAULT_SITE_NAME)
      text = text.replace('{gameName}', data.gameName || 'Game')
      text = text.replace('{categoryName}', data.categoryName || 'Category')
    }
    
    setHeadingText(text || data.siteName || SITE_CONSTANTS.DEFAULT_SITE_NAME)
  }
  
  // 生成fallback标题，确保总是有内容显示
  const getFallbackTitle = () => {
    switch (pageType) {
      case 'homepage':
        return `${data.siteName || SITE_CONSTANTS.DEFAULT_SITE_NAME} - Best Free Online Games`
      case 'gamePage':
        return data.gameName || 'Game'
      case 'categoryPage':
        return `${data.categoryName || 'Category'} Games`
      default:
        return data.siteName || SITE_CONSTANTS.DEFAULT_SITE_NAME
    }
  }
  
  const displayText = headingText || getFallbackTitle()
  
  return (
    <h1 className={`text-3xl font-bold text-gray-900 mb-6 ${className}`}>
      {displayText}
    </h1>
  )
}