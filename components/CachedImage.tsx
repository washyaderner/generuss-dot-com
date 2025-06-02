'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

/**
 * CachedImage component
 * This component extends Next.js Image component by automatically adding 
 * a cache-busting parameter to the image URL
 * 
 * Usage:
 * <CachedImage 
 *   src="/images/my-image.jpg" 
 *   alt="My image" 
 *   width={300} 
 *   height={300} 
 *   className="my-class" 
 * />
 */
type CachedImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  style?: React.CSSProperties
  sizes?: string
  fill?: boolean
  quality?: number
}

const CachedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  priority,
  style,
  sizes,
  fill,
  quality
}: CachedImageProps) => {
  // Use state to handle cache busting only on client side after hydration
  const [cacheBustedSrc, setCacheBustedSrc] = useState(src)
  
  useEffect(() => {
    // Only add cache buster on client side after hydration
    const cacheBuster = `?v=${Date.now()}`
    const newSrc = src.includes('?') ? `${src}&t=${Date.now()}` : `${src}${cacheBuster}`
    setCacheBustedSrc(newSrc)
  }, [src])
  
  return (
    <Image
      src={cacheBustedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      style={style}
      sizes={sizes}
      fill={fill}
      quality={quality}
    />
  )
}

export default CachedImage 