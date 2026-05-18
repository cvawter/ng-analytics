import React, { useState, useMemo } from 'react';
import { Database, ExternalLink, Search, Filter } from 'lucide-react';
import { reports } from '@ng-analytics/shared';

// ── EIA Reports Table (original format) ───────────────────────────────────────

const FREQ_ORDER = { Daily: 0, Weekly: 1, Monthly: 2, Annual: 3 };
const FREQ_COLORS = {
  Daily:   { bg: 'rgba(240,165,0,0.15)',   text: '#f0a500', border: 'rgba(240,165,0,0.4)' },
  Weekly:  { bg: 'rgba(74,222,128,0.12)',  text: '#4ade80', border: 'rgba(74,222,128,0.35)' },
  Monthly: { bg: 'rgba(96,165,250,0.12)',  text: '#60a5fa', border: 'rgba(96,165,250,0.35)' },
  Annual:  { bg: 'rgba(192,132,252,0.12)', text: '#c084fc', border: 'rgba(192,132,252,0.35)' },
};

function FreqBadge({ freq }) {
  const c = FREQ_COLORS[freq] || { bg: '#333', text: '#aaa', border: '#555' };
  return (
    <span style={{ display:'inline-block', padding:'2px 8px', borderRadius:4, fontSize:11, fontWeight:700, letterSpacing:'0.06em', fontFamily:"'IBM Plex Mono',monospace", background:c.bg, color:c.text, border:`1px solid ${c.border}`, whiteSpace:'nowrap' }}>
      {freq.toUpperCase()}
    </span>
  );
}

