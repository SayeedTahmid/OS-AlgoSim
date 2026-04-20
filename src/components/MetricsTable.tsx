import React from 'react';
import { Card } from './Card';

interface MetricsTableProps {
  data: Array<{
    algorithm: string;
    avgWT: number;
    avgTAT: number;
    avgRT: number;
    avgCT: number;
  }>;
}

export const MetricsTable: React.FC<MetricsTableProps> = ({ data }) => {
  return (
    <Card className="p-8 bg-slate-900/70">
      <h3 className="text-2xl font-bold text-white mb-8">Detailed Metrics Comparison</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-slate-700 bg-slate-800/50">
              <th className="px-6 py-4 text-left text-base font-semibold text-slate-300">Algorithm</th>
              <th className="px-6 py-4 text-center text-base font-semibold text-slate-300">Avg WT (ms)</th>
              <th className="px-6 py-4 text-center text-base font-semibold text-slate-300">Avg TAT (ms)</th>
              <th className="px-6 py-4 text-center text-base font-semibold text-slate-300">Avg RT (ms)</th>
              <th className="px-6 py-4 text-center text-base font-semibold text-slate-300">Avg CT (ms)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition">
                <td className="px-6 py-4 text-white font-semibold">{row.algorithm}</td>
                <td className="px-6 py-4 text-center text-slate-300">{row.avgWT.toFixed(2)}</td>
                <td className="px-6 py-4 text-center text-slate-300">{row.avgTAT.toFixed(2)}</td>
                <td className="px-6 py-4 text-center text-slate-300">{row.avgRT.toFixed(2)}</td>
                <td className="px-6 py-4 text-center text-slate-300">{row.avgCT.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
        <p className="text-sm text-slate-400">
          <span className="font-semibold text-slate-300">Legend:</span> WT = Waiting Time, TAT = Turnaround Time, RT = Response Time, CT = Completion Time
        </p>
      </div>
    </Card>
  );
};
