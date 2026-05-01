import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Network, ArrowLeft, Terminal, Cpu, Share2 } from 'lucide-react';
import { Card, CardContent } from './components/ui/card';
import EIANaturalGasReports from './ngreports';
import MacroDeskOntologyExplorer from './ontology-explorer';
import AIChatInterface from './chat';
import GraphExplorer from './graph-explorer';

function LandingPage({ setView }) {
  return (
    <div className="min-h-screen bg-[#0d0f14] text-[#c8cdd8] font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f0a500]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0a500] to-[#e05c00] shadow-[0_0_24px_rgba(240,165,0,0.35)]">
            <Terminal className="h-6 w-6 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#eef0f4] mb-4">
          MacroDesk <span className="text-[#f0a500]">AI Platform</span>
        </h1>
        <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
          Centralized intelligence, reports catalog, and knowledge graph mapping for natural gas and macroeconomics.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl relative z-10">
        <motion.button onClick={() => setView('reports')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="text-left w-full focus:outline-none">
          <Card className="h-full rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-[#f0a500]/30 group">
            <CardContent className="p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0a500]/10 text-[#f0a500] group-hover:scale-110 transition-transform">
                <Database className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-[#eef0f4] mb-3">Natural Gas Reports</h2>
              <p className="text-[14px] leading-relaxed text-[#8a94a6]">Explore the complete historical catalog of EIA publications. Access release schedules and data matrices.</p>
            </CardContent>
          </Card>
        </motion.button>

        <motion.button onClick={() => setView('ontology')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="text-left w-full focus:outline-none">
          <Card className="h-full rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-[#f0a500]/30 group">
            <CardContent className="p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0a500]/10 text-[#f0a500] group-hover:scale-110 transition-transform">
                <Network className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-[#eef0f4] mb-3">Ontology Explorer</h2>
              <p className="text-[14px] leading-relaxed text-[#8a94a6]">Navigate the cross-domain knowledge graph. Review mappings and trace reasoning paths.</p>
            </CardContent>
          </Card>
        </motion.button>

        <motion.button onClick={() => setView('chat')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="text-left w-full focus:outline-none">
          <Card className="h-full rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-[#f0a500]/30 group">
            <CardContent className="p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0a500]/10 text-[#f0a500] group-hover:scale-110 transition-transform">
                <Cpu className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-[#eef0f4] mb-3">AI Graph Analyst</h2>
              <p className="text-[14px] leading-relaxed text-[#8a94a6]">Interact with our GraphRAG backend. Query the knowledge graph using natural language.</p>
            </CardContent>
          </Card>
        </motion.button>

        <motion.button onClick={() => setView('graph')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="text-left w-full focus:outline-none">
          <Card className="h-full rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-[#f0a500]/30 group">
            <CardContent className="p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0a500]/10 text-[#f0a500] group-hover:scale-110 transition-transform">
                <Share2 className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-[#eef0f4] mb-3">Graph Visualizer</h2>
              <p className="text-[14px] leading-relaxed text-[#8a94a6]">Interactive 2D physics graph. Zoom, pan, and drag nodes to explore Neo4j data structures.</p>
            </CardContent>
          </Card>
        </motion.button>
      </div>
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="min-h-screen bg-[#0d0f14]">
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage setView={setCurrentView} />
          </motion.div>
        )}
        
        {currentView === 'reports' && (
          <motion.div key="reports" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
            <EIANaturalGasReports />
          </motion.div>
        )}
        
        {currentView === 'ontology' && (
          <motion.div key="ontology" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
            <MacroDeskOntologyExplorer />
          </motion.div>
        )}

        {currentView === 'chat' && (
          <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative h-screen">
            <AIChatInterface />
          </motion.div>
        )}

        {currentView === 'graph' && (
          <motion.div key="graph" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative h-screen">
            <GraphExplorer />
          </motion.div>
        )}
      </AnimatePresence>

      {currentView !== 'home' && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => setCurrentView('home')}
          className="fixed bottom-6 left-6 z-50 flex items-center justify-center gap-2 rounded-full bg-[#13161f]/90 backdrop-blur-md border border-white/10 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-wider text-[#eef0f4] shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:bg-white/10 hover:border-[#f0a500]/50 transition-all focus:outline-none"
        >
          <ArrowLeft className="h-4 w-4 text-[#f0a500]" />
          Back to Hub
        </motion.button>
      )}
    </div>
  );
}
