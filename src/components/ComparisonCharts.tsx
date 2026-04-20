import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from './Card';

interface ComparisonChartsProps {
  data: Array<{
    name: string;
    avgWT: number;
    avgTAT: number;
    avgRT: number;
  }>;
}

export const ComparisonCharts: React.FC<ComparisonChartsProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      {/* Bar Chart - WT and TAT */}
      <Card className="p-8 bg-slate-900/70">
        <h3 className="text-2xl font-bold text-white mb-6">Waiting Time & Turnaround Time Comparison</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis 
              dataKey="name" 
              stroke="#cbd5e1"
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis stroke="#cbd5e1" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number) => value.toFixed(2)}
            />
            <Legend />
            <Bar dataKey="avgWT" fill="#3b82f6" name="Avg Waiting Time" radius={[8, 8, 0, 0]} />
            <Bar dataKey="avgTAT" fill="#a855f7" name="Avg Turnaround Time" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Line Chart - Response Time */}
      <Card className="p-8 bg-slate-900/70">
        <h3 className="text-2xl font-bold text-white mb-6">Response Time Comparison</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis 
              dataKey="name" 
              stroke="#cbd5e1"
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis stroke="#cbd5e1" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number) => value.toFixed(2)}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="avgRT" 
              stroke="#10b981" 
              name="Avg Response Time"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
