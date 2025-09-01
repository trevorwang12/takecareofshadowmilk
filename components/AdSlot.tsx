"use client"

import { useEffect, useState } from 'react'
import { adManager, type AdSlot } from '@/lib/ad-manager'

interface AdSlotProps {
  position: 'header' | 'footer' | 'sidebar' | 'hero-bottom' | 'content-top' | 'game-details-bottom' | 'content-bottom' | 'recommendations-top'
  className?: string
}

export default function AdSlotComponent({ position, className = '' }: AdSlotProps) {
  console.log(`🔴 AdSlot-${position}: Component STARTING`)
  
  const [ads, setAds] = useState<AdSlot[]>([])
  const [loading, setLoading] = useState(true)
  
  

  console.log(`🟡 AdSlot-${position}: Setting up useEffect`)
  
  useEffect(() => {
    console.log(`🟢 AdSlot-${position}: useEffect STARTED`)
    let isCancelled = false
    
    const loadAds = async () => {
      console.log(`🔵 AdSlot-${position}: loadAds starting`)
      try {
        setLoading(true)
        // Use real ads in production, test ads only when debug is explicitly enabled
        const isTestMode = process.env.NEXT_PUBLIC_DEBUG_ADS === 'true'
        const apiEndpoint = isTestMode ? '/api/test-simple-ad' : '/api/ads'
        
        const response = await fetch(apiEndpoint)
        console.log(`🟠 AdSlot-${position}: API response ${response.status}`)
        
        if (response.ok && !isCancelled) {
          const data = await response.json()
          const filteredAds = data.filter((ad: any) => ad.position === position)
          console.log(`🟣 AdSlot-${position}: Found ${filteredAds.length} ads`)
          setAds(filteredAds)
        }
      } catch (error) {
        if (!isCancelled) {
          setAds([])
        }
      } finally {
        if (!isCancelled) {
          console.log(`⚪ AdSlot-${position}: Setting loading to false`)
          setLoading(false)
        }
      }
    }

    console.log(`🔴 AdSlot-${position}: Calling loadAds()`)
    loadAds()

    return () => {
      console.log(`❌ AdSlot-${position}: Cleanup function called`)
      isCancelled = true
    }
  }, [position])

  // Always render container, even during loading

  // Always render the container

  return (
    <div className={`ad-slot ad-slot-${position} ${className}`}>
      {/* Temporary visibility test */}
      <div style={{
        background: '#ff0000',
        color: 'white',
        padding: '5px',
        fontSize: '10px',
        margin: '2px 0'
      }}>
        AdSlot-{position} RENDERED - Loading: {loading.toString()} - Ads: {ads.length}
      </div>
      
      {/* Debug info for troubleshooting */}
      {process.env.NEXT_PUBLIC_DEBUG_ADS === 'true' && (
        <div style={{
          background: '#e7f3ff',
          border: '1px solid #0066cc',
          padding: '8px',
          fontSize: '10px',
          marginBottom: '8px',
          borderRadius: '4px'
        }}>
          Debug: {ads.length} ads loaded for position '{position}' (Using test API for debugging)
          {ads.length > 0 && (
            <div>
              <strong>Ad IDs:</strong> {ads.map(ad => ad.id).join(', ')}
              <br />
              <strong>HTML lengths:</strong> {ads.map(ad => ad.htmlContent?.length || 0).join(', ')}
            </div>
          )}
        </div>
      )}
      
      {ads.length > 0 ? (
        ads.map((ad) => (
          <div 
            key={ad.id} 
            className="ad-content"
            dangerouslySetInnerHTML={{ __html: ad.htmlContent }}
            suppressHydrationWarning={true}
          />
        ))
      ) : (
        process.env.NEXT_PUBLIC_DEBUG_ADS === 'true' && (
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffd60a',
            padding: '10px',
            color: '#664d03',
            fontSize: '12px'
          }}>
            No ads found for position: {position}
          </div>
        )
      )}
    </div>
  )
}