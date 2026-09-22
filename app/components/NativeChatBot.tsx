'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCommentDots, FaTimes, FaPaperPlane, FaSyncAlt, FaCalendarAlt, FaArrowRight } from 'react-icons/fa'

// The generuss.com assistant widget. The brain lives in /api/chat; this file
// only renders, keeps the signed session token, and sends the history the
// server signed last turn (the welcome message is local and never sent).

type Role = 'user' | 'assistant'
type Cta = 'none' | 'book_call' | 'free_tools' | 'free_build'

interface ChatMessage {
  id: string
  role: Role
  content: string
  cta?: Cta
  local?: boolean // shown in the UI only, never sent to the server
  error?: boolean
}

const STORAGE_KEY = 'gchat_v2'
const RESTORE_WINDOW_MS = 30 * 60 * 1000
const MAX_CHARS = 1200
const BOOKING_URL = 'https://app.cal.com/generuss/discovery-call'

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  local: true,
  content:
    "Hey, I'm Russ's AI assistant. I can tell you what he builds, what it costs, and whether he's a fit for your project. What are you working on?",
}

const STARTERS = [
  'I need a website',
  'Automate my follow-up',
  'What has Russ built?',
  'What does it cost?',
]

const CTA_BUTTONS: Record<Exclude<Cta, 'none'>, { label: string; href: string; icon: 'calendar' | 'arrow' }> = {
  book_call: { label: 'Book a free 30-min call with Russ', href: BOOKING_URL, icon: 'calendar' },
  free_tools: { label: 'Try the free tools', href: 'https://generussdesign.com/tools/', icon: 'arrow' },
  free_build: { label: 'See the Free-Build Program', href: 'https://generussdesign.com/free-build/', icon: 'arrow' },
}

