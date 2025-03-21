# Animation Guide for Generuss.com

This guide explains how to use the animation components and hooks available in the Generuss UI system.

## Quick Start

Our animation system provides a consistent and responsive experience across the website. The animations are designed to:

- Create a modern and engaging user experience
- Highlight important content
- Guide users' attention
- Provide feedback for interactions

## Available Animation Components

### 1. AnimatedText

The `AnimatedText` component provides various text animation effects:

```tsx
import { AnimatedText } from '@/components/ui/animated-text'

// Basic usage
<AnimatedText 
  text="This is animated text" 
  className="text-lg" 
/>

// Gradient text
<AnimatedText 
  text="Gradient text" 
  type="gradient"
  gradient="from-teal-400 to-purple-500" 
  className="text-2xl font-bold" 
/>

// Heading with word-by-word animation
<AnimatedText 
  text="Animated Heading" 
  type="heading"
  as="h2"
  className="text-3xl font-bold" 
/>

// Letter-by-letter animation
<AnimatedText 
  text="Letter by letter" 
  type="letter-by-letter"
  className="text-lg" 
/>

// Glowing text
<AnimatedText 
  text="Glowing effect" 
  type="glowing"
  className="text-xl" 
/>
```

### 2. AnimatedCard

The `AnimatedCard` component creates card elements with entrance and hover animations:

```tsx
import { AnimatedCard, AnimatedCardGrid } from '@/components/ui/animated-card'

// Basic card
<AnimatedCard
  title="Card Title"
  description="Card description text"
  className="cursor-pointer"
>
  Card content here
</AnimatedCard>

// Using AnimatedCardGrid for a grid of cards
<AnimatedCardGrid columns="grid-cols-1 md:grid-cols-3">
  <AnimatedCard title="Card 1" index={0}>Content 1</AnimatedCard>
  <AnimatedCard title="Card 2" index={1}>Content 2</AnimatedCard>
  <AnimatedCard title="Card 3" index={2}>Content 3</AnimatedCard>
</AnimatedCardGrid>
```

## Animation Hooks

### 1. useTextAnimation

Custom hook for complex text animations:

```tsx
import { useTextAnimation } from '@/hooks/use-text-animation'

function MyComponent() {
  const { AnimatedText, isComplete } = useTextAnimation(
    "Text to animate", 
    { 
      type: 'glow',
      delay: 300,
      duration: 2000 
    }
  )

  return (
    <div>
      <AnimatedText />
      {isComplete && <div>Animation completed!</div>}
    </div>
  )
}
```

### 2. usePageTransition

Handle page transitions easily:

```tsx
import { usePageTransition } from '@/hooks/use-page-transition'

export default function MyPage() {
  const { PageTransition } = usePageTransition()
  
  return (
    <PageTransition>
      {/* Your page content */}
    </PageTransition>
  )
}
```

## Animation Variants

You can import and use predefined animation variants from our animation library:

```tsx
import { motion } from 'framer-motion'
import { fadeInVariants, cardVariants } from '@/lib/animations/variants'

// Use with motion components
<motion.div
  variants={fadeInVariants}
  initial="hidden"
  animate="visible"
>
  Content that fades in
</motion.div>
```

Available variants:
- `pageVariants`: Page transition animations
- `cardVariants`: Card animations with hover effects
- `staggerContainerVariants`: Container for staggered child animations
- `headingVariants`: Heading text animations
- `letterVariants`: Letter-by-letter animations
- `fadeInVariants`: Simple fade-in effect
- `scaleVariants`: Scale animations for buttons and interactive elements

## CSS Animation Classes

We've added several Tailwind CSS animation classes that you can use directly:

```html
<!-- Text animations -->
<span class="animate-text-pulse">Pulsing text</span>
<span class="animate-gradient bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">Gradient text</span>
<span class="animate-glow-trail">Glowing text</span>
<span class="animate-typing">Typing effect</span>

<!-- Element animations -->
<div class="animate-float">Floating element</div>
<div class="animate-bounce-subtle">Subtle bounce</div>
<div class="animate-pulse-bubble">Pulsing element</div>
<div class="animate-slide-up-fade">Slides up and fades in</div>
<div class="animate-slide-down-fade">Slides down and fades in</div>
<div class="animate-fade-in">Simple fade in</div>
```

## Animation Performance Tips

1. Use `whileInView` with `viewport={{ once: true }}` for animations that should only play once when scrolled into view
2. Prefer CSS animations for continuous animations (hover, etc.)
3. Use hardware-accelerated properties (`opacity`, `transform`) when possible
4. For large lists, consider staggered animations to improve performance
5. Set `initial={false}` on motion components when you don't want an initial animation

## Test Page

Visit the [UI Test Page](/ui-test) to see all animations in action. 