import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { CompareChart } from '../components/charts/CompareChart';
import { Process } from '../types';
import { cpuAlgorithms } from '../algorithms/cpu/cpuAlgorithms';
import { formatNumber } from '../utils';

const PerformanceAnalyzer: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>([
    { id: 'P1', arrivalTime: 0, burstTime: 8, priority: 3 },
    { id: 'P2', arrivalTime: 1, burstTime: 4, priority: 1 },
    { id: 'P3', arrivalTime: 2, burstTime: 2, priority: 4 },
    { id: 'P4', arrivalTime: 3, burstTime: 1, priority: 2 }
  ]);

  const [showComparison, setShowComparison] = useState(false);

  const handleLoadSample = () => {
    setProcesses([
      { id: 'P1', arrivalTime: 0, burstTime: 8, priority: 3 },
      { id: 'P2', arrivalTime: 1, burstTime: 4, priority: 1 },
      { id: 'P3', arrivalTime: 2, burstTime: 2, priority: 4 },
      { id: 'P4', arrivalTime: 3, burstTime: 1, priority: 2 }
    ]);
  };

  const handleCompareAlgorithms = () => {
    setShowComparison(true);
  };

  const comparisons = [
    {
      name: 'FCFS',
      result: cpuAlgorithms.fcfs(processes)
    },
    {
      name: 'SJF (NP)',
      result: cpuAlgorithms.sjfNonPreemptive(processes)
    },
    {
      name: 'SJF (P)',
      result: cpuAlgorithms.sjfPreemptive(processes)
    },
    {
      name: 'Priority (NP)',
      result: cpuAlgorithms.priorityNonPreemptive(processes)
    },
    {
      name: 'Priority (P)',
      result: cpuAlgorithms.priorityPreemptive(processes)
    },
    {
      name: 'Round Robin (TQ=2)',
      result: cpuAlgorithms.roundRobin(processes, 2)
    }
  ];

  const comparisonData = comparisons.map(comp => ({
    name: comp.name,
    'Avg Wait': formatNumber(comp.result.avgWaitingTime),
    'Avg Turnaround': formatNumber(comp.result.avgTurnaroundTime)
  }));

  return (
    <Layout title="Performance Analyzer" subtitle="Compare algorithm performance with visualizations">
      <div className="space-y-8">
        {/* Control Panel */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Analysis Settings</h3>

          <div className="space-y-4 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Current Processes</h4>
              <div className="space-y-2">
                {processes.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="font-mono">{p.id}</span>
                    <span>Arrival: {p.arrivalTime}</span>
                    <span>Burst: {p.burstTime}</span>
                    <span>Priority: {p.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={handleCompareAlgorithms}
              variant="primary"
              size="md"
            >
              🚀 Run Comparison
            </Button>
            <Button
              onClick={handleLoadSample}
              variant="secondary"
              size="md"
            >
              📋 Load Sample Data
            </Button>
          </div>
        </Card>

        {/* Comparison Results */}
        {showComparison && (
          <div className="space-y-8">
            {/* Metrics Comparison */}
            <CompareChart
              data={comparisonData}
              title="CPU Scheduling Algorithms Comparison"
              type="bar"
              dataKeys={['Avg Wait', 'Avg Turnaround']}
            />

            {/* Detailed Metrics Table */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Detailed Metrics</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left font-semibold text-gray-300">Algorithm</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-300">Avg WT</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-300">Avg TAT</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-300">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((comp, idx) => {
                      const avgWT = comp.result.avgWaitingTime;
                      const avgTAT = comp.result.avgTurnaroundTime;
                      const efficiency = (1 - (avgWT / avgTAT)) * 100;

                      return (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-4 py-3">{comp.name}</td>
                          <td className="px-4 py-3 text-center text-gray-300">
                            {formatNumber(avgWT)}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-300">
                            {formatNumber(avgTAT)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-3 py-1 rounded text-xs font-semibold ${
                              efficiency > 70
                                ? 'bg-green-500/20 text-green-400'
                                : efficiency > 50
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {formatNumber(efficiency)}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Best Algorithm */}
            <Card className="p-6 border-green-500/30 bg-gradient-to-r from-green-500/10 to-transparent">
              <h3 className="text-lg font-semibold text-white mb-4">🏆 Best Performing Algorithm</h3>
              
              {(() => {
                const best = comparisons.reduce((prev, curr) =>
                  curr.result.avgWaitingTime < prev.result.avgWaitingTime ? curr : prev
                );
                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-green-400">{best.name}</span>
                      <span className="text-lg text-gray-300">
                        Avg WT: <span className="font-semibold">{formatNumber(best.result.avgWaitingTime)}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      This algorithm provides the lowest average waiting time for the given process set.
                    </p>
                  </div>
                );
              })()}
            </Card>

            {/* Recommendations */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">📋 Recommendations</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-xl">⚡</span>
                  <div>
                    <p className="font-semibold text-gray-300">Shortest Job First (SJF)</p>
                    <p className="text-sm text-gray-400">Best for minimizing waiting time, but requires knowing burst times in advance.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">🔄</span>
                  <div>
                    <p className="font-semibold text-gray-300">Round Robin</p>
                    <p className="text-sm text-gray-400">Fair scheduling, good for time-sharing systems, requires choosing appropriate time quantum.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">⚙️</span>
                  <div>
                    <p className="font-semibold text-gray-300">FCFS</p>
                    <p className="text-sm text-gray-400">Simplest to implement but can suffer from convoy effect.</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Algorithm Characteristics */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Algorithm Characteristics</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Non-Preemptive</h4>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>• FCFS: Simple, no overhead</p>
                    <p>• SJF: Minimizes wait time</p>
                    <p>• Priority: Process-specific handling</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-3">Preemptive</h4>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>• SJF: Better responsiveness</p>
                    <p>• Priority: Real-time capable</p>
                    <p>• Round Robin: Fair time allocation</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PerformanceAnalyzer;