const URL_SPLIT = /(https?:\/\/[^\s<>"')]+)/g

function Linkified({ text }: { text: string }) {
  const parts = text.split(URL_SPLIT)
  return (
    <>
      {parts.map((part, i) => {
        if (/^https?:\/\//.test(part)) {
          const clean = part.replace(/[.,;:!?]+$/, '')
          const tail = part.slice(clean.length)
          return (
            <React.Fragment key={i}>
              <a
                href={clean}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-300 underline underline-offset-2 break-all hover:text-teal-200"
              >
                {clean.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </a>
              {tail}
            </React.Fragment>
          )
        }
        return <React.Fragment key={i}>{part}</React.Fragment>
      })}
    </>
  )
}

function newId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export default function NativeChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
  const [token, setToken] = useState<string | undefined>(undefined)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [nudge, setNudge] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const openedAt = useRef<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Restore a recent conversation.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw)
        if (saved && Date.now() - saved.updatedAt < RESTORE_WINDOW_MS && Array.isArray(saved.messages)) {
          setMessages([WELCOME, ...saved.messages])
          setToken(saved.token)
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    } catch {
      // storage blocked or corrupt; start fresh
    }
    const timer = setTimeout(() => setNudge(true), 45000)
    return () => clearTimeout(timer)
  }, [])

  // Persist everything except the local welcome and error bubbles.
  useEffect(() => {
    const serverMessages = messages.filter((m) => !m.local && !m.error)
    if (serverMessages.length === 0) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages: serverMessages, token, updatedAt: Date.now() }))
    } catch {
      // ignore
    }
  }, [messages, token])

  // Scroll the message list itself, never the page behind the widget.
  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping, isOpen])

  useEffect(() => {
    if (!isOpen) return
    if (openedAt.current === null) openedAt.current = Date.now()
    setNudge(false)
    // Desktop gets the cursor in the box; phones skip it so the keyboard
    // doesn't cover the starter buttons.
    const t = setTimeout(() => {
      if (!window.matchMedia('(pointer: coarse)').matches) inputRef.current?.focus({ preventScroll: true })
    }, 250)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  const send = useCallback(
    async (text: string) => {
      const message = text.trim().slice(0, MAX_CHARS)
      if (!message || isTyping) return
      const history = messages.filter((m) => !m.local && !m.error).map((m) => ({ role: m.role, content: m.content }))
      setMessages((prev) => [...prev.filter((m) => !m.error), { id: newId('user'), role: 'user', content: message }])
      setInput('')
      if (inputRef.current) inputRef.current.style.height = 'auto'
      setIsTyping(true)
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            messages: history,
            token,
            page: window.location.pathname,
            website: honeypot,
            openedMs: openedAt.current ? Date.now() - openedAt.current : undefined,
          }),
        })
        if (!res.ok) throw new Error(`status ${res.status}`)
        const data = await res.json()
        if (!data.message) throw new Error('no message')
        setToken(data.token)
        setMessages((prev) => [
          ...prev,
          { id: newId('bot'), role: 'assistant', content: data.message, cta: data.cta },
        ])
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: newId('error'),
            role: 'assistant',
            error: true,
            cta: 'book_call',
            content:
              "Sorry, I couldn't connect just now. You can try again, book a call with Russ below, or email russ@generuss.com.",
          },
        ])
      } finally {
        setIsTyping(false)
      }
    },
    [messages, token, honeypot, isTyping],
  )

  const reset = () => {
    setMessages([WELCOME])
    setToken(undefined)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  const hasConversation = messages.some((m) => m.role === 'user')

  return (
    <>
      {/* Launcher */}
      {!isOpen && (
        <motion.button
          type="button"
          aria-label="Chat with Russ's assistant"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-teal-500 text-white border border-white/10 shadow-lg shadow-teal-500/20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaCommentDots size={24} />
          {nudge && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          )}
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Chat with Russ's AI assistant"
            className="fixed z-50 bottom-3 right-3 left-3 sm:left-auto sm:bottom-6 sm:right-6 sm:w-96 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/90 backdrop-blur-md shadow-2xl shadow-teal-500/20"
            style={{ height: 'min(600px, calc(100dvh - 24px))' }}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-black to-slate-900 flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium leading-tight">Russ&apos;s AI assistant</h3>
                <p className="text-xs text-gray-400">Websites, automation, and AI systems</p>
              </div>
              <div className="flex items-center gap-3">
                {hasConversation && (
                  <button
                    type="button"
                    onClick={reset}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Start a new conversation"
                    title="New conversation"
                  >
                    <FaSyncAlt size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <FaTimes size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 p-4 overflow-y-auto overscroll-contain bg-slate-900/50" aria-live="polite">
              {messages.map((msg) => (
                <div key={msg.id} className={`mb-3 flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap break-words ${
                      msg.role === 'user'
                        ? 'bg-teal-500/20 text-white rounded-tr-none border border-teal-500/30'
                        : msg.error
                          ? 'bg-red-900/20 border border-red-500/30 text-white rounded-tl-none'
                          : 'bg-slate-800/60 text-white rounded-tl-none border border-white/10'
                    }`}
                  >
                    {msg.role === 'assistant' ? <Linkified text={msg.content} /> : msg.content}
                  </div>
                  {msg.role === 'assistant' && msg.cta && msg.cta !== 'none' && CTA_BUTTONS[msg.cta] && (
                    <a
                      href={CTA_BUTTONS[msg.cta].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium px-3 py-2 transition-colors"
                    >
                      {CTA_BUTTONS[msg.cta].icon === 'calendar' ? <FaCalendarAlt size={13} /> : <FaArrowRight size={12} />}
                      {CTA_BUTTONS[msg.cta].label}
                    </a>
                  )}
                </div>
              ))}

              {!hasConversation && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {STARTERS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="text-xs text-teal-200 border border-teal-500/40 bg-teal-500/10 hover:bg-teal-500/20 rounded-full px-3 py-1.5 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {isTyping && (
                <div className="mb-3 flex justify-start" aria-label="Assistant is typing">
                  <div className="bg-slate-800/60 rounded-xl px-3 py-3 rounded-tl-none border border-white/10 flex gap-1">
                    {[0, 0.2, 0.4].map((d) => (
                      <motion.span
                        key={d}
                        className="w-2 h-2 bg-teal-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: d }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              className="p-3 border-t border-white/10 bg-gradient-to-r from-black to-slate-900/80"
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
            >
              {/* Honeypot: invisible to people, tempting to form-filling bots. */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] w-px h-px opacity-0"
              />
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  maxLength={MAX_CHARS}
                  onChange={(e) => {
                    setInput(e.target.value)
                    e.target.style.height = 'auto'
                    e.target.style.height = Math.min(96, e.target.scrollHeight) + 'px'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      send(input)
                    }
                  }}
                  placeholder="Ask about a website, automation, or AI..."
                  aria-label="Message"
                  rows={1}
                  className="flex-1 resize-none bg-slate-800/50 border border-white/10 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 max-h-24"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                  className="h-10 w-10 shrink-0 flex items-center justify-center rounded-lg bg-teal-500 text-white hover:bg-teal-400 disabled:opacity-40 transition-colors"
                >
                  <FaPaperPlane size={14} />
                </button>
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-gray-500">
                <span>AI assistant. Chats are saved so Russ can follow up.</span>
                {input.length > MAX_CHARS - 300 && (
                  <span>
                    {input.length}/{MAX_CHARS}
                  </span>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
