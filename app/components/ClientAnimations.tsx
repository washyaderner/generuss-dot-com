'use client'

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Banknote, Rocket, Code, LineChart, Star } from "lucide-react"
import { NavLink } from "@/components/nav-link"

// Animation variants for cards - simplified and more reliable
const cardVariants = {
  hidden: { 
    opacity: 0.3, // Changed from 0 to 0.3 to ensure some visibility
    y: 20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut"
    }
  }
}

const containerVariants = {
  hidden: { opacity: 0.5 }, // Changed from 0 to 0.5 for fallback visibility
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.26
    }
  }
}

// Robust Solutions Grid Component with fallback visibility
export function SolutionsGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px" // Reduced from -100px for earlier trigger
  })

  const cards = [
    {
      icon: Banknote,
      title: "$8.2M Annual Revenue Lift",
      description: "Boosted daily revenue from $55,440 to $87,120 for a major real estate marketing firm, using my advanced sales scripting and line-feeds on live calls. A custom role was created for me as a dedicated Line Coach to implement these strategies."
    },
    {
      icon: Rocket,
      title: "$32.7K Over Annual Goal",
      description: "Leveraged automation to drive $146,278 in personal annual revenue at Comcast, surpassing the 2024 target by 28.8%. Streamlined call processes, strategic upselling, and optimized sales automation."
    },
    {
      icon: Code,
      title: "Generuss.com Built in Under 2 Weeks",
      description: "Launched Generuss.com from scratch in less than two weeks using Cursor AI. Delivered a fully branded, SEO-rich site with AI-enhanced content, dynamic multimedia, and integrated lead-gen forms."
    },
    {
      icon: LineChart,
      title: "950% Sales Growth",
      description: "Lifted monthly sales from 2 to 21 units for a rep selling high-ROI products through targeted coaching, refined call structure, and strategic upsell scripting. Consistently mentored peers while maintaining Elite (top 3%) sales rank at Comcast."
    }
  ]

  return (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto opacity-100" // Added fallback opacity
      style={{ 
        perspective: "1200px",
        minHeight: "400px" // Ensure space is reserved for cards
      }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover={{
            scale: 1.025,
            z: 60,
            transition: { duration: 0.066, ease: "easeOut" }
          }}
          whileTap={{ scale: 0.98 }}
          className="card-hover group opacity-100" // Added fallback opacity
          style={{ 
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            minHeight: "200px" // Ensure minimum card height
          }}
        >
          {/* Simplified overlay system - removed extra background layers */}
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10" />
          
          <div className="relative z-10"> {/* Explicit z-index for content */}
            <div>
              <card.icon className="w-10 h-10 text-teal-400 mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
            <p className="text-gray-400">{card.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Animated Portfolio Component
export function AnimatedPortfolio({ projects }: { projects: any[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="max-w-4xl mx-auto"
      style={{ perspective: "1200px" }}
    >
      {projects.map((project, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover={{
            scale: 1.02,
            z: 60,
            transition: { duration: 0.066, ease: "easeOut" }
          }}
          className="card-hover group mb-10"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
            className="card-hover-bg pointer-events-none"
            whileHover={{ scale: 1.05 }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10" />
          
          <div className="relative">
            <div className="flex items-center mb-4">
              <motion.span 
                className="text-teal-400 text-sm font-medium px-3 py-1 rounded-full bg-teal-400/10 mr-4"
                whileHover={{ scale: 1.1 }}
              >
                {project.client}
              </motion.span>
              <span className="text-gray-400 text-sm">
                {project.period}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
            
            <p className="text-gray-300 mb-6">
              {project.description}
            </p>
            
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.svg 
                    key={i} 
                    className={`w-5 h-5 ${i < project.rating ? 'text-yellow-400' : 'text-gray-400'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    whileHover={{ scale: 1.3, rotate: 15 }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </motion.svg>
                ))}
              </div>
              <span className="text-white font-medium">{project.rating.toFixed(1)}</span>
            </div>
            
            <NavLink 
              href="#schedule"
              className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors"
            >
              <span>Schedule a consultation</span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                whileHover={{ x: 5 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
            </NavLink>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Animated Reviews Component
export function AnimatedReviews({ reviews }: { reviews: any[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="max-w-5xl mx-auto"
      style={{ perspective: "1200px" }}
    >
      {reviews.map((review, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover={{
            scale: 1.0125,
            z: 60,
            transition: { duration: 0.066, ease: "easeOut" }
          }}
          className="card-hover group mb-10"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
            className="card-hover-bg pointer-events-none"
            whileHover={{ 
              scale: 1.15,
              rotate: 3
            }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10" />
          <div className="relative">
            <motion.div 
              className="flex mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.26 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.13 + i * 0.13, type: "spring" }}
                  whileHover={{ 
                    scale: 1.4,
                    rotate: 360,
                    transition: { duration: 0.39 }
                  }}
                >
                  <Star 
                    className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`} 
                    fill={i < review.rating ? 'currentColor' : 'none'} 
                  />
                </motion.div>
              ))}
            </motion.div>
            <h4 className="text-xl font-semibold text-teal-400 mb-4">{review.title}</h4>
            <p className="text-gray-300 mb-6 italic">"{review.text}"</p>
            <div className="flex flex-col">
              <span className="text-white font-medium">{review.name}</span>
              <span className="text-gray-500 text-sm">{review.company}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Smooth scroll behavior for anchor links
export function SmoothScrollHandler() {
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickedElement = target.closest('a');
      const href = clickedElement?.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          // Fast, smooth scroll to target with consistent timing
          const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return null;
}

export default function ClientAnimations() {
  return <SmoothScrollHandler />;
}