import React, { useState, useEffect, useRef } from 'react';
import { Terminal, CheckCircle2, XCircle, BookOpen, Activity, Play, Square, FileText } from 'lucide-react';

const INITIAL_QUEUE = [
  {
    id: 'hyp-1',
    text: 'Unseasonably warm winter will cause a 15% increase in Working Gas injections, tightening the Basis Spread in Q1.',
    confidence: 88,
    source: 'EIA Weekly Storage Report (Nov)'
  },
  {
    id: 'hyp-2',
    text: 'The Certified Welder Shortage is delaying Pipeline Expansions by an average of 4.2 months across the Gulf Coast region.',
    confidence: 92,
    source: 'Macroeconomic Labor Data & EIA Projects'
  }
];

export default function AutoResearcher() {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState(['[SYSTEM] AutoResearcher Agent initialized.']);
  const [reviewQueue, setReviewQueue] = useState(INITIAL_QUEUE);
  const [wikiEntries, setWikiEntries] = useState([
    {
      id: 'wiki-1',
      text: 'Working Gas levels directly impact Regional Supply Capacity, acting as the primary buffer against weather-driven demand shocks.',
      date: new Date().toLocaleDateString()
    }
  ]);
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      const messages = [
        '[AGENT] Parsing incoming EIA Natural Gas Storage Report...',
        '[AGENT] Extracting entities: Working Gas, Basis Spread, StorageShockSignal.',
        '[AGENT] Cross-referencing historical weather patterns...',
        '[AGENT] Proposing new hypothesis. Confidence score: 85%.',
        '[AGENT] Submitting hypothesis to Human-in-the-Loop review queue.',
        '[AGENT] Sleeping for next interval...'
      ];
      let i = 0;
      interval = setInterval(() => {
        setLogs(prev => [...prev, messages[i]]);
        i = (i + 1) % messages.length;
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleApprove = (hypothesis) => {
    setReviewQueue(prev => prev.filter(h => h.id !== hypothesis.id));
    setWikiEntries(prev => [{
      id: `wiki-${Date.now()}`,
      text: hypothesis.text,
      date: new Date().toLocaleDateString()
    }, ...prev]);
  };

  const handleReject = (id) => {
    setReviewQueue(prev => prev.filter(h => h.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] text-[#eef0f4] p-6 lg:p-12 font-sans overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Activity className="h-8 w-8 text-[#f0a500]" />
            Auto Research
          </h1>
          <p className="text-[#9ca3af] mt-2 max-w-3xl">
            Autonomous agent pipeline for hypothesis generation and knowledge base maintenance. 
            Approve generated theories to commit them to the Markdown Wiki as engineered context.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Left Column: Agent Feed & Review Queue */}
          <div className="space-y-6">
            
            {/* Agent Control & Feed */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-[#161922] p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-[#f0a500]" />
                  <h2 className="font-semibold">Live Agent Feed</h2>
                </div>
                <button 
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                    isRunning ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-[#f0a500] text-white hover:bg-[#e05c00]'
                  }`}
                >
                  {isRunning ? <Square className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
                  {isRunning ? 'STOP AGENT' : 'START AUTORESEARCH'}
                </button>
              </div>
              <div className="h-48 bg-black/40 p-4 font-mono text-[13px] text-[#4ade80] overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className="mb-2 opacity-90">{log}</div>
                ))}
                <div ref={logEndRef} />
              </div>
            </div>

            {/* Human in the loop queue */}
            <div className="bg-white/[0.02] border border-[#f0a500]/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(240,165,0,0.05)]">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#f0a500]">
                <FileText className="h-5 w-5" />
                Review Queue (Human-in-the-Loop)
              </h2>
              {reviewQueue.length === 0 ? (
                <div className="text-center py-8 text-[#6b7280]">No pending hypotheses. Start the agent to generate more.</div>
              ) : (
                <div className="space-y-4">
                  {reviewQueue.map(hyp => (
                    <div key={hyp.id} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                      <p className="text-[15px] leading-relaxed text-[#eef0f4] mb-4">"{hyp.text}"</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-xs text-[#9ca3af]">
                          <span><strong className="text-white">Conf:</strong> {hyp.confidence}%</span>
                          <span><strong className="text-white">Src:</strong> {hyp.source}</span>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleReject(hyp.id)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors">
                            <XCircle className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleApprove(hyp)} className="p-2 rounded-lg bg-[#f0a500]/10 hover:bg-[#f0a500]/20 text-[#f0a500] transition-colors">
                            <CheckCircle2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: LLM Wiki */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-lg flex flex-col h-[calc(100vh-12rem)] min-h-[600px]">
            <div className="bg-[#161922] p-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-[#60a5fa]" />
                <div>
                  <h2 className="font-semibold text-lg">LLM Wiki (packages/shared/wiki)</h2>
                  <p className="text-xs text-[#6b7280]">Engineered context for AI Graph Analyst</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-[#0d0f14]">
              <div className="prose prose-invert max-w-none">
                <div className="p-4 bg-[#60a5fa]/10 border-l-4 border-[#60a5fa] rounded-r-lg mb-6 text-sm text-[#c8cdd8]">
                  These markdown blocks represent the approved context injected directly into the LLM system prompt whenever the user chats with the AI Analyst.
                </div>
                
                {wikiEntries.map(entry => (
                  <div key={entry.id} className="mb-6 pb-6 border-b border-white/10 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-[#60a5fa]">## Context_Block_{entry.id.split('-')[1]}</span>
                      <span className="text-xs text-[#6b7280] ml-auto">Committed: {entry.date}</span>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4 font-mono text-[13px] leading-relaxed text-[#eef0f4]">
                      {entry.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
