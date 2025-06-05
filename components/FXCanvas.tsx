/*
  Global FX Canvas
  ----------------
  Renders all site-wide decorative effects (cursor glow, gradient backgrounds) in a single,
  pointer-events-none layer so they never interfere with text selection or clicks.
*/
'use client'

import { CursorGradient } from '@/components/cursor-gradient'

export function FXCanvas() {
  return (
    <>
      {/* Fixed vertical gradient background */}
      <div className="fixed inset-0 bg-gradient-to-t from-[#0A0A1E] via-black to-black pointer-events-none z-[var(--z-bg)]" />

      {/* Fixed radial vignette */}
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-transparent to-black/80 pointer-events-none z-[var(--z-bg)]" />

      {/* Cursor glow / fancy trail */}
      <div className="pointer-events-none z-[var(--z-fx)]">
        <CursorGradient />
      </div>
    </>
  )
} 