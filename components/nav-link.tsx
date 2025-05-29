'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import type React from "react"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  const isAnchorLink = href.startsWith('#')

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAnchorLink) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        'text-sm transition-colors',
        isActive
          ? 'text-teal-400 font-medium'
          : 'text-gray-400 hover:text-white',
        className
      )}
    >
      {children}
    </Link>
  )
} 