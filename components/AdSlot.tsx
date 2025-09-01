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
        const response = await fetch('/api/ads')
        if (response.ok && !isCancelled) {
          const data = await response.json()
          const filteredAds = data.filter((ad: any) => ad.position === position)
          setAds(filteredAds)
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('Error loading ads:', error)
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
          Debug: {ads.length} ads loaded for position '{position}'
        </div>
      )}
      
      {ads.map((ad) => (
        <div 
          key={ad.id} 
          className="ad-content"
          dangerouslySetInnerHTML={{ __html: ad.htmlContent }}
          suppressHydrationWarning={true}
        />
      ))}
    </div>
  )
}