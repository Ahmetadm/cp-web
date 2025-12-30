'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from '@/i18n';
import { SearchBar } from '@/components/ui/SearchBar';
import { Star } from 'lucide-react';

export function HeroSection() {
  const t = useTranslations();

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // TODO: Implement search redirection
  };

  return (
    <section className="relative overflow-hidden bg-background-100 min-h-[70vh] flex items-center transition-colors duration-300">
      <div className="container mx-auto px-4 h-full">
        <div className="grid h-full grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">

          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8 py-8 md:py-16">
            <h1 className="leading-tight text-foreground font-bold text-4xl sm:text-5xl lg:text-6xl max-w-xl transition-colors">
              {t.hero.title}
            </h1>

            <div className="w-full max-w-lg">
               <SearchBar
                 placeholder={t.hero.searchPlaceholder}
                 onSearch={handleSearch}
                 size="lg"
               />
            </div>
          </div>

          {/* Right Content - Collage */}
          <div className="relative  w-full hidden md:block">
                 <div className="relative grid grid-cols-2 gap-4">
                <div className="h-64 rounded-2xl bg-[#6c5ce7]"></div>
                <img
                  src="/images/customer-1.png"
                  alt="Person expressing emotion"
                  width={300}
                  height={400}
                  className="absolute -top-10 left-0 object-cover"
                />
                <div className="mt-8 h-64 rounded-2xl bg-[#10b981]"></div>
                <img
                  src="/images/customer-2.PNG"
                  alt="Person with glasses"
                  width={300}
                  height={400}
                  className="absolute -top-5 right-0 object-cover"
                />
                <div className="absolute bottom-16 left-1/2 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full bg-[#ffc107]">
                  <Star className="w-8 h-8 text-white fill-current" />
                </div>
                <div className="absolute right-0 top-1/3 h-24 w-24 rounded-full bg-[#6c5ce7]"></div>
                <div className="absolute bottom-0 left-1/4 h-16 w-16 rounded-full bg-[#10b981]"></div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
