"use client"

import { useEffect, useRef } from "react"

export function CursorGradient() {
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const gradient = gradientRef.current
    if (!gradient) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = gradient.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gradient.style.setProperty("--x", `${x}px`)
      gradient.style.setProperty("--y", `${y}px`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={gradientRef}
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(333px circle at var(--x, 100px) var(--y, 100px), rgba(13, 148, 136, 0.15), transparent 80%)`,
      }}
    />
  )
}

