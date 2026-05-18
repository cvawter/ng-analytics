import { useState, useMemo } from "react";
// @ts-expect-error - Shared module typings are not yet generated
import { energyDemandCompanies, generateStockHistory, generateOptionChain, TICKER_BASE_PRICES } from "@ng-analytics/shared";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Search, ExternalLink, Newspaper, FileText, MapPin, DollarSign, X, Gavel, ChevronDown, ChevronUp, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

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
    regulatoryActivity?: any[];
}

const MODAL_TABS = ["Overview", "Stock Chart", "Options Chain", "Regulatory"] as const;
type TabType = typeof MODAL_TABS[number];

function StockChart({ ticker, history }: { ticker: string; history: { date: string; price: number }[] }) {
    const prices = history.map(d => d.price);
    const minP = Math.min(...prices);
    const maxP = Math.max(...prices);
    const first = prices[0];
    const last = prices[prices.length - 1];
    const change = last - first;
    const changePct = ((change / first) * 100).toFixed(2);
    const isUp = change >= 0;

    const CustomTooltip = ({ active, payload }: any) => {
        if (!active || !payload?.length) return null;
        return (
            <div className="bg-[#1a1d28] border border-white/10 rounded-lg px-3 py-2 text-sm shadow-xl">
                <div className="text-[#8a94a6] text-xs mb-1">{payload[0].payload.date}</div>
                <div className="text-[#eef0f4] font-bold">${payload[0].value.toFixed(2)}</div>
            </div>
        );
    };

    return (
        <div>
            <div className="flex items-end gap-4 mb-6">
                <div>
                    <div className="text-xs text-[#8a94a6] uppercase tracking-wider mb-1">{ticker} · 30-Day Price</div>
                    <div className="text-4xl font-bold text-[#eef0f4]">${last.toFixed(2)}</div>
                </div>
                <div className={`pb-1 flex items-center gap-1 text-lg font-bold ${isUp ? "text-emerald-400" : "text-red-400"}`}>
                    <TrendingUp className="h-5 w-5" />
                    {isUp ? "+" : ""}{change.toFixed(2)} ({isUp ? "+" : ""}{changePct}%)
                </div>
            </div>
            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={history} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="chartGradShadcn" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={isUp ? "#10b981" : "#ef4444"} stopOpacity={0.25} />
                                <stop offset="95%" stopColor={isUp ? "#10b981" : "#ef4444"} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 11 }} tickLine={false} axisLine={false} interval={4} />
                        <YAxis domain={[minP * 0.97, maxP * 1.03]} tick={{ fill: "#6b7280", fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${v.toFixed(0)}`} width={50} />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine y={first} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 2" />
                        <Area type="monotone" dataKey="price" stroke={isUp ? "#10b981" : "#ef4444"} strokeWidth={2} fill="url(#chartGradShadcn)" dot={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

function OptionsChain({ chain }: { chain: any[] }) {
    const [selectedExp, setSelectedExp] = useState(0);
    const { expiration, strikes } = chain[selectedExp];
    const atm = strikes[Math.floor(strikes.length / 2)].strike;

    return (
        <div>
            <div className="flex gap-2 mb-4">
                {chain.map((c: any, i: number) => (
                    <Button key={c.expiration} variant={i === selectedExp ? "default" : "outline"} onClick={() => setSelectedExp(i)}
                        className={`text-xs font-mono font-bold h-8 ${i !== selectedExp ? "text-[#8a94a6] bg-white/[0.04] border-white/10" : ""}`}>
                        {c.expiration}
                    </Button>
                ))}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="text-[#6b7280] border-b border-white/[0.06]">
                            <th className="text-left py-2 px-2 font-mono">CALL BID</th>
                            <th className="text-left py-2 px-2 font-mono">CALL ASK</th>
                            <th className="text-left py-2 px-2 font-mono">IV%</th>
                            <th className="text-center py-2 px-3 font-bold uppercase tracking-widest text-[#f0a500]">STRIKE</th>
                            <th className="text-right py-2 px-2 font-mono">IV%</th>
                            <th className="text-right py-2 px-2 font-mono">PUT BID</th>
                            <th className="text-right py-2 px-2 font-mono">PUT ASK</th>
                        </tr>
                    </thead>
                    <tbody>
                        {strikes.map((row: any) => {
                            const isATM = row.strike === atm;
                            return (
                                <tr key={row.strike} className={`border-b border-white/[0.04] transition-colors ${isATM ? "bg-[#f0a500]/5 border-[#f0a500]/20" : "hover:bg-white/[0.02]"}`}>
                                    <td className="py-2 px-2 text-emerald-400 font-mono">{row.call.bid.toFixed(2)}</td>
                                    <td className="py-2 px-2 text-emerald-400/70 font-mono">{row.call.ask.toFixed(2)}</td>
                                    <td className="py-2 px-2 text-[#8a94a6] font-mono">{row.call.iv}%</td>
                                    <td className={`py-2 px-3 text-center font-bold font-mono ${isATM ? "text-[#f0a500]" : "text-[#eef0f4]"}`}>
                                        ${row.strike}{isATM && <span className="ml-1 text-[9px] bg-[#f0a500]/20 text-[#f0a500] rounded px-1">ATM</span>}
                                    </td>
                                    <td className="py-2 px-2 text-right text-[#8a94a6] font-mono">{row.put.iv}%</td>
                                    <td className="py-2 px-2 text-right text-red-400 font-mono">{row.put.bid.toFixed(2)}</td>
                                    <td className="py-2 px-2 text-right text-red-400/70 font-mono">{row.put.ask.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <p className="text-[10px] text-[#6b7280] mt-3 text-center">Simulated data for educational purposes only. Not financial advice.</p>
        </div>
    );
}

function CompanyModal({ company, onClose }: { company: Company; onClose: () => void }) {
    const [tab, setTab] = useState<TabType>("Overview");
    const [expandedDocket, setExpandedDocket] = useState<string | null>(null);

    const basePrice: number = (TICKER_BASE_PRICES as Record<string, number>)[company.ticker] ?? 50;
    const stockHistory = useMemo(() => generateStockHistory(company.ticker, basePrice), [company.ticker, basePrice]);
    const optionChain = useMemo(() => generateOptionChain(company.ticker, basePrice), [company.ticker, basePrice]);

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#13161f] border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col max-h-[90vh]">
                <div className="p-6 pb-0 shrink-0">
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-[#8a94a6] hover:text-white">
                        <X className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-3 mb-3">
                        <h2 className="text-2xl font-bold text-[#eef0f4]">{company.name}</h2>
                        <span className="px-2 py-1 bg-[#f0a500]/10 border border-[#f0a500]/30 text-[#f0a500] rounded-md font-mono text-xs font-bold">{company.ticker}</span>
                    </div>
                    <span className="inline-flex w-fit rounded-md bg-white/[0.05] border border-white/10 px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#9ca3af] mb-4">{company.type}</span>
                    <div className="flex gap-1 mt-2 border-b border-white/[0.08]">
                        {MODAL_TABS.map(t => (
                            <button key={t} onClick={() => setTab(t)}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-px ${tab === t ? "border-[#f0a500] text-[#f0a500]" : "border-transparent text-[#6b7280] hover:text-[#eef0f4]"}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-y-auto flex-1 p-6">
                    {tab === "Overview" && (
                        <div>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 text-[#6b7280] mb-2"><MapPin className="h-4 w-4" /><span className="text-xs font-bold uppercase">Headquarters</span></div>
                                    <p className="text-sm text-[#eef0f4]">{company.headquarters}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 text-[#6b7280] mb-2"><DollarSign className="h-4 w-4" /><span className="text-xs font-bold uppercase">Market Cap</span></div>
                                    <p className="text-sm text-[#eef0f4]">{company.marketCap}</p>
                                </div>
                            </div>
                            <div className="mb-6">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-[#8a94a6] mb-3">Why It Matters for AI</h4>
                                <p className="text-[#c8cdd8] leading-relaxed">{company.description}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button onClick={() => window.open(company.news_url, "_blank")}
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#f0a500] hover:bg-[#e05c00] text-black font-bold py-3 px-4 rounded-xl transition-colors">
                                    <Newspaper className="h-5 w-5 shrink-0" />Live News Feed<ExternalLink className="h-4 w-4 opacity-70 shrink-0" />
                                </button>
                                <button onClick={() => window.open(company.sec10k_url, "_blank")}
                                    className="flex-1 flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/10 border border-white/10 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                                    <FileText className="h-5 w-5 shrink-0" />Latest SEC 10-K<ExternalLink className="h-4 w-4 opacity-70 shrink-0" />
                                </button>
                            </div>
                        </div>
                    )}

                    {tab === "Stock Chart" && (
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                            <StockChart ticker={company.ticker} history={stockHistory} />
                        </div>
                    )}

                    {tab === "Options Chain" && (
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Activity className="h-4 w-4 text-[#f0a500]" />
                                <h4 className="text-sm font-bold uppercase tracking-wider text-[#8a94a6]">Options Chain — {company.ticker}</h4>
                            </div>
                            <OptionsChain chain={optionChain} />
                        </div>
                    )}

                    {tab === "Regulatory" && (
                        <div>
                            {(company.regulatoryActivity?.length ?? 0) > 0 ? (
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 text-[#8a94a6] mb-1">
                                        <Gavel className="h-5 w-5" />
                                        <h4 className="text-sm font-bold uppercase tracking-wider">Regulatory Activity</h4>
                                    </div>
                                    {company.regulatoryActivity!.map((docket: any, idx: number) => (
                                        <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
                                            <button onClick={() => setExpandedDocket(expandedDocket === docket.docketId ? null : docket.docketId)}
                                                className="w-full flex items-center justify-between p-4 hover:bg-white/[0.04] transition-colors focus:outline-none">
                                                <div className="flex items-center gap-3 text-left">
                                                    <span className="px-2 py-1 bg-[#f0a500]/10 border border-[#f0a500]/20 text-[#f0a500] rounded text-[10px] font-mono font-bold uppercase">{docket.agency}</span>
                                                    <div>
                                                        <div className="text-sm font-bold text-[#eef0f4]">{docket.title}</div>
                                                        <div className="text-xs text-[#6b7280] font-mono mt-0.5">{docket.docketId}</div>
                                                    </div>
                                                </div>
                                                {expandedDocket === docket.docketId ? <ChevronUp className="h-5 w-5 text-[#8a94a6]" /> : <ChevronDown className="h-5 w-5 text-[#8a94a6]" />}
                                            </button>
                                            <AnimatePresence>
                                                {expandedDocket === docket.docketId && (
                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-white/5 bg-black/20">
                                                        <div className="p-4 flex flex-col gap-4">
                                                            {docket.documents.length > 0 && (
                                                                <div>
                                                                    <h5 className="text-[11px] font-bold uppercase tracking-widest text-[#6b7280] mb-2">Documents</h5>
                                                                    {docket.documents.map((doc: any, dIdx: number) => (
                                                                        <a key={dIdx} href={doc.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-colors group mb-2">
                                                                            <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-[#8a94a6] group-hover:text-[#f0a500]" /><span className="text-[13px] text-[#c8cdd8]">{doc.title}</span></div>
                                                                            <ExternalLink className="h-3 w-3 text-[#6b7280]" />
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            {docket.comments.length > 0 && (
                                                                <div>
                                                                    <h5 className="text-[11px] font-bold uppercase tracking-widest text-[#6b7280] mb-2">Company Comments</h5>
                                                                    {docket.comments.map((com: any, cIdx: number) => (
                                                                        <a key={cIdx} href={com.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2 rounded-lg bg-[#f0a500]/5 hover:bg-[#f0a500]/10 border border-[#f0a500]/10 transition-colors group mb-2">
                                                                            <div className="flex items-center gap-2"><Newspaper className="h-4 w-4 text-[#f0a500]" /><span className="text-[13px] text-[#eef0f4]">{com.title}</span></div>
                                                                            <ExternalLink className="h-3 w-3 text-[#f0a500]/70" />
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-[#6b7280] py-12">No regulatory activity on record.</p>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    );
}

export default function Companies() {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    const types = ["All", ...new Set(energyDemandCompanies.map((c: Company) => c.type))];
    const filtered = energyDemandCompanies.filter((company: Company) => {
        const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase()) || company.description.toLowerCase().includes(search.toLowerCase());
        const matchesType = filterType === "All" || company.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen bg-[#0d0f14] text-[#c8cdd8] font-sans pb-20 relative">
            <div className="mx-auto max-w-[1280px] p-6">
                <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#f0a500] to-[#e05c00] shadow-[0_0_18px_rgba(240,165,0,0.35)]">
                            <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#f0a500]">MacroDesk AI · Energy Demand</span>
                    </div>
                    <h1 className="m-0 text-[26px] font-bold leading-tight tracking-tight text-[#eef0f4]">
                        AI Energy Demand <span className="text-[#f0a500]">— Companies</span>
                    </h1>
                    <p className="mt-2 max-w-2xl text-[13px] text-[#6b7280]">Utilities, nuclear operators, natural gas producers, grid infrastructure providers, and hyperscalers repositioning around AI expansion.</p>
                </motion.div>

                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 focus-within:border-[#f0a500]/50 transition-colors">
                        <Search className="h-4 w-4 text-[#6b7280]" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search companies, descriptions..."
                            className="w-full bg-transparent text-[13px] text-[#eef0f4] placeholder-[#6b7280] outline-none" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {types.map((t: any) => (
                            <Button key={t} onClick={() => setFilterType(t)} variant={filterType === t ? "default" : "outline"}
                                className={`rounded-md px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider h-8 ${filterType !== t ? "text-[#6b7280] bg-white/[0.03] border-white/[0.08]" : ""}`}>
                                {t}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((company: Company, idx: number) => (
                        <motion.div key={company.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.04 }}>
                            <button className="text-left w-full h-full focus:outline-none block" onClick={() => setSelectedCompany(company)}>
                                <Card className="h-full rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:border-[#f0a500]/30 group cursor-pointer">
                                    <CardContent className="p-5 flex flex-col h-full">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-[15px] font-bold text-[#eef0f4] group-hover:text-[#f0a500] transition-colors">{company.name}</h3>
                                            <span className="font-mono text-[11px] font-bold text-[#f0a500]/70">{company.ticker}</span>
                                        </div>
                                        <span className="inline-flex w-fit rounded-md bg-white/[0.05] border border-white/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] mb-3">{company.type}</span>
                                        <p className="text-[13px] leading-relaxed text-[#8a94a6] flex-grow line-clamp-3">{company.description}</p>
                                    </CardContent>
                                </Card>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedCompany && <CompanyModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />}
            </AnimatePresence>
        </div>
    );
}
