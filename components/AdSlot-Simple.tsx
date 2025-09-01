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
            let adContent = filteredAds[0].htmlContent
            
            // Fix duplicate container ID issues by making them unique
            const uniqueId = `${filteredAds[0].id}-${position}-${Date.now()}`
            adContent = adContent.replace(/container-[a-f0-9]+/g, `container-${uniqueId}`)
            
            setHtmlContent(adContent)
          }
        }
      } catch (error) {
        console.error(`AdSlot-${position} load error:`, error)
      }
    }
    
    loadAds()
  }, [position])
  
  // Execute scripts after content is rendered
  useEffect(() => {
    if (htmlContent) {
      // Wait for DOM to be ready then execute scripts
      setTimeout(() => {
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = htmlContent
        const scripts = tempDiv.querySelectorAll('script')
        
        scripts.forEach((script) => {
          const newScript = document.createElement('script')
          
          // Copy all attributes
          for (let i = 0; i < script.attributes.length; i++) {
            const attr = script.attributes[i]
            newScript.setAttribute(attr.name, attr.value)
          }
          
          if (script.src) {
            newScript.src = script.src
          } else {
            newScript.textContent = script.textContent
          }
          
          // Append to head for execution
          document.head.appendChild(newScript)
        })
      }, 100)
    }
  }, [htmlContent])
  
  if (!htmlContent) {
    return null
  }
  
  return (
    <div className={`ad-slot ad-slot-${position} ${className}`}>
      <div 
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        suppressHydrationWarning={true}
      />
    </div>
  )
}