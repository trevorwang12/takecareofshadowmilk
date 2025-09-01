"use client"

import { useEffect, useState, useRef } from 'react'

interface AdSlotProps {
  position: 'header' | 'footer' | 'sidebar' | 'hero-bottom' | 'content-top' | 'game-details-bottom' | 'content-bottom' | 'recommendations-top'
  className?: string
}

export default function AdSlotSimple({ position, className = '' }: AdSlotProps) {
  const [htmlContent, setHtmlContent] = useState<string>('')
  const hasLoaded = useRef(false)
  
  console.log(`🔴 AdSlot-${position}: Simple component starting`)
  
  useEffect(() => {
    // Only load once
    if (hasLoaded.current) {
      console.log(`⏭️ AdSlot-${position}: Already loaded, skipping`)
      return
    }
    
    console.log(`🟢 AdSlot-${position}: Loading ads for first time`)
    hasLoaded.current = true
    
    const loadAds = async () => {
      try {
        const response = await fetch('/api/ads')
        if (response.ok) {
          const data = await response.json()
          const filteredAds = data.filter((ad: any) => ad.position === position)
          if (filteredAds.length > 0) {
            console.log(`✅ AdSlot-${position}: Setting HTML content`)
            setHtmlContent(filteredAds[0].htmlContent)
          }
        }
      } catch (error) {
        console.error(`❌ AdSlot-${position}: Load error:`, error)
      }
    }
    
    loadAds()
  }, [position])
  
  return (
    <div className={`ad-slot ad-slot-${position} ${className}`}>
      {/* Always visible test */}
      <div style={{
        background: '#ff0000',
        color: 'white',
        padding: '15px',
        fontSize: '14px',
        margin: '5px 0',
        border: '3px solid #00ff00'
      }}>
        🟢 SIMPLE AdSlot-{position} | Content: {htmlContent ? 'LOADED' : 'EMPTY'}
      </div>
      
      {/* Ad content */}
      {htmlContent && (
        <div 
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          suppressHydrationWarning={true}
        />
      )}
    </div>
  )
}