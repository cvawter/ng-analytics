// Mock Market Data for Henry Hub

export const spotPrices = {
  symbol: "NG:HH",
  name: "Henry Hub Natural Gas Spot",
  price: 2.84,
  change: "+0.12",
  percentChange: "+4.41%",
  lastUpdated: new Date().toLocaleTimeString(),
  trend: "up" // 'up' or 'down'
};

export const futuresCurve = [
  { month: "Jan 26", price: 3.15 },
  { month: "Feb 26", price: 3.08 },
  { month: "Mar 26", price: 2.95 },
  { month: "Apr 26", price: 2.75 },
  { month: "May 26", price: 2.78 },
  { month: "Jun 26", price: 2.85 },
  { month: "Jul 26", price: 2.98 },
  { month: "Aug 26", price: 3.02 },
  { month: "Sep 26", price: 2.99 },
  { month: "Oct 26", price: 3.10 },
  { month: "Nov 26", price: 3.45 },
  { month: "Dec 26", price: 3.85 },
];
