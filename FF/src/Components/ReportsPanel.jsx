import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Added "Cell" to the imports below
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell } from 'recharts';
import { BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

// FIX: Moved CustomTooltip OUTSIDE the main component 
// This prevents it from being redundantly re-created on every render.
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0b1329] border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-xl">
        <p className="text-white font-semibold mb-2">{label} 2026</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-xs mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span className="text-slate-300">{entry.name}:</span>
            <span className="font-mono font-bold text-white">₹{entry.value.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ReportsPanel() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/reports/trends', { withCredentials: true });
        if (response.data.success) {
          setChartData(response.data.chartData);
        }
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReportData();
  }, []);

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-slate-400 animate-pulse">Loading Visual Engines...</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-wide">Financial Analytics Engine</h2>
          <p className="text-[11px] text-slate-400">Year-to-date monthly cash flow trends and matrix visualization</p>
        </div>
      </div>

      {/* MACRO VIEW: Area Chart (Revenue vs Expenses) */}
      <div className="rounded-2xl p-6 bg-white/[0.012] border border-white/5 backdrop-blur-xl shadow-2xl">
        <h3 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          Cash Flow Trajectory (YTD)
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={11} tickMargin={10} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} tickFormatter={(val) => `₹${val/1000}k`} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              <Area type="monotone" dataKey="revenue" name="Total Revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              <Area type="monotone" dataKey="expenses" name="Total Expenses" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* MICRO VIEW: Bar Chart (Net Profit) */}
      <div className="rounded-2xl p-6 bg-white/[0.012] border border-white/5 backdrop-blur-xl shadow-2xl">
        <h3 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Net Profit Margin Isolation
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={11} tickMargin={10} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} tickFormatter={(val) => `₹${val/1000}k`} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
              <Bar dataKey="profit" name="Net Profit" radius={[4, 4, 0, 0]}>
                {/* FIX: Capitalized <Cell /> component to fix Recharts internal mapping crash */}
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.profit >= 0 ? '#10b981' : '#f43f5e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}