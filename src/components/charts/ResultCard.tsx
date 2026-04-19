import React from 'react';
import { CPUMetrics } from '../../types';
import { Card } from '../Card';
import { formatNumber } from '../../utils';

interface ResultCardProps {
  processId: string;
  metrics: CPUMetrics;
  className?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  processId,
  metrics,
  className = ''
}) => {
  return (
    <Card className={`p-4 ${className}`}>
      <h4 className="font-semibold text-white mb-3">{processId}</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Completion Time:</span>
          <span className="text-gray-200 font-medium">
            {formatNumber(metrics.completionTime)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Waiting Time:</span>
          <span className="text-gray-200 font-medium">
            {formatNumber(metrics.waitingTime)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Turnaround Time:</span>
          <span className="text-gray-200 font-medium">
            {formatNumber(metrics.turnaroundTime)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Response Time:</span>
          <span className="text-gray-200 font-medium">
            {formatNumber(metrics.responseTime)}
          </span>
        </div>
      </div>
    </Card>
  );
};
