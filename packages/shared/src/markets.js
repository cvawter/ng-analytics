// Mock Market Data — Natural Gas, WTI Crude Oil, Silver

// ─── Natural Gas (Henry Hub) ─────────────────────────────────────────────────

export const spotPrices = {
  symbol: "NG:HH",
  name: "Henry Hub Natural Gas Spot",
  price: 2.84,
  open: 2.72,
  high: 2.91,
  low: 2.68,
  weekHigh52: 3.89,
  weekLow52: 1.61,
  avgVolume: "142,400 contracts",
  change: "+0.12",
  percentChange: "+4.41%",
  lastUpdated: new Date().toLocaleTimeString(),
  trend: "up",
  unit: "MMBtu",
  color: "#f0a500",
};

export const spotHistory = [
  { date: "Apr 18", price: 1.78 },
  { date: "Apr 21", price: 1.82 },
  { date: "Apr 22", price: 1.91 },
  { date: "Apr 23", price: 1.87 },
  { date: "Apr 24", price: 1.95 },
  { date: "Apr 25", price: 2.03 },
  { date: "Apr 28", price: 2.11 },
  { date: "Apr 29", price: 2.08 },
  { date: "Apr 30", price: 2.19 },
  { date: "May 1",  price: 2.27 },
  { date: "May 2",  price: 2.34 },
  { date: "May 5",  price: 2.31 },
  { date: "May 6",  price: 2.40 },
  { date: "May 7",  price: 2.48 },
  { date: "May 8",  price: 2.43 },
  { date: "May 9",  price: 2.51 },
  { date: "May 12", price: 2.58 },
  { date: "May 13", price: 2.55 },
  { date: "May 14", price: 2.61 },
  { date: "May 15", price: 2.69 },
  { date: "May 16", price: 2.65 },
  { date: "May 19", price: 2.72 },
  { date: "May 20", price: 2.78 },
  { date: "May 21", price: 2.84 },
];

export const futuresCurve = [
  { month: "Jun 25", price: 2.88 },
  { month: "Jul 25", price: 3.02 },
  { month: "Aug 25", price: 3.10 },
  { month: "Sep 25", price: 2.98 },
  { month: "Oct 25", price: 3.08 },
  { month: "Nov 25", price: 3.41 },
  { month: "Dec 25", price: 3.79 },
  { month: "Jan 26", price: 3.95 },
  { month: "Feb 26", price: 3.82 },
  { month: "Mar 26", price: 3.55 },
  { month: "Apr 26", price: 3.12 },
  { month: "May 26", price: 2.95 },
];

// ─── WTI Crude Oil ────────────────────────────────────────────────────────────

export const oilSpotPrices = {
  symbol: "WTI:CL",
  name: "WTI Crude Oil Spot",
  price: 79.42,
  open: 78.15,
  high: 80.18,
  low: 77.94,
  weekHigh52: 93.68,
  weekLow52: 64.38,
  avgVolume: "478,200 contracts",
  change: "+1.27",
  percentChange: "+1.63%",
  lastUpdated: new Date().toLocaleTimeString(),
  trend: "up",
  unit: "bbl",
  color: "#60a5fa",
};

export const oilSpotHistory = [
  { date: "Apr 18", price: 74.12 },
  { date: "Apr 21", price: 73.85 },
  { date: "Apr 22", price: 72.44 },
  { date: "Apr 23", price: 71.98 },
  { date: "Apr 24", price: 73.20 },
  { date: "Apr 25", price: 74.55 },
  { date: "Apr 28", price: 75.18 },
  { date: "Apr 29", price: 76.02 },
  { date: "Apr 30", price: 74.88 },
  { date: "May 1",  price: 75.41 },
  { date: "May 2",  price: 76.33 },
  { date: "May 5",  price: 77.10 },
  { date: "May 6",  price: 76.85 },
  { date: "May 7",  price: 77.42 },
  { date: "May 8",  price: 78.01 },
  { date: "May 9",  price: 77.68 },
  { date: "May 12", price: 78.44 },
  { date: "May 13", price: 79.15 },
  { date: "May 14", price: 78.72 },
  { date: "May 15", price: 79.38 },
  { date: "May 16", price: 78.91 },
  { date: "May 19", price: 78.15 },
  { date: "May 20", price: 78.94 },
  { date: "May 21", price: 79.42 },
];

