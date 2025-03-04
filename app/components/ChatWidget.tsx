'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

// Define the type for the createChat function
declare global {
  interface Window {
    createChat?: (config: ChatConfig) => (() => void);
    chatSessionId?: string;
  }
}

// Define the chat configuration type
interface ChatConfig {
  webhookUrl?: string;
  apiKey?: string;
  botName?: string;
  chatTitle?: string;
  botAvatarUrl?: string;
  theme?: {
    primary: string;
    textOnPrimary: string;
    userMessage: {
      background: string;
      text: string;
    };
    botMessage: {
      background: string;
      text: string;
    };
  };
  showInitialMessage?: boolean;
  initialMessages?: string[];
  buttonPosition?: 'bottom-right' | 'bottom-left';
  keepSessionBetweenPages?: boolean;
}

// Default webhook URL - replace with your actual endpoint
// Using the same n8n webhook URL from the CDN version
const DEFAULT_WEBHOOK_URL = process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL || 'https://washyaderner.app.n8n.cloud/webhook/a0990d27-a439-4c02-9e49-689034981a5b/chat';

export default function ChatWidget() {
  const chatInitializedRef = useRef(false);
  const scriptLoadedRef = useRef(false);
  const cleanupFnRef = useRef<(() => void) | null>(null);
  
  // Allow webhook URL to be configured
  const [webhookUrl, setWebhookUrl] = useState<string>(DEFAULT_WEBHOOK_URL);
  
  const cleanupChat = () => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Call the cleanup function if available
    if (cleanupFnRef.current) {
      try {
        cleanupFnRef.current();
        cleanupFnRef.current = null;
        console.log('✅ Chat cleanup executed');
      } catch (error) {
        console.error('❌ Error during chat cleanup:', error);
      }
    } else {
      // Fallback cleanup if the cleanup function isn't available
      const chatButton = document.querySelector('.genruss-chat-button');
      if (chatButton) {
        chatButton.remove();
      }
      
      const chatContainer = document.querySelector('.genruss-chat-container');
      if (chatContainer) {
        chatContainer.remove();
      }
    }
    
    chatInitializedRef.current = false;
  };

  const initializeChat = () => {
    if (typeof window === 'undefined') return;
    
    // Skip if already initialized or script not loaded
    if (chatInitializedRef.current || !scriptLoadedRef.current) {
      return;
    }
    
    // Check if createChat is available
    if (!window.createChat) {
      console.error('❌ createChat function not found in window object');
      return;
    }
    
    // Log the webhook URL being used (for debugging)
    console.log('🚀 Initializing chat with n8n webhook URL:', webhookUrl || 'None - using simulated responses');
    
    // Clean up any existing chat instance first
    cleanupChat();
    
    try {
      // Initialize chat with configuration
      const cleanupFn = window.createChat({
        webhookUrl: webhookUrl, // Using the n8n webhook URL from env or default
        apiKey: process.env.NEXT_PUBLIC_CHAT_API_KEY, // Optional API key
        botName: 'GeneRuss AI',
        chatTitle: '🧠 Generuss Support',
        botAvatarUrl: '/images/chat-bot-avatar.svg', // Use the same avatar from n8n version
        theme: {
          primary: '#14B8A6', // Teal color to match the n8n version
          textOnPrimary: '#000',
          userMessage: {
            background: 'rgba(20, 184, 166, 0.2)',
            text: '#fff',
          },
          botMessage: {
            background: 'rgba(26, 32, 44, 0.7)',
            text: '#fff',
          },
        },
        showInitialMessage: true,
        initialMessages: [
          'Hey, Russ here. Let me know if you have any questions.',
          webhookUrl 
            ? 'I\'m connected to the n8n chatbot service and ready to assist you!'
            : 'I\'m currently in demo mode. To get real responses, please configure a webhook URL.'
        ],
        buttonPosition: 'bottom-right',
        keepSessionBetweenPages: true,
      });
      
      // Store the cleanup function for later use
      if (cleanupFn && typeof cleanupFn === 'function') {
        cleanupFnRef.current = cleanupFn;
      }
      
      chatInitializedRef.current = true;
      console.log('✅ Chat widget successfully connected to n8n webhook');
    } catch (error) {
      console.error('❌ Error initializing chat:', error);
    }
  };

  const handleScriptLoad = () => {
    console.log('✅ Custom chat script loaded successfully');
    scriptLoadedRef.current = true;
    
    // Small delay to ensure the script is fully loaded
    setTimeout(() => {
      initializeChat();
    }, 500);
  };

  const handleScriptError = (e: Error) => {
    console.error('❌ Failed to load custom chat script:', e);
  };

  // Listen for webhook URL changes from environment variables
  useEffect(() => {
    // Check if the webhook URL from env is different from what we have
    const envWebhookUrl = process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;
    if (envWebhookUrl !== webhookUrl) {
      setWebhookUrl(envWebhookUrl);
    }
  }, [webhookUrl]);

  // Re-initialize chat if webhook URL changes
  useEffect(() => {
    if (scriptLoadedRef.current) {
      cleanupChat();
      initializeChat();
    }
  }, [webhookUrl]);

  useEffect(() => {
    // Initialize if script already loaded
    if (scriptLoadedRef.current) {
      initializeChat();
    }
    
    // Cleanup when component unmounts
    return () => {
      cleanupChat();
    };
  }, []);

  return (
    <>
      <Script
        id="custom-chat-script"
        src="/assets/chat.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
    </>
  );
} 