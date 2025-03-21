'use client'

import React from 'react'
import { AnimatedCard, AnimatedCardGrid } from '@/components/ui/animated-card'
import { AnimatedText } from '@/components/ui/animated-text'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Code, Zap, User, Settings } from 'lucide-react'

/**
 * Test page to demonstrate animation components
 */
export default function AnimationsTestPage() {
  return (
    <div className="container mx-auto py-20 px-4">
      {/* Navigation */}
      <Link href="/" className="mb-12 inline-flex items-center text-teal-400 hover:text-teal-300">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      
      {/* Page Title */}
      <AnimatedText 
        text="UI Animation Components" 
        type="heading" 
        as="h1" 
        className="text-4xl md:text-5xl font-bold mb-8 text-white"
      />
      
      <AnimatedText 
        text="This page showcases all the animation components available in the Generuss UI library."
        className="text-zinc-400 mb-12 md:text-lg max-w-2xl"
      />
      
      {/* Text Animations Section */}
      <section className="mb-20">
        <AnimatedText 
          text="Text Animations" 
          type="gradient" 
          as="h2" 
          className="text-3xl font-bold mb-8"
        />
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="p-6 bg-zinc-900/50 rounded-lg">
            <h3 className="text-white text-xl mb-4">Paragraph Text</h3>
            <AnimatedText 
              text="This is a standard paragraph animation that fades in and slides up."
              className="text-zinc-400" 
            />
          </div>
          
          <div className="p-6 bg-zinc-900/50 rounded-lg">
            <h3 className="text-white text-xl mb-4">Heading Animation</h3>
            <AnimatedText 
              text="Word by Word Animation" 
              type="heading"
              as="h3"
              className="text-zinc-200" 
            />
          </div>
          
          <div className="p-6 bg-zinc-900/50 rounded-lg">
            <h3 className="text-white text-xl mb-4">Gradient Text</h3>
            <AnimatedText 
              text="Beautiful Gradient Animation" 
              type="gradient"
              gradient="from-teal-400 via-purple-500 to-pink-500"
              as="div"
              className="text-2xl font-bold" 
            />
          </div>
          
          <div className="p-6 bg-zinc-900/50 rounded-lg">
            <h3 className="text-white text-xl mb-4">Letter by Letter</h3>
            <AnimatedText 
              text="Each letter animates individually" 
              type="letter-by-letter"
              className="text-teal-400 text-xl" 
            />
          </div>
          
          <div className="p-6 bg-zinc-900/50 rounded-lg">
            <h3 className="text-white text-xl mb-4">Glowing Text</h3>
            <AnimatedText 
              text="Subtle glowing effect" 
              type="glowing"
              gradient="from-teal-400 to-teal-500"
              className="text-xl font-medium text-white" 
            />
          </div>
        </div>
      </section>
      
      {/* Card Animations Section */}
      <section className="mb-20">
        <AnimatedText 
          text="Card Animations" 
          type="gradient" 
          as="h2" 
          gradient="from-teal-400 to-blue-500"
          className="text-3xl font-bold mb-8"
        />
        
        <AnimatedCardGrid columns="grid-cols-1 md:grid-cols-3" className="mb-12">
          {[
            { title: 'Web Development', icon: Code, description: 'Modern websites with clean code' },
            { title: 'Automation', icon: Zap, description: 'Streamlining business processes' },
            { title: 'User Experience', icon: User, description: 'Creating intuitive interfaces' },
            { title: 'System Integration', icon: Settings, description: 'Connect your business tools' },
            { title: 'Custom Solutions', icon: ExternalLink, description: 'Tailored to your needs' },
          ].map((item, index) => (
            <AnimatedCard
              key={index}
              index={index}
              title={item.title}
              description={item.description}
              className="cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center h-32">
                <item.icon className="h-12 w-12 text-teal-400 mb-4" />
                <p className="text-zinc-400 text-center">Hover for animation</p>
              </div>
            </AnimatedCard>
          ))}
        </AnimatedCardGrid>
      </section>
      
      {/* Page Transitions Demo */}
      <section>
        <AnimatedText 
          text="Page Transitions" 
          type="gradient" 
          as="h2" 
          gradient="from-purple-400 to-pink-500"
          className="text-3xl font-bold mb-8"
        />
        
        <div className="p-6 bg-zinc-900/50 rounded-lg mb-8">
          <h3 className="text-white text-xl mb-4">How to use page transitions</h3>
          <motion.pre
            className="p-4 bg-black rounded-md text-sm overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <code className="text-zinc-300">
{`
// In your page.tsx
'use client'

import { usePageTransition } from '@/hooks/use-page-transition'

export default function MyPage() {
  const { PageTransition } = usePageTransition()
  
  return (
    <PageTransition>
      {/* Your page content */}
    </PageTransition>
  )
}
`}
            </code>
          </motion.pre>
        </div>
        
        <Link 
          href="/"
          className="inline-flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Homepage
        </Link>
      </section>
    </div>
  )
} 