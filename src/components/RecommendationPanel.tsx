import React from 'react';
import { Card } from './Card';

interface RecommendationPanelProps {
  bestAlgorithm: {
    name: string;
    avgWT: number;
  };
  processCount: number;
}

export const RecommendationPanel: React.FC<RecommendationPanelProps> = ({
  bestAlgorithm,
  processCount
}) => {
  const getRecommendationText = (algorithm: string): string => {
    const recommendations: Record<string, string> = {
      'FCFS': 'FCFS provides simplicity and fairness but can suffer from the convoy effect when longer jobs are scheduled first.',
      'SJF (NP)': 'SJF (Non-Preemptive) gives the lowest average waiting time for this workload but requires knowing burst times in advance.',
      'SJF (P)': 'SJF (Preemptive) improves responsiveness by allowing shorter jobs to interrupt longer ones, minimizing average waiting time.',
      'Priority (NP)': 'Priority Scheduling ensures important processes execute first, suitable for systems with mixed workload priorities.',
      'Priority (P)': 'Priority Scheduling (Preemptive) allows high-priority processes to interrupt lower-priority ones for better response times.',
      'Round Robin (TQ=2)': 'Round Robin provides fair time allocation among processes, making it ideal for time-sharing systems and interactive environments.',
      'Round Robin': 'Round Robin provides fair time allocation among processes, making it ideal for time-sharing systems and interactive environments.'
    };
    return recommendations[algorithm] || 'Selected algorithm is optimized for this workload.';
  };

  return (
    <Card className="p-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
      <div className="flex items-start gap-4">
        <div className="text-5xl">🏆</div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-3">Recommended Algorithm</h3>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold text-green-400">{bestAlgorithm.name}</span>
            <span className="text-slate-400">Avg Waiting Time:</span>
            <span className="text-xl font-semibold text-green-400">{bestAlgorithm.avgWT.toFixed(2)} ms</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {getRecommendationText(bestAlgorithm.name)}
          </p>
          <p className="text-sm text-slate-400 mt-4">
            Based on analysis of {processCount} process{processCount !== 1 ? 'es' : ''} across {processCount > 0 ? '6' : '0'} scheduling algorithms.
          </p>
        </div>
      </div>
    </Card>
  );
};
