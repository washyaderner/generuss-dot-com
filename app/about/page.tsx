import Link from "next/link"
import { CursorGradient } from "@/components/cursor-gradient"
import { Brain, Rocket, Bot, Code, LineChart, Zap, Users, BarChart, Music, Timer } from "lucide-react"

const milestones = [
  {
    year: "2007-Present",
    title: "Sales Leadership & Strategy",
    description: "Over 18 years of proven sales excellence, consistently ranking in top performance tiers and developing innovative sales processes."
  },
  {
    year: "2009-Present",
    title: "Automation & Integration Expert",
    description: "Transformed multi-day processes into hours through custom automation solutions and AI integration."
  },
  {
    year: "2023-Present",
    title: "AI & Technical Innovation",
    description: "Building cutting-edge solutions combining AI, automation, and business process optimization."
  },
  {
    year: "2010-Present",
    title: "Music Production & Audio Engineering",
    description: "15 years of audio engineering expertise, developing precision-focused workflows and complex signal processing systems."
  }
]

const keyAchievements = [
  {
    icon: Timer,
    title: "Process Optimization",
    description: "Created an automated commission calculating system to cut completion time down from 3 days to 2-3hrs.",
    impact: "90% time savings"
  },
  {
    icon: Rocket,
    title: "Maximizing Revenue",
    description: "$8.2M Increase in annual revenue at a Real Estate marketing firm, using my upsell strategy & scripting",
    impact: "Significant revenue growth"
  },
  {
    icon: Brain,
    title: "AI Agent Development",
    description: "Built an intelligent website AI agent that sets appointments and answers company questions for visitors",
    impact: "24/7 customer engagement"
  },
  {
    icon: Bot,
    title: "Performance Optimization",
    description: "Surpassed annual revenue target of $113,590 by achieving $146,278 through automation, streamlined call processes, and strategic upselling",
    impact: "28.8% above goal"
  }
]

