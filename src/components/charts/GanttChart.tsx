import React from 'react';
import { ScheduleResult } from '../../types';
import { getProcessColor } from '../../utils';
import { Card } from '../Card';

interface GanttChartProps {
  schedule: ScheduleResult[];
  className?: string;
}

export const GanttChart: React.FC<GanttChartProps> = ({ schedule, className = '' }) => {
  if (schedule.length === 0) {
    return <div className="text-gray-500 text-center py-8">No schedule data</div>;
  }

  const maxTime = Math.max(...schedule.map(s => s.endTime));
  const scale = 400 / maxTime;

  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-6">Gantt Chart</h3>
      
      <div className="space-y-6">
        {/* Timeline */}
        <div className="pl-24">
          <div
            className="relative h-12 bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden"
            style={{ width: '100%' }}
          >
            {/* Process blocks */}
            {schedule.map((item, idx) => (
              <div
                key={idx}
                className="absolute h-full flex items-center justify-center text-white font-semibold text-sm"
                style={{
                  backgroundColor: getProcessColor(item.processId),
                  left: `${(item.startTime * scale)}px`,
                  width: `${((item.endTime - item.startTime) * scale)}px`,
                  opacity: 0.85
                }}
              >
                {item.processId}
              </div>
            ))}

            {/* Timeline labels */}
            <div className="absolute bottom-0 left-0 right-0 h-6 border-t border-gray-600 flex bg-gray-900/50">
              {Array.from({ length: Math.floor(maxTime) + 1 }).map((_, i) => (
                <div
                  key={i}
                  className="border-r border-gray-700 text-xs text-gray-500 flex items-center justify-start px-1"
                  style={{ width: `${scale}px` }}
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time axis label */}
        <div className="text-right text-xs text-gray-500 pr-4">
          Time → {maxTime}
        </div>

        {/* Legend */}
        <div className="pt-4 border-t border-gray-700">
          <p className="text-xs font-semibold text-gray-400 mb-3">Process Legend</p>
          <div className="grid grid-cols-2 gap-3">
            {[...new Set(schedule.map(s => s.processId))].map(processId => (
              <div key={processId} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: getProcessColor(processId) }}
                />
                <span className="text-sm text-gray-400">{processId}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
