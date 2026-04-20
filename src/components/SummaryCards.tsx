import React from 'react';
import { Card } from './Card';

interface SummaryCardsProps {
  bestWT: { algorithm: string; value: number };
  bestTAT: { algorithm: string; value: number };
  bestCT: { algorithm: string; value: number };
  bestRT: { algorithm: string; value: number };
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  bestWT,
  bestTAT,
  bestCT,
  bestRT
}) => {
  const cards = [
    {
      label: 'Best Avg Waiting Time',
      value: bestWT.value.toFixed(2),
      algorithm: bestWT.algorithm,
      icon: '⏱️',
      gradient: 'from-blue-500/20 to-transparent'
    },
    {
      label: 'Best Avg Turnaround Time',
      value: bestTAT.value.toFixed(2),
      algorithm: bestTAT.algorithm,
      icon: '🔄',
      gradient: 'from-purple-500/20 to-transparent'
    },
    {
      label: 'Fastest Completion',
      value: bestCT.value.toFixed(2),
      algorithm: bestCT.algorithm,
      icon: '⚡',
      gradient: 'from-green-500/20 to-transparent'
    },
    {
      label: 'Best Response Time',
      value: bestRT.value.toFixed(2),
      algorithm: bestRT.algorithm,
      icon: '📊',
      gradient: 'from-amber-500/20 to-transparent'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card, idx) => (
        <Card key={idx} className={`p-6 bg-gradient-to-r ${card.gradient} border border-slate-700`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-slate-400 text-sm font-medium">{card.label}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
              <p className="text-blue-400 text-sm mt-2">Algorithm: {card.algorithm}</p>
            </div>
            <span className="text-4xl">{card.icon}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};