export default function About() {
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
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                  Innovation Through Experience
                </span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-3xl mx-auto mb-8 text-lg">
              Combining AI expertise with music production and sales leadership to create innovative solutions that drive real results
            </p>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="relative bg-gray-900/50 backdrop-blur-md rounded-xl border border-white/10 p-8 md:p-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-teal-500/10 to-violet-600/10 blur-3xl opacity-50 rounded-full transform translate-x-1/4 -translate-y-1/4"></div>
              
              {/* Top section with image and intro paragraph */}
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                {/* Image - larger and more prominent */}
                <div className="md:w-[42%] flex-shrink-0">
                  <div className="relative rounded-xl overflow-hidden border-2 border-white/10 aspect-square">
                    <img 
                      src="/images/generuss-about-pfp.jpg" 
                      alt="Russ Gardner" 
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  </div>
                </div>
                
                {/* Introduction paragraph with heading */}
                <div className="md:w-[58%] flex items-center">
                  <div className="flex flex-col w-full">
                    <div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                          Who is Russ?
                        </span>
                      </h2>
                      <p className="text-lg leading-relaxed text-gray-300">
                        Hey, thanks for taking a deeper dive, I'm Russ. I'm a problem-solver at heart with 20 years of experience merging strategy, psychology, and technology to drive real results. My primary focus is building efficient AI-powered systems that optimize sales, streamline business operations, and boost profitability. There's also a creative edge to my work: I'm a self-taught music producer with 15+ years of experience crafting immersive soundscapes, spanning countless genres.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Full-width content below */}
              <div className="space-y-6 text-gray-300">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Business & AI Expertise</h3>
                  <p className="leading-relaxed">
                    Early in my sales career, I noticed our manager spending three days manually calculating commissions for four teams. Convinced there had to be a more efficient solution, I taught myself Excel from scratch using YouTube and Google. The result was a custom, fully automated tool that cut the process down from three days to just three hours—a 24x improvement. It took me only 4 months to build, with no prior Excel knowledge.
                  </p>
                  <p className="leading-relaxed">
                    From that point on, I've been creating automation tools—from Excel macros and custom GPT models, to integrated workflows using platforms like Cursor, Apify, Perplexity, and n8n. My drive for continuous improvement led me to explore AI-powered app and web development, culminating in solutions like this website you're on, an my current work in progress—"Hold My Brain," an app that transforms screenshots, videos, and links into readable summaries and searchable knowledge in a seconds.
                  </p>
                  
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                      <span><span className="text-white font-semibold">Sales Strategy & Systems:</span> I combine years of top-tier sales experience with a knack for identifying bottlenecks. The result? Streamlined processes that let teams focus on what matters most—increasing conversions and revenue.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                      <span><span className="text-white font-semibold">AI Automation & Development:</span> From Excel-based automation to robust web/app solutions, I tailor custom workflows that improve efficiency and empower teams to accomplish more with less.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                      <span><span className="text-white font-semibold">Customized Solutions:</span> Whether it's a quick workflow fix or a full-scale platform build, I zero in on the fastest path to measurable ROI—using the right tools for each unique challenge.</span>
                    </li>
                  </ul>
                  
                  <h3 className="text-xl font-bold text-white mt-6">Music Production</h3>
                  <p className="leading-relaxed">
                    On the creative side, I've spent over a decade producing music that blends technical precision, and abstract experimentation. I thrive on pushing boundaries—capturing deep emotions in fresh, innovative sound designs. My workflow emphasizes:
                  </p>
                  
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                      <span><span className="text-white font-semibold">Organization & Efficiency:</span> I maintain a live-updated file-sharing system, so you'll always have instant access to the latest versions.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                      <span><span className="text-white font-semibold">Honest Feedback & Collaboration:</span> Open communication is key to ensuring that each project hits the right creative mark.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                      <span><span className="text-white font-semibold">Expansive Resources:</span> With a robust gear collection and access to talented musicians, I deliver professional, high-quality productions that stand out.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                      <span><span className="text-white font-semibold">Promotional Support:</span> When your track is ready, I can also assist with promotion and distribution, going beyond production to help you reach your audience.</span>
                    </li>
                  </ul>
                  
                  <h3 className="text-xl font-bold text-white mt-6">Why Work With Me</h3>
                  <p className="leading-relaxed">
                    I've been fortunate to see firsthand how both data-driven strategy and unbridled creativity can elevate a project. Whether I'm building an AI-based sales automation tool or producing a track that captures raw emotion, I bring the same dedication to innovation, efficiency, and quality.
                  </p>
                  <p className="leading-relaxed">
                    The possibilities in today's digital landscape are endless—and the clock is ticking for anyone who wants to stay ahead. Let's redefine the way you do business, unleash your creative potential, or both. I'm here to help you adapt, thrive, and stand out in a world driven by rapid change.
                  </p>
                  <p className="leading-relaxed italic">
                    Thanks again for stopping by!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Journey */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                Professional Journey
              </span>
            </h2>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="relative flex items-start group"
                >
                  <div className="absolute top-0 left-8 h-full w-px bg-gradient-to-b from-teal-500/50 to-violet-600/50" />
                  <div className="absolute top-0 left-6 w-6 h-6 rounded-full bg-gradient-to-r from-teal-500 to-violet-600" />
                  <div className="ml-20">
                    <h3 className="text-white text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-teal-400 text-sm mb-2">{milestone.year}</p>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Achievements */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 to-teal-900/20 opacity-50" />
          <div className="container mx-auto relative">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                Key Achievements
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {keyAchievements.map((achievement, index) => (
                <div
                  key={index}
                  className="group relative p-8 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.01]"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  <div className="absolute inset-0 rounded-xl bg-gray-900/50 backdrop-blur-md border border-white/10" />
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-teal-500/20">
                        <achievement.icon className="w-6 h-6 text-teal-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{achievement.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-4">{achievement.description}</p>
                    <div className="inline-block px-3 py-1 rounded-full text-sm bg-teal-500/20 text-teal-300">
                      {achievement.impact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Areas */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                Areas of Expertise
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-teal-400" />
                  Technical Innovation
                </h3>
                <ul className="space-y-2">
                  <li className="text-gray-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                    AI Integration & Development
                  </li>
                  <li className="text-gray-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                    Process Automation
                  </li>
                  <li className="text-gray-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                    Web Application Development
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-teal-400" />
                  Business Strategy
                </h3>
                <ul className="space-y-2">
                  <li className="text-gray-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                    Sales Process Optimization
                  </li>
                  <li className="text-gray-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                    Team Performance Enhancement
                  </li>
                  <li className="text-gray-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                    Strategic Consulting
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Music className="w-5 h-5 text-teal-400" />
                  Creative Excellence
                </h3>
                <ul className="space-y-2">
                  <li className="text-gray-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                    Audio Production & Engineering
                  </li>
                  <li className="text-gray-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                    Creative Problem Solving
                  </li>
                  <li className="text-gray-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                    Quality Assurance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Experience */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 to-teal-900/20 opacity-50" />
          <div className="container mx-auto relative">
            <div className="max-w-5xl mx-auto space-y-24">
              {/* Sales Leadership */}
              <div className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-white/10 p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-lg bg-teal-500/20">
                    <BarChart className="w-8 h-8 text-teal-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">18 Years in Sales Leadership</h3>
                </div>
                <div className="space-y-6 text-gray-300">
                  <p className="text-lg leading-relaxed">
                    Since 2007, I've been at the forefront of sales innovation, consistently ranking among top performers 
                    while developing and implementing transformative sales processes. My approach combines deep psychological 
                    insights with data-driven strategies, enabling teams to achieve exceptional results with less effort.
                  </p>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-white font-semibold mb-4">Strategic Innovations</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Developed scalable sales frameworks that reduced training time by 60% while improving conversion rates</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Created automated follow-up systems that increased customer engagement by 40%</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Implemented psychological principles in sales scripts, leading to 25% higher close rates</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Transformed $148 routine sale into $4,000 high-value commitment through strategic upselling</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Reduced bonus tracking time from 3 days to 3 hours for 40+ person sales team</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-4">Leadership Impact</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Mentored over 50 sales representatives to exceed their quotas</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Developed performance tracking systems that increased team visibility and motivation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Created comprehensive training programs that reduced ramp-up time by 45%</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Coached underperforming rep to exceed 300% of quota in under two weeks</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Consistently ranked in top 3% of 2,000+ sales representatives</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audio Engineering */}
              <div className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-white/10 p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-lg bg-teal-500/20">
                    <Music className="w-8 h-8 text-teal-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">15 Years in Audio Engineering</h3>
                </div>
                <div className="space-y-6 text-gray-300">
                  <p className="text-lg leading-relaxed">
                    Since 2010, I've been immersed in the world of audio production, developing a keen ear for detail and 
                    mastering complex signal processing systems. This experience has honed my ability to manage intricate 
                    technical workflows and optimize multi-layered systems for peak performance.
                  </p>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-white font-semibold mb-4">Technical Mastery</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Developed advanced signal processing chains for optimal audio quality</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Mastered complex DAW automation for efficient workflow management</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Created custom processing templates for consistent, high-quality output</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Built automated mastering workflows for streamlined production processes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Designed modular signal chains for rapid workflow adaptation</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-4">Transferable Skills</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Pattern recognition and problem-solving in complex systems</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Attention to detail in multi-layered technical environments</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Workflow optimization and automation expertise</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Quality assurance and precision in complex technical systems</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Creative problem-solving in technical environments</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Innovation */}
              <div className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-white/10 p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-lg bg-teal-500/20">
                    <Bot className="w-8 h-8 text-teal-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">AI & Automation Innovation</h3>
                </div>
                <div className="space-y-6 text-gray-300">
                  <p className="text-lg leading-relaxed">
                    Combining my experience in sales and audio engineering with cutting-edge technology, I create 
                    innovative solutions that bridge the gap between human expertise and machine efficiency. My unique 
                    background enables me to approach technical challenges with both analytical rigor and creative insight.
                  </p>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-white font-semibold mb-4">Technical Solutions</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Developed AI-powered knowledge management systems</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Created automated workflow systems for sales and content generation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Built custom integration solutions for complex business processes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Developing Hold My Brain with GPT-4o and Whisper AI integration</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Created custom calculators and note generators for multiple sales teams</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-4">Innovation Impact</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Reduced manual workload by up to 90% through intelligent automation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Improved decision-making through AI-enhanced data analysis</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Enhanced team productivity through streamlined processes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Achieved 80% faster information retrieval with AI-powered systems</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2 mt-2" />
                          <span>Integrated n8n, Apify, and AI tools for seamless workflow automation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
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
                  Let's Create Something Next Level
                </span>
              </h2>
              <p className="text-gray-400 mb-8">
                Whether you're looking to optimize your sales process, automate workflows, or build innovative solutions,
                I bring a unique blend of technical expertise and creative insight to every project.
              </p>
              <Link
                href="/contact"
                className="group relative inline-flex px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white bg-black/40"
              >
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-75 group-hover:opacity-100 blur-2xl transition-opacity" />
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/60 to-violet-600/60 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-white">Send a message</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

