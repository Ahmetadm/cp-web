import React from 'react';
import Link from 'next/link';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { dummyCategories } from '@/constants/dummy-data';
import { useTranslations } from '@/i18n';
import { ArrowRight } from 'lucide-react';

export function CategoriesSection() {
  const t = useTranslations();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t.sections.categories.title}
            </h2>
            <p className="mt-2 text-foreground/60">
              {t.sections.categories.subtitle}
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors group"
          >
            {t.sections.categories.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {dummyCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
