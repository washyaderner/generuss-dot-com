'use client'

import Link from "next/link"
import { TableProperties, Rocket, Bot, Code, Target, UserPlus, Zap, Star, ArrowRight } from "lucide-react"
import { CursorGradient } from "@/components/cursor-gradient"
import { MobileNav } from "@/components/mobile-nav"
import { NavLink } from "@/components/nav-link"
import { getAllPosts } from "@/app/lib/contentful"
import FeaturedBlogPost from "@/app/components/blog/FeaturedBlogPost"
import { useEffect, useState } from "react"
import { BlogPost } from "@/app/lib/contentful"
import { CalScheduler } from "@/components/CalScheduler"
import Image from 'next/image'

const navigationLinks = [
  { href: "#solutions", label: "Solutions" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#schedule", label: "Schedule" },
  { href: "#reviews", label: "Reviews" },
  { href: "#about", label: "About" },
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

const projects = [
  {
    title: "AI Sales Assistant",
    description: "Automated outreach system that increased qualified leads by 47%",
    videoUrl: "", // Add your Loom video URL here
  },
  {
    title: "CRM Integration Suite",
    description: "Custom workflow automation reducing manual tasks by 15 hours/week",
    videoUrl: "", // Add your Loom video URL here
  },
  {
    title: "Lead Qualification Engine",
    description: "ML-powered lead scoring system improving conversion rates by 32%",
    videoUrl: "", // Add your Loom video URL here
  },
]

const reviews = [
  {
    name: "Sarah Thompson",
    company: "Altitude SaaS",
    text: "The automation systems completely transformed our sales process. We're saving 20+ hours weekly on manual tasks while seeing better results.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    company: "NexGen Solutions",
    text: "Incredible attention to detail and a deep understanding of both sales psychology and technical implementation. Delivered everything on time and exceeded expectations.",
    rating: 5,
  },
  {
    name: "Jessica Rivera",
    company: "Apex Consulting",
    text: "The lead generation system paid for itself within 3 weeks. Our sales team now focuses purely on closing instead of prospecting.",
    rating: 5,
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
  // Cal.com username - replace with your actual username
  const calUsername = "yourusername";
  
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
                {navigationLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>
            <Link
              href="#schedule"
              className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white"
            >
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/20 to-teal-500/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/40 to-teal-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white">Book Now</span>
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
                  <span className="text-teal-400 text-3xl md:text-4xl lg:text-5xl flex flex-col">
                    <span>Creating Growth Automations</span>
                    <span>For B2B Companies</span>
                  </span>
                </div>
              </h1>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-4xl flex flex-col">
              <span>Fewer manual processes.</span>
              <span>More growth.</span>
              <span>Better margins.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#solutions"
                className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
              >
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/40 to-teal-500/40 opacity-75 group-hover:opacity-100 blur-2xl transition-opacity" />
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/60 to-teal-500/60 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-white">Explore Solutions</span>
              </Link>
              <Link
                href="#schedule"
                className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
              >
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-75 group-hover:opacity-100 blur-2xl transition-opacity" />
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/60 to-violet-600/60 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-white">Book a Free Call</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section id="solutions" className="py-24 px-4 scroll-mt-20">
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
        
        {/* Projects Section */}
        <section id="projects" className="py-24 px-4 bg-black/30 scroll-mt-20">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-violet-800 to-teal-400 bg-clip-text text-transparent">
              Recent Projects
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
              See the actual tools and solutions I've built to help businesses automate their workflows and increase their growth
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  <div className="absolute inset-0 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10" />
                  <div className="relative p-1">
                    {/* Loom video placeholder - replace with actual embed */}
                    <div className="w-full aspect-video bg-black/50 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500">Video Demo</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Latest Blog Post Section */}
        <section id="blog" className="py-24 px-4 scroll-mt-20">
          <div className="container mx-auto text-center">
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
                  <span className="relative text-white">View All Articles</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Schedule Section */}
        <section id="schedule" className="py-24 px-4 scroll-mt-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-violet-800 to-teal-400 bg-clip-text text-transparent">
              Schedule a Free Consultation
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Book a time to discuss how we can help automate your business processes and create custom growth solutions for your B2B company
            </p>
            
            {/* Cal.com Calendar Integration */}
            <div className="max-w-4xl mx-auto">
              <CalScheduler 
                calUsername={calUsername} 
                calLink="discovery-call" 
                className="h-[600px] mb-12"
              />
            </div>
          </div>
        </section>
        
        {/* Reviews Section */}
        <section id="reviews" className="py-24 px-4 bg-black/30 scroll-mt-20">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-violet-800 to-teal-400 bg-clip-text text-transparent">
              Client Success Stories
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
              Hear directly from clients about their experiences and results
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  <div className="absolute inset-0 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10" />
                  <div className="relative">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`} 
                          fill={i < review.rating ? 'currentColor' : 'none'} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4 italic">"{review.text}"</p>
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{review.name}</span>
                      <span className="text-gray-500 text-sm">{review.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-24 px-4 scroll-mt-20">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-violet-800 to-teal-400 bg-clip-text text-transparent">
                About Me
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 items-center mb-8">
                <div className="col-span-1">
                  {/* Profile image placeholder */}
                  <div className="w-48 h-48 md:w-full md:h-auto aspect-square rounded-full bg-gradient-to-r from-teal-500/30 to-violet-600/30 mx-auto overflow-hidden border-2 border-white/10"></div>
                </div>
                
                <div className="col-span-2 text-left">
                  <h3 className="text-2xl font-semibold text-teal-400 mb-4">Hi, I'm [Your Name]</h3>
                  <p className="text-gray-300 mb-4">
                    I'm a sales automation expert with over 10 years of experience helping B2B companies streamline their operations and boost growth. My background combines sales leadership, software development, and process optimization.
                  </p>
                  <p className="text-gray-300 mb-4">
                    I've helped dozens of companies automate their repetitive tasks, build scalable lead generation systems, and create more efficient sales processes that generate measurable ROI.
                  </p>
                  <div className="flex space-x-4 mt-6">
                    <Link
                      href="#schedule"
                      className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
                    >
                      <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-75 group-hover:opacity-100 blur-2xl transition-opacity" />
                      <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/60 to-violet-600/60 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="relative text-white">Book a Call</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
              href="#schedule"
              className="group relative inline-flex px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
            >
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/40 to-teal-500/40 opacity-75 group-hover:opacity-100 blur-2xl transition-opacity" />
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/60 to-teal-500/60 opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white">Schedule Now</span>
            </Link>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 px-4 border-t border-white/5">
          <div className="container mx-auto text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Generuss. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav links={navigationLinks} />
    </div>
  )
}

