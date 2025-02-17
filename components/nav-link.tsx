'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import type React from "react"

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`transition-all flex items-center ${
        isActive
          ? "text-xl font-semibold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent"
          : "text-sm text-gray-400 hover:text-white"
      }`}
    >
      {children}
    </Link>
  )
} 