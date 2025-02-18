import Link from "next/link"
import { Brain, Zap, Users, Code } from "lucide-react"
import { CursorGradient } from "@/components/cursor-gradient"
import { GrassIcon } from "@/components/grass-icon"

export default function Page() {
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
                Russell Gardner
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="#solutions" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Solutions
                </Link>
                <Link href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
            <Link
              href="#contact"
              className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white"
            >
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white">Let's Connect</span>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4" id="hero">
          <div className="container mx-auto text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-violet-400 to-teal-400 bg-clip-text text-transparent animate-gradient">
                Building Digital Solutions That Matter
              </h1>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
              Full-stack developer specializing in modern web applications, automation, and innovative software solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#solutions"
                className="group relative px-8 py-3 rounded-md font-medium transition-all duration-300 ease-out hover:text-white"
              >
                <span className="absolute inset-0 w-full h-full rounded-md bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all" />
                <span className="relative text-white">View My Work</span>
              </Link>
              <Link
                href="#contact"
                className="group relative px-8 py-3 rounded-md font-medium transition-all duration-300 ease-out hover:text-white"
              >
                <span className="absolute inset-0 w-full h-full rounded-md bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all" />
                <span className="relative text-white">Get in Touch</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-24 px-4" id="solutions">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">What I Do</h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
              I specialize in building modern web applications and automation solutions that help businesses scale. 
              With expertise in full-stack development and a focus on clean, maintainable code, I create solutions 
              that drive real business value.
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

        {/* CTA Section */}
        <section className="py-24 px-4" id="contact">
          <div className="container mx-auto text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative">
                <span className="bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">
                  Let's Build Something Amazing Together
                </span>
              </h2>
            </div>
            <p className="text-gray-400 max-w-3xl mx-auto mb-8 text-sm md:text-base">
              Whether you need a new web application, want to optimize your existing systems, or are looking to 
              automate your workflows—I'm here to help. Let's discuss your project and find the best solution 
              for your needs.
            </p>
            <Link
              href="mailto:contact@generuss.com"
              className="group relative inline-flex px-8 py-3 rounded-md font-medium transition-all duration-300 ease-out hover:text-white"
            >
              <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500 to-violet-600 opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white">Contact Me</span>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12 px-4 relative" id="footer">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Russell Gardner</h3>
                <p className="text-gray-400 text-sm">Full-stack developer building modern web solutions.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Services</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#solutions" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Web Development
                    </Link>
                  </li>
                  <li>
                    <Link href="#solutions" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Automation Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="#solutions" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Technical Consulting
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#about" className="text-gray-400 hover:text-white text-sm transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <Link
                    href="https://github.com/washyaderner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                  <Link 
                    href="https://www.linkedin.com/in/russell-gardner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Russell Gardner. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

const solutions = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Modern, responsive web applications built with Next.js, React, and TypeScript. Focus on clean code and exceptional user experience.",
  },
  {
    icon: Zap,
    title: "Automation Solutions",
    description:
      "Custom automation workflows that streamline processes and boost efficiency. Expertise in API integration and process optimization.",
  },
  {
    icon: Brain,
    title: "Technical Architecture",
    description:
      "Strategic technical planning and system design. Building scalable solutions that grow with your business needs.",
  },
  {
    icon: Users,
    title: "Technical Consulting",
    description:
      "Expert guidance on technology decisions, best practices, and implementation strategies for your development projects.",
  },
]

