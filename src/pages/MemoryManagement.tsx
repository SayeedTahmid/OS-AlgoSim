import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { MemoryAllocationResult, PageReplacementResult } from '../types';
import { memoryAlgorithms } from '../algorithms/memory/memoryAlgorithms';
import { formatNumber } from '../utils';

type Tab = 'allocation' | 'pageReplacement';
type AllocationAlgorithm = 'firstFit' | 'bestFit';
type PageReplacementAlgorithm = 'fifo' | 'lru';

const MemoryManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('allocation');

  // Memory Allocation State
  const [blockSizes, setBlockSizes] = useState<number[]>([100, 500, 200, 300, 600]);
  const [processSizes, setProcessSizes] = useState<number[]>([212, 417, 112, 426]);
  const [allocationAlgorithm, setAllocationAlgorithm] = useState<AllocationAlgorithm>('firstFit');
  const [allocationResults, setAllocationResults] = useState<MemoryAllocationResult | null>(null);

  // Page Replacement State
  const [numFrames, setNumFrames] = useState<number>(3);
  const [referenceString, setReferenceString] = useState<number[]>([7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1]);
  const [pageReplacementAlgorithm, setPageReplacementAlgorithm] = useState<PageReplacementAlgorithm>('fifo');
  const [pageResults, setPageResults] = useState<PageReplacementResult | null>(null);

  // Memory Allocation Functions
  const handleRunAllocationSimulation = () => {
    try {
      const fn = memoryAlgorithms[allocationAlgorithm] as (
        blockSizes: number[],
        processSizes: number[]
      ) => MemoryAllocationResult;
      const result = fn(blockSizes, processSizes);
      setAllocationResults(result);
    } catch (error) {
      alert('Error: ' + (error as Error).message);
    }
  };

  const handleLoadAllocationSample = () => {
    setBlockSizes([100, 500, 200, 300, 600]);
    setProcessSizes([212, 417, 112, 426]);
    setAllocationResults(null);
  };

  // Page Replacement Functions
  const handleRunPageSimulation = () => {
    try {
      const fn = memoryAlgorithms[pageReplacementAlgorithm] as (
        numFrames: number,
        referenceString: number[]
      ) => PageReplacementResult;
      const result = fn(numFrames, referenceString);
      setPageResults(result);
    } catch (error) {
      alert('Error: ' + (error as Error).message);
    }
  };

  const handleLoadPageSample = () => {
    setNumFrames(3);
    setReferenceString([7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1]);
    setPageResults(null);
  };

  const handleBlockSizesChange = (value: string) => {
    try {
      setBlockSizes(value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v)));
    } catch {
      // Invalid input, ignore
    }
  };

  const handleProcessSizesChange = (value: string) => {
    try {
      setProcessSizes(value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v)));
    } catch {
      // Invalid input, ignore
    }
  };

  const handleReferenceStringChange = (value: string) => {
    try {
      setReferenceString(value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v)));
    } catch {
      // Invalid input, ignore
    }
  };

  return (
    <Layout title="Memory Management" subtitle="Memory allocation and page replacement algorithms">
      <div className="space-y-8">
        {/* Tabs */}
        <div className="flex gap-4 border-b border-white/10">
          <button
            onClick={() => setActiveTab('allocation')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'allocation'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            💾 Memory Allocation
          </button>
          <button
            onClick={() => setActiveTab('pageReplacement')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'pageReplacement'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            📄 Page Replacement
          </button>
        </div>

        {/* Memory Allocation Tab */}
        {activeTab === 'allocation' && (
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Simulation Settings</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Algorithm
                  </label>
                  <select
                    value={allocationAlgorithm}
                    onChange={(e) => setAllocationAlgorithm(e.target.value as AllocationAlgorithm)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100"
                  >
                    <option value="firstFit">First Fit</option>
                    <option value="bestFit">Best Fit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input
                  label="Memory Block Sizes (comma-separated)"
                  value={blockSizes.join(', ')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBlockSizesChange(e.target.value)}
                  placeholder="e.g., 100, 500, 200"
                />
                <Input
                  label="Process Sizes (comma-separated)"
                  value={processSizes.join(', ')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProcessSizesChange(e.target.value)}
                  placeholder="e.g., 212, 417, 112"
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                <Button onClick={handleRunAllocationSimulation} variant="primary">
                  🚀 Run Simulation
                </Button>
                <Button onClick={handleLoadAllocationSample} variant="secondary">
                  📋 Load Sample Data
                </Button>
              </div>
            </Card>

            {allocationResults && (
              <div className="space-y-8">
                {/* Memory Blocks Table */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Memory Allocation Result</h3>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="px-4 py-3 text-left font-semibold text-gray-300">Block ID</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-300">Size</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-300">Process ID</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-300">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allocationResults.blocks.map((block) => (
                          <tr key={block.id} className="border-b border-white/5 hover:bg-white/5">
                            <td className="px-4 py-3 text-white">{block.id}</td>
                            <td className="px-4 py-3 text-white">{block.size}</td>
                            <td className="px-4 py-3 text-white">{block.processId || '-'}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-3 py-1 rounded text-xs font-semibold ${
                                  block.allocated
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-gray-500/20 text-gray-400'
                                }`}
                              >
                                {block.allocated ? 'Allocated' : 'Free'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-2">Internal Fragmentation</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatNumber(allocationResults.internalFragmentation)}
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-2">Unallocated Processes</p>
                      <p className="text-2xl font-bold text-warning">
                        {allocationResults.unallocatedProcesses.length}
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-2">Allocated Processes</p>
                      <p className="text-2xl font-bold text-success">
                        {processSizes.length - allocationResults.unallocatedProcesses.length}
                      </p>
                    </div>
                  </div>

                  {allocationResults.unallocatedProcesses.length > 0 && (
                    <div className="mt-6 p-4 bg-warning/10 border border-warning/30 rounded-lg">
                      <p className="text-warning font-semibold text-sm">
                        Unallocated Processes: {allocationResults.unallocatedProcesses.join(', ')}
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Page Replacement Tab */}
        {activeTab === 'pageReplacement' && (
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Simulation Settings</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Algorithm
                  </label>
                  <select
                    value={pageReplacementAlgorithm}
                    onChange={(e) => setPageReplacementAlgorithm(e.target.value as PageReplacementAlgorithm)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100"
                  >
                    <option value="fifo">FIFO</option>
                    <option value="lru">LRU</option>
                  </select>
                </div>

                <Input
                  type="number"
                  label="Number of Frames"
                  value={numFrames}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumFrames(Number(e.target.value))}
                  min="1"
                />
              </div>

              <div className="mb-6">
                <Input
                  label="Reference String (comma-separated)"
                  value={referenceString.join(', ')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleReferenceStringChange(e.target.value)}
                  placeholder="e.g., 7, 0, 1, 2, 0, 3"
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                <Button onClick={handleRunPageSimulation} variant="primary">
                  🚀 Run Simulation
                </Button>
                <Button onClick={handleLoadPageSample} variant="secondary">
                  📋 Load Sample Data
                </Button>
              </div>
            </Card>

            {pageResults && (
              <div className="space-y-8">
                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="p-6">
                    <p className="text-gray-400 text-sm mb-2">Page Hits</p>
                    <p className="text-3xl font-bold text-green-400">{pageResults.hits}</p>
                  </Card>
                  <Card className="p-6">
                    <p className="text-gray-400 text-sm mb-2">Page Misses (Faults)</p>
                    <p className="text-3xl font-bold text-red-400">{pageResults.misses}</p>
                  </Card>
                  <Card className="p-6">
                    <p className="text-gray-400 text-sm mb-2">Hit Ratio</p>
                    <p className="text-3xl font-bold text-primary">
                      {formatNumber(pageResults.hitRatio * 100)}%
                    </p>
                  </Card>
                  <Card className="p-6">
                    <p className="text-gray-400 text-sm mb-2">Miss Rate</p>
                    <p className="text-3xl font-bold text-warning">
                      {formatNumber((1 - pageResults.hitRatio) * 100)}%
                    </p>
                  </Card>
                </div>

                {/* Frame States Visualization */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Memory Frames Over Time</h3>
                  <div className="overflow-x-auto">
                    <div className="space-y-2">
                      {pageResults.frames.slice(0, Math.min(20, pageResults.frames.length)).map((frameState, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <span className="text-xs text-gray-500 w-8">{idx}:</span>
                          <div className="flex gap-1">
                            {frameState.map((frame, frameIdx) => (
                              <div
                                key={frameIdx}
                                className="w-12 h-12 rounded border border-white/20 flex items-center justify-center text-sm font-semibold"
                                style={{
                                  backgroundColor: frame.pageNumber !== undefined
                                    ? 'rgba(59, 130, 246, 0.2)'
                                    : 'rgba(100, 116, 139, 0.1)',
                                  color: frame.pageNumber !== undefined ? '#3B82F6' : '#94A3B8'
                                }}
                              >
                                {frame.pageNumber !== undefined ? frame.pageNumber : '-'}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      {pageResults.frames.length > 20 && (
                        <div className="text-xs text-gray-500 text-center py-2">
                          ... and {pageResults.frames.length - 20} more
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MemoryManagement;
