"use client"

import { useEffect, useState, useRef } from 'react'

interface AdSlotProps {
  position: 'header' | 'footer' | 'sidebar' | 'hero-bottom' | 'content-top' | 'game-details-bottom' | 'content-bottom' | 'recommendations-top'
  className?: string
}

export default function AdSlotSimple({ position, className = '' }: AdSlotProps) {
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [debugInfo, setDebugInfo] = useState<string>('Loading...')
  const hasLoaded = useRef(false)
  
  useEffect(() => {
    // Only load once
    if (hasLoaded.current) {
      return
    }
    
    hasLoaded.current = true
    
    const loadAds = async () => {
      try {
        setDebugInfo('Fetching ads...')
        const response = await fetch('/api/ads')
        if (response.ok) {
          const data = await response.json()
          setDebugInfo(`API returned ${data.length} ads`)
          const filteredAds = data.filter((ad: any) => ad.position === position)
          setDebugInfo(`Found ${filteredAds.length} ads for position ${position}`)
          if (filteredAds.length > 0) {
            setHtmlContent(filteredAds[0].htmlContent)
            setDebugInfo(`Ad loaded: ${filteredAds[0].id}`)
          } else {
            setDebugInfo(`No ads for position: ${position}`)
          }
        } else {
          setDebugInfo(`API error: ${response.status}`)
        }
      } catch (error) {
        console.error(`AdSlot-${position} load error:`, error)
        setDebugInfo(`Error: ${error}`)
      }
    }
    
    loadAds()
  }, [position])
  
  return (
    <div className={`ad-slot ad-slot-${position} ${className}`}>
      {/* Temporary debug info */}
      <div style={{
        background: '#f0f0f0',
        border: '1px solid #ccc',
        padding: '10px',
        margin: '5px 0',
        fontSize: '12px',
        color: '#333'
      }}>
        🔍 AdSlot-{position}: {debugInfo}
        {htmlContent && <div>✅ Content loaded ({htmlContent.length} chars)</div>}
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