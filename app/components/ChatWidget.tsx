'use client'

import React, { useEffect } from 'react'
import Script from 'next/script'

// Extend Window interface to include our custom properties
declare global {
  interface Window {
    __n8nChatClickHandler: ((event: MouseEvent) => void) | null;
    __n8nChatObserver: MutationObserver | null;
    __n8nInitialMessageSet: boolean;
    __n8nMessageObserver: MutationObserver | null;
    __n8nOverrideStyles: (() => void) | null;
    createChat?: (config: any) => any;
  }
}

export default function ChatWidget() {
  useEffect(() => {
    // Only run this on the client side
    if (typeof window === 'undefined') return;

    // Clean up any existing chat widget elements
    const cleanup = () => {
      const existingScripts = document.querySelectorAll('script[data-n8n-chat]');
      existingScripts.forEach(script => script.remove());
      
      const existingChat = document.querySelector('.n8n-chat-bubble-button');
      if (existingChat) {
        existingChat.remove();
      }
    };
    
    // Remove any existing chat elements
    cleanup();
    
    // Create and add the n8n chat script directly
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.umd.js';
    script.setAttribute('data-n8n-chat', 'true');
    script.async = true;
    script.onload = () => {
      // Initialize n8n chat with our custom configuration once the script loads
      if (window.createChat) {
        const chat = window.createChat({
          webhookUrl: 'https://washyaderner.app.n8n.cloud/webhook/a0990d27-a439-4c02-9e49-689034981a5b/chat',
          botName: 'Generuss Assistant',
          initialMessage: 'Hey, Russ here. Let me know if you have any questions.',
          botAvatarUrl: '/images/chat-bot-avatar.svg',
          enableFileUploads: false,
          enableAttachments: false,
          messageDelay: 800,
          saveHistory: true,
          darkMode: true,
          translations: {
            header: {
              title: 'Generuss Support',
            },
            chatBubble: {
              text: 'Chat with us',
            },
            input: {
              placeholder: 'Type your message...',
              sendButtonAriaLabel: 'Send message',
            },
          }
        });
        
        // Add custom CSS to override n8n styles
        const injectStyles = () => {
          // Remove any existing style element
          const existingStyle = document.querySelector('style[data-n8n-custom-style]');
          if (existingStyle) {
            existingStyle.remove();
          }
          
          // Create a new style element with our custom styling
          const style = document.createElement('style');
          style.setAttribute('data-n8n-custom-style', 'true');
          style.textContent = `
            /* Custom styling for n8n chat */
            .n8n-chat-bubble-button {
              background-color: #5bbfba !important;
              box-shadow: 0 4px 14px rgba(91, 191, 186, 0.4) !important;
              border: none !important;
            }
            
            .n8n-chat-bubble-button:hover {
              transform: translateY(-2px) !important;
              box-shadow: 0 6px 20px rgba(91, 191, 186, 0.6) !important;
            }
            
            .n8n-chat-header {
              background-color: #2a2a2a !important;
              border-bottom: 1px solid #444 !important;
            }
            
            .n8n-chat-panel {
              background-color: #1a1a1a !important;
            }
            
            .n8n-chat-message-bubble-user {
              background-color: #5bbfba !important;
              color: white !important;
            }
            
            .n8n-chat-message-bubble-bot {
              background-color: #2a2a2a !important;
              color: white !important;
              border: 1px solid #444 !important;
            }
            
            .n8n-chat-input {
              background-color: #2a2a2a !important;
              color: white !important;
              border: 1px solid #444 !important;
            }
            
            .n8n-chat-header-title::before {
              content: "🧠 ";
            }
            
            .n8n-chat-button {
              background-color: #5bbfba !important;
              color: white !important;
            }
          `;
          
          document.head.appendChild(style);
        };
        
        // Add brain emoji to the header title
        const addBrainEmoji = () => {
          const headerTitles = document.querySelectorAll('.n8n-chat-header-title');
          headerTitles.forEach(title => {
            if (!title.textContent?.includes('🧠')) {
              title.innerHTML = '🧠 ' + title.innerHTML;
            }
          });
        };
        
        // Apply customizations with multiple attempts to ensure they stick
        const applyCustomizations = () => {
          injectStyles();
          addBrainEmoji();
        };
        
        // Apply immediately after loading
        applyCustomizations();
        
        // Apply again after a short delay
        setTimeout(applyCustomizations, 500);
        setTimeout(applyCustomizations, 1000);
        setTimeout(applyCustomizations, 2000);
        
        // Set up a mutation observer to apply customizations when the chat elements change
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              applyCustomizations();
            }
          }
        });
        
        // Start observing the document body for changes
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        
        // Store the observer for cleanup
        window.__n8nChatObserver = observer;
      }
    };
    
    // Add the script to the document
    document.body.appendChild(script);
    
    // Clean up on component unmount
    return () => {
      if (window.__n8nChatObserver) {
        window.__n8nChatObserver.disconnect();
        window.__n8nChatObserver = null;
      }
      cleanup();
    };
  }, []);
  
  return null;
} 