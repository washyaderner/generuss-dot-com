import { CursorGradient } from "@/components/cursor-gradient"
import { NavLink } from "@/components/nav-link"
import { MobileNav } from "@/components/mobile-nav"
import Link from "next/link"
import "./globals.css"
import type React from "react"
import { Toaster } from "sonner"
import NativeChatBot from "@/app/components/NativeChatBot"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: '%s | Generuss',
    default: 'Generuss | AI & Automation Solutions',
  },
  description: 'Accelerate your business with AI & Automation solutions from Generuss.',
  keywords: ['AI', 'Automation', 'Web Design', 'Digital Transformation', 'Generuss'],
  metadataBase: new URL('https://generuss.com/'),
  openGraph: {
    title: 'Generuss | AI & Automation Solutions',
    description: 'Accelerate your business with AI & Automation solutions.',
    url: 'https://generuss.com/',
    siteName: 'Generuss',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generuss | AI & Automation Solutions',
    description: 'Accelerate your business with AI & Automation solutions.',
    creator: '@generuss',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: `/favicon.ico?v=${Date.now()}` },
      { url: `/favicon-16x16.png?v=${Date.now()}`, sizes: '16x16', type: 'image/png' },
      { url: `/favicon-32x32.png?v=${Date.now()}`, sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: `/apple-touch-icon.png?v=${Date.now()}` },
    ],
  },
}

const navigationLinks = [
  { href: "/blog", label: "Blog" },
]

// Generate timestamp once for all resources to ensure consistent caching
const cacheBuster = `?v=${Date.now()}`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; frame-src 'self' https://app.cal.com https://cal.com https://*.cal.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://cal.com https://*.cal.com https://app.cal.com https://*.vercel.live https://*.googletagmanager.com; connect-src 'self' https://api.openai.com https://cal.com https://*.cal.com https://app.cal.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cal.com https://*.cal.com https://app.cal.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; object-src 'none'"
        />
        <link rel="icon" href={`/favicon.ico${cacheBuster}`} />
        <link rel="icon" href={`/favicon-96x96.png${cacheBuster}`} sizes="96x96" type="image/png" />
        <link rel="icon" href={`/favicon.svg${cacheBuster}`} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={`/apple-touch-icon.png${cacheBuster}`} />
        <link rel="manifest" href={`/site.webmanifest${cacheBuster}`} />
      </head>
      <body>
        <Toaster richColors position="top-right" />
        <div className="min-h-screen bg-black">
          <div className="fixed inset-0 bg-gradient-to-t from-[#0A0A1E] via-black to-black z-0" />
          <CursorGradient />

          {/* Gradient Overlay */}
          <div className="fixed inset-0 bg-gradient-radial from-transparent via-transparent to-black/80 pointer-events-none z-5" />

          {/* Content */}
          <div className="relative z-30">
            {/* Navigation */}
            <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-black/5">
              <div className="container max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
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
                  href="/#schedule"
                  className="hidden sm:flex group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white"
                >
                  <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" />
                  <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-white">Book a Call</span>
                </Link>
              </div>
            </header>

            {children}

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 px-4 relative">
              <div className="container max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <h3 className="text-white font-semibold mb-4">Russell Gardner</h3>
                    <p className="text-gray-400 text-sm">Software solutions for the digital age</p>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link href="/#schedule" className="text-gray-400 hover:text-white text-sm transition-colors">
                          Book a Call
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-4">Connect</h3>
                    <div className="flex space-x-4 justify-center">
                      <Link
                        href="https://github.com/washyaderner"
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Visit Russell Gardner's GitHub profile"
                        target="_blank" 
                        rel="noopener noreferrer"
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
                        href="https://twitter.com/DegeneRussAI" 
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Visit Russell Gardner's Twitter profile"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <span className="sr-only">Twitter</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </Link>
                      <Link 
                        href="https://www.upwork.com/freelancers/~0187db78cb531330b6" 
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Visit Russell Gardner's Upwork profile"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <span className="sr-only">Upwork</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path 
                            d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"
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
            
            {/* AI Chat Widget */}
            <NativeChatBot />
          </div>
        </div>
      </body>
    </html>
  )
}

import './globals.css'