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
      // Wait for DOM to be ready
      setTimeout(() => {
        const scripts = containerRef.current?.querySelectorAll('script') || []
        
        scripts.forEach((script, index) => {
          setTimeout(() => {
            const newScript = document.createElement('script')
            
            if (script.src) {
              newScript.src = script.src
              newScript.async = script.async
              newScript.defer = script.defer
              
              // Copy all attributes
              for (let i = 0; i < script.attributes.length; i++) {
                const attr = script.attributes[i]
                newScript.setAttribute(attr.name, attr.value)
              }
              
              // Add load listener for debugging
              newScript.onload = () => {
                console.log(`Ad script loaded for ${position}:`, script.src)
                setDebugInfo(prev => prev + ` | Script${index + 1}: ✅`)
              }
              
              newScript.onerror = () => {
                console.error(`Ad script failed for ${position}:`, script.src)
                setDebugInfo(prev => prev + ` | Script${index + 1}: ❌`)
              }
            } else {
              newScript.textContent = script.textContent
              console.log(`Inline script executed for ${position}`)
            }
            
            // Add to document body instead of head for better compatibility
            document.body.appendChild(newScript)
            
            // Don't remove scripts immediately - let them run
          }, index * 100) // Stagger script execution
        })
        
        setDebugInfo(prev => prev + ` | Scripts: ${scripts.length} queued`)
        
        // Check for ad containers after a delay
        setTimeout(() => {
          const containers = containerRef.current?.querySelectorAll('[id^="container-"]')
          if (containers && containers.length > 0) {
            setDebugInfo(prev => prev + ` | Containers: ${containers.length}`)
            
            // Check if any containers have content
            let hasContent = false
            containers.forEach(container => {
              if (container.children.length > 0 || container.innerHTML.trim()) {
                hasContent = true
              }
            })
            setDebugInfo(prev => prev + (hasContent ? ' | Content: ✅' : ' | Content: ⏳'))
          }
        }, 2000)
        
      }, 100)
    }
  }, [htmlContent, position])
  
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
      
      {/* Test ad to verify mechanism works */}
      {position === 'header' && (
        <div style={{
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '8px',
          margin: '10px 0'
        }}>
          🧪 TEST AD - If you see this, the ad mechanism works!
        </div>
      )}
      
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