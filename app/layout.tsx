import { CursorGradient } from "@/components/cursor-gradient"
import { NavLink } from "@/components/nav-link"
import { MobileNav } from "@/components/mobile-nav"
import Link from "next/link"
import "./globals.css"
import type React from "react"
import { Toaster } from "sonner"

export const metadata = {
  title: "GeneRuss",
  description: "Build Fast & Touch Grass - AI-powered sales solutions",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
    other: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ]
  },
  manifest: '/site.webmanifest'
}

const navigationLinks = [
  { href: "/solutions", label: "Solutions" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-96x96.png" sizes="96x96" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <Toaster richColors position="top-right" />
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
                  <div className="block sm:hidden">
                    <MobileNav links={navigationLinks} />
                  </div>
                  <NavLink 
                    href="/"
                    className="hidden sm:flex"
                  >
                    Home
                  </NavLink>
                  <nav className="hidden md:flex items-center space-x-6">
                    {navigationLinks.map((link) => (
                      <NavLink key={link.href} href={link.href}>
                        {link.label}
                      </NavLink>
                    ))}
                  </nav>
                </div>
                <Link
                  href="/contact"
                  className="hidden sm:flex group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white"
                >
                  <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
                  <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-white">Get a Demo</span>
                </Link>
              </div>
            </header>

            {children}

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 px-4 relative">
              <div className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-white font-semibold mb-4">Russell Gardner</h3>
                    <p className="text-gray-400 text-sm">Software solutions for the digital age</p>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-4">Solutions</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                          Sales Optimization
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                          Web Design
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                          n8n Automation
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-4">Company</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                          About
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
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
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        <span className="sr-only">Twitter</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </Link>
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors">
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
      </body>
    </html>
  )
}

import './globals.css'