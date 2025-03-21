'use client'

import { useState, useEffect } from 'react'
import { motion, Variants, usePresence, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { pageVariants } from '@/lib/animations/variants'

interface PageTransitionOptions {
  variants?: Variants
  initial?: boolean
  exit?: boolean
  duration?: number
  enablePreload?: boolean
}

/**
 * Custom hook for handling page transition animations
 * 
 * @param options Configuration options for page transitions
 * @returns Animation-related state and properties
 */
export function usePageTransition(options: PageTransitionOptions = {}) {
  const {
    variants = pageVariants,
    initial = true,
    exit = true,
    duration = 300,
    enablePreload = true
  } = options

  const pathname = usePathname()
  const [isPresent, safeToRemove] = usePresence()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Handle presence-based transitions
  useEffect(() => {
    if (!isPresent) {
      setIsTransitioning(true)
      setTimeout(safeToRemove, duration)
    } else {
      setIsTransitioning(false)
    }
  }, [isPresent, safeToRemove, duration])

  // When component mounts, mark as loaded after a short delay
  useEffect(() => {
    if (enablePreload) {
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setIsLoaded(true)
    }
  }, [enablePreload])

  /**
   * Wrap component with page transition animations
   */
  const PageTransition = ({ 
    children, 
    className = '' 
  }: { 
    children: React.ReactNode
    className?: string 
  }) => {
    return (
      <motion.div
        className={className}
        key={pathname}
        initial={initial ? "hidden" : undefined}
        animate="visible"
        exit={exit ? "exit" : undefined}
        variants={variants}
      >
        {children}
      </motion.div>
    )
  }

  /**
   * Creates a wrapper with AnimatePresence for route transitions
   */
  const PageTransitionWrapper = ({ 
    children 
  }: { 
    children: React.ReactNode 
  }) => {
    return (
      <AnimatePresence mode="wait">
        <PageTransition key={pathname}>
          {children}
        </PageTransition>
      </AnimatePresence>
    )
  }

  return {
    isTransitioning,
    isLoaded,
    PageTransition,
    PageTransitionWrapper
  }
} 