'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { useTranslations } from '@/i18n';
import { Megaphone, ArrowRight, CheckCircle } from 'lucide-react';

export function CTASection() {
  const t = useTranslations();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg shadow-indigo-500/25 mb-6">
          <Megaphone className="w-8 h-8 text-white" />
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          {t.sections.cta.title}
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          {t.sections.cta.subtitle}
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Button size="lg" variant="secondary">
            {t.sections.cta.button}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span>{t.common.more === 'More' ? 'Free' : 'Бесплатно'}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span>{t.common.more === 'More' ? 'Anonymous' : 'Анонимно'}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span>{t.common.more === 'More' ? 'Fast Response' : 'Брз одговор'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
