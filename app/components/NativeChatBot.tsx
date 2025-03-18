'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCommentDots, FaTimes, FaPaperPlane, FaTrash } from 'react-icons/fa'

// Message type definition
interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: number
}

// GlowingText component for animated text effects
const GlowingText = ({ message, isError = false }: { message: string; isError?: boolean }) => {
  // Split message by words but animate by letter
  const words = message.split(' ')
  const totalChars = words.reduce((sum, word) => sum + word.length, 0)
  const totalSpaces = words.length - 1
  const totalCharsWithSpaces = totalChars + totalSpaces
  // Time for one complete pulse to travel through the entire message
  const pulseDuration = totalCharsWithSpaces * 0.07 // 70ms per character
  
  return (
    <span className={`${isError ? 'text-red-400' : 'text-teal-400'} whitespace-pre-wrap`}>
      {words.map((word, wordIndex) => (
        <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIndex) => {
            // Calculate the overall position in the entire text
            let overallIndex = 0
            for (let i = 0; i < wordIndex; i++) {
              overallIndex += words[i].length + 1 // +1 for the space
            }
            overallIndex += charIndex
            
            // Animation delay based on character position
            const style = {
              animationDelay: `${overallIndex * 0.07}s`,
            }
            
            return (
              <span 
                key={`char-${wordIndex}-${charIndex}`} 
                className="inline-block animate-glow-trail"
                style={style}
              >
                {char}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

export default function NativeChatBot() {
  // State management
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [hasError, setHasError] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize session ID
  useEffect(() => {
    // Check if we have a session ID in localStorage
    const storedSessionId = localStorage.getItem('chat_session_id')
    
    if (storedSessionId) {
      setSessionId(storedSessionId)
    } else {
      // Generate a new session ID
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      localStorage.setItem('chat_session_id', newSessionId)
      setSessionId(newSessionId)
    }
    
    // Load previous messages if we have any
    const storedMessages = localStorage.getItem('chat_messages')
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages)
        // Convert string timestamps back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp).getTime()
        }))
        setMessages(messagesWithDates)
      } catch (error) {
        console.error('Error parsing stored messages:', error)
        // If there's an error, clear the stored messages
        localStorage.removeItem('chat_messages')
      }
    }
  }, [])

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat_messages', JSON.stringify(messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp.toISOString()
      }))))
    }
  }, [messages])

  // Welcome message when the chat first opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial bot message with slight delay for effect
      setTimeout(() => {
        setMessages([{
          id: `bot-${Date.now()}`,
          content: 'Hello! 👋 I\'m the Generuss AI assistant. How can I help you today?',
          sender: 'bot',
          timestamp: new Date().getTime()
        }])
      }, 500)
    }
  }, [isOpen, messages.length])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  // Add keyframes for glowing text animation
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes glowTrail {
        0% {
          color: #9CA3AF; /* gray-400 */
          text-shadow: none;
        }
        10%, 20% {
          color: #ffffff;
          text-shadow: 0 0 12px rgba(20, 184, 166, 0.8), 0 0 20px rgba(20, 184, 166, 0.6), 0 0 30px rgba(20, 184, 166, 0.4);
        }
        30%, 100% {
          color: #9CA3AF; /* gray-400 */
          text-shadow: none;
        }
      }
      
      @keyframes pulseBubble {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.7);
        }
        70% {
          transform: scale(1.1);
          box-shadow: 0 0 0 10px rgba(20, 184, 166, 0);
        }
        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(20, 184, 166, 0);
        }
      }
      
      .animate-glow-trail {
        animation: glowTrail 6s linear infinite;
      }
      
      .animate-pulse-bubble {
        animation: pulseBubble 2s infinite;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Increment unread count when new bot messages arrive and chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const newBotMessages = messages.filter(m => m.sender === 'bot')
      const readCount = parseInt(localStorage.getItem('readMessageCount') || '0')
      if (newBotMessages.length > readCount) {
        setUnreadCount(newBotMessages.length - readCount)
      }
    } else {
      setUnreadCount(0)
      // Store the current count of bot messages as read
      const botMessageCount = messages.filter(m => m.sender === 'bot').length
      localStorage.setItem('readMessageCount', botMessageCount.toString())
    }
  }, [messages, isOpen])

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return
    
    setHasError(false)
    const userMessage = inputMessage.trim()
    setInputMessage('')
    
    // Add user message to chat
    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: userMessage,
      sender: 'user',
      timestamp: new Date().getTime()
    }
    
    setMessages(prev => [...prev, newUserMessage])
    
    // Show typing indicator
    setIsTyping(true)
    
    try {
      // Send message to our API route which will forward to n8n
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ 
          message: userMessage,
          sessionId
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error from server: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      
      // Add the bot's response to the messages
      if (data.message) {
        const botResponse: ChatMessage = {
          id: `bot-${Date.now()}`,
          content: data.message,
          sender: 'bot',
          timestamp: new Date().getTime()
        }
        setMessages(prev => [...prev, botResponse])
      } else {
        throw new Error('No message in response')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      
      setHasError(true)
      
      // Add error message
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date().getTime()
      }])
    } finally {
      setIsTyping(false)
    }
  }

  // Handle keydown events on the input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Clear chat history
  const clearHistory = () => {
    setMessages([])
    localStorage.removeItem('chat_messages')
  }

  return (
    <>
      {/* Chat Bubble Button */}
      <motion.div
        className={`fixed bottom-6 right-6 z-50 shadow-lg rounded-full ${
          unreadCount > 0 ? 'animate-pulse-bubble' : ''
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <button
            aria-label="Open chat"
            className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-violet-600 text-white"
          >
            <FaCommentDots size={24} />
          </button>
          
          {/* Unread messages badge */}
          {unreadCount > 0 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
            >
              {unreadCount}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-gray-900/90 backdrop-blur-md rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-700"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-teal-500 to-violet-600 flex justify-between items-center">
              <h3 className="text-white font-medium">Generuss AI Assistant</h3>
              <div className="flex gap-2">
                <button
                  onClick={clearHistory}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Clear history"
                >
                  <FaTrash size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <FaTimes size={18} />
                </button>
              </div>
            </div>
            
            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-800/50">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-teal-500 to-violet-600 text-white'
                          : msg.id.startsWith('error') 
                            ? 'bg-red-900/40 border border-red-700 text-white' 
                            : 'bg-gray-700 text-white'
                      }`}
                    >
                      {msg.id.startsWith('error') ? (
                        <GlowingText message={msg.content} isError={true} />
                      ) : (
                        <p className="text-sm">{msg.content}</p>
                      )}
                      <div className="text-xs opacity-70 mt-1 text-right">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 flex justify-start"
                  >
                    <div className="bg-gray-700 rounded-lg p-3 max-w-[80%]">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Container */}
            <div className="p-3 bg-gray-800 border-t border-gray-700">
              {hasError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-xs mb-2"
                >
                  <GlowingText 
                    message="Connection error. Please check your internet connection and try again." 
                    isError={true} 
                  />
                </motion.div>
              )}
              <div className="flex">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-teal-500 to-violet-600 text-white px-3 rounded-r-md hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 