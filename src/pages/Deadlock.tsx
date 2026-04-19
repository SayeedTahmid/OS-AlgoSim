import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { DeadlockState } from '../types';
import { deadlockAlgorithms } from '../algorithms/deadlock/deadlockAlgorithms';

type Algorithm = 'banker' | 'detection';

const Deadlock: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('banker');
  const [numProcesses, setNumProcesses] = useState<number>(3);
  const [numResources, setNumResources] = useState<number>(3);

  const [allocation, setAllocation] = useState<number[][]>([
    [0, 1, 0],
    [2, 0, 0],
    [3, 0, 2]
  ]);

  const [max, setMax] = useState<number[][]>([
    [7, 5, 3],
    [3, 2, 2],
    [9, 0, 2]
  ]);

  const [available, setAvailable] = useState<number[]>([10, 5, 7]);
  const [request, setRequest] = useState<number[][]>([
    [0, 1, 0],
    [2, 0, 0],
    [0, 0, 2]
  ]);

  const [results, setResults] = useState<DeadlockState | null>(null);
  const [detectionResults, setDetectionResults] = useState<any>(null);

  const handleMatrixChange = (
    matrix: number[][],
    setMatrix: (m: number[][]) => void,
    row: number,
    col: number,
    value: string
  ) => {
    const num = parseInt(value);
    if (!isNaN(num)) {
      const newMatrix = matrix.map((r, i) => (i === row ? r.map((c, j) => (j === col ? num : c)) : r));
      setMatrix(newMatrix);
    }
  };

  const handleResourceChange = (index: number, value: string) => {
    const num = parseInt(value);
    if (!isNaN(num)) {
      setAvailable([...available.slice(0, index), num, ...available.slice(index + 1)]);
    }
  };

  const handleRunBanker = () => {
    try {
      const result = deadlockAlgorithms.bankerAlgorithm(allocation, max, available);
      setResults(result);
      setDetectionResults(null);
    } catch (error) {
      alert('Error: ' + (error as Error).message);
    }
  };

  const handleRunDetection = () => {
    try {
      const result = deadlockAlgorithms.deadlockDetection(allocation, request, available);
      setDetectionResults(result);
      setResults(null);
    } catch (error) {
      alert('Error: ' + (error as Error).message);
    }
  };

  const handleLoadSample = () => {
    setNumProcesses(3);
    setNumResources(3);
    setAllocation([
      [0, 1, 0],
      [2, 0, 0],
      [3, 0, 2]
    ]);
    setMax([
      [7, 5, 3],
      [3, 2, 2],
      [9, 0, 2]
    ]);
    setAvailable([10, 5, 7]);
    setRequest([
      [0, 1, 0],
      [2, 0, 0],
      [0, 0, 2]
    ]);
    setResults(null);
    setDetectionResults(null);
  };

  const handleResizeMatrices = () => {
    // Reallocate matrices with new size
    setAllocation(
      Array(numProcesses).fill(null).map(() => Array(numResources).fill(0))
    );
    setMax(
      Array(numProcesses).fill(null).map(() => Array(numResources).fill(0))
    );
    setRequest(
      Array(numProcesses).fill(null).map(() => Array(numResources).fill(0))
    );
    setAvailable(Array(numResources).fill(0));
  };

  return (
    <Layout title="Deadlock Detection & Avoidance" subtitle="Banker's Algorithm and Deadlock Detection">
      <div className="space-y-8">
        {/* Algorithm Selection */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Algorithm Selection</h3>

          <div className="flex gap-4 mb-6">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={selectedAlgorithm === 'banker'}
                onChange={() => setSelectedAlgorithm('banker')}
                className="w-4 h-4"
              />
              <span className="text-gray-300">Banker's Algorithm (Avoidance)</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={selectedAlgorithm === 'detection'}
                onChange={() => setSelectedAlgorithm('detection')}
                className="w-4 h-4"
              />
              <span className="text-gray-300">Deadlock Detection</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Input
              type="number"
              label="Number of Processes"
              value={numProcesses}
              onChange={(e) => setNumProcesses(Number(e.target.value))}
              min="1"
            />
            <Input
              type="number"
              label="Number of Resources"
              value={numResources}
              onChange={(e) => setNumResources(Number(e.target.value))}
              min="1"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button onClick={handleResizeMatrices} variant="secondary">
              Resize Matrices
            </Button>
            <Button onClick={handleLoadSample} variant="secondary">
              📋 Load Sample
            </Button>
          </div>
        </Card>

        {/* Allocation Matrix */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Allocation Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-white/5 border border-white/10">
                  <th className="px-3 py-2 text-left font-semibold text-gray-300 border border-white/10">Process</th>
                  {Array(numResources).fill(null).map((_, i) => (
                    <th key={i} className="px-3 py-2 text-center font-semibold text-gray-300 border border-white/10">
                      R{i}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allocation.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border border-white/10">
                    <td className="px-3 py-2 font-semibold text-gray-300 border border-white/10">P{rowIdx}</td>
                    {row.map((val, colIdx) => (
                      <td key={colIdx} className="p-2 border border-white/10">
                        <input
                          type="number"
                          value={val}
                          onChange={(e) => handleMatrixChange(allocation, setAllocation, rowIdx, colIdx, e.target.value)}
                          className="w-12 px-2 py-1 rounded bg-gray-800 text-gray-100 border border-gray-700 text-center"
                          min="0"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Max Matrix */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Max Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-white/5 border border-white/10">
                  <th className="px-3 py-2 text-left font-semibold text-gray-300 border border-white/10">Process</th>
                  {Array(numResources).fill(null).map((_, i) => (
                    <th key={i} className="px-3 py-2 text-center font-semibold text-gray-300 border border-white/10">
                      R{i}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {max.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border border-white/10">
                    <td className="px-3 py-2 font-semibold text-gray-300 border border-white/10">P{rowIdx}</td>
                    {row.map((val, colIdx) => (
                      <td key={colIdx} className="p-2 border border-white/10">
                        <input
                          type="number"
                          value={val}
                          onChange={(e) => handleMatrixChange(max, setMax, rowIdx, colIdx, e.target.value)}
                          className="w-12 px-2 py-1 rounded bg-gray-800 text-gray-100 border border-gray-700 text-center"
                          min="0"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Available Resources */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Available Resources</h3>
          <div className="flex gap-4">
            {available.map((val, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-300 mb-2">R{idx}</label>
                <input
                  type="number"
                  value={val}
                  onChange={(e) => handleResourceChange(idx, e.target.value)}
                  className="w-16 px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 text-center"
                  min="0"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Request Matrix (for Detection) */}
        {selectedAlgorithm === 'detection' && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Request Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-white/5 border border-white/10">
                    <th className="px-3 py-2 text-left font-semibold text-gray-300 border border-white/10">Process</th>
                    {Array(numResources).fill(null).map((_, i) => (
                      <th key={i} className="px-3 py-2 text-center font-semibold text-gray-300 border border-white/10">
                        R{i}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {request.map((row, rowIdx) => (
                    <tr key={rowIdx} className="border border-white/10">
                      <td className="px-3 py-2 font-semibold text-gray-300 border border-white/10">P{rowIdx}</td>
                      {row.map((val, colIdx) => (
                        <td key={colIdx} className="p-2 border border-white/10">
                          <input
                            type="number"
                            value={val}
                            onChange={(e) => handleMatrixChange(request, setRequest, rowIdx, colIdx, e.target.value)}
                            className="w-12 px-2 py-1 rounded bg-gray-800 text-gray-100 border border-gray-700 text-center"
                            min="0"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Run Simulation */}
        <div className="flex gap-3 flex-wrap">
          {selectedAlgorithm === 'banker' ? (
            <Button onClick={handleRunBanker} variant="primary" size="lg">
              🚀 Run Banker's Algorithm
            </Button>
          ) : (
            <Button onClick={handleRunDetection} variant="primary" size="lg">
              🚀 Run Deadlock Detection
            </Button>
          )}
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-8">
            {/* Status */}
            <Card className={`p-6 ${results.isSafe ? 'border-green-500/30' : 'border-red-500/30'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{results.isSafe ? '✅' : '⚠️'}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    System is {results.isSafe ? 'SAFE' : 'UNSAFE'}
                  </h3>
                  <p className="text-gray-400">
                    {results.isSafe
                      ? 'The system is in a safe state. No deadlock can occur.'
                      : 'The system is in an unsafe state. Deadlock may occur.'}
                  </p>
                </div>
              </div>

              {results.isSafe && results.safeSequence.length > 0 && (
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm font-semibold text-green-400 mb-2">Safe Sequence:</p>
                  <p className="text-lg font-mono text-gray-200">
                    {results.safeSequence.map(p => `P${p}`).join(' → ')}
                  </p>
                </div>
              )}
            </Card>

            {/* Need Matrix */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Need Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-white/5 border border-white/10">
                      <th className="px-3 py-2 text-left font-semibold text-gray-300 border border-white/10">Process</th>
                      {Array(numResources).fill(null).map((_, i) => (
                        <th key={i} className="px-3 py-2 text-center font-semibold text-gray-300 border border-white/10">
                          R{i}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.needMatrix.map((row, rowIdx) => (
                      <tr key={rowIdx} className="border border-white/10">
                        <td className="px-3 py-2 font-semibold text-gray-300 border border-white/10">P{rowIdx}</td>
                        {row.map((val, colIdx) => (
                          <td key={colIdx} className="px-3 py-2 text-center text-gray-300 border border-white/10">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {detectionResults && (
          <Card className={`p-6 ${!detectionResults.isDeadlock ? 'border-green-500/30' : 'border-red-500/30'}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">{!detectionResults.isDeadlock ? '✅' : '⚠️'}</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {!detectionResults.isDeadlock ? 'NO DEADLOCK DETECTED' : 'DEADLOCK DETECTED'}
                </h3>
                <p className="text-gray-400">
                  {!detectionResults.isDeadlock
                    ? 'The system is deadlock-free in the current state.'
                    : 'The system is in a deadlock state.'}
                </p>
              </div>
            </div>

            {detectionResults.isDeadlock && detectionResults.deadlockedProcesses.length > 0 && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm font-semibold text-red-400 mb-2">Deadlocked Processes:</p>
                <p className="text-lg font-mono text-gray-200">
                  {detectionResults.deadlockedProcesses.map((p: number) => `P${p}`).join(', ')}
                </p>
              </div>
            )}
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Deadlock;
