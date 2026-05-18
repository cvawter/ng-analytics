import { useState } from 'react';
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { TrendingUp, TrendingDown, Activity, Calendar, BarChart2, Flame, Droplets, Gem } from 'lucide-react';
// @ts-expect-error - Shared module typings are not yet generated
import {
  spotPrices, spotHistory, futuresCurve,
  oilSpotPrices, oilSpotHistory, oilFuturesCurve,
  silverSpotPrices, silverSpotHistory, silverFuturesCurve
} from '@ng-analytics/shared';

interface SpotData {
  symbol: string; name: string; price: number; open: number; high: number; low: number;
  weekHigh52: number; weekLow52: number; avgVolume: string; change: string;
  percentChange: string; lastUpdated: string; trend: string; unit: string; color: string;
}
interface HistoryPoint { date: string; price: number; }
interface FuturesPoint { month: string; price: number; }
interface CommodityDef {
  key: string; label: string; icon: React.ElementType;
  spot: SpotData; history: HistoryPoint[]; futures: FuturesPoint[];
  accentColor: string; gradientId: string;
}

const COMMODITIES: CommodityDef[] = [
  { key: 'ng',     label: 'Natural Gas',   icon: Flame,    spot: spotPrices,       history: spotHistory,       futures: futuresCurve,       accentColor: '#f0a500', gradientId: 'ngGradSC'     },
  { key: 'oil',    label: 'WTI Crude Oil', icon: Droplets, spot: oilSpotPrices,    history: oilSpotHistory,    futures: oilFuturesCurve,    accentColor: '#60a5fa', gradientId: 'oilGradSC'    },
  { key: 'silver', label: 'Silver',        icon: Gem,      spot: silverSpotPrices, history: silverSpotHistory, futures: silverFuturesCurve, accentColor: '#a78bfa', gradientId: 'silverGradSC' },
];

function StatBox({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b7280]">{label}</span>
      <span className="text-xl font-bold text-[#eef0f4] font-mono">{value}</span>
      {sub && <span className="text-[11px] text-[#6b7280]">{sub}</span>}
    </div>
  );
}

function SpotTooltip({ active, payload, unit }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="bg-[#161922] border border-white/10 rounded-xl px-3 py-2 shadow-xl text-sm">
      <div className="text-[#6b7280] text-xs mb-1">{p.payload.date}</div>
      <div className="text-white font-bold">
        ${p.value.toFixed(unit === 'MMBtu' ? 3 : 2)}
        <span className="text-[#9ca3af] font-normal ml-1">/ {unit}</span>
      </div>
    </div>
  );
}

function FuturesToolTip({ active, payload, unit }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="bg-[#161922] border border-white/10 rounded-xl px-3 py-2 shadow-xl text-sm">
      <div className="text-[#6b7280] text-xs mb-1">{p.payload.month}</div>
      <div className="text-white font-bold">
        ${p.value.toFixed(2)}
        <span className="text-[#9ca3af] font-normal ml-1">/ {unit}</span>
      </div>
    </div>
  );
}

