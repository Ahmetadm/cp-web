'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { dummyCompanies, dummyCategories } from '@/constants/dummy-data';
import { useTranslations } from '@/i18n';
import { Trophy, TrendingUp, TrendingDown, Minus, ChevronDown, Star, ArrowRight } from 'lucide-react';

interface TopCompany {
  rank: number;
  company: typeof dummyCompanies[0];
  score: number;
  trend: 'up' | 'down' | 'same';
  trendValue?: number;
}

export function TopCompaniesSection() {
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState(dummyCategories[0]);

  // Create mock top companies data based on selected category
  const getTopCompanies = (): TopCompany[] => {
    return [...dummyCompanies]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5)
      .map((company, idx) => ({
        rank: idx + 1,
        company,
        // Deterministic score calculation to avoid hydration mismatch
        score: Math.round(company.rating * 20 + (parseInt(company.id) % 10)),
        trend: idx === 0 ? 'same' : idx % 2 === 0 ? 'up' : 'same',
        trendValue: idx % 2 === 0 ? (parseInt(company.id) % 3) + 1 : undefined,
      }));
  };

  const topCompanies = getTopCompanies();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with category selector */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.sections.topCompanies.title}
          </h2>

          {/* Category selector */}
          <div className="inline-flex items-center gap-4 flex-wrap justify-center">
            <div className="relative">
              <select
                value={selectedCategory.id}
                onChange={(e) => setSelectedCategory(dummyCategories.find(c => c.id === e.target.value) || dummyCategories[0])}
                className="appearance-none bg-slate-800 text-white px-6 py-3 pr-12 rounded-xl border border-slate-700 hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer font-medium"
              >
                {dummyCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {(t.categoriesList as Record<string, string>)[category.slug] || category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
              {t.sections.topCompanies.lastYear}
            </div>
          </div>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm">
            {t.sections.topCompanies.description}
          </p>
        </div>

        {/* Companies list */}
        <div className="space-y-4">
          {topCompanies.map((item, idx) => (
            <Link
              key={item.company.id}
              href={`/companies/${item.company.slug}`}
              className="group block"
            >
              <div
                className={`
                  relative flex items-center gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-300
                  ${idx === 0
                    ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30 hover:border-indigo-500/50'
                    : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800'
                  }
                `}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Trend indicator */}
                <div className="flex-shrink-0 w-12 text-center">
                  {item.trend === 'up' && (
                    <div className="flex flex-col items-center text-emerald-400">
                      <span className="text-xs font-medium">+{item.trendValue}</span>
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  )}
                  {item.trend === 'down' && (
                    <div className="flex flex-col items-center text-red-400">
                      <span className="text-xs font-medium">-{item.trendValue}</span>
                      <TrendingDown className="w-4 h-4" />
                    </div>
                  )}
                  {item.trend === 'same' && (
                    <Minus className="w-4 h-4 text-gray-500 mx-auto" />
                  )}
                </div>

                {/* Company logo */}
                <div className={`
                  w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl
                  ${idx === 0
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                    : 'bg-slate-700 text-gray-300'
                  }
                `}>
                  {item.company.name.charAt(0)}
                </div>

                {/* Company info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-medium">{item.rank}.</span>
                    <h3 className="text-white font-semibold group-hover:text-indigo-400 transition-colors truncate">
                      {item.company.name}
                    </h3>
                    {item.company.responseRate > 80 && (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                        {t.sections.topCompanies.pro}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    {item.company.totalComplaints} {t.sections.topCompanies.complaints} · {item.company.responseRate}% {t.sections.topCompanies.response}
                  </p>
                </div>

                {/* Trophy for #1 */}
                {idx === 0 && (
                  <div className="hidden sm:flex items-center justify-center w-16 h-16">
                    <div className="text-4xl animate-float">
                        <Trophy className="w-10 h-10 text-yellow-400" />
                    </div>
                  </div>
                )}

                {/* Score */}
                <div className="flex items-center gap-2">
                  <div className={`
                    flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold
                    ${item.score >= 80
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : item.score >= 60
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-red-500/20 text-red-400'
                    }
                  `}>
                    <Star className="w-4 h-4 fill-current" />
                    <span>{item.score}</span>
                    <span className="text-gray-500 font-normal">/100</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-8">
          <Link
            href="/rankings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-300 font-medium hover:bg-slate-700 hover:border-slate-600 transition-all duration-300"
          >
            {t.sections.topCompanies.viewAllRankings}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
