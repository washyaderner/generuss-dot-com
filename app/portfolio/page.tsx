"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { CursorGradient } from "@/components/cursor-gradient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, BarChart, Zap, Users, Database, Brain, Bot, Rocket, TableProperties, Code, LineChart, MessageSquare } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"

// Smooth scroll utility function
const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (href.startsWith('#')) {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const competencies = [
  {
    title: "Sales Process Optimization",
    icon: BarChart,
    description:
      "Over a decade of remote sales work, covering strategic account development, cold outreach, and one-call closing.",
    details: [
      "Real-World B2B Experience",
      "Immediate Impact: Developed customized scripts and workflows that deliver measurable results quickly—no fluff, just practical improvements.",
    ],
  },
  {
    title: "Automation & Technical Integration",
    icon: Zap,
    description: "Proficient with platforms like n8n, Excel, and AI-driven solutions to streamline repetitive tasks.",
    details: [
      "Multi-Tool Expertise",
      "Dramatic Time Savings: Transformed multi-day processes into a matter of hours by creating custom calculators, note generators, and automated workflows.",
    ],
  },
  {
    title: "Training & Team Development",
    icon: Users,
    description:
      "Known for coaching underperforming reps to exceed their targets through enhanced scripting, real-time feedback, and data-driven strategies.",
    details: [
      "Rapid Performance Gains",
      "Leadership & Structure: Experienced in running team training sessions, setting clear performance frameworks, and driving consistent metrics.",
    ],
  },
  {
    title: "CRM Evaluation & Refinement",
    icon: Database,
    description: "Identify weak spots in CRM systems and rework them to align with long-term sales goals.",
    details: [
      "Efficiency-Focused",
      "Reduced Clutter: Eliminate unnecessary steps, simplify data entry, and ensure reps spend time on the highest-value activities.",
    ],
  },
  {
    title: "Strategic Consulting & Performance Guarantees",
    icon: Brain,
    description: "Start with in-depth analysis and develop custom solutions based on actual needs—not guesswork.",
    details: [
      "Thorough Assessments",
      "Skin in the Game: Offer performance-based guarantees that tie fees to agreed-upon KPIs and tangible results.",
    ],
  },
]

const achievements = [
  {
    title: "Accelerated Bonus Tracking",
    description:
      "Time Cut from 3 Days to 3 Hours: Revamped a bonus-tracking workbook for a 40+ person sales floor, saving over 90% of the usual processing time.",
  },
  {
    title: "Significant Sales Upsell",
    description:
      "$148 to $4,000: Turned a routine monthly sale into a high-value six-month commitment by applying proven upselling strategies and deep knowledge of sales psychology.",
  },
  {
    title: "Team Performance Turnaround",
    description:
      "From 20% to 300%+: Helped an underperforming rep surpass triple their quota in under two weeks through optimized scripts, targeted coaching, and improved follow-up processes.",
  },
  {
    title: "Targeted Automation Tools",
    description:
      "Custom Calculators & Note Generators: Built simplified dropdown-based calculators and note templates for multiple reps, cutting repetitive tasks and improving accuracy across the board.",
  },
]

const projects = [
  {
    id: "personalized-lead-enrichment",
    title: "Personalized Lead Gen & Enrichment",
    category: "Sales Automation & Lead Intelligence",
    description: "This automation transforms cold outreach from a copy-paste empty feel, to a deeply enriched and personalized approach. What it does is pulls leads from Apollo scraped via Apify, and enriches it with LeadMagic's comprehensive LinkedIn profile information. \n\nThe system then leverages advanced AI to generate tailored email components—from attention-grabbing subject lines to personalized ice breakers based on the lead's career history, role, and interests. The result is a frictionless system that delivers highly customized outreach for thousands of prospects, dramatically improving reply rates and conversion metrics. \n\nUnlike generic mail merge tools, this solution creates genuinely individualized communications that resonate with decision-makers, making each interaction feel personally crafted rather than mass-produced. This approach focuses high quality copy in sections, rather than telling an LLM to just blurt out the whole thing. The result is a massive increase in conversion rates.",
    impact: [
      "50-300% improvement in cold email reply rates",
      "Scalable personalization for thousands of leads",
      "Elimination of manual research & writing time",
      "Higher-quality conversations with genuinely interested prospects"
    ],
    technologies: ["n8n", "OpenAI", "Apollo", "LeadMagic API", "Google Sheets"],
    icon: Users
  },
  {
    id: "ai-agent-chatbot",
    title: "3rd-Party AI Chat Solutions",
    category: "Platform-Based Chatbots",
    description: "Third-party AI chatbots from platforms like n8n are popular because they can answer customer questions and schedule appointments without custom development. They're easy to set up and demonstrate, but come with significant limitations in terms of customization and brand integration. While these solutions make for impressive demos, they often create a disconnect in user experience, as they don't fully match your website's design language. The implementation shown above demonstrates both the appeal and limitations of these plug-and-play options. For a more integrated approach that truly becomes part of your website, scroll down to see our Native AI Chat Integration, which delivers a seamless experience while maintaining complete design control.",
    impact: [
      "Quick implementation with minimal coding",
      "Pre-built conversation flows",
      "Managed infrastructure without hosting concerns",
      "Basic appointment scheduling capabilities"
    ],
    technologies: ["n8n", "OpenAI", "Claude", "Next.js", "Google Calendar API"],
    icon: Bot
  },
  {
    id: "native-chat-bot",
    title: "Native AI Chat Integration",
    category: "AI Integration",
    description: "A superior alternative to n8n AI agent chatbots, this native implementation delivers a seamless, branded experience directly integrated into the website. Unlike webhook-based solutions that require complex n8n workflow configuration and introduce latency, this approach provides instant responses and reliable performance.\n\nThe native chat bot maintains full conversation context and supports rich features like typing indicators and notification badges. It can be styled to match your brand perfectly and loads efficiently as part of the site bundle.\n\nBy eliminating the n8n middleware layer, this solution reduces complexity while improving reliability. The direct OpenAI integration enables faster responses and better error handling, creating a premium user experience.",
    impact: [
      "Instant response times vs 2-3s webhook delays",
      "Zero configuration complexity",
      "Full conversation context retention",
      "Seamless brand integration"
    ],
    technologies: ["Next.js", "OpenAI API", "React", "Local Storage", "Framer Motion", "Google Calendar API"],
    icon: MessageSquare
  },
  {
    id: "hold-my-brain",
    title: "Hold My Brain",
    category: "AI-Powered Knowledge Management",
    description: "An intelligent knowledge management system that transforms various content types into structured, searchable insights.",
    impact: [
      "Reduces information retrieval time by 80%",
      "Automates content summarization",
      "Seamlessly integrates with existing workflows"
    ],
    technologies: ["Next.js", "GPT-4o", "VisionKit", "Whisper AI", "Swift"],
    icon: Brain
  },
  {
    id: "excel-dashboard",
    title: "Excel Performance Dashboard",
    category: "Business Intelligence",
    description: "Bundle calculator, automated note taker, and clear cells macro, all in one.",
    impact: [
      "Complex pricing calculations on the fly",
      "Proven increase in call flow efficiency",
      "25% increase in one call close retention KPIs"
    ],
    technologies: ["Excel", "VBA", "VLOOKUP", "Concatenate"],
    icon: LineChart
  },
  {
    id: "sales-acceleration",
    title: "Sales Acceleration Suite (coming soon!)",
    category: "Sales Automation",
    description: "A comprehensive sales automation system that streamlined operations for a mid-sized tech company.",
    impact: [
      "Increased close rates by 45%",
      "Reduced manual data entry by 90%",
      "Automated lead scoring and prioritization"
    ],
    technologies: ["Excel VBA", "Python", "GPT-4", "n8n", "PandaDoc"],
    icon: Rocket
  },
  {
    id: "content-generation",
    title: "Content Generation Engine (coming soon!)",
    category: "AI Content Automation",
    description: "An AI-powered system for generating and managing marketing content at scale.",
    impact: [
      "10x increase in content output",
      "Maintained consistent brand voice",
      "Reduced content creation costs by 60%"
    ],
    technologies: ["Claude", "GPT-4", "n8n", "Next.js", "Perplexity"],
    icon: Bot
  }
]

const navigationLinks = [
  { href: "#solutions", label: "Solutions" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "#about", label: "About" },
  { href: "#schedule", label: "Book a Call" },
]

export default function Portfolio() {
  const [activeCompetency, setActiveCompetency] = useState(competencies[0].title)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const loadYouTubeVideo = () => {
    setVideoLoaded(true)
  }

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
                <span className="hidden sm:inline">Home</span>
              </Link>
              <nav className="hidden md:flex space-x-6">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={link.href.startsWith('#') ? (e) => scrollToSection(e, link.href) : undefined}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="#schedule"
                onClick={(e) => scrollToSection(e, '#schedule')}
                className="hidden sm:flex px-4 py-2 rounded-md text-sm font-medium bg-teal-500 hover:bg-teal-400 text-white transition-colors"
              >
                <span className="relative">Book a Call</span>
              </Link>
              <MobileNav links={navigationLinks} />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-teal-400">
                  Portfolio
                </span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
              Real projects, real results—explore how we've helped businesses transform their operations with AI and automation
            </p>
          </div>
        </section>

        {/* Featured AI Agent Card */}
        <section className="pb-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <div
                id={projects[0].id}
                className="group relative p-4 sm:p-8 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.01] mb-12"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <div className="absolute inset-0 rounded-xl bg-gray-900/50 backdrop-blur-md border border-white/10" />
                <div className="relative">
                  {/* Image Section - Now at the top */}
                  <div className="w-full mb-6 rounded-lg overflow-hidden">
                    <div className="relative w-full pt-[45%]"> {/* 16:9 aspect ratio */}
                      <Image
                        src="/images/Personalized-Lead-Enrichment.png"
                        alt="AI-Powered Lead Personalization Engine"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                  </div>
                  
                  {/* Header with icon, title and category */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-teal-500/20 shrink-0">
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
                    </div>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <h3 className="text-xl sm:text-2xl font-semibold text-white">{projects[0].title}</h3>
                        <span className="inline-block text-sm px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 whitespace-nowrap">
                          {projects[0].category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-gray-300 text-base sm:text-lg">
                      This automation transforms cold outreach from a copy-paste empty feel, to a deeply enriched and personalized approach. What it does is pulls leads from Apollo scraped via Apify, and enriches it with LeadMagic's comprehensive LinkedIn profile information.
                    </p>
                    <p className="text-gray-300 text-base sm:text-lg mt-4">
                      The system then leverages advanced AI to generate tailored email components—from attention-grabbing subject lines to personalized ice breakers based on the lead's career history, role, and interests. The result is a frictionless system that delivers highly customized outreach for thousands of prospects, dramatically improving reply rates and conversion metrics.
                    </p>
                    <p className="text-gray-300 text-base sm:text-lg mt-4">
                      Unlike generic mail merge tools, this solution creates genuinely individualized communications that resonate with decision-makers, making each interaction feel personally crafted rather than mass-produced. This approach focuses high quality copy in sections, rather than telling an LLM to just blurt out the whole thing. The result is a massive increase in conversion rates.
                    </p>
                  </div>
                  
                  {/* Two column layout for Impact and Tech */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-white font-medium mb-2 sm:mb-3">Impact</h4>
                      <ul className="space-y-2">
                        {projects[0].impact.map((item, idx) => (
                          <li key={idx} className="flex items-start text-sm sm:text-base text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-1.5" />
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2 sm:mb-3">Tech</h4>
                      <div className="flex flex-wrap gap-2">
                        {projects[0].technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-white/5 text-gray-300 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* View demonstration link */}
                  <div className="flex justify-end">
                    <Link
                      href="#"
                      className="inline-flex items-center text-sm sm:text-base text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      View demonstration
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
              
              {/* AI Agent Card - Now the second card */}
              <div
                id={projects[1].id}
                className="group relative p-4 sm:p-8 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.01] mb-12"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <div className="absolute inset-0 rounded-xl bg-gray-900/50 backdrop-blur-md border border-white/10" />
                <div className="relative">
                  {/* Image Section - Now at the top */}
                  <div className="w-full mb-6 rounded-lg overflow-hidden">
                    <div className="relative w-full pt-[45%]"> {/* 16:9 aspect ratio */}
                      <Image
                        src="/images/AI-Agent-Chat-Bot.png"
                        alt="Third-Party AI Chat Solutions"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                  </div>
                  
                  {/* Header with icon, title and category */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-teal-500/20 shrink-0">
                      <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
                    </div>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <h3 className="text-xl sm:text-2xl font-semibold text-white">{projects[1].title}</h3>
                        <span className="inline-block text-sm px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 whitespace-nowrap">
                          {projects[1].category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-gray-300 text-base sm:text-lg">
                      Third-party AI chatbots from platforms like n8n are popular because they can answer customer questions and schedule appointments without custom development. They're easy to set up and demonstrate, but come with significant limitations in terms of customization and brand integration. While these solutions make for impressive demos, they often create a disconnect in user experience, as they don't fully match your website's design language.
                    </p>
                    <p className="text-gray-300 text-base sm:text-lg mt-4">
                      The implementation shown above demonstrates both the appeal and limitations of these plug-and-play options. For a more integrated approach that truly becomes part of your website, scroll down to see our Native AI Chat Integration, which delivers a seamless experience while maintaining complete design control.
                    </p>
                  </div>
                  
                  {/* Two column layout for Impact and Tech */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-white font-medium mb-2 sm:mb-3">Impact</h4>
                      <ul className="space-y-2">
                        {projects[1].impact.map((item, idx) => (
                          <li key={idx} className="flex items-start text-sm sm:text-base text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-1.5" />
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2 sm:mb-3">Tech</h4>
                      <div className="flex flex-wrap gap-2">
                        {projects[1].technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-white/5 text-gray-300 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* View demonstration link */}
                  <div className="flex justify-end">
                    <Link
                      href="#"
                      className="inline-flex items-center text-sm sm:text-base text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      View demonstration
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
            </div>
          </div>
        </section>

        {/* Superior Alternative Card - Now the third card */}
        <section className="pb-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <div
                id={projects[2].id}
                className="group relative p-4 sm:p-8 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.01] mb-12"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <div className="absolute inset-0 rounded-xl bg-gray-900/50 backdrop-blur-md border border-white/10" />
                <div className="relative">
                  {/* Image Section - Now at the top */}
                  <div className="w-full mb-6 rounded-lg overflow-hidden">
                    <div className="relative w-full pt-[45%]"> {/* 16:9 aspect ratio */}
                      <Image
                        src="/images/GeneRuss-Chat-Bot-Native.png"
                        alt="Native AI Chat Integration"
                        fill
                        className="object-cover object-right"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                  </div>
                  
                  {/* Header with icon, title and category */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-teal-500/20 shrink-0">
                      <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
                    </div>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <h3 className="text-xl sm:text-2xl font-semibold text-white">{projects[2].title}</h3>
                        <span className="inline-block text-sm px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 whitespace-nowrap">
                          {projects[2].category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-gray-300 text-base sm:text-lg">
                      While third-party AI chat solutions like n8n offer flashy interfaces, they come with significant drawbacks in customization, reliability, and brand coherence. Our custom-built native chat implementation solves these critical issues by integrating directly into your website's codebase. This approach provides pixel-perfect design control that matches your brand identity, eliminates dependency on external platforms, and allows for seamless user experiences with animations and transitions that feel like an organic part of your site.
                    </p>
                    <p className="text-gray-300 text-base sm:text-lg mt-4">
                      The technical architecture delivers direct OpenAI integration with a carefully crafted system prompt defining your business voice and context. Session management via localStorage provides conversation persistence, while comprehensive error handling ensures graceful fallbacks. Unlike third-party solutions that often feel bolted-on, this native implementation includes thoughtful UX features like typing indicators, notification badges, auto-scrolling messages, and mobile responsiveness—all while maintaining complete control over data privacy and security.
                    </p>
                  </div>
                  
                  {/* Two column layout for Impact and Tech */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-white font-medium mb-2 sm:mb-3">Impact</h4>
                      <ul className="space-y-2">
                        {projects[2].impact.map((item, idx) => (
                          <li key={idx} className="flex items-start text-sm sm:text-base text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-1.5" />
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2 sm:mb-3">Tech</h4>
                      <div className="flex flex-wrap gap-2">
                        {projects[2].technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-white/5 text-gray-300 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* View demonstration link */}
                  <div className="flex justify-end">
                    <Link
                      href="#"
                      className="inline-flex items-center text-sm sm:text-base text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      View demonstration
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
            </div>
          </div>
        </section>
      </div>

      {/* Creative Background Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 to-teal-900/20 opacity-50" />
        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-md rounded-xl border border-white/10 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                Where Technology Meets Creativity
              </span>
            </h2>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                With 15 years of music production experience, I bring a unique blend of technical precision and creative 
                problem-solving to every project. The same attention to detail required in mixing and mastering translates 
                directly to crafting efficient automation systems and optimizing business processes.
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-white font-semibold mb-3">Transferable Skills</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                      Precision and attention to detail
                    </li>
                    <li className="flex items-center text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                      Complex system optimization
                    </li>
                    <li className="flex items-center text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                      Technical troubleshooting
                    </li>
                    <li className="flex items-center text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                      Creative problem-solving
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Enhanced Capabilities</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                      Pattern recognition in complex data
                    </li>
                    <li className="flex items-center text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                      Workflow optimization expertise
                    </li>
                    <li className="flex items-center text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                      Quality assurance mindset
                    </li>
                    <li className="flex items-center text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                      Advanced technical proficiency
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Video Showcase */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-white/10 p-8">
            <h3 className="text-2xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                "Simulation" by Russ A Buss
              </span>
            </h3>
            <p className="text-gray-300 mb-6">
              AI Music Video Produced and Assembled frame-by-frame using Midjourney and Runway
            </p>
            <div className="relative pt-[56.25%] w-full overflow-hidden rounded-lg border border-white/10">
              {!videoLoaded ? (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black cursor-pointer"
                  onClick={loadYouTubeVideo}
                >
                  {/* Using local custom thumbnail image */}
                  <Image
                    src="/images/Simulation-Music-Video-Russ-A-Buss.png"
                    alt="AI-Generated Music Video thumbnail"
                    fill
                    className="object-contain md:object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition-colors z-10">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/QuvVf1xR_70?si=j15MwXUUjuiBAJv7&autoplay=1&rel=0" 
                  title="AI-Generated Music Simulation by Russell Gardner"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  loading="lazy"
                  frameBorder="0"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              )}
            </div>
            <div className="flex justify-end mt-3">
              <a 
                href="https://www.youtube.com/watch?v=QuvVf1xR_70" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-sm text-teal-400 hover:text-teal-300 transition-colors"
              >
                Open in YouTube
                <svg 
                  className="w-4 h-4 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                I'm looking forward to hearing from you!
              </span>
            </h2>
            <p className="text-gray-400 mb-8">
              The flood of possibilities AI brings to the business world is insane.<br />
              This means the competitive clock is ticking... <span className="italic">fast</span>.<br />
              Let's redefine the way your business operates before the competition catches up.
            </p>
            <Link
              href="#schedule"
              onClick={(e) => scrollToSection(e, '#schedule')}
              className="px-4 py-2 rounded-md text-sm font-medium bg-teal-500 hover:bg-teal-400 text-white transition-colors"
            >
              <span className="relative">Book a Call</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

