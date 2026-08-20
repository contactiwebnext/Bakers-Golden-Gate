import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Heart, Phone, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const AICareAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hello, and welcome to Bakers Golden Gate in Parkersburg, WV. I am your Care & Guidance Assistant. Whether you have questions about what steps to take during a recent loss, funeral and cremation options, or etiquette, I am here to help. If you have an urgent need right now, please call our directors directly 24/7 at (740) 691-1488.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'What should I do first if a death just occurred?',
    'What is the difference between cremation and burial?',
    'What documents should I bring to the mortuary?',
    'How do I pre-plan arrangements for peace of mind?',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-4),
        }),
      });
      const data = await res.json();

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text:
          data.reply ||
          'Thank you for your question. For personal guidance, our directors at Bakers Golden Gate are on call 24/7 at (740) 691-1488.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text:
            'We are here for your family in Parkersburg, WV. Please call us directly at (740) 691-1488 for immediate care.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside aria-label="Virtual Care Assistant" className="fixed bottom-6 right-6 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          id="open-ai-chat-btn"
          onClick={() => setIsOpen(true)}
          className="p-3.5 sm:px-4 sm:py-3.5 rounded-full bg-[#0F1419] hover:bg-[#141A21] text-[#F8F5F0] border border-[#C5A059] shadow-2xl transition-all duration-300 flex items-center gap-2.5 group"
          aria-label="Open 24/7 Care & Guidance Assistant"
        >
          <div className="w-8 h-8 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059]">
            <Heart className="w-4 h-4 fill-[#C5A059]" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-[#F8F5F0] leading-tight">Care & Guidance Assistant</span>
            <span className="text-[10px] text-[#C5A059]">24/7 Questions & Support</span>
          </div>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div
          className="w-[calc(100vw-2rem)] sm:w-96 bg-[#0F1419] text-[#F8F5F0] rounded-lg shadow-2xl border border-[#FFFFFF15] overflow-hidden flex flex-col h-[520px] max-h-[85vh] animate-in slide-in-from-bottom-5 duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="bg-[#141A21] text-white p-4 flex items-center justify-between border-b border-[#FFFFFF10]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center text-[#0F1419] shrink-0 font-bold text-xs">
                BG
              </div>
              <div>
                <h3 className="font-serif-cormorant text-lg font-bold text-[#F8F5F0] leading-none">
                  Care & Guidance Assistant
                </h3>
                <span className="text-[11px] text-[#C5A059]">Bakers Golden Gate • Parkersburg, WV</span>
              </div>
            </div>

            <button
              id="close-ai-chat-btn"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#F8F5F0]/50 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Urgent Call Line Sticky Mini-Bar */}
          <div className="bg-[#1A222C] px-3.5 py-1.5 border-b border-[#FFFFFF10] flex items-center justify-between text-xs text-[#F8F5F0]">
            <span className="font-medium text-[11px] text-[#F8F5F0]/70">Immediate Need?</span>
            <a
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="font-bold text-red-400 hover:text-red-300 flex items-center gap-1 text-[11px]"
            >
              <Phone className="w-3 h-3" />
              <span>(740) 691-1488 (24/7)</span>
            </a>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#1A222C] text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center shrink-0 text-[10px] font-bold mt-1">
                    BG
                  </div>
                )}
                <div
                  className={`p-3 rounded-lg max-w-[82%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#C5A880] text-[#0F1419] font-medium rounded-br-none'
                      : 'bg-[#141A21] text-[#F8F5F0] border border-[#FFFFFF10] rounded-bl-none shadow-xl'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-1 ${
                      msg.sender === 'user' ? 'text-[#0F1419]/70 text-right' : 'text-[#F8F5F0]/40'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-xs text-[#F8F5F0]/60 italic pl-8">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C5A059]" />
                <span>Preparing compassionate guidance...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div className="px-3 py-2 bg-[#0F1419] border-t border-[#FFFFFF10] overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full bg-[#141A21] hover:bg-[#1A222C] border border-[#FFFFFF15] text-[11px] text-[#F8F5F0]/80 shrink-0 transition-colors shadow-xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#141A21] border-t border-[#FFFFFF10] flex items-center gap-2"
          >
            <input
              id="ai-chat-input"
              type="text"
              placeholder="Ask about funeral care, steps, or etiquette..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-[#0F1419] border border-[#FFFFFF15] rounded-sm text-[#F8F5F0] placeholder-[#F8F5F0]/40 focus:outline-hidden focus:ring-1 focus:ring-[#C5A059]"
            />
            <button
              id="ai-chat-send-btn"
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-2 rounded-sm bg-[#C5A880] hover:bg-[#D4B16A] text-[#0F1419] disabled:opacity-40 transition-colors shrink-0"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};
