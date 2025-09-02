"use client"

import { useEffect, useState, useRef } from 'react'

interface AdSlotProps {
  position: 'header' | 'footer' | 'sidebar' | 'hero-bottom' | 'content-top' | 'game-details-bottom' | 'content-bottom' | 'recommendations-top' | 'adsense-auto' | 'adsense-display' | 'adsense-in-article' | 'adsense-in-feed' | 'adsense-verification'
  className?: string
}

export default function ImprovedAdSlot({ position, className = '' }: AdSlotProps) {
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [isAdBlocked, setIsAdBlocked] = useState<boolean>(false)
  const [debugInfo, setDebugInfo] = useState<string>('')
  const hasLoaded = useRef(false)
  const adContainerRef = useRef<HTMLDivElement>(null)
  
  // Debug mode - 可以通过环境变量控制
  const DEBUG_ADS = process.env.NODE_ENV === 'development'
  
  useEffect(() => {
    // Only load once
    if (hasLoaded.current) {
      return
    }
    
    hasLoaded.current = true
    
    const loadAds = async () => {
      try {
        setDebugInfo(`Loading ads for position: ${position}`)
        
        const response = await fetch('/api/ads')
        if (response.ok) {
          const data = await response.json()
          const activeAds = data.filter((ad: any) => ad.position === position && ad.isActive)
          
          setDebugInfo(`Found ${activeAds.length} active ads for ${position}`)
          
          if (activeAds.length > 0) {
            const ad = activeAds[0]
            let adContent = ad.htmlContent
            
            // 生成唯一的容器ID以避免冲突
            const uniqueId = `ad-${ad.id}-${position}-${Date.now()}`
            
            // 替换所有可能的容器ID模式
            adContent = adContent.replace(/container-[a-f0-9]+/g, `container-${uniqueId}`)
            adContent = adContent.replace(/id="[^"]*container[^"]*"/g, `id="container-${uniqueId}"`)
            
            setHtmlContent(adContent)
            setDebugInfo(prev => prev + ` | Content loaded: ${adContent.length} chars`)
          } else {
            setDebugInfo(`No active ads found for position: ${position}`)
          }
        } else {
          setDebugInfo(`Failed to load ads: ${response.status}`)
        }
      } catch (error) {
        console.error(`AdSlot-${position} load error:`, error)
        setDebugInfo(`Error loading ads: ${error}`)
      }
    }
    
    loadAds()
  }, [position])
  
  // 改进的脚本执行逻辑
  useEffect(() => {
    if (htmlContent && adContainerRef.current) {
      const executeScripts = () => {
        try {
          const tempDiv = document.createElement('div')
          tempDiv.innerHTML = htmlContent
          const scripts = tempDiv.querySelectorAll('script')
          
          setDebugInfo(prev => prev + ` | Found ${scripts.length} scripts`)
          
          scripts.forEach((script, index) => {
            const newScript = document.createElement('script')
            
            // Copy all attributes
            for (let i = 0; i < script.attributes.length; i++) {
              const attr = script.attributes[i]
              newScript.setAttribute(attr.name, attr.value)
            }
            
            if (script.src) {
              newScript.src = script.src
              newScript.onload = () => {
                setDebugInfo(prev => prev + ` | Script ${index} loaded`)
              }
              newScript.onerror = () => {
                setIsAdBlocked(true)
                setDebugInfo(prev => prev + ` | Script ${index} blocked/failed`)
              }
            } else {
              newScript.textContent = script.textContent
            }
            
            // 添加到head或当前容器
            if (script.src) {
              document.head.appendChild(newScript)
            } else {
              adContainerRef.current?.appendChild(newScript)
            }
          })
          
          // 检测广告拦截器
          setTimeout(() => {
            checkAdBlocker()
          }, 2000)
          
        } catch (error) {
          console.error('Script execution error:', error)
          setDebugInfo(prev => prev + ` | Script error: ${error}`)
        }
      }
      
      // 延迟执行确保DOM就绪
      setTimeout(executeScripts, 200)
    }
  }, [htmlContent])
  
  // 广告拦截器检测
  const checkAdBlocker = () => {
    const testAd = document.createElement('div')
    testAd.innerHTML = '&nbsp;'
    testAd.className = 'adsbox'
    testAd.style.cssText = 'position:absolute;left:-999px;top:-999px;'
    document.body.appendChild(testAd)
    
    setTimeout(() => {
      if (testAd.offsetHeight === 0) {
        setIsAdBlocked(true)
        setDebugInfo(prev => prev + ' | Ad blocker detected')
      }
      document.body.removeChild(testAd)
    }, 100)
  }
  
  if (!htmlContent) {
    return DEBUG_ADS ? (
      <div className={`ad-slot ad-slot-${position} ${className} border-2 border-dashed border-gray-300 p-4`}>
        <div className="text-xs text-gray-500">
          AdSlot [{position}]: No content
          <br />Debug: {debugInfo}
        </div>
      </div>
    ) : null
  }
  
  return (
    <div className={`ad-slot ad-slot-${position} ${className}`} ref={adContainerRef}>
      {DEBUG_ADS && (
        <div className="text-xs text-gray-400 mb-2 p-2 bg-gray-100 rounded">
          <strong>AdSlot Debug [{position}]:</strong>
          <br />Status: {isAdBlocked ? '❌ Blocked' : '✅ Active'}
          <br />Debug: {debugInfo}
        </div>
      )}
      
      {isAdBlocked && (
        <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded">
          <div className="text-sm text-gray-600">
            💡 广告被拦截器屏蔽
            <br />
            <small className="text-xs">请考虑将本站添加到白名单</small>
          </div>
        </div>
      )}
      
      <div 
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        suppressHydrationWarning={true}
      />
    </div>
  )
}