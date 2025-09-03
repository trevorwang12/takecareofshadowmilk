"use client"

import { useState, useEffect } from 'react'

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
    
    // 如果没有提供template，从配置获取
    if (!text && headingStructure) {
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
          text = data.siteName || 'GAMES'
      }
    }
    
    // 替换占位符
    if (text) {
      text = text.replace('{siteName}', data.siteName || 'GAMES')
      text = text.replace('{gameName}', data.gameName || 'Game')
      text = text.replace('{categoryName}', data.categoryName || 'Category')
    }
    
    setHeadingText(text || data.siteName || 'GAMES')
  }
  
  // 如果没有内容，不渲染
  if (!headingText) return null
  
  return (
    <h1 className={`sr-only ${className}`}>
      {headingText}
    </h1>
  )
}