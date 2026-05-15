import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Cpu, Loader2 } from 'lucide-react';

export default function AIChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your AI Graph Analyst. I am currently running in a mock offline mode. When the backend is ready, I will query the Neo4j ontology to answer your questions. Try asking me a question!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `(Simulated GraphRAG Response)\n\nBased on the knowledge graph context:\n\nThe term "${userMessage.content}" maps to multiple nodes in our ontology. If the backend were connected, I would traverse the relationships and provide a detailed natural gas analysis here.`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] flex flex-col items-center pt-8 pb-24 px-4 font-sans">
      <div className="w-full max-w-3xl flex-1 flex flex-col bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        
        {/* Header */}
        <div className="bg-[#161922] p-6 border-b border-white/5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0a500] to-[#e05c00]">
            <Cpu className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#eef0f4]">AI Graph Analyst</h1>
            <p className="text-sm text-[#8a94a6]">GraphRAG Sandbox</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-5 ${
                msg.role === 'user' 
                ? 'bg-[#f0a500]/10 border border-[#f0a500]/20 rounded-br-sm' 
                : 'bg-white/[0.03] border border-white/10 rounded-bl-sm'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {msg.role === 'user' ? (
                    <User className="h-4 w-4 text-[#f0a500]" />
                  ) : (
                    <Cpu className="h-4 w-4 text-[#a1a1aa]" />
                  )}
                  <span className={`text-xs font-bold uppercase tracking-wider ${msg.role === 'user' ? 'text-[#f0a500]' : 'text-[#a1a1aa]'}`}>
                    {msg.role === 'user' ? 'You' : 'MacroDesk AI'}
                  </span>
                </div>
                <div className="text-[15px] leading-relaxed text-[#c8cdd8] whitespace-pre-wrap">
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl rounded-bl-sm p-4 flex items-center gap-3">
                <Loader2 className="h-4 w-4 text-[#f0a500] animate-spin" />
                <span className="text-sm text-[#9ca3af]">Analyzing graph...</span>
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-[#161922] border-t border-white/5">
          <form onSubmit={sendMessage} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Working Gas, Permitting, etc..."
              className="w-full bg-black/20 border border-white/10 rounded-full py-4 pl-6 pr-16 text-[#eef0f4] focus:outline-none focus:border-[#f0a500]/50 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 h-10 w-10 flex items-center justify-center rounded-full bg-[#f0a500] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e05c00] transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
