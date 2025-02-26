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

  return (
    <div className="block md:hidden flex items-center h-full">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center px-3 py-2 rounded text-teal-200 hover:text-white"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <Menu className={cn("h-6 w-6", isOpen ? "hidden" : "block")} />
        <X className={cn("h-6 w-6", isOpen ? "block" : "hidden")} />
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
              className="fixed inset-0 bg-black backdrop-blur-none z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Menu */}
            <motion.div
              className="fixed inset-y-0 left-0 bg-black border-r border-zinc-800 w-64 p-6 flex flex-col z-50"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold text-white">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-white"
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
              <nav className="flex flex-col space-y-4">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-zinc-400 hover:text-white transition-colors",
                        isActive && "text-white font-medium"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
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