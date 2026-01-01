'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Building2,
  Share2,
} from 'lucide-react';
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Company } from './types';
import { ComplaintsCarousel } from './ComplaintsCarousel';
import { generateSparklinePoints } from './mockData';

interface CompanyAccordionTranslations {
  chartTitle?: string;
  visitors?: string;
  complaintCount?: string;
  last7DaysComplaints?: string;
}

interface CompanyAccordionProps {
  company: Company;
  isOpen: boolean;
  onToggle: () => void;
  translations: CompanyAccordionTranslations;
}

export function CompanyAccordion({ company, isOpen, onToggle, translations }: CompanyAccordionProps) {
  return (
    <div className={`
      rounded-2xl border transition-all duration-300 overflow-hidden bg-card
      ${isOpen
        ? 'border-primary/20 shadow-lg'
        : 'border-border hover:border-primary/20'
      }
    `}>
      {/* Header Row - Always visible */}
      <button
        onClick={onToggle}
        className="w-full p-4 md:p-5 flex items-center gap-4 text-left hover:bg-accent/30 transition-colors"
      >
        {/* Rank */}
        <div className="flex-shrink-0 w-8 text-xl font-light text-muted-foreground">
          {company.rank}.
        </div>

        {/* Company Logo */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center border border-emerald-100 dark:border-emerald-800">
          <Building2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>

        {/* Company Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">
            {company.name}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {company.category}
          </p>
        </div>

        {/* Mini Sparkline */}
        <div className="hidden sm:block flex-shrink-0 w-24 h-8">
          <svg viewBox="0 0 90 25" className="w-full h-full">
            <polyline
              points={generateSparklinePoints(company.trend)}
              fill="none"
              stroke={company.trend === 'up' ? '#10b981' : '#ef4444'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Percentage */}
        <div className="flex-shrink-0 text-right">
          <span className="text-muted-foreground">%</span>
          <span className="font-semibold text-foreground ml-1">{company.trendPercentage}</span>
        </div>

        {/* Trend Indicator */}
        <div className={`
          flex items-center gap-1 flex-shrink-0
          ${company.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}
        `}>
          <span className="font-semibold">{company.newComplaints30Days}</span>
          {company.trend === 'up' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
        </div>

        {/* Toggle Arrow */}
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {/* Expanded Content - Chart + Complaints */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
        overflow-hidden
      `}>
        <div className="px-4 md:px-6 pb-6 pt-2 border-t border-border/50">
          {/* Chart Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h4 className="font-semibold text-foreground text-lg">
                {translations.chartTitle || 'Brand Visit Trend'}
              </h4>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-muted-foreground">{translations.visitors || 'Visitor Count'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-gray-300" />
                  <span className="text-muted-foreground">{translations.complaintCount || 'Complaint Count'}</span>
                </div>
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={company.chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={`visitorGradient-${company.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="shortDate"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                  interval={4}
                />
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                  width={50}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  labelStyle={{ color: 'var(--foreground)' }}
                />
                <Bar
                  yAxisId="right"
                  dataKey="complaints"
                  fill="#d1d5db"
                  opacity={0.3}
                  radius={[2, 2, 0, 0]}
                  name={translations.complaintCount || 'Complaints'}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="visitors"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill={`url(#visitorGradient-${company.id})`}
                  name={translations.visitors || 'Visitors'}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Complaints Carousel - Only shown if there are recent complaints */}
          <ComplaintsCarousel
            complaints={company.recentComplaints}
            companyName={company.name}
            translations={{ last7DaysComplaints: translations.last7DaysComplaints }}
          />
        </div>
      </div>
    </div>
  );
}
