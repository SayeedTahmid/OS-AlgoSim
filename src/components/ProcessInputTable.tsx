import React from 'react';
import { Process } from '../types';
import { Button } from './Button';
import { Card } from './Card';

interface ProcessInputTableProps {
  processes: Process[];
  onAddProcess: () => void;
  onDeleteProcess: (index: number) => void;
  onUpdateProcess: (index: number, field: keyof Process, value: any) => void;
  onReset: () => void;
  onLoadSample: () => void;
}

export const ProcessInputTable: React.FC<ProcessInputTableProps> = ({
  processes,
  onAddProcess,
  onDeleteProcess,
  onUpdateProcess,
  onReset,
  onLoadSample
}) => {
  return (
    <Card className="p-8 bg-slate-900/70">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Process Input</h2>
        <p className="text-slate-400">Enter process details for scheduling algorithms</p>
      </div>

      <div className="overflow-x-auto mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-slate-700 bg-slate-800/50">
              <th className="px-6 py-4 text-left text-base font-semibold text-slate-300">PID</th>
              <th className="px-6 py-4 text-center text-base font-semibold text-slate-300">Arrival Time</th>
              <th className="px-6 py-4 text-center text-base font-semibold text-slate-300">Burst Time</th>
              <th className="px-6 py-4 text-center text-base font-semibold text-slate-300">Priority</th>
              <th className="px-6 py-4 text-center text-base font-semibold text-slate-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {processes.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                  No processes added yet. Click "Add Process" to get started.
                </td>
              </tr>
            ) : (
              processes.map((process, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4 text-white font-mono">{process.id}</td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min="0"
                      value={process.arrivalTime}
                      onChange={(e) => onUpdateProcess(index, 'arrivalTime', Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-24 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-center focus:outline-none focus:border-blue-500 transition"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min="1"
                      value={process.burstTime}
                      onChange={(e) => onUpdateProcess(index, 'burstTime', Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-center focus:outline-none focus:border-blue-500 transition"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min="0"
                      value={process.priority || 0}
                      onChange={(e) => onUpdateProcess(index, 'priority', Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-24 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-center focus:outline-none focus:border-blue-500 transition"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onDeleteProcess(index)}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition font-medium text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={onAddProcess} variant="primary" size="md">
          ➕ Add Process
        </Button>
        <Button onClick={onLoadSample} variant="secondary" size="md">
          📋 Load Sample Data
        </Button>
        <Button onClick={onReset} variant="secondary" size="md">
          🔄 Reset
        </Button>
      </div>
    </Card>
  );
};
