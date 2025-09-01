"use client"

import { useEffect, useState, useRef } from 'react'

interface AdSlotProps {
  position: 'header' | 'footer' | 'sidebar' | 'hero-bottom' | 'content-top' | 'game-details-bottom' | 'content-bottom' | 'recommendations-top'
  className?: string
}

export default function AdSlotSimple({ position, className = '' }: AdSlotProps) {
  const [htmlContent, setHtmlContent] = useState<string>('')
  const hasLoaded = useRef(false)
  
  useEffect(() => {
    // Only load once
    if (hasLoaded.current) {
      return
    }
    
    hasLoaded.current = true
    
    const loadAds = async () => {
      try {
        const response = await fetch('/api/ads')
        if (response.ok) {
          const data = await response.json()
          const filteredAds = data.filter((ad: any) => ad.position === position)
          if (filteredAds.length > 0) {
            setHtmlContent(filteredAds[0].htmlContent)
          }
        }
      } catch (error) {
        console.error(`AdSlot-${position} load error:`, error)
      }
    }
    
    loadAds()
  }, [position])
  
  return (
    <div className={`ad-slot ad-slot-${position} ${className}`}>
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