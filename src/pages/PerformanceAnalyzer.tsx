import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Process } from '../types';
import { cpuAlgorithms } from '../algorithms/cpu/cpuAlgorithms';
import { ProcessInputTable } from '../components/ProcessInputTable';
import { AlgorithmSelector } from '../components/AlgorithmSelector';
import { SummaryCards } from '../components/SummaryCards';
import { ComparisonCharts } from '../components/ComparisonCharts';
import { MetricsTable } from '../components/MetricsTable';
import { RecommendationPanel } from '../components/RecommendationPanel';
import { Card } from '../components/Card';

const SAMPLE_PROCESSES: Process[] = [
  { id: 'P1', arrivalTime: 0, burstTime: 8, priority: 3 },
  { id: 'P2', arrivalTime: 1, burstTime: 4, priority: 1 },
  { id: 'P3', arrivalTime: 2, burstTime: 2, priority: 4 },
  { id: 'P4', arrivalTime: 3, burstTime: 1, priority: 2 }
];

type AlgorithmKey = 'fcfs' | 'sjf-np' | 'sjf-p' | 'priority-np' | 'priority-p' | 'rr';

const PerformanceAnalyzer: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<Set<string>>(
    new Set(['fcfs', 'sjf-np', 'rr'])
  );
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [showResults, setShowResults] = useState(false);

  const generatePID = (index: number): string => `P${index + 1}`;

  const handleAddProcess = () => {
    const newProcess: Process = {
      id: generatePID(processes.length),
      arrivalTime: 0,
      burstTime: 1,
      priority: 0
    };
    setProcesses([...processes, newProcess]);
  };

  const handleDeleteProcess = (index: number) => {
    const updatedProcesses = processes
      .filter((_, i) => i !== index)
      .map((p, i) => ({ ...p, id: generatePID(i) }));
    setProcesses(updatedProcesses);
  };

  const handleUpdateProcess = (index: number, field: keyof Process, value: any) => {
    const updatedProcesses = [...processes];
    if (field === 'arrivalTime') {
      updatedProcesses[index].arrivalTime = Math.max(0, value);
    } else if (field === 'burstTime') {
      updatedProcesses[index].burstTime = Math.max(1, value);
    } else if (field === 'priority') {
      updatedProcesses[index].priority = Math.max(0, value);
    }
    setProcesses(updatedProcesses);
  };

  const handleReset = () => {
    setProcesses([]);
    setShowResults(false);
  };

  const handleLoadSample = () => {
    setProcesses([...SAMPLE_PROCESSES]);
  };

  const handleToggleAlgorithm = (algorithm: string) => {
    const updated = new Set(selectedAlgorithms);
    if (updated.has(algorithm)) {
      updated.delete(algorithm);
    } else {
      updated.add(algorithm);
    }
    setSelectedAlgorithms(updated);
  };

  const runComparison = () => {
    if (processes.length === 0) {
      alert('Please add at least one process');
      return;
    }
    setShowResults(true);
  };

  // Calculate results for selected algorithms
  const algorithmMap: Record<AlgorithmKey, any> = {
    'fcfs': cpuAlgorithms.fcfs,
    'sjf-np': cpuAlgorithms.sjfNonPreemptive,
    'sjf-p': cpuAlgorithms.sjfPreemptive,
    'priority-np': cpuAlgorithms.priorityNonPreemptive,
    'priority-p': cpuAlgorithms.priorityPreemptive,
    'rr': (procs: Process[]) => cpuAlgorithms.roundRobin(procs, timeQuantum)
  };

  const algorithmLabels: Record<AlgorithmKey, string> = {
    'fcfs': 'FCFS',
    'sjf-np': 'SJF (NP)',
    'sjf-p': 'SJF (P)',
    'priority-np': 'Priority (NP)',
    'priority-p': 'Priority (P)',
    'rr': `Round Robin (TQ=${timeQuantum})`
  };

  const results = Array.from(selectedAlgorithms)
    .map(algo => {
      const key = algo as AlgorithmKey;
      const result = algorithmMap[key](processes);
      const metrics = Object.values(result.metrics);
      const avgRT = metrics.length > 0 
        ? metrics.reduce((sum: number, m: any) => sum + m.responseTime, 0) / metrics.length
        : 0;
      const avgCT = metrics.length > 0
        ? metrics.reduce((sum: number, m: any ) => sum + m.completionTime, 0) / metrics.length
        : 0;
      
      return {
        algorithm: algorithmLabels[key],
        key: key,
        avgWT: result.avgWaitingTime,
        avgTAT: result.avgTurnaroundTime,
        avgRT: avgRT,
        avgCT: avgCT
      };
    })
    .sort((a, b) => a.algorithm.localeCompare(b.algorithm));

  // Find best algorithms
  const bestWT = results.reduce((min, curr) => 
    curr.avgWT < min.avgWT ? curr : min
  );
  const bestTAT = results.reduce((min, curr) => 
    curr.avgTAT < min.avgTAT ? curr : min
  );
  const bestCT = results.reduce((min, curr) => 
    curr.avgCT < min.avgCT ? curr : min
  );
  const bestRT = results.reduce((min, curr) => 
    curr.avgRT < min.avgRT ? curr : min
  );

  return (
    <Layout title="Performance Analyzer" subtitle="">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Performance Analyzer</h1>
          <p className="text-slate-400 text-lg">
            Input custom processes and compare CPU scheduling algorithms with detailed metrics
          </p>
        </div>

        {/* Process Input Section */}
        <ProcessInputTable
          processes={processes}
          onAddProcess={handleAddProcess}
          onDeleteProcess={handleDeleteProcess}
          onUpdateProcess={handleUpdateProcess}
          onReset={handleReset}
          onLoadSample={handleLoadSample}
        />

        {/* Algorithm Selection Section */}
        <AlgorithmSelector
          selectedAlgorithms={selectedAlgorithms}
          onToggleAlgorithm={handleToggleAlgorithm}
          timeQuantum={timeQuantum}
          onTimeQuantumChange={setTimeQuantum}
        />

        {/* Run Comparison Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={runComparison}
            variant="primary"
            size="lg"
          >
            🚀 Run Comparison
          </Button>
        </div>

        {/* Results Section */}
        {showResults && results.length > 0 && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Analysis Results</h2>
              <SummaryCards
                bestWT={{ algorithm: bestWT.algorithm, value: bestWT.avgWT }}
                bestTAT={{ algorithm: bestTAT.algorithm, value: bestTAT.avgTAT }}
                bestCT={{ algorithm: bestCT.algorithm, value: bestCT.avgCT }}
                bestRT={{ algorithm: bestRT.algorithm, value: bestRT.avgRT }}
              />
            </div>

            {/* Charts */}
            <ComparisonCharts
              data={results.map(r => ({
                name: r.algorithm,
                avgWT: r.avgWT,
                avgTAT: r.avgTAT,
                avgRT: r.avgRT
              }))}
            />

            {/* Metrics Table */}
            <MetricsTable
              data={results.map(r => ({
                algorithm: r.algorithm,
                avgWT: r.avgWT,
                avgTAT: r.avgTAT,
                avgRT: r.avgRT,
                avgCT: r.avgCT
              }))}
            />

            {/* Recommendation */}
            <RecommendationPanel
              bestAlgorithm={{ name: bestWT.algorithm, avgWT: bestWT.avgWT }}
              processCount={processes.length}
            />

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8 bg-slate-900/70">
                <h3 className="text-2xl font-bold text-white mb-6">Algorithm Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <p className="text-white font-semibold mb-2">📊 Waiting Time</p>
                    <p className="text-slate-400 text-sm">
                      The total time a process waits in the ready queue before execution starts.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <p className="text-white font-semibold mb-2">🔄 Turnaround Time</p>
                    <p className="text-slate-400 text-sm">
                      Total time from arrival to completion (WT + Burst Time).
                    </p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <p className="text-white font-semibold mb-2">⚡ Response Time</p>
                    <p className="text-slate-400 text-sm">
                      Time from arrival until the first time the CPU is assigned.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-slate-900/70">
                <h3 className="text-2xl font-bold text-white mb-6">Preemptive vs Non-Preemptive</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                    <p className="text-green-400 font-semibold mb-2">✓ Non-Preemptive</p>
                    <p className="text-slate-400 text-sm">
                      CPU cannot be taken away once assigned. Simpler but can cause long waits.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <p className="text-blue-400 font-semibold mb-2">✓ Preemptive</p>
                    <p className="text-slate-400 text-sm">
                      CPU can be taken away mid-execution. Better responsiveness and fairness.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!showResults && processes.length === 0 && (
          <Card className="p-12 bg-slate-900/50 border-2 border-dashed border-slate-700 text-center">
            <p className="text-4xl mb-4">📝</p>
            <p className="text-white text-xl font-semibold mb-2">Ready to Compare Algorithms?</p>
            <p className="text-slate-400 mb-6">Add processes above and select algorithms to begin analysis.</p>
            <Button onClick={handleLoadSample} variant="primary" size="md">
              📋 Load Sample Data to Get Started
            </Button>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default PerformanceAnalyzer;