export const oilFuturesCurve = [
  { month: "Jun 25", price: 79.55 },
  { month: "Jul 25", price: 79.12 },
  { month: "Aug 25", price: 78.80 },
  { month: "Sep 25", price: 78.44 },
  { month: "Oct 25", price: 78.10 },
  { month: "Nov 25", price: 77.85 },
  { month: "Dec 25", price: 77.60 },
  { month: "Jan 26", price: 77.22 },
  { month: "Feb 26", price: 76.95 },
  { month: "Mar 26", price: 76.70 },
  { month: "Apr 26", price: 76.48 },
  { month: "May 26", price: 76.20 },
];

// ─── Silver (COMEX) ───────────────────────────────────────────────────────────

export const silverSpotPrices = {
  symbol: "SI:COMEX",
  name: "Silver Spot (COMEX)",
  price: 32.18,
  open: 31.74,
  high: 32.55,
  low: 31.60,
  weekHigh52: 34.86,
  weekLow52: 22.02,
  avgVolume: "98,650 contracts",
  change: "+0.44",
  percentChange: "+1.39%",
  lastUpdated: new Date().toLocaleTimeString(),
  trend: "up",
  unit: "oz",
  color: "#a78bfa",
};

export const silverSpotHistory = [
  { date: "Apr 18", price: 27.42 },
  { date: "Apr 21", price: 27.88 },
  { date: "Apr 22", price: 28.15 },
  { date: "Apr 23", price: 27.95 },
  { date: "Apr 24", price: 28.44 },
  { date: "Apr 25", price: 28.92 },
  { date: "Apr 28", price: 29.18 },
  { date: "Apr 29", price: 29.55 },
  { date: "Apr 30", price: 30.02 },
  { date: "May 1",  price: 30.41 },
  { date: "May 2",  price: 30.88 },
  { date: "May 5",  price: 31.20 },
  { date: "May 6",  price: 30.95 },
  { date: "May 7",  price: 31.42 },
  { date: "May 8",  price: 31.78 },
  { date: "May 9",  price: 31.55 },
  { date: "May 12", price: 31.90 },
  { date: "May 13", price: 32.15 },
  { date: "May 14", price: 31.88 },
  { date: "May 15", price: 32.24 },
  { date: "May 16", price: 31.98 },
  { date: "May 19", price: 31.74 },
  { date: "May 20", price: 31.92 },
  { date: "May 21", price: 32.18 },
];

export const silverFuturesCurve = [
  { month: "Jun 25", price: 32.30 },
  { month: "Jul 25", price: 32.48 },
  { month: "Aug 25", price: 32.65 },
  { month: "Sep 25", price: 32.82 },
  { month: "Oct 25", price: 33.10 },
  { month: "Nov 25", price: 33.35 },
  { month: "Dec 25", price: 33.62 },
  { month: "Jan 26", price: 33.85 },
  { month: "Feb 26", price: 34.05 },
  { month: "Mar 26", price: 34.22 },
  { month: "Apr 26", price: 34.40 },
  { month: "May 26", price: 34.55 },
];

// ─── Battery Metals — Lithium Carbonate benchmark (Chinese spot, $/kg) ────────
// Lithium Carbonate 99.5% (LC) is the primary benchmark for the battery metals
// complex. Cobalt (LME), Nickel (LME), and Lithium are the three critical inputs
// for NMC/NCA cathode chemistries powering grid-scale storage and data center UPS.

export const batteryMetalsSpot = {
  symbol: "LiCO3:CN",
  name: "Lithium Carbonate 99.5% (China Spot)",
  price: 10.85,
  open: 10.70,
  high: 11.10,
  low: 10.65,
  weekHigh52: 18.40,
  weekLow52: 9.20,
  avgVolume: "OTC / SHFE",
  change: "+0.15",
  percentChange: "+1.40%",
  lastUpdated: new Date().toLocaleTimeString(),
  trend: "up",
  unit: "kg",
  color: "#f472b6",
  note: "Chinese spot benchmark. Lithium crashed ~85% from 2022 highs; recovering with new storage demand.",
};

