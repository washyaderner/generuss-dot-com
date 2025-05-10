'use client';

import React from 'react';

interface CalendarEmbedProps {
  /**
   * The URL of the Cal.com calendar
   */
  calendarUrl: string;
  
  /**
   * Height of the calendar container (desktop)
   * @default "700px"
   */
  height?: string;
  
  /**
   * Height of the calendar container on mobile devices
   * @default "500px"
   */
  mobileHeight?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Whether to show a border around the calendar
   * @default true
   */
  showBorder?: boolean;
  
  /**
   * Whether to show a gradient background
   * @default true
   */
  showGradient?: boolean;
}

/**
 * Embedding component for Cal.com calendars that properly contains scrolling
 * within the iframe without affecting the main page scroll
 */
export function CalendarEmbed({
  calendarUrl,
  height = "700px",
  mobileHeight = "500px",
  className = "",
  showBorder = true,
  showGradient = true
}: CalendarEmbedProps) {
  return (
    <div className={`relative rounded-xl overflow-hidden ${showBorder ? 'border border-white/10' : ''} ${className}`}>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-violet-600/10 pointer-events-none z-10" />
      )}
      
      {/* Fixed height container with overflow hidden */}
      <div 
        className="overflow-hidden relative h-[var(--mobile-height)] md:h-[var(--desktop-height)]"
        style={{ 
          '--mobile-height': mobileHeight,
          '--desktop-height': height
        } as React.CSSProperties}
      >
        <iframe
          src={calendarUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="auto"
          loading="lazy"
          title="Calendar Scheduling Page"
          className="relative z-20 h-full w-full"
          style={{ 
            height: '100%', 
            width: '100%',
            overflow: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          allow="camera; microphone; fullscreen; display-capture; autoplay"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
} 