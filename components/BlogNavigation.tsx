import Link from "next/link"
import { NavLink } from "@/components/nav-link"
import { MobileNav } from "@/components/mobile-nav"

// Navigation links
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" }
];

export function BlogNavigation() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-black/5">
      <div className="container max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <NavLink href="/">
            <span>Home</span>
          </NavLink>
          <nav className="hidden md:flex space-x-6">
            {navigationLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <MobileNav links={navigationLinks} />
      </div>
    </header>
  )
} 