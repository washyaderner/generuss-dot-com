import Link from "next/link"
import { Rocket, Bot, Code, UserPlus, Music } from "lucide-react"
import { CursorGradient } from "@/components/cursor-gradient"

const solutions = [
  {
    id: "business-automation",
    icon: Bot,
    title: "Business & Content Automation",
    description: [
      "Automation isn't just about saving time—it's about removing bottlenecks, increasing efficiency, and amplifying results. I design custom automation systems that optimize sales workflows, streamline operations, and enhance content production, allowing businesses to focus on growth instead of manual tasks.",
      
      "By integrating n8n, Apify, Loom, GPT-4o, Claude, Perplexity, Google Sheets, and PandaDoc, I build solutions that handle data processing, lead management, content generation, and sales enablement—all without the repetitive work. Whether you're looking to automate deal flow, create high-quality social content at scale, or build smarter sales systems, I deliver custom-tailored automation that drives measurable results."
    ],
    features: [
      "Workflow automation",
      "Content generation systems",
      "Business process optimization",
      "Integration solutions",
      "Data processing pipelines",
      "Lead management automation"
    ],
    portfolioLink: "/portfolio#content-generation"
  },
  {
    id: "sales-strategy",
    icon: Rocket,
    title: "Sales Strategy & Systems",
    description: [
      "Sales isn't just about persuasion—it's about structure, psychology, and efficiency. With over a decade of experience, I've built and refined sales strategies that maximize conversions, eliminate inefficiencies, and keep teams in a winning mindset. Whether it's training reps to handle objections with ease, designing automation tools that cut wasted time, or crafting high-impact scripts, my approach is built on results.",
      
      "I don't believe in guesswork. My training and tools are based on tested methods that have consistently placed me in the top 3% of 2,000 sales reps for three consecutive years. If you're looking to increase close rates, scale your sales process, and build a team that operates like a well-oiled machine, let's get to work."
    ],
    features: [
      "Sales process optimization",
      "Team training systems",
      "Automated follow-up sequences",
      "Performance analytics",
      "Objection handling scripts",
      "Conversion optimization"
    ],
    portfolioLink: "/portfolio#sales-acceleration"
  },
  {
    id: "lead-generation",
    icon: UserPlus,
    title: "Personalized Lead Generation",
    description: [
      "I combine powerful lead scraping tools with AI-powered automation systems to create highly personalized cold email campaigns that deliver exceptional results. By gathering and analyzing prospect data intelligently, I'm able to create outreach that feels individually crafted, even at scale.",
      
      "This approach generates extremely high conversion rates while requiring minimal ongoing effort. The systems I build continue working in the background, identifying ideal prospects, personalizing communication, and maximizing response rates—all while you focus on closing deals rather than hunting for them."
    ],
    features: [
      "Multi-platform lead scraping and enrichment",
      "AI-powered personalization engines",
      "Automated outreach sequences",
      "Response pattern analysis",
      "A/B testing frameworks",
      "Conversion optimization strategies"
    ],
    portfolioLink: "/portfolio#lead-generation"
  },
  {
    id: "app-web-dev",
    icon: Code,
    title: "AI-Powered App & Web Development",
    description: [
      "I build fast, intelligent, and scalable apps and websites, including generuss.com, combining Next.js, Swift, AI-powered automation, and modern UI/UX principles. My approach focuses on minimalism, functionality, and adaptability, ensuring that every project is optimized for both performance and user experience.",
      
      "One of my latest projects, Hold My Brain, transforms screenshots, videos, audio, and links into a structured, searchable knowledge base. By leveraging GPT-4o, OCR (VisionKit), Whisper AI, and Next.js, it distills content into actionable summaries, making information retrieval effortless. If you're looking for custom AI-powered tools, web apps, or automation solutions, I build systems that work the way you think."
    ],
    features: [
      "Custom web applications",
      "AI integration",
      "Responsive design",
      "Performance optimization",
      "Modern UI/UX principles",
      "Scalable architecture"
    ],
    portfolioLink: "/portfolio#hold-my-brain"
  },
  {
    id: "music-production",
    icon: Music,
    title: "Music Production",
    description: [
      "With over a decade of experience in music production, I bring a unique blend of technical expertise and creative vision to every project. From composition and arrangement to mixing and mastering, I create professional-quality tracks that resonate with listeners while maintaining the artist's authentic sound and vision.",
      
      "My approach combines traditional production techniques with cutting-edge tools and AI assistance for tasks like stem separation, intelligent mastering, and audio restoration. Whether you're looking to produce a single track, score for media, or develop a comprehensive sonic identity for your brand, I deliver premium audio that stands out in today's crowded soundscape."
    ],
    features: [
      "Full-service music production",
      "Composition and arrangement",
      "Professional mixing and mastering",
      "Sound design and audio branding",
      "AI-assisted audio processing",
      "Commercial-ready deliverables"
    ],
    portfolioLink: "/portfolio#music-production"
  }
]

export default function Solutions() {
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
              <Link
                href="/"
                className="text-xl font-semibold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent flex items-center"
              >
                Home
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/solutions" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Solutions
                </Link>
                <Link href="/portfolio" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Portfolio
                </Link>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
            <Link
              href="#calendar"
              className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white"
            >
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white">Book a Call</span>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-teal-400">
                  Solutions
                </span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
              Every business is different, so each solution is specifically tailored to your needs. When you book a demo, we'll strategize with you to ensure we deliver a solution that exceeds your expectations.
            </p>
          </div>
        </section>

        {/* Solutions Stack */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col space-y-16 max-w-4xl mx-auto">
              {solutions.map((solution, index) => (
                <div
                  id={solution.id}
                  key={index}
                  className="group relative p-8 md:p-10 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.01]"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  <div className="absolute inset-0 rounded-xl bg-gray-900/50 backdrop-blur-md border border-white/10" />
                  <div className="relative flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-lg bg-teal-500/20">
                        <solution.icon className="w-8 h-8 text-teal-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">{solution.title}</h3>
                    </div>
                    <div className="space-y-8 mb-8">
                      {solution.description.map((paragraph, idx) => (
                        <p key={idx} className="text-gray-300 text-lg leading-relaxed tracking-wide">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <Link
                        href={solution.portfolioLink}
                        className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        Learn more
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

