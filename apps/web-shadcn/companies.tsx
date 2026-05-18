import { useState } from "react";
// @ts-expect-error - Shared module typings are not yet generated
import { energyDemandCompanies } from "@ng-analytics/shared";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Search, ExternalLink, Newspaper, FileText, MapPin, DollarSign, X, Gavel, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Company {
    id: string;
    name: string;
    ticker: string;
    headquarters: string;
    marketCap: string;
    type: string;
    description: string;
    news_url: string;
    sec10k_url: string;
}

export default function Companies() {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [expandedDocket, setExpandedDocket] = useState<string | null>(null);

    const types = ["All", ...new Set(energyDemandCompanies.map((c: Company) => c.type))];

    const filtered = energyDemandCompanies.filter((company: Company) => {
        const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase()) || company.description.toLowerCase().includes(search.toLowerCase());
        const matchesType = filterType === "All" || company.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen bg-[#0d0f14] text-[#c8cdd8] font-sans pb-20 relative">
            <div className="mx-auto max-w-[1280px] p-6">
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
                >
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#f0a500] to-[#e05c00] shadow-[0_0_18px_rgba(240,165,0,0.35)]">
                                <Building2 className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#f0a500]">
                                MacroDesk AI · Energy Demand
                            </span>
                        </div>
                        <h1 className="m-0 text-[26px] font-bold leading-tight tracking-tight text-[#eef0f4]">
                            AI Energy Demand{" "}
                            <span className="text-[#f0a500]"> — Companies</span>
                        </h1>
                        <p className="mt-2 max-w-2xl text-[13px] text-[#6b7280]">
                            Utilities, nuclear operators, natural gas producers, grid infrastructure providers, and hyperscalers repositioning around AI expansion.
                        </p>
                    </div>
                </motion.div>

                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 transition-colors focus-within:border-[#f0a500]/50">
                        <Search className="h-4 w-4 text-[#6b7280]" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search companies, descriptions..."
                            className="w-full bg-transparent text-[13px] text-[#eef0f4] placeholder-[#6b7280] outline-none"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {types.map((t: any) => (
                            <Button
                                key={t}
                                onClick={() => setFilterType(t)}
                                variant={filterType === t ? "default" : "outline"}
                                className={`rounded-md px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-all h-8 ${filterType !== t && "text-[#6b7280] bg-white/[0.03] border-white/[0.08]"}`}
                            >
                                {t}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((company: Company, idx: number) => (
                        <motion.div
                            key={company.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <button className="text-left w-full h-full focus:outline-none block" onClick={() => setSelectedCompany(company)}>
                                <Card className="h-full rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:border-[#f0a500]/30 group cursor-pointer">
                                    <CardContent className="p-5 flex flex-col h-full">
                                        <div className="mb-3">
                                            <h3 className="text-[16px] font-bold text-[#eef0f4] group-hover:text-[#f0a500] transition-colors">{company.name}</h3>
                                        </div>
                                        <span className="inline-flex w-fit rounded-md bg-white/[0.05] border border-white/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] mb-4">
                                            {company.type}
                                        </span>
                                        <p className="text-[13px] leading-relaxed text-[#8a94a6] flex-grow line-clamp-3">
                                            {company.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedCompany && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCompany(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#13161f] border border-white/10 rounded-2xl shadow-2xl z-50 p-8 flex flex-col max-h-[90vh] overflow-y-auto"
                        >
                            <button 
                                onClick={() => setSelectedCompany(null)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-[#8a94a6] hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                            
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-3xl font-bold text-[#eef0f4]">{selectedCompany.name}</h2>
                                <span className="px-2 py-1 bg-[#f0a500]/10 border border-[#f0a500]/30 text-[#f0a500] rounded-md font-mono text-xs font-bold">
                                    {selectedCompany.ticker}
                                </span>
                            </div>
                            
                            <span className="inline-flex w-fit rounded-md bg-white/[0.05] border border-white/10 px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#9ca3af] mb-6">
                                {selectedCompany.type}
                            </span>
                            
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 text-[#6b7280] mb-2">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-xs font-bold uppercase">Headquarters</span>
                                    </div>
                                    <p className="text-sm text-[#eef0f4]">{selectedCompany.headquarters}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 text-[#6b7280] mb-2">
                                        <DollarSign className="h-4 w-4" />
                                        <span className="text-xs font-bold uppercase">Market Cap</span>
                                    </div>
                                    <p className="text-sm text-[#eef0f4]">{selectedCompany.marketCap}</p>
                                </div>
                            </div>
                            
                            <div className="mb-8">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-[#8a94a6] mb-3">Why It Matters for AI</h4>
                                <p className="text-[#c8cdd8] leading-relaxed">
                                    {selectedCompany.description}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-auto">
                                <button 
                                    onClick={() => window.open(selectedCompany.news_url, '_blank')}
                                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-[#f0a500] hover:bg-[#e05c00] text-black font-bold py-3 px-4 rounded-xl transition-colors"
                                >
                                    <Newspaper className="h-5 w-5 shrink-0" />
                                    Live News Feed
                                    <ExternalLink className="h-4 w-4 ml-1 opacity-70 shrink-0" />
                                </button>
                                <button 
                                    onClick={() => window.open(selectedCompany.sec10k_url, '_blank')}
                                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/10 border border-white/10 text-white font-bold py-3 px-4 rounded-xl transition-colors"
                                >
                                    <FileText className="h-5 w-5 shrink-0" />
                                    Latest SEC 10-K
                                    <ExternalLink className="h-4 w-4 ml-1 opacity-70 shrink-0" />
                                </button>
                            </div>

                            {selectedCompany.regulatoryActivity && selectedCompany.regulatoryActivity.length > 0 && (
                                <div className="mt-8">
                                    <div className="flex items-center gap-2 text-[#8a94a6] mb-4">
                                        <Gavel className="h-5 w-5" />
                                        <h4 className="text-sm font-bold uppercase tracking-wider">Regulatory Activity</h4>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {selectedCompany.regulatoryActivity.map((docket: any, idx: number) => (
                                            <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
                                                <button 
                                                    onClick={() => setExpandedDocket(expandedDocket === docket.docketId ? null : docket.docketId)}
                                                    className="w-full flex items-center justify-between p-4 hover:bg-white/[0.04] transition-colors focus:outline-none"
                                                >
                                                    <div className="flex items-center gap-3 text-left">
                                                        <span className="px-2 py-1 bg-[#f0a500]/10 border border-[#f0a500]/20 text-[#f0a500] rounded text-[10px] font-mono font-bold uppercase">
                                                            {docket.agency}
                                                        </span>
                                                        <div>
                                                            <div className="text-sm font-bold text-[#eef0f4]">{docket.title}</div>
                                                            <div className="text-xs text-[#6b7280] font-mono mt-0.5">{docket.docketId}</div>
                                                        </div>
                                                    </div>
                                                    {expandedDocket === docket.docketId ? (
                                                        <ChevronUp className="h-5 w-5 text-[#8a94a6]" />
                                                    ) : (
                                                        <ChevronDown className="h-5 w-5 text-[#8a94a6]" />
                                                    )}
                                                </button>
                                                
                                                <AnimatePresence>
                                                    {expandedDocket === docket.docketId && (
                                                        <motion.div 
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="border-t border-white/5 bg-black/20"
                                                        >
                                                            <div className="p-4 flex flex-col gap-4">
                                                                {docket.documents.length > 0 && (
                                                                    <div>
                                                                        <h5 className="text-[11px] font-bold uppercase tracking-widest text-[#6b7280] mb-2">Documents</h5>
                                                                        <div className="flex flex-col gap-2">
                                                                            {docket.documents.map((doc: any, dIdx: number) => (
                                                                                <a key={dIdx} href={doc.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-colors group">
                                                                                    <div className="flex items-center gap-2">
                                                                                        <FileText className="h-4 w-4 text-[#8a94a6] group-hover:text-[#f0a500] transition-colors" />
                                                                                        <span className="text-[13px] text-[#c8cdd8] group-hover:text-white transition-colors">{doc.title}</span>
                                                                                    </div>
                                                                                    <ExternalLink className="h-3 w-3 text-[#6b7280] group-hover:text-[#f0a500]" />
                                                                                </a>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {docket.comments.length > 0 && (
                                                                    <div>
                                                                        <h5 className="text-[11px] font-bold uppercase tracking-widest text-[#6b7280] mb-2">Company Comments</h5>
                                                                        <div className="flex flex-col gap-2">
                                                                            {docket.comments.map((com: any, cIdx: number) => (
                                                                                <a key={cIdx} href={com.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2 rounded-lg bg-[#f0a500]/5 hover:bg-[#f0a500]/10 border border-[#f0a500]/10 transition-colors group">
                                                                                    <div className="flex items-center gap-2">
                                                                                        <Newspaper className="h-4 w-4 text-[#f0a500]" />
                                                                                        <span className="text-[13px] text-[#eef0f4]">{com.title}</span>
                                                                                    </div>
                                                                                    <ExternalLink className="h-3 w-3 text-[#f0a500]/70 group-hover:text-[#f0a500]" />
                                                                                </a>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
