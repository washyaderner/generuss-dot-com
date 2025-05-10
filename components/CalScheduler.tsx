'use client';

import { useEffect, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

interface CalSchedulerProps {
  calUsername: string;
  calLink?: string; // Optional custom link
  className?: string;
}

export function CalScheduler({ 
  calUsername, 
  calLink = "meeting", 
  className = ""
}: CalSchedulerProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Initialize Cal.com
    (async function() {
      const cal = await getCalApi();
      cal?.('ui', {
        // Theme settings to match our design
        theme: 'dark',
        styles: { 
          branding: { brandColor: '#5eead4' }, // Teal color to match site theme
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);
  
  // Don't render on server to prevent hydration errors
  if (!isMounted) return null;
  
  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      {/* Gradient overlay effect to match the site theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-violet-600/10 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm border border-white/10 pointer-events-none z-10" />
      
      {/* Actual Cal component */}
      <div className="relative z-20">
        <Cal 
          calLink={`${calUsername}/${calLink}`}
          style={{ height: '100%', width: '100%', overflow: 'hidden' }}
          config={{
            name: '',
            email: '',
            notes: '',
            theme: 'dark',
            hideEventTypeDetails: 'false',
          }}
        />
      </div>
    </div>
  );
} 