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
  const containerRef = useRef<HTMLDivElement>(null)
  
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
            let adContent = filteredAds[0].htmlContent
            
            // Fix duplicate container ID issues by making them unique
            const uniqueId = `${filteredAds[0].id}-${position}-${Date.now()}`
            adContent = adContent.replace(/container-[a-f0-9]+/g, `container-${uniqueId}`)
            
            setHtmlContent(adContent)
            setDebugInfo(`Ad loaded: ${filteredAds[0].id} (fixed IDs)`)
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
  
  // Execute scripts after content is set
  useEffect(() => {
    if (htmlContent && containerRef.current) {
      const scripts = containerRef.current.querySelectorAll('script')
      scripts.forEach((script) => {
        const newScript = document.createElement('script')
        if (script.src) {
          newScript.src = script.src
          newScript.async = script.async
          newScript.defer = script.defer
          if (script.getAttribute('data-cfasync')) {
            newScript.setAttribute('data-cfasync', script.getAttribute('data-cfasync')!)
          }
        } else {
          newScript.textContent = script.textContent
        }
        
        // Add to document head to ensure execution
        document.head.appendChild(newScript)
        
        // Clean up
        setTimeout(() => {
          if (newScript.parentNode) {
            newScript.parentNode.removeChild(newScript)
          }
        }, 5000)
      })
      
      setDebugInfo(prev => prev + ` | Scripts: ${scripts.length}`)
    }
  }, [htmlContent])
  
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
          ref={containerRef}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          suppressHydrationWarning={true}
        />
      )}
    </div>
  )
}