'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/types';
import { useTranslations } from '@/i18n';
import { Icon } from '@/components/ui/Icon';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const t = useTranslations();

  // Get localized category name if available, otherwise fallback to category.name
  // Using type assertion to access dynamic key
  const localizedName = (t.categoriesList as any)[category.slug] || category.name;

  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="group bg-background rounded-2xl border border-foreground/10 p-6 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 text-center">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center text-3xl text-indigo-600 group-hover:scale-110 transition-transform duration-300">
          <Icon name={category.icon} size={32} />
        </div>

        {/* Name */}
        <h3 className="mt-4 font-semibold text-foreground group-hover:text-indigo-600 transition-colors">
          {localizedName}
        </h3>

        {/* Count */}
        <p className="mt-1 text-sm text-foreground/60">
          {category.complaintCount.toLocaleString('mk-MK')} {t.company.complaints}
        </p>
      </div>
    </Link>
  );
}
