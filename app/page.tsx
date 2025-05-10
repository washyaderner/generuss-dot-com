'use client'

import Link from "next/link"
import { TableProperties, Rocket, Bot, Code, Target, UserPlus, Zap } from "lucide-react"
import { CursorGradient } from "@/components/cursor-gradient"
import { MobileNav } from "@/components/mobile-nav"
import { NavLink } from "@/components/nav-link"
import { getAllPosts } from "@/app/lib/contentful"
import FeaturedBlogPost from "@/app/components/blog/FeaturedBlogPost"
import { useEffect, useState } from "react"
import { BlogPost } from "@/app/lib/contentful"

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
      <div className="container mx-auto">
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
          <Link
            href="/blog"
            className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
          >
            <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/20 to-teal-500/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
            <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/40 to-teal-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-white">View All Articles</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  // Removed blog-related state from here
  
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
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/20 to-teal-500/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/40 to-teal-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white">Get a Demo</span>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 relative">
                <div className="relative flex items-center justify-center">
                  <div className="absolute left-0 transform -translate-x-[calc(100%+0.5rem)] flex items-center">
                    <Zap className="w-12 h-12 md:w-16 md:h-16 text-teal-400" />
                  </div>
                  <span className="text-teal-400 text-3xl md:text-4xl lg:text-5xl">
                    Automate + Streamline = More Free Time
                  </span>
                </div>
              </h1>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-4xl">
              Using automation to reduce bottlenecks and maximize profitability
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/solutions"
                className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
              >
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/40 to-teal-500/40 opacity-75 group-hover:opacity-100 blur-2xl transition-opacity" />
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/60 to-teal-500/60 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-white">Explore Solutions</span>
              </Link>
              <Link
                href="/contact"
                className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
              >
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/40 to-teal-500/40 opacity-75 group-hover:opacity-100 blur-2xl transition-opacity" />
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/60 to-teal-500/60 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-white">Schedule a Demo</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-teal-400 animate-gradient">
              Time Is Money
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
              We focus on evaluating and optimizing sales workflows for small to mid-sized businesses. Drawing on
              extensive experience in sales, startup operations, and process automation, we build tailored strategies
              that reduce workload, refine lead generation, and boost conversion rates—often in less time than most
              people expect.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  <div className="absolute inset-0 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10" />
                  <div className="relative">
                    <solution.icon className="w-10 h-10 text-teal-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">{solution.title}</h3>
                    <p className="text-gray-400">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Blog Post Section - Now as a separate client component */}
        <BlogSection />

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative">
                🔥{" "}
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
            <Link
              href="/contact"
              className="group relative inline-flex px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
            >
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/40 to-teal-500/40 opacity-75 group-hover:opacity-100 blur-2xl transition-opacity" />
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/60 to-teal-500/60 opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white">Let's Talk</span>
            </Link>
          </div>
        </section>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav links={navigationLinks} />
    </div>
  )
}

