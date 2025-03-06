'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

// Define the type for the createChat function
declare global {
  interface Window {
    createChat?: (config: ChatConfig) => (() => void);
    chatSessionId?: string;
    __n8nChatClickHandler: ((event: MouseEvent) => void) | null;
    __n8nChatObserver: MutationObserver | null;
    __n8nInitialMessageSet: boolean;
    __n8nMessageObserver: MutationObserver | null;
    __n8nOverrideStyles: (() => void) | null;
  }
}

// Interface for chat configuration
interface ChatConfig {
  webhookUrl: string;
  apiKey?: string;
  botName?: string;
  chatTitle?: string;
  initialMessage?: string;
  botAvatarUrl?: string;
  theme?: {
    primary?: string;
    textOnPrimary?: string;
    userMessage?: {
      background?: string;
      text?: string;
    };
    botMessage?: {
      background?: string;
      text?: string;
    };
  };
  translations?: Record<string, any>;
  saveHistory?: boolean;
  messageDelay?: number;
  enableFileUploads?: boolean;
  enableAttachments?: boolean;
  overrideServerConfig?: boolean;
}

// Default webhook URL from environment
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL || 'https://washyaderner.app.n8n.cloud/webhook/a0990d27-a439-4c02-9e49-689034981a5b/chat';

