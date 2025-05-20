'use client';

import Link from "next/link";
import { CursorGradient } from "@/components/cursor-gradient";
import { MobileNav } from "@/components/mobile-nav";
import { NavLink } from "@/components/nav-link";
import { Metadata } from 'next';
import { CalendarEmbed } from "@/components/CalendarEmbed";

// Navigation links used in both desktop and mobile nav
const navigationLinks = [
  { href: "/solutions", label: "Solutions" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/book", label: "Book" }
];

export default function BookingPage() {
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
              <NavLink href="/">
                Home
              </NavLink>
              <nav className="hidden md:flex space-x-6">
                {navigationLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-md text-sm font-medium bg-teal-500 hover:bg-teal-400 text-white transition-colors"
            >
              <span className="relative">Book a Call</span>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 relative">
                <span className="bg-gradient-to-r from-violet-900 to-teal-400 bg-clip-text text-transparent">
                  Schedule a Meeting
                </span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
              Book a time to discuss how we can help automate your business processes
              and create custom growth solutions for your B2B company.
            </p>
            
            {/* Cal.com Calendar Integration */}
            <div className="max-w-4xl mx-auto">
              <CalendarEmbed 
                calendarUrl="https://app.cal.com/generuss/discovery-call"
                height="700px"
                mobileHeight="500px"
                className="mb-12"
              />
            </div>
          </div>
        </section>
        
        {/* Mobile Navigation */}
        <MobileNav links={navigationLinks} />
      </div>
    </div>
  );
} 