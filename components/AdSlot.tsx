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
    // Show placeholder only in development mode
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className={`ad-slot ad-slot-${position} ${className}`} style={{ 
          background: '#f8f9fa', 
          border: '1px dashed #dee2e6', 
          padding: '12px', 
          textAlign: 'center',
          borderRadius: '8px',
          color: '#6c757d',
          fontSize: '12px',
          minHeight: position === 'sidebar' ? '150px' : '80px'
        }}>
          <p>📢 {position.charAt(0).toUpperCase() + position.slice(1).replace('-', ' ')} Ad Slot</p>
          <p>(No ads configured)</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className={`ad-slot ad-slot-${position} ${className}`}>
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