function EIATable({ searchQ }) {
  const [sortKey, setSortKey] = useState('frequency');
  const [sortDir, setSortDir] = useState('asc');

  const COLS = [
    { key:'name',         label:'Report Name',      width:'22%' },
    { key:'acronym',      label:'Code',             width:'7%'  },
    { key:'frequency',    label:'Frequency',        width:'9%'  },
    { key:'releaseDay',   label:'Release Schedule', width:'15%' },
    { key:'firstPublished',label:'Since',           width:'6%'  },
    { key:'dataTypes',    label:'Primary Data',     width:'22%' },
    { key:'coverage',     label:'Coverage',         width:'19%' },
  ];

  const handleSort = key => setSortKey(k => { if(k===key){setSortDir(d=>d==='asc'?'desc':'asc'); return k;} setSortDir('asc'); return key; });

  const rows = useMemo(() => {
    let d = [...reports];
    if (searchQ) { const q=searchQ.toLowerCase(); d=d.filter(r=>r.name.toLowerCase().includes(q)||r.acronym.toLowerCase().includes(q)||r.dataTypes.toLowerCase().includes(q)||r.coverage.toLowerCase().includes(q)); }
    d.sort((a,b)=>{
      if(sortKey==='frequency'){const av=FREQ_ORDER[a.frequency]??99,bv=FREQ_ORDER[b.frequency]??99;return sortDir==='asc'?av-bv:bv-av;}
      if(sortKey==='firstPublished'){return sortDir==='asc'?Number(a[sortKey])-Number(b[sortKey]):Number(b[sortKey])-Number(a[sortKey]);}
      return sortDir==='asc'?String(a[sortKey]).localeCompare(String(b[sortKey])):String(b[sortKey]).localeCompare(String(a[sortKey]));
    });
    return d;
  }, [sortKey, sortDir, searchQ]);

  return (
    <div style={{ borderRadius:10, border:'1px solid rgba(255,255,255,0.08)', overflow:'hidden', boxShadow:'0 4px 32px rgba(0,0,0,0.5)' }}>
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', tableLayout:'fixed', minWidth:900 }}>
          <colgroup>{COLS.map(c=><col key={c.key} style={{width:c.width}}/>)}</colgroup>
          <thead>
            <tr style={{ background:'#13161e' }}>
              {COLS.map(col=>(
                <th key={col.key} onClick={()=>handleSort(col.key)} style={{ padding:'12px 14px', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:sortKey===col.key?'#f0a500':'#4b5563', fontFamily:"'IBM Plex Mono',monospace", cursor:'pointer', borderBottom:'1px solid rgba(255,255,255,0.07)', userSelect:'none', whiteSpace:'nowrap' }}>
                  {col.label} {sortKey===col.key ? (sortDir==='asc'?'↑':'↓') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length===0 && <tr><td colSpan={7} style={{ padding:40, textAlign:'center', color:'#4b5563', fontSize:13 }}>No reports match.</td></tr>}
            {rows.map((r,i)=>(
              <tr key={r.acronym} style={{ background:i%2===0?'rgba(255,255,255,0.015)':'transparent', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding:'11px 14px', verticalAlign:'top' }}>
                  <a href={r.url} target="_blank" rel="noreferrer" style={{ color:'#d1d5db', fontSize:13, fontWeight:600, lineHeight:1.35, textDecoration:'none', display:'block', transition:'color 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.color='#f0a500'} onMouseLeave={e=>e.currentTarget.style.color='#d1d5db'}>
                    {r.name}
                  </a>
                </td>
                <td style={{ padding:'11px 14px', verticalAlign:'top', fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:700, color:'#6b7280', letterSpacing:'0.05em' }}>{r.acronym}</td>
                <td style={{ padding:'11px 14px', verticalAlign:'top' }}><FreqBadge freq={r.frequency}/></td>
                <td style={{ padding:'11px 14px', verticalAlign:'top', fontSize:12, color:'#9ca3af', lineHeight:1.5 }}>{r.releaseDay}</td>
                <td style={{ padding:'11px 14px', verticalAlign:'top', fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:'#6b7280' }}>{r.firstPublished}</td>
                <td style={{ padding:'11px 14px', verticalAlign:'top', fontSize:12, color:'#9ca3af', lineHeight:1.55 }}>{r.dataTypes}</td>
                <td style={{ padding:'11px 14px', verticalAlign:'top', fontSize:12, color:'#6b7280', lineHeight:1.55 }}>{r.coverage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ background:'#13161e', borderTop:'1px solid rgba(255,255,255,0.06)', padding:'10px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
        <span style={{ fontSize:11, color:'#374151', fontFamily:"'IBM Plex Mono',monospace" }}>SOURCE: U.S. ENERGY INFORMATION ADMINISTRATION — EIA.GOV</span>
        <span style={{ fontSize:11, color:'#374151', fontFamily:"'IBM Plex Mono',monospace" }}>{rows.length} of {reports.length} reports</span>
      </div>
    </div>
  );
}

// ── Other Data Sources ─────────────────────────────────────────────────────────

const CATEGORIES = ['All', 'EIA Reports', 'Energy & Gas', 'Commodity Prices', 'Battery Metals', 'Critical Minerals', 'Regulatory', 'Financial Markets'];

const OTHER_SOURCES = [
  { name:'EIA Natural Gas Data Portal',      provider:'U.S. Energy Information Administration', url:'https://www.eia.gov/naturalgas/data.php',                                                             access:'Free',                   format:'API / Excel / CSV',     frequency:'Daily–Monthly',        category:'Energy & Gas',       summary:'Historical and current data on NG production, consumption, trade, storage, and prices by region. Includes the EIA Open Data API.',                                                                                          relevance:'Core dataset for understanding regional supply/demand dynamics powering AI data centers.' },
  { name:'FERC Electric Power Markets',       provider:'Federal Energy Regulatory Commission',    url:'https://www.ferc.gov/industries-data/electric-power/electric-power-markets',                          access:'Free',                   format:'Web / PDF',             frequency:'Varies',               category:'Energy & Gas',       summary:'Wholesale electricity market data, interconnection queues, and transmission constraint reports across ISO/RTO regions.',                                                                                                     relevance:'Interconnection queues reveal the pipeline of new data center and renewable projects competing for grid capacity.' },
  { name:'IEA Gas Market Report',             provider:'International Energy Agency',             url:'https://www.iea.org/reports/gas-market-report-q1-2025',                                               access:'Free',                   format:'PDF',                   frequency:'Quarterly',            category:'Energy & Gas',       summary:'Quarterly global natural gas supply and demand analysis, LNG trade flows, and price outlook.',                                                                                                                              relevance:'Global LNG market shapes Henry Hub basis differentials and export demand, a key variable in domestic NG pricing.' },
  { name:'World Bank Pink Sheet',             provider:'World Bank',                              url:'https://www.worldbank.org/en/research/commodity-markets',                                             access:'Free',                   format:'Excel download',        frequency:'Monthly',              category:'Battery Metals',     summary:'Monthly nominal and real prices for 70+ commodities including oil, NG, LNG, coal, lithium, cobalt, copper, and nickel going back decades.',                                                                                relevance:'The definitive free multi-commodity dataset. Enables correlation analysis between energy prices, battery metals, and AI infrastructure build-out costs.' },
  { name:'LME Delayed Prices',                provider:'London Metal Exchange',                   url:'https://www.lme.com/Metals',                                                                          access:'Free (15-min delay)',     format:'Web',                   frequency:'Real-time (delayed)',  category:'Battery Metals',     summary:'15-minute delayed spot and forward prices for copper, nickel, aluminium, cobalt, and other base metals.',                                                                                                                   relevance:'Copper and nickel are critical inputs for grid infrastructure, data center power distribution, and EV charging networks.' },
  { name:'Macrotrends Commodity Charts',      provider:'Macrotrends LLC',                         url:'https://www.macrotrends.net/commodities/charts',                                                      access:'Free',                   format:'Web / CSV download',    frequency:'Daily',                category:'Commodity Prices',   summary:'Long-run historical price charts for oil, natural gas, gold, silver, copper, lithium carbonate, and cobalt.',                                                                                                               relevance:'Useful for historical context and trend analysis across energy transition metals and fossil fuel benchmarks.' },
  { name:'NYMEX Futures Data (CME)',          provider:'CME Group',                               url:'https://www.cmegroup.com/markets/energy/natural-gas/natural-gas.html',                               access:'Free (delayed)',          format:'Web',                   frequency:'Real-time (delayed)',  category:'Commodity Prices',   summary:'Delayed Henry Hub NG futures, WTI crude oil futures, and options chain data.',                                                                                                                                              relevance:'The futures curve reveals market expectations for seasonal NG demand spikes driven by power generation and AI load growth.' },
  { name:'Benchmark Mineral Intelligence',    provider:'Benchmark Mineral Intelligence',          url:'https://benchmarkminerals.com/price-assessments/',                                                     access:'Free tier available',    format:'Web / PDF',             frequency:'Weekly',               category:'Battery Metals',     summary:'Lithium, cobalt, nickel, graphite, and manganese price assessments from the primary independent battery materials pricing agency.',                                                                                         relevance:'Definitive battery materials benchmark. Lithium Carbonate and Cobalt prices directly determine grid storage CAPEX, affecting data center power investment economics.' },
  { name:'Trading Economics — Battery Metals',provider:'Trading Economics',                       url:'https://tradingeconomics.com/commodity/lithium',                                                      access:'Free',                   format:'Web / API (free tier)', frequency:'Daily',                category:'Battery Metals',     summary:'Free historical price charts and data for lithium carbonate, cobalt, nickel, and manganese. Covers spot prices back 10+ years.',                                                                                          relevance:'Free alternative to paywalled battery metal data. Tracks the full cost structure for grid-scale storage systems that underpin AI data center energy resilience.' },
  { name:'IndexMundi Commodity Prices',       provider:'IndexMundi',                              url:'https://www.indexmundi.com/commodities/',                                                            access:'Free',                   format:'Web / CSV download',    frequency:'Monthly',              category:'Battery Metals',     summary:'Free monthly historical prices for cobalt, lithium, nickel, aluminum, copper, and 50+ commodities, sourced from World Bank and IMF data.',                                                                                relevance:'Freely downloadable historical battery metal prices for long-term trend analysis and correlation with energy infrastructure investment cycles.' },
  { name:'Shanghai Metal Market (SMM)',       provider:'Shanghai Metal Market',                   url:'https://www.metal.com/Lithium',                                                                      access:'Free (registration)',    format:'Web',                   frequency:'Daily',                category:'Battery Metals',     summary:'Chinese domestic spot prices for lithium carbonate, lithium hydroxide, cobalt sulfate, nickel sulfate, and battery-grade materials.',                                                                                        relevance:'Chinese battery metal prices are the global benchmark due to China dominating ~70-80% of Li, Co, and graphite processing. Critical for supply chain risk assessment.' },
  { name:'USGS Mineral Commodity Summaries',  provider:'U.S. Geological Survey',                  url:'https://www.usgs.gov/centers/national-minerals-information-center/mineral-commodity-summaries',      access:'Free',                   format:'PDF / Excel',           frequency:'Annual (Jan)',         category:'Critical Minerals',  summary:'Annual data on production, imports, exports, and prices for ~90 minerals including all REEs, lithium, cobalt, gallium, and germanium.',                                                                                    relevance:'Authoritative source for rare earth supply data. Neodymium/dysprosium for wind turbines, gallium/germanium for AI chips, lithium for grid storage.' },
  { name:'USGS Mineral Resources Data System',provider:'U.S. Geological Survey',                  url:'https://mrdata.usgs.gov/',                                                                            access:'Free',                   format:'API / GeoJSON / CSV',   frequency:'Varies (static–annual)',category:'Critical Minerals', summary:'Geospatial database of mineral deposits, mines, and processing facilities worldwide with reserve estimates.',                                                                                                              relevance:'Identifies geographic concentration risk — critical rare earth mining is heavily concentrated in China, creating supply chain risk for AI hardware.' },
  { name:'IEA Critical Minerals Market Review',provider:'International Energy Agency',            url:'https://www.iea.org/reports/critical-minerals-market-review-2024',                                   access:'Free',                   format:'PDF',                   frequency:'Annual (mid-year)',    category:'Critical Minerals',  summary:'Annual report covering supply, demand, prices, and policy for lithium, cobalt, nickel, copper, and rare earths in the energy transition.',                                                                                 relevance:'Quantifies how much copper, lithium, and rare earths are required per GW of wind, solar, and data center capacity.' },
  { name:'EU Critical Raw Materials Monitor', provider:'European Commission / JRC',               url:'https://rmis.jrc.ec.europa.eu/',                                                                      access:'Free',                   format:'Web dashboard / API',   frequency:'Annual',               category:'Critical Minerals',  summary:'Supply risk scoring and trade dependency data for 30+ critical raw materials.',                                                                                                                                             relevance:'EU dependency data for rare earths and battery metals impacts global pricing and trade flows, affecting U.S. energy infrastructure costs.' },
  { name:'VanEck Rare Earth ETF (REMX)',       provider:'VanEck / NYSE',                           url:'https://finance.yahoo.com/quote/REMX',                                                               access:'Free',                   format:'Web',                   frequency:'Real-time',            category:'Critical Minerals',  summary:'Market-price proxy for rare earth and critical mineral mining companies including MP Materials, Lynas, and Pilbara.',                                                                                                       relevance:'When direct REE spot prices are behind paywalls, REMX provides a real-time market signal for rare earth sector sentiment.' },
  { name:'Regulations.gov API',               provider:'U.S. General Services Administration',    url:'https://www.regulations.gov/api',                                                                     access:'Free (API key required)','format':'JSON API',              frequency:'Real-time',            category:'Regulatory',         summary:'Full access to federal dockets, proposed rules, public comments, and final rules across all U.S. agencies.',                                                                                                               relevance:'Regulatory activity directly affects permitting timelines for data centers, power plants, pipelines, and transmission lines.' },
  { name:'FERC eLibrary',                     provider:'Federal Energy Regulatory Commission',    url:'https://elibrary.ferc.gov/',                                                                          access:'Free',                   format:'Web / PDF',             frequency:'Varies (as filed)',    category:'Regulatory',         summary:'Full text of FERC orders, filings, and proceedings covering natural gas pipelines, LNG terminals, and electricity markets.',                                                                                               relevance:'Pipeline and LNG terminal approvals are rate-limiting steps for natural gas infrastructure growth to supply AI data center power demand.' },
  { name:'SEC EDGAR Full-Text Search',        provider:'U.S. Securities and Exchange Commission', url:'https://efts.sec.gov/LATEST/search-index?q=%22data+center%22+%22natural+gas%22&forms=10-K',          access:'Free',                   format:'Web / JSON API',        frequency:'Varies (as filed)',    category:'Regulatory',         summary:'10-K annual reports, 10-Q, and 8-K filings from all publicly listed companies. Full-text searchable.',                                                                                                                     relevance:'Energy company 10-K filings are the primary source for disclosed capex plans, data center PPAs, and long-term supply commitments.' },
  { name:'Yahoo Finance',                     provider:'Yahoo / Verizon Media',                   url:'https://finance.yahoo.com',                                                                           access:'Free',                   format:'Web / unofficial API',  frequency:'Real-time',            category:'Financial Markets',  summary:'Real-time and historical stock prices, options chains, earnings, and news for publicly traded companies.',                                                                                                                  relevance:'Provides live options chains and price discovery for all companies in the AI energy demand catalog.' },
  { name:'NASDAQ Data Link (Quandl)',          provider:'NASDAQ / Quandl',                         url:'https://data.nasdaq.com/search?query=natural+gas',                                                    access:'Free tier available',    format:'API / CSV',             frequency:'Daily–Monthly',        category:'Financial Markets',  summary:'Financial and alternative data platform hosting USGS mineral data, CFTC CoT reports, and EIA energy datasets as structured API endpoints.',                                                                               relevance:'Aggregates multiple free government datasets into a single queryable API for systematic quantitative analysis.' },
  { name:'CFTC Commitment of Traders',        provider:'Commodity Futures Trading Commission',    url:'https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm',                                   access:'Free',                   format:'CSV / Web',             frequency:'Weekly (Tue/Fri)',     category:'Financial Markets',  summary:'Weekly disaggregated futures positioning data for NG, crude oil, and other commodities.',                                                                                                                                  relevance:'Speculator positioning in NG and crude futures is a leading indicator of price direction and risk appetite in energy markets.' },
];

const FREQ_BADGE_COLORS = {
  'Real-time':'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
  'Real-time (delayed)':'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
  'Daily':'text-blue-300 bg-blue-400/10 border-blue-400/20',
  'Daily–Monthly':'text-blue-300 bg-blue-400/10 border-blue-400/20',
  'Weekly (Tue/Fri)':'text-violet-300 bg-violet-400/10 border-violet-400/20',
  'Monthly':'text-[#f0a500] bg-[#f0a500]/10 border-[#f0a500]/20',
  'Quarterly':'text-cyan-300 bg-cyan-400/10 border-cyan-400/20',
  'Annual (Jan)':'text-rose-300 bg-rose-400/10 border-rose-400/20',
  'Annual (mid-year)':'text-rose-300 bg-rose-400/10 border-rose-400/20',
  'Annual':'text-rose-300 bg-rose-400/10 border-rose-400/20',
};
const ACCESS_COLORS = {
  'Free':'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'Free (15-min delay)':'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'Free (delayed)':'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'Free (API key required)':'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'Free tier available':'text-amber-400 bg-amber-400/10 border-amber-400/20',
};
const CATEGORY_COLORS = {
  'EIA Reports':     'text-orange-400 bg-orange-400/10 border-orange-400/20',
  'Energy & Gas':    'text-[#f0a500] bg-[#f0a500]/10 border-[#f0a500]/20',
  'Commodity Prices':'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Battery Metals':  'text-pink-400 bg-pink-400/10 border-pink-400/20',
  'Critical Minerals':'text-violet-400 bg-violet-400/10 border-violet-400/20',
  'Regulatory':      'text-rose-400 bg-rose-400/10 border-rose-400/20',
  'Financial Markets':'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
};

export default function DataSources() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const showEIA = activeCategory === 'All' || activeCategory === 'EIA Reports';
  const showOther = activeCategory === 'All' || activeCategory !== 'EIA Reports';

  const filteredOther = OTHER_SOURCES.filter(ds => {
    const matchCat = activeCategory === 'All' || ds.category === activeCategory;
    const q = search.toLowerCase();
    return matchCat && (q.length === 0 || ds.name.toLowerCase().includes(q) || ds.summary.toLowerCase().includes(q) || ds.relevance.toLowerCase().includes(q));
  });

  return (
    <div className="min-h-screen bg-[#0d0f14] text-[#c8cdd8] font-sans pb-20">
      <div className="mx-auto max-w-[1400px] p-6 lg:p-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0a500] to-[#e05c00] shadow-[0_0_18px_rgba(240,165,0,0.35)]">
              <Database className="h-5 w-5 text-white" />
            </div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#f0a500]">MacroDesk AI · Intelligence</span>
          </div>
          <h1 className="text-3xl font-bold text-[#eef0f4] mb-2">Data Sources <span className="text-[#f0a500]">&amp; References</span></h1>
          <p className="text-[#6b7280] max-w-3xl leading-relaxed">EIA natural gas report catalog plus free data sources for commodity prices, critical minerals, regulatory filings, and financial markets.</p>
          <div className="flex flex-wrap gap-3 mt-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold text-orange-400 bg-orange-400/10 border-orange-400/20">{reports.length} EIA Reports</span>
            {Object.entries(CATEGORY_COLORS).filter(([c])=>c!=='EIA Reports').map(([cat,cls])=>(
              <span key={cat} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${cls}`}>
                {OTHER_SOURCES.filter(d=>d.category===cat).length} {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 focus-within:border-[#f0a500]/50 transition-colors">
            <Search className="h-4 w-4 text-[#6b7280] shrink-0" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search sources, topics, data types..."
              className="w-full bg-transparent text-[13px] text-[#eef0f4] placeholder-[#6b7280] outline-none" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-[#6b7280] shrink-0" />
            {CATEGORIES.map(cat=>(
              <button key={cat} onClick={()=>setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${activeCategory===cat?'bg-[#f0a500]/15 border-[#f0a500]/40 text-[#f0a500]':'bg-white/[0.03] border-white/[0.08] text-[#6b7280] hover:text-[#eef0f4]'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* EIA Reports Section */}
        {showEIA && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-[#eef0f4] mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-orange-400" />
              EIA Natural Gas Report Catalog
            </h2>
            <EIATable searchQ={search} />
          </div>
        )}

        {/* Other Sources Section */}
        {showOther && filteredOther.length > 0 && (
          <div>
            {showEIA && <h2 className="text-lg font-bold text-[#eef0f4] mb-3 flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-[#f0a500]" />Additional Data Sources</h2>}
            <p className="text-xs text-[#6b7280] mb-4 font-mono">{filteredOther.length} source{filteredOther.length!==1?'s':''} shown</p>
            <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
              <div className="grid grid-cols-[1.8fr_1.2fr_1fr_0.85fr] bg-white/[0.03] border-b border-white/[0.06] px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-[#6b7280]">
                <div>Source</div><div>Summary</div><div>AI Energy Relevance</div><div>Access · Frequency</div>
              </div>
              {filteredOther.map((ds,idx)=>(
                <div key={ds.name} className={`grid grid-cols-[1.8fr_1.2fr_1fr_0.85fr] gap-x-4 px-6 py-5 border-b border-white/[0.04] hover:bg-white/[0.02] last:border-0 ${idx%2!==0?'bg-white/[0.01]':''}`}>
                  <div className="flex flex-col gap-2 min-w-0">
                    <a href={ds.url} target="_blank" rel="noreferrer" className="flex items-start gap-1.5 group w-fit">
                      <span className="text-[14px] font-bold text-[#eef0f4] group-hover:text-[#f0a500] transition-colors leading-snug">{ds.name}</span>
                      <ExternalLink className="h-3 w-3 text-[#6b7280] group-hover:text-[#f0a500] mt-1 shrink-0" />
                    </a>
                    <span className="text-[11px] text-[#6b7280]">{ds.provider}</span>
                    <span className={`w-fit text-[10px] font-bold px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[ds.category]??''}`}>{ds.category}</span>
                  </div>
                  <div className="text-[13px] text-[#8a94a6] leading-relaxed">{ds.summary}</div>
                  <div className="text-[13px] text-[#c8cdd8] leading-relaxed">{ds.relevance}</div>
                  <div className="flex flex-col gap-2">
                    <span className={`w-fit text-[10px] font-bold px-2 py-1 rounded-full border ${ACCESS_COLORS[ds.access]??'text-[#6b7280] bg-white/[0.05] border-white/10'}`}>{ds.access}</span>
                    <span className={`w-fit text-[10px] font-bold px-2 py-1 rounded-full border ${FREQ_BADGE_COLORS[ds.frequency]??'text-[#6b7280] bg-white/[0.04] border-white/10'}`}>{ds.frequency}</span>
                    <span className="text-[11px] text-[#6b7280] font-mono">{ds.format}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-[11px] text-[#4b5563] mt-6 text-center">All sources are publicly available. This platform uses simulated data for demonstration.</p>
      </div>
    </div>
  );
}
