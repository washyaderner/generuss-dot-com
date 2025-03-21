'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { letterVariants, headingVariants } from '@/lib/animations/variants'

interface AnimatedTextProps extends HTMLMotionProps<'div'> {
  text: string
  type?: 'paragraph' | 'heading' | 'gradient' | 'glowing' | 'letter-by-letter'
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  gradient?: string
  className?: string
  once?: boolean
}

/**
 * Animated text component with various animation types
 */
export function AnimatedText({
  text,
  type = 'paragraph',
  delay = 0,
  as = 'p',
  gradient = 'from-teal-400 to-purple-500',
  className,
  once = true,
  ...props
}: AnimatedTextProps) {
  // Split the text into words for word-level animation
  const words = text.split(' ')
  
  // Split the text into letters for letter-by-letter animation
  const letters = text.split('')
  
  // Define tag to render based on 'as' prop
  const Tag = motion[as] as React.ElementType

  // Variants for text animation
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  // Handle different animation types
  switch (type) {
    // Word-by-word animation for headings
    case 'heading':
      return (
        <Tag
          className={className}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once }}
          {...props}
        >
          {words.map((word, i) => (
            <motion.span
              key={`word-${i}`}
              className="inline-block mr-[0.25em] whitespace-nowrap"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: delay + i * 0.1,
                    duration: 0.5,
                    ease: 'easeOut'
                  }
                }
              }}
            >
              {word}
            </motion.span>
          ))}
        </Tag>
      )

    // Letter-by-letter animation
    case 'letter-by-letter':
      return (
        <Tag
          className={className}
          initial="hidden"
          whileInView="visible"
          viewport={{ once }}
          {...props}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={`letter-${i}`}
              className="inline-block"
              variants={letterVariants}
              transition={{
                delay: delay + i * 0.03,
                duration: 0.3
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </Tag>
      )

    // Gradient text animation
    case 'gradient':
      return (
        <Tag
          className={cn(
            "bg-gradient-to-r bg-clip-text text-transparent animate-gradient",
            gradient,
            className
          )}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once }}
          {...props}
        >
          {text}
        </Tag>
      )

    // Glowing text animation
    case 'glowing':
      return (
        <Tag
          className={cn("relative", className)}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once }}
          {...props}
        >
          <span className="relative z-10">{text}</span>
          <motion.span
            className={cn(
              "absolute inset-0 z-0 blur-sm bg-gradient-to-r opacity-75",
              gradient
            )}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once }}
            transition={{
              delay: delay + 0.2,
              duration: 1
            }}
          />
        </Tag>
      )

    // Default paragraph animation
    default:
      return (
        <Tag
          className={className}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once }}
          {...props}
        >
          {text}
        </Tag>
      )
  }
} 