import Link from "next/link"
import { Zap, Star, ArrowRight, Bot, Rocket, UserPlus, Code, DollarSign, Target, Timer, TrendingUp, LineChart, Banknote, Book, BrainCircuit, Calendar, ChartBar, Clock, DatabaseZap, GitBranch, Laptop, Mail, MapPin, Megaphone, MessageSquare, Palette, Phone, Presentation, Settings, Sparkles, Terminal, Trophy, Users, Workflow } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { NavLink } from "@/components/nav-link"
import { getAllPosts } from "@/app/lib/contentful"
import FeaturedBlogPost from "@/app/components/blog/FeaturedBlogPost"
import { BlogPost } from "@/app/lib/contentful"
import { CalScheduler } from "@/components/CalScheduler"
import Image from 'next/image'
// Removed CachedImage import - using Next.js Image directly for better performance
import { CalendarEmbed } from "@/components/CalendarEmbed"
import { BackToTop } from "@/components/back-to-top"
import ClientAnimations, { SolutionsGrid, AnimatedPortfolio, AnimatedReviews } from "./components/ClientAnimations"

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





// Server-side Blog Section component
function BlogSection({ latestPost }: { latestPost: BlogPost | null }) {
  const showFallback = !latestPost;
  
  return (
    <section id="blog" className="py-24 px-4 bg-black/30 scroll-mt-20" aria-labelledby="latest-insights">
      <div className="container max-w-4xl mx-auto">
        <h2 
          id="latest-insights" 
          className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-violet-800 to-teal-400 bg-clip-text text-transparent"
        >
          Latest Insights
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
          Practical advice and strategies to level up your business and sales processes
        </p>
        
        {showFallback ? (
          // Fallback content when no blog posts available
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-xl border border-gray-800/50 overflow-hidden">
              <div className="relative">
                {/* Fallback background */}
                <div className="relative h-80 bg-gradient-to-br from-teal-500/20 to-violet-600/20">
                  <div className="absolute inset-0 bg-black/40" />
                  
                  {/* Overlay title on background */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-3 py-1 bg-teal-500/30 text-teal-300 text-xs rounded-full backdrop-blur-sm">Coming Soon</span>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-2 transition-colors drop-shadow-lg">
                      Blog Content Coming Soon
                    </h2>
                  </div>
                </div>
                
                {/* Content section */}
                <div className="p-8 relative z-10 flex flex-col">
                  <p className="text-gray-300 mb-8 text-lg">
                    Stay tuned for insights, tips, and strategies to elevate your sales and business processes. Our blog will feature expert advice and real-world case studies.
                  </p>
                  
                  <Link 
                    href="/blog"
                    className="self-end inline-flex items-center px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 rounded-lg transition-all"
                  >
                    <span>Visit Blog</span>
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
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/20 to-teal-500/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity pointer-events-none" />
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/40 to-teal-500/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <span className="relative text-white">Visit Blog</span>
              </Link>
            </div>
          </div>
        ) : (
          // Show actual blog post
          <>
            <FeaturedBlogPost post={latestPost} />
            
            <div className="flex justify-center mt-10">
              <Link
                href="/blog"
                className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
              >
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/20 to-teal-500/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity pointer-events-none" />
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-violet-600/40 to-teal-500/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <span className="relative text-white">View All Posts</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default async function Home() {
  // Fetch blog posts on the server
  let latestPost: BlogPost | null = null;
  try {
    const posts = await getAllPosts();
    latestPost = posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
  }
  
  return (
    <div className="min-h-screen bg-black">
      {/* All global backgrounds handled by FXCanvas */}

      {/* Content */}
      <div className="relative z-20">
        {/* Navigation */}
        <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-black/5">
          <div className="container max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <NavLink href="/">
                <div className="flex items-center">
                  <Image 
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
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity pointer-events-none" />
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
                className="px-4 py-2 rounded-md text-sm font-medium bg-teal-500 hover:bg-teal-400 text-white transition-colors"
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
            
            <AnimatedPortfolio projects={projects} />
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
            
            <AnimatedReviews reviews={reviews} />
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-24 px-4 scroll-mt-20">
          <div className="container max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="col-span-1">
                {/* Profile image */}
                <div className="w-48 h-48 md:w-full md:h-auto aspect-square rounded-full bg-gradient-to-r from-teal-500/30 to-violet-600/30 mx-auto overflow-hidden border-2 border-white/10">
                  <Image 
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
                <h3 className="text-2xl font-semibold text-teal-400 mb-4">Hey, I'm Russ</h3>
                <p className="text-gray-300 mb-4">
                  I'm a sales automation expert with over 10 years of experience helping B2B companies streamline their operations and boost growth. My background combines sales leadership, software development, and process optimization.
                </p>
                <p className="text-gray-300 mb-4">
                  I've helped dozens of companies automate their repetitive tasks, build scalable lead generation systems, and create more efficient sales processes that generate measurable ROI.
                </p>
                <div className="flex space-x-4 mt-6">
                  <NavLink
                    href="#schedule"
                    className="px-4 py-2 rounded-md text-sm font-medium bg-teal-500 hover:bg-teal-400 text-white transition-colors"
                  >
                    <span className="relative">Book a Call</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Blog Post Section - Server-side rendered */}
        <BlogSection latestPost={latestPost} />

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="w-full">
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity pointer-events-none" />
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
              className="px-4 py-2 rounded-md text-sm font-medium bg-teal-500 hover:bg-teal-400 text-white transition-colors"
            >
              <span className="relative">Book a Call</span>
            </NavLink>
          </div>
        </section>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav links={navigationLinks} />
      <BackToTop />
      <ClientAnimations />
    </div>
  )
} 