'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquare, X, Send } from 'lucide-react'

// Message type definition
interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function NativeChatBot() {
  // State management
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  
  // Refs
  const messageContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize session ID
  useEffect(() => {
    // Check if we have a session ID in localStorage
    const storedSessionId = localStorage.getItem('chat_session_id')
    
    if (storedSessionId) {
      setSessionId(storedSessionId)
    } else {
      // Generate a new session ID
      const newSessionId = `session_${Date.now()}`
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
          timestamp: new Date(msg.timestamp)
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
      localStorage.setItem('chat_messages', JSON.stringify(messages))
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
          timestamp: new Date()
        }])
      }, 500)
    }
  }, [isOpen, messages.length])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return
    
    // Create user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }
    
    // Update UI with user message
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    
    // Show typing indicator
    setIsTyping(true)
    
    try {
      // Send message to our API route which will forward to n8n
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ 
          message: inputMessage,
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
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botResponse])
      } else {
        throw new Error('No message in response')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Add error message
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
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

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 
        flex items-center justify-center shadow-lg shadow-teal-500/20 border border-white/10 
        transform transition-transform duration-300 hover:scale-110 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open chat"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-80 md:w-96 h-[600px] max-h-[80vh] z-50 rounded-2xl 
            bg-black/90 backdrop-blur-md border border-white/10 shadow-xl shadow-teal-500/20 
            flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-black to-slate-900 flex justify-between items-center">
              <h3 className="text-white font-semibold">Generuss Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Messages Container */}
            <div 
              ref={messageContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            >
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-xl ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-teal-500/20 to-teal-400/20 text-white rounded-tr-none' 
                        : 'bg-slate-800/60 text-gray-100 rounded-tl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/60 px-4 py-3 rounded-xl rounded-tl-none max-w-[80%] text-white">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '100ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input Container */}
            <div className="p-4 border-t border-white/10 bg-gradient-to-r from-black to-slate-900/80">
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex items-center space-x-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-slate-800/50 border border-white/10 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 flex items-center justify-center disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
              <div className="mt-2 text-xs text-gray-500 text-center">
                <button 
                  onClick={() => {
                    localStorage.removeItem('chat_messages')
                    setMessages([{
                      id: `bot-${Date.now()}`,
                      content: 'Chat history cleared. How can I help you today?',
                      sender: 'bot',
                      timestamp: new Date()
                    }])
                  }}
                  className="text-teal-600 hover:text-teal-400 transition-colors"
                >
                  Clear history
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 