'use client'

import Link from "next/link"
import { Zap, Star, ArrowRight, Bot, Rocket, UserPlus, Code, DollarSign, Target, Timer, TrendingUp, LineChart, Banknote, Book, BrainCircuit, Calendar, ChartBar, Clock, DatabaseZap, GitBranch, Laptop, Mail, MapPin, Megaphone, MessageSquare, Palette, Phone, Presentation, Settings, Sparkles, Terminal, Trophy, Users, Workflow } from "lucide-react"
import { CursorGradient } from "@/components/cursor-gradient"
import { MobileNav } from "@/components/mobile-nav"
import { NavLink } from "@/components/nav-link"
import { getAllPosts } from "@/app/lib/contentful"
import FeaturedBlogPost from "@/app/components/blog/FeaturedBlogPost"
import { useEffect, useState } from "react"
import { BlogPost } from "@/app/lib/contentful"
import { CalScheduler } from "@/components/CalScheduler"
import Image from 'next/image'
import CachedImage from '@/components/CachedImage'
import { CalendarEmbed } from "@/components/CalendarEmbed"
import { BackToTop } from "@/components/back-to-top"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// Navigation links used in both desktop and mobile nav
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" }
];

const solutions = [
  {
    icon: Bot,
    title: "Business & Content Automation",
    description:
      "Workflows, sales, and content—automated. Scale faster with AI-driven business & content automation that eliminates inefficiencies and drives results.",
  },
  {
    icon: Rocket,
    title: "Sales Strategy & Systems",
    description:
      "Sales isn't a just numbers game—it's a strategy game. I build smarter training, optimized workflows, and targeted scripts that help teams close faster, sell more, and work smarter.",
  },
  {
    icon: UserPlus,
    title: "Personalized Lead Generation",
    description:
      "Targeted, AI-powered, data-driven lead campaigns with precise personalization workflows, driving higher conversions and stronger long-term customer relationships.",
  },
  {
    icon: Code,
    title: "AI-Powered App & Web Development",
    description:
      "AI-enhanced apps and web solutions—built for efficiency, automation, and effortless user experience.",
  },
]

const projects = [
  {
    title: "AI-Powered Proposal Generator",
    client: "Invincible Media",
    period: "Apr 24, 2023 - May 9, 2023",
    rating: 5.0,
    description: "Dramatically improved productivity by reducing proposal generation time from 4+ hours to just 15 minutes. Created a custom Chat GPT proposal generator that processes sales transcript files and generates professional B2B Growth Plans. The system takes sales transcript text, an initial prompt, and a proposal structure with variables, then outputs fully formatted professional proposals with 15+ pages of precisely formatted copy.",
    testimonial: "", // Moved to reviews section
    imageUrl: "", // Optional placeholder for future image
  },
]

const reviews = [
  {
    name: "Jonny",
    company: "Invincible Media",
    title: "AI-Powered Proposal Generator",
    text: "Working with Russell has been nothing short of outstanding, and we don't say that lightly, especially after working with hundreds of developers and freelancers! This was a tricky project with the potential to veer off in multiple directions, but Russell brought structure, clarity, and calm from day one. He went truly above and beyond—navigating complexity with precision, staying focused when others might have drifted, and delivering results that exceeded every expectation. Russell is not only highly skilled and deeply logical, but also an absolute pleasure to work with. His communication is spot on, his work ethic is unmatched, and his ability to solve problems quickly and intelligently makes him a rare find. We'd love to keep working with Russ long term. I'd say 'don't hire him because he's ours,' but the truth is—every business deserves a secret weapon like Russell. Highly, highly recommended!!",
    rating: 5,
  },
]

// Animation variants for cards
const cardVariants = {
  hidden: { 
    opacity: 0, 
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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.26
    }
  }
}

