'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function ChatWidget() {
  // Custom styles to override n8n default styling to match site theme
  useEffect(() => {
    // This function will apply custom styles once the chat widget is loaded
    const customizeChat = () => {
      // Give time for the widget to load
      setTimeout(() => {
        // Find the chat widget container
        const chatContainer = document.querySelector('.n8n-chat-bubble-button') as HTMLElement
        const chatPanel = document.querySelector('.n8n-chat-panel') as HTMLElement
        
        if (chatContainer) {
          // Apply gradient background to match site theme
          chatContainer.style.background = 'linear-gradient(to right, rgba(20, 184, 166, 0.8), rgba(124, 58, 237, 0.8))'
          chatContainer.style.boxShadow = '0 0 15px rgba(20, 184, 166, 0.5)'
          chatContainer.style.border = '1px solid rgba(255, 255, 255, 0.1)'
        }
        
        if (chatPanel) {
          // Apply styling to the chat panel
          chatPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
          chatPanel.style.backdropFilter = 'blur(10px)'
          chatPanel.style.border = '1px solid rgba(255, 255, 255, 0.1)'
          chatPanel.style.boxShadow = '0 0 20px rgba(20, 184, 166, 0.3)'
          
          // Style the header
          const header = chatPanel.querySelector('.n8n-chat-panel-header') as HTMLElement
          if (header) {
            header.style.background = 'linear-gradient(to right, rgba(20, 184, 166, 0.2), rgba(124, 58, 237, 0.2))'
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)'
          }
        }
      }, 1000) // Wait for 1 second to ensure widget is loaded
    }

    // Call once when component mounts
    window.addEventListener('load', customizeChat)
    
    // Also call when script might have loaded later
    document.addEventListener('n8n-chat-loaded', customizeChat)
    
    // Cleanup
    return () => {
      window.removeEventListener('load', customizeChat)
      document.removeEventListener('n8n-chat-loaded', customizeChat)
    }
  }, [])

  return (
    <>
      {/* n8n chat stylesheet */}
      <link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
      
      {/* n8n chat script */}
      <Script 
        id="n8n-chat-script"
        type="module"
        strategy="afterInteractive"
        onLoad={() => {
          // Custom event to signal the script has loaded
          document.dispatchEvent(new Event('n8n-chat-loaded'))
        }}
      >
        {`
          import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

          createChat({
            webhookUrl: 'https://washyaderner.app.n8n.cloud/webhook/a0990d27-a439-4c02-9e49-689034981a5b/chat'
          });
        `}
      </Script>
    </>
  )
} 