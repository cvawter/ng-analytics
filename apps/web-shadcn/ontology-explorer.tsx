import { useMemo, useState } from "react";
// @ts-expect-error - Shared module typings are not yet generated
import { ontologyTerms, relationshipGraph, externalOntologies, ontologyCategories } from "@ng-analytics/shared";
import { motion } from "framer-motion";
import OntologyGraphViewer from "./ontology-graph-viewer";
import InAppBrowser from "./in-app-browser";
import {
    Search,
    Network,
    GitBranch,
    ShieldCheck,
    Database,
    Brain,
    Clock,
    FileText,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Layers,
    ChevronRight,
    Sparkles,
    Filter,
    BookOpen,
    Landmark,
    Factory,
    Hammer,
    Zap,
    LineChart,
    Library,
    ExternalLink,
    Tag,
    GitFork,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OntologyTerm {
    id: string;
    name: string;
    domain: string;
    definition: string;
    status: string;
    confidence: number;
    mappedTo: string[];
    sources: string[];
    relationships: string[];
}

interface ExternalOntology {
    id: string;
    name: string;
    fullName: string;
    namespace: string;
    category: string;
    url: string;
    baseTypes: string[];
    relevance: string;
    usage: string;
}



const domains = [
    { name: "Natural Gas", icon: Database, count: 128 },
    { name: "FIBO / Trading", icon: Landmark, count: 96 },
    { name: "AI Energy Demand", icon: Zap, count: 74 },
    { name: "Labor / Welding", icon: Hammer, count: 52 },
    { name: "Industrial Assets", icon: Factory, count: 66 },
    { name: "Decision Graph", icon: GitBranch, count: 43 },
];



const statusClasses: Record<string, string> = {
    Curated: "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",
    Reviewed: "bg-blue-400/10 text-blue-400 border-blue-400/30",
    Proposed: "bg-[#f0a500]/10 text-[#f0a500] border-[#f0a500]/30",
    Mapped: "bg-purple-400/10 text-purple-400 border-purple-400/30",
};

const categoryColors: Record<string, string> = {
    "Energy": "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    "Finance & Trading": "text-blue-400 bg-blue-400/10 border-blue-400/30",
    "Provenance": "text-purple-400 bg-purple-400/10 border-purple-400/30",
    "Measurement": "text-[#f0a500] bg-[#f0a500]/10 border-[#f0a500]/30",
    "Geospatial": "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    "Temporal": "text-rose-400 bg-rose-400/10 border-rose-400/30",
    "Knowledge Organization": "text-violet-400 bg-violet-400/10 border-violet-400/30",
    "Metadata": "text-slate-400 bg-slate-400/10 border-slate-400/30",
    "Energy Grid": "text-lime-400 bg-lime-400/10 border-lime-400/30",
    "Upper / Foundational": "text-indigo-400 bg-indigo-400/10 border-indigo-400/30",
    "General Purpose": "text-amber-400 bg-amber-400/10 border-amber-400/30",
};

export default function MacroDeskOntologyExplorer() {
    const [query, setQuery] = useState("");
    const [domain, setDomain] = useState("All");
    const [selectedId, setSelectedId] = useState("ng-working-gas");
    const [extCategory, setExtCategory] = useState("All");
    const [extSearch, setExtSearch] = useState("");
    const [graphOntology, setGraphOntology] = useState<ExternalOntology | null>(null);
    const [browserUrl, setBrowserUrl] = useState<string | null>(null);

    const filteredTerms = useMemo(() => {
        const q = query.toLowerCase();
        return ontologyTerms.filter((term: OntologyTerm) => {
            const matchesQuery =
                term.name.toLowerCase().includes(q) ||
                term.domain.toLowerCase().includes(q) ||
                term.definition.toLowerCase().includes(q) ||
                term.mappedTo.join(" ").toLowerCase().includes(q);
            const matchesDomain = domain === "All" || term.domain === domain;
            return matchesQuery && matchesDomain;
        });
    }, [query, domain]);

    const selected = ontologyTerms.find((term: OntologyTerm) => term.id === selectedId) || filteredTerms[0] || ontologyTerms[0];

    return (
        <>
        <div className="min-h-screen bg-[#0d0f14] text-[#c8cdd8] font-sans pb-20">
            <div className="mx-auto max-w-[1280px] p-6">
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
                >
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#f0a500] to-[#e05c00] shadow-[0_0_18px_rgba(240,165,0,0.35)]">
                                <Layers className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#f0a500]">
                                MacroDesk AI · Neo4j Context Graph
                            </span>
                        </div>
                        <h1 className="m-0 text-[26px] font-bold leading-tight tracking-tight text-[#eef0f4]">
                            Ontology Explorer
                            <span className="text-[#f0a500]"> — Knowledge Graph</span>
                        </h1>
                        <p className="mt-2 max-w-2xl text-[13px] text-[#6b7280]">
                            Review, map, approve, and trace ontology terms across natural gas, macroeconomics,
                            FIBO, labor, AI energy demand, industrial assets, and the Decision Graph.
                        </p>
                    </div>
                    <Button className="rounded-xl px-5 py-2.5 font-mono text-[11px] font-bold tracking-wider">
                        <Sparkles className="mr-2 h-4 w-4" /> PROPOSE WITH AI
                    </Button>
                </motion.div>

                <div className="mb-6 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {domains.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Card key={item.name} className="rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                                <CardContent className="p-4">
                                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0a500]/10 text-[#f0a500]">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="text-[13px] font-medium text-[#eef0f4]">{item.name}</div>
                                    <div className="mt-1 font-mono text-2xl font-bold text-[#f0a500]">{item.count}</div>
                                    <div className="font-mono text-[11px] uppercase tracking-wider text-[#6b7280]">ontology terms</div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
                    <Card className="rounded-3xl">
                        <CardContent className="p-4">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-[15px] font-semibold text-[#eef0f4]">Term Catalog</h2>
                                <Filter className="h-4 w-4 text-[#6b7280]" />
                            </div>
                            <div className="mb-4 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 transition-colors focus-within:border-[#f0a500]/50">
                                <Search className="h-4 w-4 text-[#6b7280]" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search terms, mappings, sources..."
                                    className="w-full bg-transparent text-[13px] text-[#eef0f4] placeholder-[#6b7280] outline-none"
                                />
                            </div>
                            
                            <div className="mb-4 flex flex-wrap gap-2">
                                <button
                                    onClick={() => setDomain("All")}
                                    className={`rounded-md px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-all ${
                                        domain === "All" ? "bg-[#f0a500]/15 border border-[#f0a500]/40 text-[#f0a500]" : "border border-white/[0.08] bg-white/[0.03] text-[#6b7280]"
                                    }`}
                                >
                                    ALL
                                </button>
                                {[...new Set<string>(ontologyTerms.map((t: OntologyTerm) => t.domain))].map((d: string) => (
                                    <button
                                        key={d}
                                        onClick={() => setDomain(d)}
                                        className={`rounded-md px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-all ${
                                            domain === d ? "bg-[#f0a500]/15 border border-[#f0a500]/40 text-[#f0a500]" : "border border-white/[0.08] bg-white/[0.03] text-[#6b7280]"
                                        }`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-3">
                                {filteredTerms.map((term: OntologyTerm) => (
                                    <button
                                        key={term.id}
                                        onClick={() => setSelectedId(term.id)}
                                        className={`w-full rounded-xl border p-3 text-left transition-all ${selected?.id === term.id ? "border-[#f0a500]/50 bg-white/5 shadow-[inset_4px_0_0_#f0a500]" : "border-white/[0.05] bg-transparent hover:bg-white/[0.02]"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="text-[14px] font-medium text-[#eef0f4]">{term.name}</div>
                                            <ChevronRight className="h-4 w-4 text-[#6b7280]" />
                                        </div>
                                        <div className="mt-1 font-mono text-[11px] text-[#9ca3af]">{term.domain}</div>
                                        <div
                                            className={`mt-2 inline-flex rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${statusClasses[term.status]}`}
                                        >
                                            {term.status}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="rounded-3xl">
                            <CardContent className="p-6">
                                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">Selected Ontology Term</div>
                                        <h2 className="text-[22px] font-semibold text-[#eef0f4]">{selected.name}</h2>
                                        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-[#c8cdd8]">{selected.definition}</p>
                                    </div>
                                    <div className={`rounded-md px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider ${statusClasses[selected.status]}`}>
                                        {selected.status}
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                                        <div className="mb-2 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">
                                            <ShieldCheck className="h-4 w-4" /> Confidence
                                        </div>
                                        <div className="font-mono text-3xl font-bold text-[#f0a500]">{Math.round(selected.confidence * 100)}%</div>
                                    </div>
                                    <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                                        <div className="mb-2 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">
                                            <BookOpen className="h-4 w-4" /> Mappings
                                        </div>
                                        <div className="text-[13px] text-[#eef0f4]">{selected.mappedTo.length} canonical links</div>
                                    </div>
                                    <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                                        <div className="mb-2 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">
                                            <FileText className="h-4 w-4" /> Sources
                                        </div>
                                        <div className="text-[13px] text-[#eef0f4]">{selected.sources.length} evidence sources</div>
                                    </div>
                                </div>

                                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                                    <section>
                                        <h3 className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-[#eef0f4]">
                                            <Network className="h-4 w-4 text-[#f0a500]" /> External / Canonical Mappings
                                        </h3>
                                        <div className="space-y-2">
                                            {selected.mappedTo.map((mapping: string) => (
                                                <div key={mapping} className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 font-mono text-[12px] text-[#c8cdd8]">
                                                    {mapping}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                    <section>
                                        <h3 className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-[#eef0f4]">
                                            <GitBranch className="h-4 w-4 text-[#f0a500]" /> Relationships
                                        </h3>
                                        <div className="space-y-2">
                                            {selected.relationships.map((rel: string) => (
                                                <div key={rel} className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 font-mono text-[12px] text-[#c8cdd8]">
                                                    {rel}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <Button className="rounded-xl font-mono text-[11px] tracking-wider uppercase">
                                        <CheckCircle2 className="mr-2 h-4 w-4" /> Approve to Curated Layer
                                    </Button>
                                    <Button className="rounded-xl font-mono text-[11px] tracking-wider uppercase">
                                        <AlertTriangle className="mr-2 h-4 w-4" /> Request Clarification
                                    </Button>
                                    <Button className="rounded-xl font-mono text-[11px] tracking-wider uppercase">
                                        <XCircle className="mr-2 h-4 w-4" /> Reject Term
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <Card className="rounded-3xl">
                                <CardContent className="p-6">
                                    <h3 className="mb-5 flex items-center gap-2 text-[15px] font-semibold text-[#eef0f4]">
                                        <LineChart className="h-5 w-5 text-[#f0a500]" /> Cross-Domain Reasoning
                                    </h3>
                                    <div className="space-y-3">
                                        {relationshipGraph.map(([a, rel, b], idx) => (
                                            <motion.div
                                                key={`${a}-${b}`}
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="rounded-xl border border-white/5 bg-white/[0.03] p-3"
                                            >
                                                <div className="text-[13px] font-medium text-[#eef0f4]">{a}</div>
                                                <div className="my-1.5 font-mono text-[10px] font-bold text-[#f0a500]">{rel}</div>
                                                <div className="text-[13px] text-[#c8cdd8]">{b}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-3xl">
                                <CardContent className="p-6">
                                    <h3 className="mb-5 flex items-center gap-2 text-[15px] font-semibold text-[#eef0f4]">
                                        <Brain className="h-5 w-5 text-[#f0a500]" /> Governance Timeline
                                    </h3>
                                    <div className="space-y-5">
                                        {[
                                            ["AI proposed term", "Candidate extracted from source evidence"],
                                            ["Human review", "Definition, units, and relationships checked"],
                                            ["Canonical mapping", "Mapped to FIBO, QUDT, PROV-O, or domain ontology"],
                                            ["Curated promotion", "Approved for GraphRAG, Decision Graph, and Agent Memory"],
                                        ].map(([title, desc], idx) => (
                                            <div key={title} className="flex gap-4">
                                                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#f0a500]/30 bg-[#f0a500]/10 font-mono text-[10px] font-bold text-[#f0a500]">
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <div className="text-[13px] font-medium text-[#eef0f4]">{title}</div>
                                                    <div className="mt-1 text-[12px] text-[#6b7280]">{desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 rounded-xl border border-[#f0a500]/20 bg-[#f0a500]/5 p-4 text-[12px] leading-relaxed text-[#c8cdd8]">
                                        <Clock className="mb-2 h-4 w-4 text-[#f0a500]" /> All changes are versioned with effective dates,
                                        reviewer, source evidence, confidence, and rationale.
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* External Ontology Reference Library */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8"
                >
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0a500]/10 text-[#f0a500]">
                            <Library className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-[18px] font-bold text-[#eef0f4]">Industry Ontology Reference Library</h2>
                            <p className="text-[12px] text-[#6b7280]">Third-party and industry-standard ontologies for abstract base types in the NG Macroeconomics Graph.</p>
                        </div>
                    </div>

                    <div className="mb-5 flex flex-col gap-3 sm:flex-row">
                        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 flex-1">
                            <Search className="h-4 w-4 text-[#6b7280] shrink-0" />
                            <input
                                value={extSearch}
                                onChange={(e) => setExtSearch(e.target.value)}
                                placeholder="Search ontologies, base types, relevance..."
                                className="w-full bg-transparent text-[13px] text-[#eef0f4] placeholder-[#6b7280] outline-none"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {ontologyCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setExtCategory(cat)}
                                    className={`rounded-md px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-all ${
                                        extCategory === cat ? "bg-[#f0a500]/15 border border-[#f0a500]/40 text-[#f0a500]" : "border border-white/[0.08] bg-white/[0.03] text-[#6b7280] hover:text-[#eef0f4]"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {externalOntologies
                            .filter((ont: ExternalOntology) => {
                                const q = extSearch.toLowerCase();
                                const matchesSearch = !q ||
                                    ont.name.toLowerCase().includes(q) ||
                                    ont.fullName.toLowerCase().includes(q) ||
                                    ont.relevance.toLowerCase().includes(q) ||
                                    ont.usage.toLowerCase().includes(q) ||
                                    ont.baseTypes.join(" ").toLowerCase().includes(q);
                                const matchesCat = extCategory === "All" || ont.category === extCategory;
                                return matchesSearch && matchesCat;
                            })
                            .map((ont: ExternalOntology) => (
                                <Card key={ont.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.035] transition-colors">
                                    <CardContent className="p-5">
                                        <div className="mb-3 flex items-start justify-between gap-2">
                                            <div>
                                                <div className="text-[15px] font-bold text-[#eef0f4]">{ont.name}</div>
                                                <div className="mt-0.5 font-mono text-[11px] text-[#6b7280]">{ont.namespace}</div>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${ categoryColors[ont.category] || "text-[#9ca3af] bg-white/5 border-white/10" }`}>
                                                    {ont.category}
                                                </span>
                                                <button onClick={() => setBrowserUrl(ont.url)} className="text-[#6b7280] hover:text-[#f0a500] transition-colors">
                                                    <ExternalLink className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-3 text-[11px] text-[#6b7280] italic">{ont.fullName}</div>

                                        <div className="mb-3">
                                            <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#f0a500]">
                                                <Tag className="h-3 w-3" /> Base Types
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {ont.baseTypes.map((t: string) => (
                                                    <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-[#c8cdd8]">{t}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mb-2 text-[12px] leading-relaxed text-[#9ca3af]">
                                            <span className="font-semibold text-[#c8cdd8]">Relevance: </span>{ont.relevance}
                                        </div>
                                        <div className="rounded-lg border border-[#f0a500]/10 bg-[#f0a500]/5 p-2.5 text-[11px] leading-relaxed text-[#c8cdd8]">
                                            <span className="font-mono font-bold text-[#f0a500]">USAGE → </span>{ont.usage}
                                        </div>
                                        <Button
                                            onClick={() => setGraphOntology(ont)}
                                            className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider transition-all"
                                        >
                                            <GitFork className="h-3.5 w-3.5" /> Explore Type Graph
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </motion.div>
            </div>
        </div>

        {/* Graph Viewer Modal */}
        {graphOntology && (
            <OntologyGraphViewer
                ontology={graphOntology}
                onClose={() => setGraphOntology(null)}
            />
        )}
        {browserUrl && <InAppBrowser url={browserUrl} title="Ontology Specification" onClose={() => setBrowserUrl(null)} />}
    </>
    );
}