export const batteryMetalsHistory = [
  { date: "Apr 18", price: 9.60 },
  { date: "Apr 21", price: 9.55 },
  { date: "Apr 22", price: 9.70 },
  { date: "Apr 23", price: 9.80 },
  { date: "Apr 24", price: 9.75 },
  { date: "Apr 25", price: 9.90 },
  { date: "Apr 28", price: 10.05 },
  { date: "Apr 29", price: 10.15 },
  { date: "Apr 30", price: 10.10 },
  { date: "May 1",  price: 10.25 },
  { date: "May 2",  price: 10.40 },
  { date: "May 5",  price: 10.35 },
  { date: "May 6",  price: 10.50 },
  { date: "May 7",  price: 10.60 },
  { date: "May 8",  price: 10.55 },
  { date: "May 9",  price: 10.70 },
  { date: "May 12", price: 10.65 },
  { date: "May 13", price: 10.75 },
  { date: "May 14", price: 10.80 },
  { date: "May 15", price: 10.70 },
  { date: "May 16", price: 10.75 },
  { date: "May 19", price: 10.80 },
  { date: "May 20", price: 10.82 },
  { date: "May 21", price: 10.85 },
];

export const batteryMetalsFutures = [
  { month: "Jun 25", price: 11.20 },
  { month: "Jul 25", price: 11.60 },
  { month: "Aug 25", price: 12.00 },
  { month: "Sep 25", price: 12.45 },
  { month: "Oct 25", price: 12.90 },
  { month: "Nov 25", price: 13.30 },
  { month: "Dec 25", price: 13.80 },
  { month: "Jan 26", price: 14.20 },
  { month: "Feb 26", price: 14.65 },
  { month: "Mar 26", price: 15.10 },
  { month: "Apr 26", price: 15.50 },
  { month: "May 26", price: 15.90 },
];

// Individual battery metal spot prices
export const batteryMetalsIndividual = [
  { name: "Lithium Carbonate",  symbol: "LiCO3",   price: 10.85,  unit: "kg", change: "+1.40%", trend: "up",   note: "Primary Li benchmark; grid storage & EV batteries" },
  { name: "Lithium Hydroxide",  symbol: "LiOH",    price: 11.60,  unit: "kg", change: "+0.87%", trend: "up",   note: "High-nickel NMC cathodes; preferred for EV/UPS" },
  { name: "Cobalt",             symbol: "Co",       price: 24.20,  unit: "kg", change: "-0.41%", trend: "down", note: "LME-traded; NMC/NCA cathodes; 70% supply from DRC" },
  { name: "Cobalt Sulfate",     symbol: "CoSO4",   price: 3.85,   unit: "kg", change: "-0.26%", trend: "down", note: "Battery-grade precursor for cathode manufacturing" },
  { name: "Nickel (LME)",       symbol: "Ni",       price: 15.80,  unit: "kg", change: "+0.64%", trend: "up",   note: "LME spot; high-Ni cathodes reducing cobalt content" },
  { name: "Nickel Sulfate",     symbol: "NiSO4",   price: 3.92,   unit: "kg", change: "+0.51%", trend: "up",   note: "Battery-grade; key input for NMC811 & NCMA cathodes" },
  { name: "Manganese Sulfate",  symbol: "MnSO4",   price: 0.38,   unit: "kg", change: "-1.30%", trend: "down", note: "LFP/LMFP cathodes; lowest cost, no cobalt chemistry" },
  { name: "Graphite (Natural)", symbol: "C-NAT",   price: 0.52,   unit: "kg", change: "-0.96%", trend: "down", note: "Anode material; China controls ~85% of supply" },
];

// ─── Rare Earth Elements — NdPr Oxide (COMEX / Chinese domestic spot) ────────
// NdPr (Neodymium-Praseodymium) oxide is the primary commercially traded REE,
// used in permanent magnets for wind turbines, EV motors, and AI data center
// cooling fans. Prices are in USD/kg, benchmarked to Chinese spot market.

