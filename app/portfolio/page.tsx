"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CursorGradient } from "@/components/cursor-gradient"
import { GrassIcon } from "@/components/grass-icon"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, BarChart, Zap, Users, Database, Brain } from "lucide-react"

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

export default function Portfolio() {
  const [activeCompetency, setActiveCompetency] = useState(competencies[0].title)

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-gradient-to-b from-black via-black to-[#0A0A1E] z-0" />
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
                <GrassIcon className="w-6 h-6 mr-2" />
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
              href="#"
              className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white"
            >
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/10 to-violet-600/10 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-gray-300 group-hover:text-white">Get a Demo</span>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative inline-block"
            >
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-violet-400 to-teal-400 bg-clip-text text-transparent animate-gradient">
                Portfolio & Expertise
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg"
            >
              Discover my core competencies and representative achievements in sales optimization and process
              improvement
            </motion.p>
          </div>
        </section>

        {/* Core Competencies Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent"
            >
              Core Competencies
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {competencies.map((competency, index) => (
                  <motion.div
                    key={competency.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-300 bg-gray-900/50 backdrop-blur-md border-white/10 ${
                        activeCompetency === competency.title
                          ? "border-teal-500/50 shadow-md shadow-teal-500/10"
                          : "border-gray-800/50 hover:border-gray-700/50"
                      }`}
                      onClick={() => setActiveCompetency(competency.title)}
                    >
                      <CardHeader className="flex flex-row items-center space-x-4">
                        <competency.icon className="w-8 h-8 text-teal-400" />
                        <CardTitle className="text-white">{competency.title}</CardTitle>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <motion.div
                key={activeCompetency}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900/50 backdrop-blur-md rounded-lg p-6 border border-gray-800/50"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{activeCompetency}</h3>
                <p className="text-gray-300 mb-6">
                  {competencies.find((c) => c.title === activeCompetency)?.description}
                </p>
                <ul className="space-y-2">
                  {competencies
                    .find((c) => c.title === activeCompetency)
                    ?.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-teal-400 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-200">{detail}</span>
                      </li>
                    ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Representative Achievements Section */}
        <section className="py-24 px-4 bg-gray-900">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent"
            >
              Representative Achievements
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-gray-900/50 backdrop-blur-md border border-gray-800/50">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-white">{achievement.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{achievement.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

