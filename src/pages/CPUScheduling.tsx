import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { GanttChart } from '../components/charts/GanttChart';
import { ResultCard } from '../components/charts/ResultCard';
import { Process, CPUResults } from '../types';
import { cpuAlgorithms } from '../algorithms/cpu/cpuAlgorithms';
import { formatNumber } from '../utils';

type AlgorithmType = 'fcfs' | 'sjfNonPreemptive' | 'sjfPreemptive' | 'priorityNonPreemptive' | 'priorityPreemptive' | 'roundRobin';

const CPUScheduling: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>([
    { id: 'P1', arrivalTime: 0, burstTime: 8, priority: 3 },
    { id: 'P2', arrivalTime: 1, burstTime: 4, priority: 1 },
    { id: 'P3', arrivalTime: 2, burstTime: 2, priority: 4 }
  ]);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('fcfs');
  const [timeQuantum, setTimeQuantum] = useState<number>(2);
  const [results, setResults] = useState<CPUResults | null>(null);

  const algorithms: { label: string; value: AlgorithmType }[] = [
    { label: 'FCFS (First Come First Served)', value: 'fcfs' },
    { label: 'SJF Non-Preemptive', value: 'sjfNonPreemptive' },
    { label: 'SJF Preemptive', value: 'sjfPreemptive' },
    { label: 'Priority Non-Preemptive', value: 'priorityNonPreemptive' },
    { label: 'Priority Preemptive', value: 'priorityPreemptive' },
    { label: 'Round Robin', value: 'roundRobin' }
  ];

  const handleAddProcess = () => {
    const newProcess: Process = {
      id: `P${processes.length + 1}`,
      arrivalTime: 0,
      burstTime: 1,
      priority: 5
    };
    setProcesses([...processes, newProcess]);
  };

  const handleDeleteProcess = (index: number) => {
    setProcesses(processes.filter((_, i) => i !== index));
  };

  const handleProcessChange = (index: number, field: keyof Process, value: any) => {
    const updated = [...processes];
    updated[index] = { ...updated[index], [field]: field === 'id' ? value : Number(value) };
    setProcesses(updated);
  };

  const handleRunSimulation = () => {
    try {
      let result: CPUResults;

      if (selectedAlgorithm === 'roundRobin') {
        result = cpuAlgorithms.roundRobin(processes, timeQuantum);
      } else {
        const fn = cpuAlgorithms[selectedAlgorithm] as (p: Process[]) => CPUResults;
        result = fn(processes);
      }

      setResults(result);
    } catch (error) {
      alert('Error running simulation: ' + (error as Error).message);
    }
  };

  const handleLoadSample = () => {
    setProcesses([
      { id: 'P1', arrivalTime: 0, burstTime: 8, priority: 3 },
      { id: 'P2', arrivalTime: 1, burstTime: 4, priority: 1 },
      { id: 'P3', arrivalTime: 2, burstTime: 2, priority: 4 },
      { id: 'P4', arrivalTime: 3, burstTime: 1, priority: 2 }
    ]);
    setResults(null);
  };

  return (
    <Layout title="CPU Scheduling" subtitle="Simulate various CPU scheduling algorithms">
      <div className="space-y-8">
        {/* Control Panel */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Simulation Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Algorithm
              </label>
              <select
                value={selectedAlgorithm}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedAlgorithm(e.target.value as AlgorithmType)}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                {algorithms.map((algo) => (
                  <option key={algo.value} value={algo.value}>
                    {algo.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedAlgorithm === 'roundRobin' && (
              <Input
                type="number"
                label="Time Quantum"
                value={timeQuantum}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimeQuantum(Number(e.target.value))}
                min="1"
              />
            )}
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button onClick={handleRunSimulation} variant="primary" size="md">
              🚀 Run Simulation
            </Button>
            <Button onClick={handleLoadSample} variant="secondary" size="md">
              📋 Load Sample Data
            </Button>
            <Button
              onClick={() => setProcesses([])}
              variant="danger"
              size="md"
            >
              🗑️ Clear All
            </Button>
          </div>
        </Card>

        {/* Process Input Table */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Process Input Table</h3>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">Process ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">Arrival Time</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">Burst Time</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">Priority</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((process, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={process.id}
                        onChange={(e) => handleProcessChange(idx, 'id', e.target.value)}
                        className="w-20 px-2 py-1 rounded bg-gray-800 text-gray-100 border border-gray-700"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={process.arrivalTime}
                        onChange={(e) => handleProcessChange(idx, 'arrivalTime', e.target.value)}
                        className="w-24 px-2 py-1 rounded bg-gray-800 text-gray-100 border border-gray-700"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={process.burstTime}
                        onChange={(e) => handleProcessChange(idx, 'burstTime', e.target.value)}
                        className="w-24 px-2 py-1 rounded bg-gray-800 text-gray-100 border border-gray-700"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={process.priority || 0}
                        onChange={(e) => handleProcessChange(idx, 'priority', e.target.value)}
                        className="w-24 px-2 py-1 rounded bg-gray-800 text-gray-100 border border-gray-700"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        onClick={() => handleDeleteProcess(idx)}
                        variant="danger"
                        size="sm"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button onClick={handleAddProcess} variant="secondary" size="md">
            ➕ Add Process
          </Button>
        </Card>

        {/* Results */}
        {results && (
          <div className="space-y-8">
            {/* Gantt Chart */}
            <GanttChart schedule={results.schedule} />

            {/* Metrics */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Average Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Average Waiting Time</p>
                  <p className="text-3xl font-bold text-primary">
                    {formatNumber(results.avgWaitingTime)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Average Turnaround Time</p>
                  <p className="text-3xl font-bold text-accent">
                    {formatNumber(results.avgTurnaroundTime)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Individual Process Results */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Process Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(results.metrics).map(([processId, metrics]) => (
                  <ResultCard
                    key={processId}
                    processId={processId}
                    metrics={metrics}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CPUScheduling;
