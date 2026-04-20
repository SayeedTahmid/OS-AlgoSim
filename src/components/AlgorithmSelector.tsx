import React from 'react';
import { Card } from './Card';

interface AlgorithmSelectorProps {
  selectedAlgorithms: Set<string>;
  onToggleAlgorithm: (algorithm: string) => void;
  timeQuantum: number;
  onTimeQuantumChange: (value: number) => void;
}

const ALGORITHMS = [
  { id: 'fcfs', label: 'FCFS', description: 'First Come First Served' },
  { id: 'sjf-np', label: 'SJF Non Preemptive', description: 'Shortest Job First (Non-Preemptive)' },
  { id: 'sjf-p', label: 'SJF Preemptive', description: 'Shortest Job First (Preemptive)' },
  { id: 'priority-np', label: 'Priority Non Preemptive', description: 'Priority Scheduling (Non-Preemptive)' },
  { id: 'priority-p', label: 'Priority Preemptive', description: 'Priority Scheduling (Preemptive)' },
  { id: 'rr', label: 'Round Robin', description: 'Round Robin Scheduling' }
];

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  selectedAlgorithms,
  onToggleAlgorithm,
  timeQuantum,
  onTimeQuantumChange
}) => {
  return (
    <Card className="p-8 bg-slate-900/70">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Algorithm Selection</h2>
        <p className="text-slate-400">Choose algorithms to compare</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {ALGORITHMS.map((algo) => (
          <label
            key={algo.id}
            className="flex items-start p-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl hover:border-blue-500/50 hover:bg-slate-800/70 transition cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selectedAlgorithms.has(algo.id)}
              onChange={() => onToggleAlgorithm(algo.id)}
              className="mt-1 w-5 h-5 accent-blue-500 cursor-pointer"
            />
            <div className="ml-4 flex-1">
              <p className="font-semibold text-white group-hover:text-blue-400 transition">{algo.label}</p>
              <p className="text-sm text-slate-400">{algo.description}</p>
            </div>
          </label>
        ))}
      </div>

      {selectedAlgorithms.has('rr') && (
        <div className="mb-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <label className="flex items-center gap-3">
            <span className="text-white font-semibold min-w-fit">Time Quantum (ms):</span>
            <input
              type="number"
              min="1"
              value={timeQuantum}
              onChange={(e) => onTimeQuantumChange(Math.max(1, parseInt(e.target.value) || 1))}
              className="px-4 py-2 bg-slate-800 border border-blue-500/50 rounded-lg text-white focus:outline-none focus:border-blue-400 transition w-32"
            />
          </label>
          <p className="text-sm text-blue-300/70 mt-2">Adjust the time quantum for Round Robin scheduling</p>
        </div>
      )}
    </Card>
  );
};