// Animated Solutions Grid Component
function SolutionsGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
      className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
      style={{ perspective: "1200px" }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover={{ 
            scale: 1.05,
            y: -10,
            z: 60,
            transition: {
              type: "spring",
              stiffness: 210,
              damping: 26
            }
          }}
          whileTap={{ scale: 0.98 }}
          className="card-hover group"
          style={{ 
            transformStyle: "preserve-3d",
            transformOrigin: "center center"
          }}
        >
          <motion.div 
            className="card-hover-bg pointer-events-none"
            whileHover={{
              scale: 1.1,
              opacity: 1
            }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10" />
          <div className="relative">
            <motion.div
              whileHover={{ 
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.65 }
              }}
            >
              <card.icon className="w-10 h-10 text-teal-400 mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
            <p className="text-gray-400">{card.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Animated Portfolio Component
function AnimatedPortfolio() {
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
            y: -8,
            transition: {
              type: "spring",
              stiffness: 280,
              damping: 32
            }
          }}
          className="card-hover group mb-10"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
            className="card-hover-bg pointer-events-none"
            whileHover={{ scale: 1.05 }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10" />
          
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
function AnimatedReviews() {
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
            scale: 1.03,
            y: -12,
            transition: {
              type: "spring",
              stiffness: 245,
              damping: 32
            }
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
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10" />
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

// Move BlogSection to a separate client component
function BlogSection() {
  const [latestPost, setLatestPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [hasBlogFeature, setHasBlogFeature] = useState(true)
  
  // Fetch blog posts on client side only
  useEffect(() => {
    async function fetchPosts() {
      try {
        const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
        const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
        
        if (!spaceId || !accessToken) {
          console.warn("Contentful credentials missing. Skipping blog post fetch.");
          setIsLoading(false);
          setHasBlogFeature(false);
          return;
        }
        
  const posts = await getAllPosts()
        setLatestPost(posts.length > 0 ? posts[0] : null)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPosts()
  }, [])

  // Don't render anything during initial loading to prevent hydration mismatch
  if (isLoading) return null;
  
  // Don't render if feature is disabled or there's an error
  if (!hasBlogFeature || hasError || !latestPost) return null;
  
  return (
    <section className="py-16 px-4" aria-labelledby="latest-insights">
      <div className="container max-w-4xl mx-auto">
        <h2 
          id="latest-insights" 
          className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-violet-800 to-teal-400 bg-clip-text text-transparent"
        >
          Latest Insights
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
          Practical advice and strategies to level up your business and sales processes
        </p>
        
        <FeaturedBlogPost post={latestPost} />
        
        <div className="flex justify-center mt-10">
          <NavLink
            href="#schedule"
            className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
          >
            <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/20 to-teal-500/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
            <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/40 to-teal-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-white">Schedule Now</span>
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  // Home page component
  
  // Enhanced smooth scroll function with spring animation for "Book a Call" buttons
  useEffect(() => {
    const springScrollToCalendar = (targetElement: Element) => {
      const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
      const startTop = window.pageYOffset;
      const distance = targetTop - startTop;
      const duration = 1200; // Longer duration for spring effect
      const startTime = performance.now();

      const easeOutBounce = (t: number): number => {
        if (t < 1 / 2.75) {
          return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
          return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        } else if (t < 2.5 / 2.75) {
          return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        } else {
          return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
      };

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutBounce(progress);
        
        const currentPosition = startTop + (distance * easedProgress);
        window.scrollTo(0, currentPosition);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    };

    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickedElement = target.closest('a');
      const href = clickedElement?.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          // Check if this is a "Book a Call" button targeting the calendar
          const isBookCallButton = clickedElement?.textContent?.includes('Book a Call') || 
                                 clickedElement?.querySelector('[class*="Book a Call"]') ||
                                 target.textContent?.includes('Book a Call');
          const isCalendarTarget = href === '#schedule';
          
          if (isBookCallButton && isCalendarTarget) {
            // Use spring animation for Book a Call buttons
            springScrollToCalendar(element);
          } else {
            // Use regular smooth scroll for other links
            const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-gradient-to-t from-[#0A0A1E] via-black to-black z-0" />
      <CursorGradient />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-transparent to-black/80 pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20">
        {/* Navigation */}
        <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-black/5">
          <div className="container max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <NavLink href="/">
                <div className="flex items-center">
                  <CachedImage 
                    src="/images/logo-GENERUSS-logo.JPG"
                    alt="GENERUSS Logo" 
                    width={40} 
                    height={40} 
                    className="rounded-md mr-2"
                  />
                  <span>Home</span>
                </div>
              </NavLink>
              <nav className="hidden md:flex space-x-6">
                {navigationLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>
            <MobileNav links={navigationLinks} />
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 relative">
                <div className="relative flex items-center justify-center">
                  <div className="absolute left-0 transform -translate-x-[calc(100%+0.5rem)] flex items-center">
                    <Zap className="w-12 h-12 md:w-16 md:h-16 text-teal-400" />
                  </div>
                  <span className="text-teal-400 text-3xl md:text-4xl lg:text-5xl flex flex-col">
                    <span>Creating Growth Automations</span>
                    <span>For B2B Companies</span>
                  </span>
                </div>
              </h1>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-4xl flex flex-col">
              <span>Maximize ARR with Minimal Effort</span>
              <span>Streamline Complex Workflows</span>
              <span>Amplify Team Productivity</span>
            </p>
            <div className="flex justify-center">
              <NavLink
                href="#schedule"
                className="book-call-button"
              >
                <span className="relative">Book a Call</span>
              </NavLink>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section id="solutions" className="py-24 px-4 scroll-mt-20">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-teal-400 animate-gradient">
              Measurable Results
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
              Data-driven impact across sales, automation, and development projects
            </p>
            <SolutionsGrid />
          </div>
        </section>
        
        {/* Projects Section */}
        <section id="portfolio" className="py-24 px-4 bg-black/30 scroll-mt-20">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-violet-800 to-teal-400 bg-clip-text text-transparent">
              Client Success Stories
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
              Real-world automation projects delivering measurable results
            </p>
            
            <AnimatedPortfolio />
          </div>
        </section>
        
        {/* Schedule Section */}
        <section id="schedule" className="py-24 px-4 scroll-mt-20">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-violet-800 to-teal-400 bg-clip-text text-transparent">
              Book a Call
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Let's discuss how automation can help your B2B company grow faster with less effort
            </p>
            
            {/* Cal.com Calendar Integration */}
            <div className="max-w-4xl mx-auto">
              {/* Use our new CalendarEmbed component */}
              <CalendarEmbed 
                calendarUrl="https://app.cal.com/generuss/discovery-call"
                height="700px"
                mobileHeight="500px"
              />
              
              {/* Fallback button in case iframe is blocked */}
              <div className="mt-8 text-center">
                <p className="text-gray-400 mb-4">If the calendar doesn't load above, you can schedule directly here:</p>
                <a
                  href="https://app.cal.com/generuss/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600/80 to-teal-500/80 text-white font-medium rounded-lg transition-all hover:from-violet-600 hover:to-teal-500"
                >
                  Open Scheduling Page
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Reviews Section */}
        <section id="reviews" className="py-24 px-4 bg-black/30 scroll-mt-20">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-violet-800 to-teal-400 bg-clip-text text-transparent">
              Client Testimonials
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
              Here's what clients are saying about working with me
            </p>
            
            <AnimatedReviews />
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-24 px-4 scroll-mt-20">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-violet-800 to-teal-400 bg-clip-text text-transparent">
              About
            </h2>
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="col-span-1">
                {/* Profile image */}
                <div className="w-48 h-48 md:w-full md:h-auto aspect-square rounded-full bg-gradient-to-r from-teal-500/30 to-violet-600/30 mx-auto overflow-hidden border-2 border-white/10">
                  <CachedImage 
                    src="/images/logo-PFP-Teal.JPG"
                    alt="Russell's Profile"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover object-[center_top]"
                    style={{ objectPosition: "center 30%" }}
                  />
                </div>
              </div>
              
              <div className="col-span-2 text-left">
                <h3 className="text-2xl font-semibold text-teal-400 mb-4">Hey, I'm Russell</h3>
                <p className="text-gray-300 mb-4">
                  I'm a sales automation expert with over 10 years of experience helping B2B companies streamline their operations and boost growth. My background combines sales leadership, software development, and process optimization.
                </p>
                <p className="text-gray-300 mb-4">
                  I've helped dozens of companies automate their repetitive tasks, build scalable lead generation systems, and create more efficient sales processes that generate measurable ROI.
                </p>
                <div className="flex space-x-4 mt-6">
                  <NavLink
                    href="#schedule"
                    className="book-call-button"
                  >
                    <span className="relative">Book a Call</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Blog Post Section */}
        <section id="blog" className="py-24 px-4 bg-black/30 scroll-mt-20">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-violet-800 to-teal-400 bg-clip-text text-transparent">
                Latest Insights
              </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
                Practical advice and strategies to level up your business and sales processes
              </p>
              
            {/* Hardcoded featured blog post for demonstration */}
            <div className="w-full max-w-4xl mx-auto">
              <div className="relative group overflow-hidden rounded-xl bg-black/30 border border-white/10 transition-all duration-300 hover:border-white/20">
                {/* Gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col">
                  {/* Image section */}
                  <div className="relative h-96 overflow-hidden">
                    <Image
                      src="/images/Blog-Mastering-The-Art-Of-Persuasion.png"
                      alt="Sales: Mastering the Art of Persuasion"
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      priority
                      sizes="(max-width: 1024px) 100vw, 900px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                    
                    {/* Overlay title on image */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="px-3 py-1 bg-teal-500/30 text-teal-300 text-xs rounded-full backdrop-blur-sm">Latest Post</span>
                        <time className="text-gray-200 text-sm backdrop-blur-sm bg-black/20 px-2 py-1 rounded">May 5, 2023</time>
                      </div>
                      
                      <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-white transition-colors drop-shadow-lg">
                        Sales: Mastering the Art of Persuasion
                      </h2>
                    </div>
                  </div>
                  
                  {/* Content section */}
                  <div className="p-8 relative z-10 flex flex-col">
                    <p className="text-gray-300 mb-8 text-lg">
                      Learn how the most successful sales professionals combine psychology, process, and technology to consistently outperform their peers.
                    </p>
                    
                    <Link 
                      href="/blog/sales-mastering-the-art-of-persuasion"
                      className="self-end inline-flex items-center px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 rounded-lg transition-all"
                    >
                      <span>Read full article</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Link
                  href="/blog"
                  className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
                >
                  <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/20 to-teal-500/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
                  <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/40 to-teal-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-white">View All Posts</span>
                </Link>
              </div>
              </div>
            </div>
          </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="w-full">
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 flex flex-wrap md:flex-nowrap items-center justify-center">
                <span className="mr-2">🔥</span>
                <span className="bg-gradient-to-r from-violet-900 to-teal-400 bg-clip-text text-transparent">
                  Success = Skill + Leverage + Consistency
                </span>
              </h2>
            </div>
            <p className="text-gray-400 max-w-3xl mx-auto mb-8 text-sm md:text-base">
              If you're ready to streamline your sales operations, or you just want to explore how AI and automation
              could reshape your results—reach out here. I'm committed to making your sales process more efficient and
              profitable. Let's talk about the specific challenges you face and how we can solve them together.
            </p>
            <NavLink
              href="#schedule"
              className="book-call-button"
            >
              <span className="relative">Book a Call</span>
            </NavLink>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 px-4 border-t border-white/5">
          <div className="container max-w-4xl mx-auto text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Generuss. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav links={navigationLinks} />
      <BackToTop />
    </div>
  )
} 