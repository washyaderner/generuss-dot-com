'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import type React from "react"

export function NavLink({ 
  href, 
  children, 
  className = "" 
}: { 
  href: string; 
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname()
  
  // Special handling for home page path - consider both "/" and empty as matching
  // Also consider paths that start with the href to be active, useful for blog posts
  const isActive = href === '/' 
    ? pathname === '/' || pathname === ''
    : href === '/blog'
      ? pathname === '/blog' || pathname.startsWith('/blog/')
      : pathname === href

  // Debug logs - will appear in browser console
  console.log(`NavLink Debug - href: ${href}, pathname: ${pathname}, isActive: ${isActive}`);

  return (
    <Link
      href={href}
      className={`nav-link ${
        isActive
          ? "text-xl font-semibold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent"
          : "text-sm text-gray-400 hover:text-white transition-colors"
      } ${className}`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  )
} 