export const reeSpotPrices = {
  symbol: "NdPr:OXIDE",
  name: "NdPr Oxide Spot (Chinese Domestic)",
  price: 74.80,
  open: 73.50,
  high: 75.40,
  low: 73.10,
  weekHigh52: 98.50,
  weekLow52: 58.20,
  avgVolume: "N/A (OTC)",
  change: "+1.30",
  percentChange: "+1.77%",
  lastUpdated: new Date().toLocaleTimeString(),
  trend: "up",
  unit: "kg",
  color: "#34d399",
  note: "Sourced from Chinese domestic spot. No formal exchange listing — OTC/broker-quoted.",
};

export const reeSpotHistory = [
  { date: "Apr 18", price: 61.20 },
  { date: "Apr 21", price: 61.80 },
  { date: "Apr 22", price: 62.40 },
  { date: "Apr 23", price: 62.10 },
  { date: "Apr 24", price: 63.00 },
  { date: "Apr 25", price: 63.80 },
  { date: "Apr 28", price: 64.50 },
  { date: "Apr 29", price: 65.20 },
  { date: "Apr 30", price: 65.90 },
  { date: "May 1",  price: 66.80 },
  { date: "May 2",  price: 67.40 },
  { date: "May 5",  price: 67.10 },
  { date: "May 6",  price: 68.20 },
  { date: "May 7",  price: 69.00 },
  { date: "May 8",  price: 68.60 },
  { date: "May 9",  price: 69.80 },
  { date: "May 12", price: 70.50 },
  { date: "May 13", price: 71.20 },
  { date: "May 14", price: 70.90 },
  { date: "May 15", price: 72.00 },
  { date: "May 16", price: 72.80 },
  { date: "May 19", price: 73.50 },
  { date: "May 20", price: 74.10 },
  { date: "May 21", price: 74.80 },
];

// REE forward curve = analyst price outlook (no formal futures exchange)
export const reeFuturesCurve = [
  { month: "Jun 25", price: 75.50 },
  { month: "Jul 25", price: 76.80 },
  { month: "Aug 25", price: 78.20 },
  { month: "Sep 25", price: 79.50 },
  { month: "Oct 25", price: 81.00 },
  { month: "Nov 25", price: 82.40 },
  { month: "Dec 25", price: 84.00 },
  { month: "Jan 26", price: 85.50 },
  { month: "Feb 26", price: 86.80 },
  { month: "Mar 26", price: 88.20 },
  { month: "Apr 26", price: 89.50 },
  { month: "May 26", price: 91.00 },
];

// Individual REE spot prices for the detail panel
export const reeIndividualPrices = [
  { name: "Neodymium Oxide",   symbol: "Nd2O3",  price: 74.80,  unit: "kg", change: "+1.77%", trend: "up",   note: "Key magnet material; wind turbines, EV motors" },
  { name: "Praseodymium Oxide",symbol: "Pr6O11",  price: 74.80,  unit: "kg", change: "+1.77%", trend: "up",   note: "Alloyed with Nd for NdFeB magnets" },
  { name: "Dysprosium Oxide",  symbol: "Dy2O3",  price: 298.00, unit: "kg", change: "+0.68%", trend: "up",   note: "High-temp magnet performance; very limited supply" },
  { name: "Terbium Oxide",     symbol: "Tb4O7",  price: 890.00, unit: "kg", change: "+0.45%", trend: "up",   note: "Green phosphors and NdFeB magnets; critical scarcity" },
  { name: "Lanthanum Oxide",   symbol: "La2O3",  price: 1.85,   unit: "kg", change: "-0.54%", trend: "down", note: "EV NiMH batteries, fluid cracking catalysts" },
  { name: "Cerium Oxide",      symbol: "CeO2",   price: 1.92,   unit: "kg", change: "-0.52%", trend: "down", note: "Most abundant REE; polishing, catalysts" },
  { name: "Gallium",           symbol: "Ga",     price: 248.00, unit: "kg", change: "+2.15%", trend: "up",   note: "GaN semiconductors in AI power electronics" },
  { name: "Germanium",         symbol: "Ge",     price: 1420.00,unit: "kg", change: "+1.88%", trend: "up",   note: "Fiber optics and infrared optics for data centers" },
];