export default function ChatWidget() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<Error | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  // Handle script load event
  const handleScriptLoad = () => {
    console.log('📜 n8n chat script loaded successfully');
    setScriptLoaded(true);
    
    // Custom event to signal the script has loaded
    document.dispatchEvent(new Event('n8n-chat-loaded'));
    
    // Apply customizations after a short delay
    setTimeout(() => {
      console.log('⏱️ Applying delayed customizations after script load');
      if (window.__n8nOverrideStyles) {
        window.__n8nOverrideStyles();
      }
    }, 1000);
  };

  // Handle script error
  const handleScriptError = (error: Error) => {
    console.error('❌ Error loading n8n chat script:', error);
    setScriptError(error);
  };

  // Custom styles to override n8n default styling to match site theme
  useEffect(() => {
    // Log webhook URL for debugging
    console.log('🔗 Using n8n webhook URL:', N8N_WEBHOOK_URL);
    
    // Flag to track if initial message has been set
    window.__n8nInitialMessageSet = false;
    
    // Create a style tag with very specific selectors to override n8n styles
    const injectGlobalStyles = () => {
      // Remove any existing style tag we've created
      const existingStyle = document.getElementById('n8n-custom-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // Create a new style element
      const styleEl = document.createElement('style');
      styleEl.id = 'n8n-custom-styles';
      styleEl.innerHTML = `
        /* Chat bubble override */
        .n8n-chat-bubble-button {
          background: rgb(20, 184, 166) !important;
          box-shadow: 0 0 15px rgba(20, 184, 166, 0.5) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          transform: scale(0.85) !important;
          transform-origin: bottom right !important;
        }
        
        /* Dark mode panel */
        .n8n-chat-panel {
          background-color: rgba(0, 0, 0, 0.9) !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 0 20px rgba(20, 184, 166, 0.3) !important;
        }
        
        /* Header style */
        .n8n-chat-panel-header {
          background: rgb(13, 17, 23) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        
        /* User messages */
        .n8n-chat-message.n8n-chat-message-user .n8n-chat-message-bubble {
          background: rgba(20, 184, 166, 0.2) !important;
          color: white !important;
        }
        
        /* Bot messages */
        .n8n-chat-message:not(.n8n-chat-message-user) .n8n-chat-message-bubble {
          background: rgba(26, 32, 44, 0.7) !important;
          color: white !important;
        }
        
        /* Input area */
        .n8n-chat-input-container {
          background: rgb(13, 17, 23) !important;
          border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
      `;
      
      // Add the style element to the head
      document.head.appendChild(styleEl);
      console.log('Injected global styles for n8n chat');
    };
    
    // This function forces our specific overrides
    const forceMessageCustomization = () => {
      // Force initial message to be our custom text
      const messages = document.querySelectorAll('.n8n-chat-message');
      if (messages.length > 0) {
        // Find the first message from the bot
        const firstBotMessage = Array.from(messages).find(msg => 
          !msg.classList.contains('n8n-chat-message-user')
        );
        
        if (firstBotMessage) {
          const messageBubble = firstBotMessage.querySelector('.n8n-chat-message-bubble');
          if (messageBubble && messageBubble.textContent?.includes('My name is Nathan')) {
            messageBubble.textContent = 'Hey, Russ here. Let me know if you have any questions.';
            console.log('⚡️ Forced initial message replacement');
            window.__n8nInitialMessageSet = true;
          }
        }
      }
      
      // Force header title without brain emoji
      const headerTitle = document.querySelector('.n8n-chat-panel-header-title');
      if (headerTitle) {
        headerTitle.textContent = 'Generuss Support';
        console.log('⚡️ Set header title');
      }
      
      // Force all bot avatars to use our custom SVG
      const avatars = document.querySelectorAll('.n8n-chat-message-avatar img');
      avatars.forEach(avatar => {
        const img = avatar as HTMLImageElement;
        if (!img.src.includes('chat-bot-avatar.svg')) {
          img.src = '/images/chat-bot-avatar.svg';
          console.log('⚡️ Set avatar to custom SVG');
        }
      });
      
      // Force chat bubble to be teal
      const chatBubble = document.querySelector('.n8n-chat-bubble-button');
      if (chatBubble) {
        (chatBubble as HTMLElement).setAttribute('style', `
          background: rgb(20, 184, 166) !important; 
          box-shadow: 0 0 15px rgba(20, 184, 166, 0.5) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          transform: scale(0.85) !important;
          transform-origin: bottom right !important;
        `);
      }
    };
    
    // Function to observe chat messages for changes
    const setupMessageObserver = () => {
      // If we already have an observer, disconnect it
      if (window.__n8nMessageObserver) {
        window.__n8nMessageObserver.disconnect();
      }
      
      // Find the chat messages container
      const chatPanel = document.querySelector('.n8n-chat-panel');
      if (!chatPanel) {
        console.log('❌ Chat panel not found, cannot setup message observer');
        return;
      }
      
      // Create a new observer
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            console.log('🔄 Chat messages changed, applying customizations');
            forceMessageCustomization();
          }
        });
      });
      
      // Start observing
      observer.observe(chatPanel, { 
        childList: true, 
        subtree: true,
        characterData: true
      });
      
      // Store reference for cleanup
      window.__n8nMessageObserver = observer;
      console.log('👀 Message observer setup complete');
    };
    
    // This function will apply custom styles once the chat widget is loaded
    const customizeChat = () => {
      console.log('🔍 Attempting to customize n8n chat...');
      
      // Inject global styles
      injectGlobalStyles();
      
      // Force specific element customizations
      forceMessageCustomization();
      
      // Setup message observer if not already done
      if (!window.__n8nMessageObserver) {
        setupMessageObserver();
      }
      
      // Add click-outside functionality
      const chatPanel = document.querySelector('.n8n-chat-panel') as HTMLElement;
      const chatBubble = document.querySelector('.n8n-chat-bubble-button') as HTMLElement;
      
      if (chatPanel && chatBubble && !window.__n8nChatClickHandler) {
        const handleClickOutside = (event: MouseEvent) => {
          if (!chatPanel.contains(event.target as Node) && !chatBubble.contains(event.target as Node)) {
            const closeButton = chatPanel.querySelector('.n8n-chat-panel-header button') as HTMLElement;
            if (closeButton) {
              closeButton.click();
            }
          }
        };
        
        document.addEventListener('click', handleClickOutside);
        window.__n8nChatClickHandler = handleClickOutside;
        console.log('👆 Click outside handler added');
      }
    };
    
    // Aggressive approach that applies customizations
    // repeatedly until successful
    const forceCustomizations = () => {
      // Clear browser cache for the n8n resources
      try {
        // Try to clear any cached values in localStorage
        localStorage.removeItem('n8n-chat-history');
        localStorage.removeItem('n8n-chat-session');
        localStorage.removeItem('n8n-chat-settings');
        console.log('🧹 Cleared n8n local storage items');
      } catch (e) {
        console.log('⚠️ Could not clear localStorage:', e);
      }
      
      // Run customization immediately and store reference
      window.__n8nOverrideStyles = customizeChat;
      customizeChat();
      
      // And also repeatedly check every second for 30 seconds
      // to catch any late DOM updates
      let attempts = 0;
      const interval = setInterval(() => {
        if (window.__n8nOverrideStyles) {
          window.__n8nOverrideStyles();
        }
        attempts++;
        if (attempts >= 30) {
          clearInterval(interval);
          console.log('⏱️ Finished 30 customization attempts');
        }
      }, 1000);
      
      return interval;
    };
    
    // Call once when component mounts
    window.addEventListener('load', forceCustomizations);
    
    // Also call when script might have loaded later
    document.addEventListener('n8n-chat-loaded', forceCustomizations);
    
    // Wait for chat to be interacted with
    document.addEventListener('click', function chatClickHandler(e) {
      const target = e.target as HTMLElement;
      // If clicked on or inside the chat bubble or panel
      if (target.closest('.n8n-chat-bubble-button') || target.closest('.n8n-chat-panel')) {
        console.log('👆 Chat interaction detected, applying customizations');
        setTimeout(forceCustomizations, 500);
      }
    });
    
    // Observe body for any changes that might indicate chat is loaded
    const observeChat = () => {
      // Create a mutation observer to watch for new elements
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.addedNodes.length) {
            // Check for chat elements
            if (document.querySelector('.n8n-chat-bubble-button') || 
                document.querySelector('.n8n-chat-panel')) {
              console.log('🔍 Chat elements detected in DOM, applying customizations');
              setTimeout(forceCustomizations, 100);
            }
          }
        }
      });
      
      // Start observing the document body for changes
      observer.observe(document.body, { childList: true, subtree: true });
      
      // Store a reference for cleanup
      window.__n8nChatObserver = observer;
    };
    
    // Start observing
    observeChat();
    
    // Force customizations on initial mount
    let intervalId = forceCustomizations();
    
    // Cleanup
    return () => {
      window.removeEventListener('load', forceCustomizations);
      document.removeEventListener('n8n-chat-loaded', forceCustomizations);
      
      // Clear interval if it's still running
      if (intervalId) {
        clearInterval(intervalId);
      }
      
      // Remove click outside listener
      if (window.__n8nChatClickHandler) {
        document.removeEventListener('click', window.__n8nChatClickHandler);
        window.__n8nChatClickHandler = null;
      }
      
      // Disconnect observers
      if (window.__n8nChatObserver) {
        window.__n8nChatObserver.disconnect();
        window.__n8nChatObserver = null;
      }
      
      if (window.__n8nMessageObserver) {
        window.__n8nMessageObserver.disconnect();
        window.__n8nMessageObserver = null;
      }
      
      // Remove override function reference
      window.__n8nOverrideStyles = null;
      
      // Remove injected styles
      const customStyles = document.getElementById('n8n-custom-styles');
      if (customStyles) {
        customStyles.remove();
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
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      >
        {`
          import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

          console.log('⚙️ Setting up n8n chat with custom parameters');
          createChat({
            webhookUrl: '${N8N_WEBHOOK_URL}',
            
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
            
            // Save chat history in local storage - allows conversations to persist
            // even when the chat is collapsed
            saveHistory: true,
            
            // Translations - customize button and UI text
            translations: {
              en: {
                bubbleButtonText: 'Chat with us',
                chatHeader: 'Generuss Support',
                inputPlaceholder: 'Type your message...',
                startNewChat: 'Start new chat',
                sendButtonText: 'Send',
                uploadFile: 'Upload file'
              }
            },
            
            // Attempt to disable any hardcoded server-side configs
            overrideServerConfig: true
          });
          
          // Initialize our custom properties
          window.__n8nChatClickHandler = null;
          window.__n8nChatObserver = null;
          window.__n8nMessageObserver = null;
          window.__n8nInitialMessageSet = false;
          window.__n8nOverrideStyles = null;
          
          console.log('✅ n8n chat initialization complete');
          
          // Add a small delay before applying our customizations
          setTimeout(() => {
            console.log('⏱️ Delayed initialization, triggering customizations');
            document.dispatchEvent(new Event('n8n-chat-loaded'));
          }, 2000);
        `}
      </Script>
    </>
  );
} 