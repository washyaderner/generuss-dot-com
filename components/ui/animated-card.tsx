'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cardVariants } from '@/lib/animations/variants'
import { cn } from '@/lib/utils'

interface AnimatedCardProps {
  index?: number
  animateHover?: boolean
  delay?: number
  children: React.ReactNode
  containerClassName?: string
  cardClassName?: string
  headerClassName?: string
  contentClassName?: string
  footerClassName?: string
  title?: React.ReactNode
  description?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

/**
 * Animated card component with motion effects
 */
export function AnimatedCard({
  index = 0,
  animateHover = true,
  delay = 0,
  children,
  containerClassName,
  cardClassName,
  headerClassName,
  contentClassName,
  footerClassName,
  title,
  description,
  footer,
  className,
  ...props
}: AnimatedCardProps & Omit<React.ComponentPropsWithoutRef<typeof Card>, 'title'>) {
  return (
    <motion.div
      className={cn("h-full w-full", containerClassName)}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={{ index, delay }}
      transition={{
        delay: index * 0.05 + delay,
        duration: 0.5,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      whileHover={animateHover ? "hover" : undefined}
      whileTap={animateHover ? "tap" : undefined}
    >
      <Card className={cn("h-full", cardClassName, className)} {...props}>
        {(title || description) && (
          <CardHeader className={headerClassName}>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent className={cn("h-full", contentClassName)}>
          {children}
        </CardContent>
        {footer && (
          <CardFooter className={footerClassName}>
            {footer}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  )
}

/**
 * Simple wrapper to create a grid of animated cards
 */
export function AnimatedCardGrid({
  children,
  className,
  columns = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  gap = "gap-6",
  ...props
}: {
  children: React.ReactNode
  className?: string
  columns?: string
  gap?: string
} & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      className={cn("grid w-full", columns, gap, className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
} 