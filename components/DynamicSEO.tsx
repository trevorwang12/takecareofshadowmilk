'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface DynamicSEOProps {
  title?: string
  description?: string
  canonical?: string
  baseUrl?: string
}

export default function DynamicSEO({ 
  title, 
  description, 
  canonical,
  baseUrl = 'https://worldguessr.pro' 
}: DynamicSEOProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Set document title
    if (title) {
      document.title = title
    }

    // Set or update canonical URL
    const canonicalUrl = canonical || `${baseUrl}${pathname}`
    
    // Remove existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) {
      existingCanonical.remove()
    }

    // Add new canonical link
    const link = document.createElement('link')
    link.rel = 'canonical'
    link.href = canonicalUrl
    document.head.appendChild(link)

    // Set description meta tag
    if (description) {
      let descMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement
      if (!descMeta) {
        descMeta = document.createElement('meta')
        descMeta.name = 'description'
        document.head.appendChild(descMeta)
      }
      descMeta.content = description
    }

    // Cleanup function
    return () => {
      // Remove canonical link when component unmounts
      const canonicalLink = document.querySelector(`link[rel="canonical"][href="${canonicalUrl}"]`)
      if (canonicalLink) {
        canonicalLink.remove()
      }
    }
  }, [title, description, canonical, pathname, baseUrl])

  return null // This component doesn't render anything
}