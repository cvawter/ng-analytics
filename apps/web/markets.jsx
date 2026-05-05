import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, DollarSign, Calendar } from 'lucide-react';
import { spotPrices, futuresCurve } from '@ng-analytics/shared';

export default function Markets() {
  const minPrice = Math.floor(Math.min(...futuresCurve.map(d => d.price)) * 10) / 10;
  const maxPrice = Math.ceil(Math.max(...futuresCurve.map(d => d.price)) * 10) / 10;

  return (
    <div className="min-h-screen bg-[#0d0f14] text-[#eef0f4] p-6 lg:p-12 font-sans overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-[#f0a500]" />
            Natural Gas Markets
          </h1>
          <p className="text-[#9ca3af] mt-2 max-w-3xl">
            Live spot pricing and forward curve dynamics for Henry Hub Natural Gas.
          </p>
        </header>

        {/* Spot Price Card */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="col-span-1 bg-gradient-to-br from-white/[0.04] to-[#f0a500]/5 border border-white/5 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-[#9ca3af]">
                <Activity className="h-5 w-5" />
                <span className="font-semibold">{spotPrices.symbol}</span>
              </div>
              <span className="text-xs bg-[#f0a500]/20 text-[#f0a500] px-2 py-1 rounded-full font-bold">
                LIVE
              </span>
            </div>
            
            <div className="mb-2">
              <span className="text-5xl font-black text-white">${spotPrices.price.toFixed(3)}</span>
              <span className="text-lg text-[#9ca3af] ml-2">/ MMBtu</span>
            </div>
            
            <div className={`flex items-center gap-2 font-bold ${spotPrices.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              <TrendingUp className="h-5 w-5" />
              <span>{spotPrices.change} ({spotPrices.percentChange})</span>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#6b7280]">
              <span>{spotPrices.name}</span>
              <span>Updated: {spotPrices.lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Futures Curve Chart */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-[#f0a500]/10 rounded-lg">
              <Calendar className="h-5 w-5 text-[#f0a500]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Henry Hub Futures Curve</h2>
              <p className="text-sm text-[#9ca3af]">12-Month Forward Strip</p>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={futuresCurve} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280" 
                  tick={{ fill: '#9ca3af', fontSize: 12 }} 
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  domain={[minPrice, maxPrice]} 
                  stroke="#6b7280" 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value.toFixed(2)}`}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161922', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#f0a500', fontWeight: 'bold' }}
                  formatter={(value) => [`$${value}`, 'Price']}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#f0a500" 
                  strokeWidth={3}
                  dot={{ fill: '#0d0f14', stroke: '#f0a500', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#f0a500' }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
