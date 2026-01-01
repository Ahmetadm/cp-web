'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Company } from './types';
import { CompanyAccordion } from './CompanyAccordion';

interface CompanyListTranslations {
  chartTitle?: string;
  visitors?: string;
  complaintCount?: string;
  last7DaysComplaints?: string;
  wantToSeeMore?: string;
  viewFullRankings?: string;
}

interface CompanyListProps {
  companies: Company[];
  translations: CompanyListTranslations;
  defaultOpenId?: string;
}

export function CompanyList({ companies, translations, defaultOpenId = '1' }: CompanyListProps) {
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set([defaultOpenId]));

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className="pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="space-y-4">
          {companies.map((company) => (
            <CompanyAccordion
              key={company.id}
              company={company}
              isOpen={openAccordions.has(company.id)}
              onToggle={() => toggleAccordion(company.id)}
              translations={{
                chartTitle: translations.chartTitle,
                visitors: translations.visitors,
                complaintCount: translations.complaintCount,
                last7DaysComplaints: translations.last7DaysComplaints,
              }}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            {translations.wantToSeeMore || 'Want to see the complete rankings?'}
          </p>
          <a
            href="/rankings"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:bg-accent text-foreground font-medium transition-colors"
          >
            {translations.viewFullRankings || 'View Full Rankings'}
            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
          </a>
        </div>
      </div>
    </section>
  );
}
