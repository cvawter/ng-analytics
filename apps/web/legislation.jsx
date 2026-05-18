import React, { useState } from "react";
import { energyDemandCompanies } from "@ng-analytics/shared";
import { motion, AnimatePresence } from "framer-motion";
import { Gavel, Search, ExternalLink, FileText, Newspaper, ChevronDown, ChevronUp, MapPin, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Legislation() {
    const [search, setSearch] = useState("");
    const [expandedDocket, setExpandedDocket] = useState(null);

    // Aggregate all unique dockets from all companies
    const allDockets = [];
    energyDemandCompanies.forEach(company => {
        if (company.regulatoryActivity) {
            company.regulatoryActivity.forEach(docket => {
                const existing = allDockets.find(d => d.docketId === docket.docketId);
                if (!existing) {
                    allDockets.push({
                        ...docket,
                        impactedCompanies: [company.name]
                    });
                } else {
                    if (!existing.impactedCompanies.includes(company.name)) {
                        existing.impactedCompanies.push(company.name);
                    }
                }
            });
        }
    });

    const filteredDockets = allDockets.filter(d => 
        d.title.toLowerCase().includes(search.toLowerCase()) || 
        d.docketId.toLowerCase().includes(search.toLowerCase()) ||
        d.agency.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0d0f14] text-[#c8cdd8] font-sans pb-20 relative">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#f0a500]/5 to-transparent pointer-events-none" />
            
            <div className="mx-auto max-w-[1000px] p-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 pt-8 flex flex-col gap-4 text-center items-center"
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0a500] to-[#e05c00] shadow-[0_0_32px_rgba(240,165,0,0.35)] mb-2">
                        <Gavel className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-[#eef0f4]">
                        Legislation & <span className="text-[#f0a500]">Regulations</span>
                    </h1>
                    <p className="max-w-2xl text-[15px] text-[#8a94a6] leading-relaxed">
                        Track active dockets, proposed rules, and industry comments impacting AI infrastructure and energy generation across the United States.
                    </p>
                </motion.div>

                <div className="mb-10">
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors focus-within:border-[#f0a500]/50 shadow-inner">
                        <Search className="h-5 w-5 text-[#8a94a6]" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by Docket ID, Title, or Agency (e.g. EPA, FERC)..."
                            className="w-full bg-transparent text-[15px] text-[#eef0f4] placeholder-[#6b7280] outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {filteredDockets.map((docket, idx) => (
                        <motion.div
                            key={docket.docketId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[#f0a500]/30 transition-colors shadow-lg">
                                <button 
                                    onClick={() => setExpandedDocket(expandedDocket === docket.docketId ? null : docket.docketId)}
                                    className="w-full text-left p-6 flex flex-col md:flex-row gap-4 md:items-center justify-between focus:outline-none hover:bg-white/[0.02] transition-colors"
                                >
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#f0a500]/10 border border-[#f0a500]/20 text-[#f0a500] font-bold font-mono text-sm uppercase">
                                                {docket.agency}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#eef0f4] mb-1">{docket.title}</h3>
                                            <div className="flex flex-wrap items-center gap-3 text-sm text-[#8a94a6]">
                                                <span className="font-mono bg-white/5 px-2 py-0.5 rounded text-[#c8cdd8]">{docket.docketId}</span>
                                                <span className="flex items-center gap-1">
                                                    <Target className="h-4 w-4" />
                                                    {docket.impactedCompanies.length} Impacted Companies
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-white/5 text-[#8a94a6]">
                                        {expandedDocket === docket.docketId ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                    </div>
                                </button>
                                
                                <AnimatePresence>
                                    {expandedDocket === docket.docketId && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-white/10 bg-black/40"
                                        >
                                            <CardContent className="p-6">
                                                <div className="grid md:grid-cols-2 gap-8">
                                                    <div>
                                                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-4 flex items-center gap-2">
                                                            <FileText className="h-4 w-4" />
                                                            Official Documents
                                                        </h4>
                                                        <div className="flex flex-col gap-3">
                                                            {docket.documents.map((doc, dIdx) => (
                                                                <a key={dIdx} href={doc.url} target="_blank" rel="noreferrer" className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group">
                                                                    <div className="mt-0.5"><FileText className="h-4 w-4 text-[#8a94a6] group-hover:text-[#f0a500]" /></div>
                                                                    <div className="flex-1">
                                                                        <div className="text-[14px] text-[#eef0f4] font-medium leading-snug mb-1">{doc.title}</div>
                                                                        <div className="text-[11px] font-mono text-[#6b7280]">{doc.id}</div>
                                                                    </div>
                                                                    <ExternalLink className="h-4 w-4 text-[#6b7280] group-hover:text-[#f0a500]" />
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    
                                                    <div>
                                                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-4 flex items-center gap-2">
                                                            <Newspaper className="h-4 w-4" />
                                                            Industry Comments
                                                        </h4>
                                                        <div className="flex flex-col gap-3">
                                                            {docket.comments.map((com, cIdx) => (
                                                                <a key={cIdx} href={com.url} target="_blank" rel="noreferrer" className="flex items-start gap-3 p-3 rounded-xl bg-[#f0a500]/5 hover:bg-[#f0a500]/10 border border-[#f0a500]/10 transition-colors group">
                                                                    <div className="mt-0.5"><Newspaper className="h-4 w-4 text-[#f0a500]" /></div>
                                                                    <div className="flex-1">
                                                                        <div className="text-[14px] text-[#eef0f4] font-medium leading-snug mb-1">{com.title}</div>
                                                                        <div className="text-[11px] font-mono text-[#f0a500]/60">{com.id}</div>
                                                                    </div>
                                                                    <ExternalLink className="h-4 w-4 text-[#f0a500]/50 group-hover:text-[#f0a500]" />
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-8 pt-6 border-t border-white/10">
                                                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#6b7280] mb-3">Impacted Companies</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {docket.impactedCompanies.map((companyName, cIdx) => (
                                                            <span key={cIdx} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-[#c8cdd8]">
                                                                {companyName}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        </motion.div>
                    ))}
                    
                    {filteredDockets.length === 0 && (
                        <div className="text-center py-20 text-[#6b7280]">
                            No regulatory dockets found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
