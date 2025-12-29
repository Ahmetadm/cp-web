import React from 'react';
import { Statistic } from '@/types';

interface StatCardProps {
  stat: Statistic;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
      <span className="text-4xl mb-3">{stat.icon}</span>
      <span className="text-3xl md:text-4xl font-bold text-white mb-2">
        {stat.value}
      </span>
      <span className="text-white/90 font-medium">{stat.label}</span>
      {stat.description && (
        <span className="text-white/60 text-sm mt-1">{stat.description}</span>
      )}
    </div>
  );
}