function CommodityView({ commodity }: { commodity: CommodityDef }) {
  const { spot, history, futures, accentColor, gradientId } = commodity;
  const isUp = spot.trend === 'up';
  const trendColor = isUp ? '#10b981' : '#ef4444';
  const minSpot = Math.min(...history.map(d => d.price));
  const maxSpot = Math.max(...history.map(d => d.price));
  const minFut = Math.floor(Math.min(...futures.map(d => d.price)) * 10) / 10;
  const maxFut = Math.ceil(Math.max(...futures.map(d => d.price)) * 10) / 10;
  const decimals = spot.unit === 'MMBtu' ? 3 : 2;
  const fmt = (v: number) => `$${v.toFixed(decimals)}`;

  return (
    <div className="space-y-6">
      {/* Hero + Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 rounded-3xl p-8 shadow-xl flex flex-col justify-between border border-white/5"
          style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, ${accentColor}12 100%)` }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[#9ca3af]">
              <Activity className="h-5 w-5" />
              <span className="font-semibold font-mono">{spot.symbol}</span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full font-bold animate-pulse"
              style={{ backgroundColor: `${accentColor}25`, color: accentColor }}>LIVE</span>
          </div>
          <div>
            <div className="text-5xl font-black text-white mb-2 font-mono">
              {fmt(spot.price)}
              <span className="text-lg text-[#9ca3af] font-sans font-normal ml-2">/ {spot.unit}</span>
            </div>
            <div className={`flex items-center gap-2 font-bold text-lg ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {isUp ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
              <span>{spot.change} ({spot.percentChange})</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 text-xs text-[#6b7280] flex justify-between">
            <span>{spot.name}</span>
            <span>Updated: {spot.lastUpdated}</span>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4 content-start">
          <StatBox label="Open" value={fmt(spot.open)} />
          <StatBox label="Day High" value={fmt(spot.high)} />
          <StatBox label="Day Low" value={fmt(spot.low)} />
          <StatBox label="52-Wk High" value={`$${spot.weekHigh52.toFixed(2)}`} sub="All-time context" />
          <StatBox label="52-Wk Low" value={`$${spot.weekLow52.toFixed(2)}`} sub="All-time context" />
          <StatBox label="Avg Volume" value={spot.avgVolume} sub="NYMEX contracts" />
        </div>
      </div>

      {/* 30-Day Spot Chart */}
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${accentColor}18` }}>
            <BarChart2 className="h-5 w-5" style={{ color: accentColor }} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{spot.name} — 30-Day History</h2>
            <p className="text-sm text-[#9ca3af]">$/{spot.unit} · Daily close</p>
          </div>
        </div>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={trendColor} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={trendColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 11 }} tickLine={false} axisLine={false} dy={8} interval={3} />
              <YAxis domain={[minSpot * 0.97, maxSpot * 1.03]} tick={{ fill: '#9ca3af', fontSize: 11 }} tickLine={false} axisLine={false}
                tickFormatter={(v: number) => `$${v.toFixed(decimals === 3 ? 2 : 0)}`} width={58} />
              <Tooltip content={<SpotTooltip unit={spot.unit} />} />
              <ReferenceLine y={history[0].price} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 2" />
              <Area type="monotone" dataKey="price" stroke={trendColor} strokeWidth={2.5} fill={`url(#${gradientId})`} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Futures Curve */}
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${accentColor}18` }}>
            <Calendar className="h-5 w-5" style={{ color: accentColor }} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{spot.symbol} Futures Curve</h2>
            <p className="text-sm text-[#9ca3af]">12-Month Forward Strip · $/{spot.unit}</p>
          </div>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={futures} margin={{ top: 16, right: 28, left: 16, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 12 }} tickLine={false} axisLine={false} dy={10} />
              <YAxis domain={[minFut, maxFut]} tick={{ fill: '#9ca3af', fontSize: 12 }} tickLine={false} axisLine={false}
                tickFormatter={(v: number) => `$${v.toFixed(2)}`} dx={-10} />
              <Tooltip content={<FuturesToolTip unit={spot.unit} />} />
              <Line type="monotone" dataKey="price" stroke={accentColor} strokeWidth={3}
                dot={{ fill: '#0d0f14', stroke: accentColor, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: accentColor }} animationDuration={1200} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default function Markets() {
  const [activeKey, setActiveKey] = useState('ng');
  const activeCommodity = COMMODITIES.find(c => c.key === activeKey)!;

  return (
    <div className="min-h-screen bg-[#0d0f14] text-[#eef0f4] p-6 lg:p-10 font-sans overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-8">

        <header>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-[#f0a500]" />
            Commodity Markets
          </h1>
          <p className="text-[#9ca3af] mt-2">Spot prices, 30-day history, and 12-month forward strips for energy and metals.</p>
        </header>

        {/* Commodity Tab Switcher */}
        <div className="flex gap-2 flex-wrap">
          {COMMODITIES.map(({ key, label, icon: Icon, accentColor }) => {
            const isActive = activeKey === key;
            return (
              <button key={key} onClick={() => setActiveKey(key)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border"
                style={isActive
                  ? { backgroundColor: `${accentColor}20`, borderColor: `${accentColor}50`, color: accentColor }
                  : { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', color: '#6b7280' }
                }>
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>

        <CommodityView commodity={activeCommodity} />

      </div>
    </div>
  );
}
