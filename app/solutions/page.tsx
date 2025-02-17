import Link from "next/link"
import { Palette, Zap, Calculator, Music2, Cog, LineChart } from "lucide-react"
import { CursorGradient } from "@/components/cursor-gradient"
import { GrassIcon } from "@/components/grass-icon"

const solutions = [
  {
    icon: LineChart,
    title: "Sales Flow Optimization",
    description:
      "Seamlessly integrate proven sales script structuring and AI into your sales flow, reducing manual tasks while increasing conversion rates.",
  },
  {
    icon: Cog,
    title: "Business Automation",
    description:
      "Replace repetitive workflows with custom, data-driven automations that let your team focus on closing deals.",
  },
  {
    icon: Palette,
    title: "Web Design",
    description:
      "Create stunning, responsive websites that capture your brand's essence and deliver exceptional user experiences.",
  },
  {
    icon: Calculator,
    title: "Excel Efficiency",
    description:
      "Transform complex spreadsheets into streamlined tools with custom formulas, macros, and automated workflows.",
  },
  {
    icon: Music2,
    title: "Music Production",
    description: "Professional audio production services, from composition and recording to mixing and mastering.",
  },
  {
    icon: Zap,
    title: "Performance Consulting",
    description:
      "Data-driven insights and strategic recommendations to optimize your business operations and boost performance.",
  },
]

export default function Solutions() {
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
                <Link href="/russipes" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Russipes
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
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-violet-400 to-teal-400 bg-clip-text text-transparent animate-gradient">
                Our Solutions
              </h1>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
              Discover how we can transform your business operations
            </p>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="group relative p-8 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  <div className="absolute inset-0 rounded-xl bg-gray-900/50 backdrop-blur-md border border-white/10" />
                  <div className="relative flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-teal-500/20">
                        <solution.icon className="w-6 h-6 text-teal-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{solution.title}</h3>
                    </div>
                    <p className="text-gray-400 flex-grow">{solution.description}</p>
                    <div className="mt-6">
                      <Link
                        href="#"
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

