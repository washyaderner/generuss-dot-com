import Link from "next/link"
import { TableProperties, Rocket, Bot, Code, Target, UserPlus, Zap } from "lucide-react"
import { CursorGradient } from "@/components/cursor-gradient"
import { MobileNav } from "@/components/mobile-nav"
import { NavLink } from "@/components/nav-link"
import { getAllPosts } from "@/app/lib/contentful"
import FeaturedBlogPost from "@/app/components/blog/FeaturedBlogPost"
import { Metadata } from "next"
import { motion } from "framer-motion"
import { fadeInVariants } from "@/lib/animations/variants"
import { AnimatedText } from "@/components/ui/animated-text"
import { AnimatedCard, AnimatedCardGrid } from "@/components/ui/animated-card"

// This sets revalidation time to 1 hour
export const revalidate = 3600

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Generuss - AI & Automation Solutions for Sales Growth',
    description: 'Expert solutions in sales strategy, AI automation, and business process optimization. Build better systems, save time, and grow revenue.',
    openGraph: {
      title: 'Generuss - AI & Automation Solutions for Sales Growth',
      description: 'Expert solutions in sales strategy, AI automation, and business process optimization. Build better systems, save time, and grow revenue.',
      url: 'https://generuss.com',
      siteName: 'Generuss',
      images: [
        {
          url: 'https://generuss.com/og-image.jpg', // Update with actual OG image
          width: 1200,
          height: 630,
          alt: 'Generuss - AI & Automation Solutions'
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Generuss - AI & Automation Solutions for Sales Growth',
      description: 'Expert solutions in sales strategy, AI automation, and business process optimization.',
      images: ['https://generuss.com/twitter-image.jpg'], // Update with actual Twitter image
    }
  }
}

const navigationLinks = [
  { href: "/solutions", label: "Solutions" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

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

export default async function Home() {
  // Fetch the latest blog post
  const posts = await getAllPosts()
  const latestPost = posts.length > 0 ? posts[0] : null
  
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
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <NavLink href="/">
                Home
              </NavLink>
              <nav className="hidden md:flex space-x-6">
                <NavLink href="/solutions">
                  Solutions
                </NavLink>
                <NavLink href="/portfolio">
                  Portfolio
                </NavLink>
                <NavLink href="/blog">
                  Blog
                </NavLink>
                <NavLink href="/about">
                  About
                </NavLink>
                <NavLink href="/contact">
                  Contact
                </NavLink>
              </nav>
            </div>
            <Link
              href="/contact"
              className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white"
            >
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white">Get a Demo</span>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
              <div className="relative flex items-center justify-center mb-6">
                <motion.div 
                  className="absolute left-0 transform -translate-x-[calc(100%+0.5rem)] flex items-center"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: -20 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Zap className="w-12 h-12 md:w-16 md:h-16 text-teal-400" />
                </motion.div>
                <AnimatedText
                  text="Scale Fast, Touch Grass" 
                  type="gradient"
                  as="h1"
                  className="text-4xl md:text-5xl lg:text-7xl font-bold"
                />
              </div>
            </div>
            <AnimatedText
              text="Using automation to reduce bottlenecks and maximize profitability"
              className="text-gray-400 max-w-2xl mx-auto mb-8 text-4xl"
              delay={0.2}
            />
            
            {/* Video Feature */}
            <motion.div
              className="max-w-4xl mx-auto mb-10 relative overflow-hidden rounded-xl"
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-50 blur-xl z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
              <div className="absolute inset-0 border border-white/10 rounded-xl z-10" />
              
              {/* Glowing corners */}
              <motion.div 
                className="absolute top-0 left-0 w-16 h-16 bg-teal-500/30 blur-xl z-0"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  repeatType: "reverse" 
                }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-16 h-16 bg-purple-500/30 blur-xl z-0"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  repeatType: "reverse",
                  delay: 2 
                }}
              />
              
              <video 
                className="w-full h-auto relative z-1 rounded-xl"
                controls
                muted
                autoPlay
                loop
                playsInline
              >
                <source src="/images/GeneRuss-and-Crystal-Seed-Tour.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video label */}
              <motion.div
                className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded-full z-20 backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <p className="text-white text-sm font-medium flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse-bubble"></span>
                  Live Demo
                </p>
              </motion.div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Link
                  href="/solutions"
                  className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
                >
                  <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-75 group-hover:opacity-100 blur-2xl transition-opacity" />
                  <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/60 to-violet-600/60 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-white">Explore Solutions</span>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <Link
                  href="/contact"
                  className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
                >
                  <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-75 group-hover:opacity-100 blur-2xl transition-opacity" />
                  <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/60 to-violet-600/60 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-white">Schedule a Demo</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <AnimatedText
              text="Time Is Money"
              type="gradient"
              as="h2"
              className="text-3xl md:text-5xl font-bold text-center mb-4"
            />
            <AnimatedText
              text="We focus on evaluating and optimizing sales workflows for small to mid-sized businesses. Drawing on extensive experience in sales, startup operations, and process automation, we build tailored strategies that reduce workload, refine lead generation, and boost conversion rates—often in less time than most people expect."
              className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
            />
            
            <AnimatedCardGrid columns="grid-cols-1 md:grid-cols-2" className="max-w-5xl mx-auto">
              {solutions.map((solution, index) => (
                <AnimatedCard
                  key={index}
                  index={index}
                  className="h-full"
                  cardClassName="border-white/10 backdrop-blur-sm bg-black/40 h-full"
                >
                  <div className="relative h-full">
                    <solution.icon className="w-10 h-10 text-teal-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">{solution.title}</h3>
                    <p className="text-gray-400">{solution.description}</p>
                  </div>
                </AnimatedCard>
              ))}
            </AnimatedCardGrid>
          </div>
        </section>

        {/* Latest Blog Post Section */}
        {latestPost && (
          <section className="py-16 px-4" aria-labelledby="latest-insights">
            <div className="container mx-auto">
              <AnimatedText
                text="Latest Insights"
                type="gradient"
                as="h2"
                className="text-3xl md:text-4xl font-bold text-center mb-4"
              />
              <AnimatedText
                text="Practical advice and strategies to level up your business and sales processes"
                className="text-gray-400 text-center max-w-2xl mx-auto mb-10"
              />
              
              <FeaturedBlogPost post={latestPost} />
              
              <div className="flex justify-center mt-10">
                <Link
                  href="/blog"
                  className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
                >
                  <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
                  <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-white">View All Articles</span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
              <AnimatedText
                text="🔥 Success = Skill + Leverage + Consistency"
                type="gradient"
                as="h2"
                className="text-4xl md:text-5xl font-bold relative mb-6"
              />
            </div>
            <AnimatedText
              text="If you're ready to streamline your sales operations, or you just want to explore how AI and automation could reshape your results—reach out here. I'm committed to making your sales process more efficient and profitable. Let's talk about the specific challenges you face and how we can solve them together."
              className="text-gray-400 max-w-3xl mx-auto mb-8 text-sm md:text-base"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/contact"
                className="group relative inline-flex px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
              >
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-75 group-hover:opacity-100 blur-2xl transition-opacity" />
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/60 to-violet-600/60 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-white">Let's Talk</span>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

