import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, MessageCircle, RotateCcw, Send, X } from 'lucide-react'
import { sendAgentMessage } from '../services/api'

const createSessionId = () =>
  globalThis.crypto?.randomUUID?.() || `session-${Date.now()}-${Math.random().toString(36).slice(2)}`

const welcomeMessage = {
  id: 'welcome',
  role: 'assistant',
  text: 'Hi! I’m your AI agent. What would you like to explore?',
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState([welcomeMessage])
  const [sessionId, setSessionId] = useState(createSessionId)
  const [isSending, setIsSending] = useState(false)
  const messageListRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, isSending])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const startNewChat = () => {
    setMessages([welcomeMessage])
    setSessionId(createSessionId())
    setDraft('')
    inputRef.current?.focus()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const message = draft.trim()
    if (!message || isSending) return

    setDraft('')
    setMessages((current) => [
      ...current,
      { id: createSessionId(), role: 'user', text: message },
    ])
    setIsSending(true)

    try {
      const result = await sendAgentMessage({ message, sessionId })
      setMessages((current) => [
        ...current,
        { id: createSessionId(), role: 'assistant', text: result.reply },
      ])
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: createSessionId(),
          role: 'error',
          text: `${error.message} Start the n8n test listener and try again.`,
        },
      ])
    } finally {
      setIsSending(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            aria-label="AI agent chat"
            className="flex h-[min(35rem,calc(100dvh-7rem))] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-2xl shadow-black/40"
          >
            <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-400/10 text-cyan-300">
                  <Bot size={21} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-white">Aurevion Agent</h2>
                  <p className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    n8n test chat
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={startNewChat}
                  className="rounded-md p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                  aria-label="Start a new chat"
                  title="Start a new chat"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                  aria-label="Close chat"
                  title="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            <div
              ref={messageListRef}
              role="log"
              aria-live="polite"
              className="flex-1 space-y-4 overflow-y-auto bg-slate-950 px-4 py-5"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap break-words rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'rounded-br-sm bg-cyan-500 text-slate-950'
                        : message.role === 'error'
                          ? 'rounded-bl-sm border border-rose-900/70 bg-rose-950/50 text-rose-200'
                          : 'rounded-bl-sm border border-slate-800 bg-slate-900 text-slate-200'
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start" aria-label="Agent is responding">
                  <div className="flex items-center gap-1 rounded-xl rounded-bl-sm border border-slate-800 bg-slate-900 px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300" />
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-slate-800 bg-slate-900 p-3">
              <div className="flex items-end gap-2 rounded-lg border border-slate-700 bg-slate-950 p-2 focus-within:border-cyan-500">
                <textarea
                  ref={inputRef}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault()
                      event.currentTarget.form?.requestSubmit()
                    }
                  }}
                  rows={1}
                  maxLength={4000}
                  placeholder="Ask your agent..."
                  aria-label="Message your agent"
                  className="max-h-28 min-h-9 flex-1 resize-y bg-transparent px-1 py-2 text-sm text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={!draft.trim() || isSending}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-cyan-500 text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Send message"
                  title="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-slate-500">
                Test mode · Keep the n8n workflow listening
              </p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="grid h-14 w-14 place-items-center rounded-full border border-cyan-300/30 bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-950/40 transition hover:scale-105 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
        aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
        aria-expanded={isOpen}
        title="Chat with the AI agent"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={23} />}
      </button>
    </div>
  )
}