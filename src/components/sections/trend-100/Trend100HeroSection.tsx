'use client';

import React from 'react';
import { TrendingUp, Eye, MessageSquare, Building2 } from 'lucide-react';

interface Trend100HeroSectionProps {
  translations: {
    last30Days?: string;
    title?: string;
    subtitle?: string;
    visits?: string;
    complaints?: string;
    companies?: string;
  };
  stats: {
    totalVisits: string;
    totalComplaints: string;
    totalCompanies: number;
  };
}

export function Trend100HeroSection({ translations, stats }: Trend100HeroSectionProps) {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>{translations.last30Days || 'Last 30 Days'}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {translations.title || 'Trend'} <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">100</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {translations.subtitle || 'Discover the most popular and visited companies based on user engagement, complaint volume, and overall activity in the last 30 days.'}
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
              <Eye className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">{stats.totalVisits} {translations.visits || 'Visits'}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
              <MessageSquare className="w-5 h-5 text-secondary" />
              <span className="text-foreground font-medium">{stats.totalComplaints} {translations.complaints || 'Complaints'}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
              <Building2 className="w-5 h-5 text-amber-500" />
              <span className="text-foreground font-medium">{stats.totalCompanies} {translations.companies || 'Companies'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
