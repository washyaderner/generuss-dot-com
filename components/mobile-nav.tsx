"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  links: Array<{
    href: string
    label: string
  }>
}

export function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const renderNavItem = (href: string, label: string, isActive: boolean) => {
    const baseClassName = cn(
      "text-zinc-400 hover:text-white transition-colors text-lg py-3",
      isActive && "text-white font-medium"
    )
    const baseStyle = { backgroundColor: 'rgb(0, 0, 0)' }

    if (href.startsWith('#')) {
      return (
        <a
          href={href}
          className={baseClassName}
          style={baseStyle}
          onClick={(e) => handleAnchorClick(e, href)}
        >
          {label}
        </a>
      )
    }

    return (
      <Link
        href={href}
        className={baseClassName}
        style={baseStyle}
        onClick={handleLinkClick}
      >
        {label}
      </Link>
    )
  }

  return (
    <div className="block md:hidden flex items-center h-full">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center justify-center py-2 rounded text-teal-200 hover:text-white"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          paddingLeft: '0.25rem',
          paddingRight: '0.75rem'
        }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <Menu className={cn("h-8 w-8", isOpen ? "hidden" : "block")} />
        <X className={cn("h-8 w-8", isOpen ? "block" : "hidden")} />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Menu */}
            <motion.div
              className="fixed inset-y-0 left-0 border-r border-zinc-800 w-64 flex flex-col z-50"
              style={{
                backgroundColor: 'rgb(0, 0, 0)',
                padding: '1rem 0 1rem 0',
              }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div 
                className="flex flex-row justify-between items-center" 
                style={{ 
                  backgroundColor: 'rgb(0, 0, 0)',
                  paddingLeft: '1.5rem',
                  paddingRight: '1.5rem'
                }}
              >
                <Link
                  href="/"
                  className={cn(
                    "text-zinc-400 hover:text-white transition-colors text-lg font-medium py-3",
                    pathname === "/" && "text-white"
                  )}
                  style={{ backgroundColor: 'rgb(0, 0, 0)' }}
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-white"
                  style={{ backgroundColor: 'rgb(0, 0, 0)' }}
                  aria-label="Close menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="w-full h-px bg-zinc-800 my-0"></div>
              <nav 
                className="flex flex-col" 
                style={{ 
                  backgroundColor: 'rgb(0, 0, 0)',
                  paddingLeft: '1.5rem',
                  paddingRight: '1.5rem'
                }}
              >
                {links.filter(link => link.href !== "/").map((link, index, arr) => {
                  const isActive = pathname === link.href;
                  return (
                    <div key={link.href} className="flex flex-col" style={{ backgroundColor: 'rgb(0, 0, 0)' }}>
                      {renderNavItem(link.href, link.label, isActive)}
                      {index < arr.length - 1 && (
                        <div className="w-full h-px bg-zinc-800"></div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
} 