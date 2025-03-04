'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// Extend Window interface to include our custom properties
declare global {
  interface Window {
    __n8nChatClickHandler: ((event: MouseEvent) => void) | null;
    __n8nChatObserver: MutationObserver | null;
  }
}

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
          // Make the bubble teal and smaller
          chatContainer.style.background = 'rgb(20, 184, 166)' // Solid teal color
          chatContainer.style.boxShadow = '0 0 15px rgba(20, 184, 166, 0.5)'
          chatContainer.style.border = '1px solid rgba(255, 255, 255, 0.1)'
          chatContainer.style.transform = 'scale(0.85)' // Make it 15% smaller
          chatContainer.style.transformOrigin = 'bottom right' // Scale from bottom right
        }
        
        if (chatPanel) {
          // Apply dark mode styling to the chat panel
          chatPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'
          chatPanel.style.backdropFilter = 'blur(10px)'
          chatPanel.style.border = '1px solid rgba(255, 255, 255, 0.1)'
          chatPanel.style.boxShadow = '0 0 20px rgba(20, 184, 166, 0.3)'
          
          // Style the header
          const header = chatPanel.querySelector('.n8n-chat-panel-header') as HTMLElement
          if (header) {
            header.style.background = 'rgb(13, 17, 23)' // Dark header
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)'
          }
          
          // Style the chat messages and input for dark mode
          const messages = chatPanel.querySelectorAll('.n8n-chat-message') as NodeListOf<HTMLElement>
          messages.forEach(message => {
            // User messages
            if (message.classList.contains('n8n-chat-message-user')) {
              message.style.background = 'rgba(20, 184, 166, 0.2)'
              message.style.color = 'white'
            } 
            // Bot messages
            else {
              message.style.background = 'rgba(26, 32, 44, 0.7)'
              message.style.color = 'white'
            }
          })
          
          // Style the input area
          const inputArea = chatPanel.querySelector('.n8n-chat-input-container') as HTMLElement
          if (inputArea) {
            inputArea.style.background = 'rgb(13, 17, 23)'
            inputArea.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)'
          }
          
          // Add click-outside functionality to close the chat
          const handleClickOutside = (event: MouseEvent) => {
            const panel = document.querySelector('.n8n-chat-panel') as HTMLElement
            const bubble = document.querySelector('.n8n-chat-bubble-button') as HTMLElement
            
            if (panel && bubble) {
              // Check if click is outside the chat panel and not on the bubble button
              if (!panel.contains(event.target as Node) && !bubble.contains(event.target as Node)) {
                // Find and click the close button to collapse the chat
                const closeButton = panel.querySelector('.n8n-chat-panel-header button') as HTMLElement
                if (closeButton) {
                  closeButton.click()
                }
              }
            }
          }
          
          // Add the click event listener to document
          document.addEventListener('click', handleClickOutside)
          
          // Store a reference to the handler on the window for cleanup
          window.__n8nChatClickHandler = handleClickOutside
        }
      }, 1000) // Wait for 1 second to ensure widget is loaded
    }

    // Call once when component mounts
    window.addEventListener('load', customizeChat)
    
    // Also call when script might have loaded later
    document.addEventListener('n8n-chat-loaded', customizeChat)
    
    // Apply styles whenever the chat visibility changes (for dark mode persistence)
    const observeChat = () => {
      // Create a mutation observer to watch for new elements
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            const panel = document.querySelector('.n8n-chat-panel')
            if (panel) {
              customizeChat()
            }
          }
        })
      })
      
      // Start observing the document body for changes
      observer.observe(document.body, { childList: true, subtree: true })
      
      // Store a reference for cleanup
      window.__n8nChatObserver = observer
    }
    
    observeChat()
    
    // Cleanup
    return () => {
      window.removeEventListener('load', customizeChat)
      document.removeEventListener('n8n-chat-loaded', customizeChat)
      
      // Remove click outside listener
      if (window.__n8nChatClickHandler) {
        document.removeEventListener('click', window.__n8nChatClickHandler)
        window.__n8nChatClickHandler = null // Set to null instead of using delete
      }
      
      // Disconnect observer
      if (window.__n8nChatObserver) {
        window.__n8nChatObserver.disconnect()
        window.__n8nChatObserver = null // Set to null instead of using delete
      }
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
            webhookUrl: 'https://washyaderner.app.n8n.cloud/webhook/a0990d27-a439-4c02-9e49-689034981a5b/chat',
            
            // Bot customization
            botName: 'Generuss Assistant',
            
            // Initial message displayed when chat is first opened
            initialMessage: 'Hey, Russ here. Let me know if you have any questions.',
            
            // UI customizations
            chatWindowTitle: 'Generuss Chat',
            chatBubbleText: 'Chat with us',
            
            // Avatar image URL - using custom teal robot/human icon that matches site style
            botAvatarUrl: '/images/chat-bot-avatar.svg',
            
            // Chat behavior settings
            enableFileUploads: false,
            enableAttachments: false, 
            messageDelay: 800,
            
            // User identification (optional - if you want to track specific users)
            // userId: 'unique-user-id', // You can set this dynamically if you have user info
            
            // Save chat history in local storage - allows conversations to persist
            // even when the chat is collapsed
            saveHistory: true,
            
            // Translations - customize button and UI text
            translations: {
              en: {
                bubbleButtonText: 'Chat with us',
                chatHeader: '🧠 Generuss Support',
                inputPlaceholder: 'Type your message...',
                startNewChat: 'Start new chat',
                sendButtonText: 'Send',
                uploadFile: 'Upload file'
              }
            }
          });
          
          // Initialize our custom properties
          window.__n8nChatClickHandler = null;
          window.__n8nChatObserver = null;
        `}
      </Script>
    </>
  )
} 