"use client"

import { useEffect, useState } from 'react'
import { adManager, type AdSlot } from '@/lib/ad-manager'

interface AdSlotProps {
  position: 'header' | 'footer' | 'sidebar' | 'hero-bottom' | 'content-top' | 'game-details-bottom' | 'content-bottom' | 'recommendations-top'
  className?: string
}

export default function AdSlotComponent({ position, className = '' }: AdSlotProps) {
  const [ads, setAds] = useState<AdSlot[]>([])
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    let isCancelled = false
    
    const loadAds = async () => {
      try {
        setLoading(true)
        // Use real ads in production, test ads only when debug is explicitly enabled
        const isTestMode = process.env.NEXT_PUBLIC_DEBUG_ADS === 'true'
        const apiEndpoint = isTestMode ? '/api/test-simple-ad' : '/api/ads'
        
        const response = await fetch(apiEndpoint)
        
        if (response.ok && !isCancelled) {
          const data = await response.json()
          const filteredAds = data.filter((ad: any) => ad.position === position)
          setAds(filteredAds)
        }
      } catch (error) {
        if (!isCancelled) {
          setAds([])
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    loadAds()

    return () => {
      isCancelled = true
    }
  }, [position])

  if (loading) {
    return null // Don't show anything while loading
  }

  if (ads.length === 0) {
    // Show placeholder in development, debug info in production temporarily
    const isDevelopment = process.env.NODE_ENV === 'development'
    if (isDevelopment || process.env.NEXT_PUBLIC_DEBUG_ADS === 'true') {
      return (
        <div className={`ad-slot ad-slot-${position} ${className}`} style={{ 
          background: isDevelopment ? '#f8f9fa' : '#fff3cd', 
          border: isDevelopment ? '1px dashed #dee2e6' : '1px solid #ffd60a', 
          padding: '12px', 
          textAlign: 'center',
          borderRadius: '8px',
          color: isDevelopment ? '#6c757d' : '#664d03',
          fontSize: '12px',
          minHeight: position === 'sidebar' ? '150px' : '80px'
        }}>
          <p>📢 {position.charAt(0).toUpperCase() + position.slice(1).replace('-', ' ')} Ad Slot</p>
          <p>{isDevelopment ? '(No ads configured)' : `(No ads for position: ${position})`}</p>
          {!isDevelopment && <p style={{fontSize: '10px'}}>Debug: Check /api/ads for data</p>}
        </div>
      )
    }
    return null
  }

  return (
    <div className={`ad-slot ad-slot-${position} ${className}`}>
      
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
        ads.map((ad) => {
          // Check if this is a script-based ad and add fallback
          const hasScript = ad.htmlContent?.includes('<script')
          
          return (
            <div key={ad.id} className="ad-content">
              <div 
                dangerouslySetInnerHTML={{ __html: ad.htmlContent }}
                suppressHydrationWarning={true}
              />
              
              {/* Fallback for script-based ads */}
              {hasScript && (
                <div style={{
                  marginTop: '10px',
                  padding: '15px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  textAlign: 'center',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}>
                  <div>🎮 <strong>World Guessr</strong> 🌍</div>
                  <div style={{fontSize: '12px', marginTop: '5px', opacity: '0.9'}}>
                    Explore the world through games • Free to play
                  </div>
                  <div style={{fontSize: '10px', marginTop: '5px', opacity: '0.7'}}>
                    {position} advertisement space
                  </div>
                </div>
              )}
            </div>
          )
        })
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