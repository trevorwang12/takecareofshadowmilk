"use client"

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export default function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 80,
  placeholder = 'empty',
  blurDataURL
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  // Convert PNG to WebP if available
  const optimizedSrc = imgSrc.replace(/\.png$/i, '.webp')

  const handleError = () => {
    if (!hasError && optimizedSrc !== imgSrc) {
      // Fallback to original format if WebP fails
      setImgSrc(src)
      setHasError(true)
    }
  }

  const imageProps = {
    src: hasError ? src : optimizedSrc,
    alt,
    className: `${className || ''} transition-opacity duration-300`,
    priority,
    quality,
    sizes,
    placeholder,
    blurDataURL,
    onError: handleError,
    ...(fill
      ? { fill: true }
      : { width: width || 400, height: height || 300 }
    )
  }

  return (
    <div className="relative overflow-hidden">
      <Image {...imageProps} />
      {/* Low quality placeholder for better perceived performance */}
      <style jsx>{`
        img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
      `}</style>
    </div>
  )
}