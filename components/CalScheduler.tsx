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
    
    // Initialize Cal.com with minimal config
    (async function() {
      const cal = await getCalApi();
      cal?.('ui', {
        theme: 'dark',
      });
    })();
  }, []);
  
  // Don't render on server to prevent hydration errors
  if (!isMounted) return null;

  // Log for debugging
  console.log("CalScheduler rendering with:", { calUsername, calLink });
  
  return (
    <div className={`relative rounded-xl border border-white/20 ${className}`}>
      {/* Simple Cal component */}
      <Cal 
        calLink={`${calUsername}/${calLink}`}
        style={{ height: '100%', width: '100%' }}
        config={{
          theme: 'dark',
        }}
      />
      
      {/* Debug info */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-xs text-white p-2 text-center">
        Calendar: {calUsername}/{calLink}
      </div>
    </div>
  );
} 