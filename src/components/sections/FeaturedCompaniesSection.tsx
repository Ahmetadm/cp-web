'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { CompanyCard } from '@/components/cards/CompanyCard';
import { dummyCompanies } from '@/constants/dummy-data';
import { useTranslations } from '@/i18n';
import { ArrowRight } from 'lucide-react';

export function FeaturedCompaniesSection() {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const companies = dummyCompanies;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % companies.length);
  }, [companies.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t.sections.featuredCompanies.title}
            </h2>
            <p className="mt-2 text-foreground/60">
              {t.sections.featuredCompanies.subtitle}
            </p>
          </div>
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors group"
          >
            {t.sections.featuredCompanies.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Infinite scroll carousel */}
        <div className="relative">
          <div className="flex animate-scroll gap-6">
            {[...companies, ...companies].map((company, idx) => (
              <div
                key={`${company.id}-${idx}`}
                className="flex-shrink-0 w-80"
              >
                <CompanyCard company={company} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {companies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'bg-indigo-600 w-8' : 'bg-foreground/20 hover:bg-foreground/30'
              }`}
              aria-label={`Go to company ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
