import * as React from 'react';
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
  const minChartWidth = Math.max(400, maxTime * 40);

  return (
    <Card className={`p-4 md:p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4 md:mb-6">Gantt Chart</h3>

      <div className="space-y-4">
        {/* Scrollable Timeline */}
        <div className="w-full overflow-x-auto rounded-lg">
          <div style={{ minWidth: `${minChartWidth}px` }}>
            <div
              className="relative h-12 bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden"
            >
              {/* Process blocks */}
              {schedule.map((item, idx) => (
                <div
                  key={idx}
                  className="absolute h-full flex items-center justify-center text-white font-semibold text-xs md:text-sm"
                  style={{
                    backgroundColor: getProcessColor(item.processId),
                    left: `${(item.startTime / maxTime) * 100}%`,
                    width: `${((item.endTime - item.startTime) / maxTime) * 100}%`,
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
                    className="border-r border-gray-700 text-xs text-gray-500 flex items-center justify-start px-1 flex-shrink-0"
                    style={{ width: `${100 / maxTime}%` }}
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Time axis label */}
        <div className="text-right text-xs text-gray-500">
          Time → {maxTime}
        </div>

        {/* Legend */}
        <div className="pt-3 border-t border-gray-700">
          <p className="text-xs font-semibold text-gray-400 mb-3">Process Legend</p>
          <div className="grid grid-cols-2 gap-2">
            {[...new Set(schedule.map(s => s.processId))].map(processId => (
              <div key={processId} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 md:w-4 md:h-4 rounded flex-shrink-0"
                  style={{ backgroundColor: getProcessColor(processId) }}
                />
                <span className="text-xs md:text-sm text-gray-400">{processId}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};