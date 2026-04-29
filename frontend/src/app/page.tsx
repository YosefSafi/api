'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 1000 },
];

export default function Dashboard() {
  return (
    <div>
      <div className="grid">
        <div className="card stats-card">
          <div className="label">Total Decisions</div>
          <div className="value">12,405</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={12} /> +12% from last week
          </div>
        </div>
        <div className="card stats-card">
          <div className="label">AI Confidence</div>
          <div className="value">94.2%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Stable performance
          </div>
        </div>
        <div className="card stats-card">
          <div className="label">Active Models</div>
          <div className="value">4</div>
          <div style={{ fontSize: '0.75rem', color: '#a3a3a3', marginTop: '0.5rem' }}>
            Latest: regression_v2
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="card" style={{ height: '400px' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Decision Performance</h3>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ background: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--foreground)' }}
              />
              <Area type="monotone" dataKey="value" stroke="var(--primary)" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ color: i % 2 === 0 ? 'var(--accent)' : 'var(--primary)' }}>
                  {i % 2 === 0 ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem' }}>Decision ID #{1000 + i} evaluated</div>
                  <div style={{ fontSize: '0.75rem', color: '#a3a3a3' }}>2 mins ago</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
