'use client'

import { useState, useEffect } from 'react'

/**
 * Text animation type options
 */
export type TextAnimationType = 'pulse' | 'glow' | 'gradient' | 'typing' | 'none'

interface TextAnimationOptions {
  enabled?: boolean
  delay?: number
  duration?: number
  color?: string
  type?: TextAnimationType
  repeatCount?: number
}

/**
 * Custom hook for text animation effects
 * 
 * @param text The text to animate
 * @param options Animation configuration options
 * @returns Animation-related state and components
 */
export function useTextAnimation(
  text: string, 
  options: TextAnimationOptions = {}
) {
  const {
    enabled = true,
    delay = 0,
    duration = 1500,
    color = 'text-teal-400',
    type = 'glow',
    repeatCount = 1
  } = options

  const [isAnimating, setIsAnimating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [iteration, setIteration] = useState(0)

  // Handle animation start/stop
  useEffect(() => {
    if (!enabled) return

    // Wait for optional delay then start animation
    const delayTimer = setTimeout(() => {
      setIsAnimating(true)

      // Define animation duration and completion
      const animationTimer = setTimeout(() => {
        if (repeatCount === Infinity) {
          // For infinite animations, increment iteration but don't complete
          setIteration(prev => prev + 1)
        } else if (iteration < repeatCount - 1) {
          // For finite repetitions
          setIteration(prev => prev + 1)
        } else {
          // Complete animation after final iteration
          setIsComplete(true)
          setIsAnimating(false)
        }
      }, duration)

      return () => clearTimeout(animationTimer)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [enabled, delay, duration, iteration, repeatCount])

  // Reset animation state 
  const reset = () => {
    setIsAnimating(false)
    setIsComplete(false)
    setIteration(0)
  }

  /**
   * Renders animated text with appropriate styling based on type
   */
  const AnimatedText = () => {
    // Split text by words for animation
    const words = text.split(' ')
    
    // Handle different animation types
    switch (type) {
      case 'pulse':
        return (
          <span className={`${color} animate-text-pulse`}>
            {text}
          </span>
        )
      
      case 'glow':
        return (
          <span className={`${color} whitespace-pre-wrap`}>
            {words.map((word, wordIndex) => (
              <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap mr-[0.25em]">
                {word.split('').map((char, charIndex) => {
                  // Calculate position in text for delay
                  let overallIndex = 0
                  for (let i = 0; i < wordIndex; i++) {
                    overallIndex += words[i].length + 1
                  }
                  overallIndex += charIndex
                  
                  return (
                    <span 
                      key={`char-${wordIndex}-${charIndex}`} 
                      className="inline-block animate-glow-trail"
                      style={{ animationDelay: `${overallIndex * 0.07}s` }}
                    >
                      {char}
                    </span>
                  )
                })}
              </span>
            ))}
          </span>
        )
      
      case 'gradient':
        return (
          <span className="bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
            {text}
          </span>
        )
      
      case 'typing':
        return (
          <span className="font-mono border-r-2 border-teal-400 animate-typing overflow-hidden whitespace-nowrap">
            {text}
          </span>
        )
      
      default:
        return <span>{text}</span>
    }
  }

  return {
    isAnimating,
    isComplete,
    iteration,
    reset,
    AnimatedText
  }
} 