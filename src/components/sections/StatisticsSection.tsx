'use client';

import React from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { dummyStatistics } from '@/constants/dummy-data';
import { useTranslations } from '@/i18n';

export function StatisticsSection() {
  const t = useTranslations();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 p-12 opacity-10 transform rotate-12">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="white">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 p-8 opacity-10 transform -rotate-12">
        <svg width="150" height="150" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.sections.statistics.title}
          </h2>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            {t.sections.statistics.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyStatistics.map((stat) => (
            <StatCard
              key={stat.id}
              stat={{
                ...stat,
                label: (t.sections.statistics as Record<string, string>)[stat.label],
                description: stat.description ? (t.sections.statistics as Record<string, string>)[stat.description] : undefined
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
