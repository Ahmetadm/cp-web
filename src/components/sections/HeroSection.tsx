'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from '@/i18n';
import { SearchBar } from '@/components/ui/SearchBar';

export function HeroSection() {
  const t = useTranslations();

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // TODO: Implement search redirection
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-900 min-h-[70vh] flex items-center transition-colors duration-300">
      <div className="container mx-auto px-4 h-full">
        <div className="grid h-full grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">

          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8 py-8 md:py-16">
            <h1 className="leading-tight text-gray-900 dark:text-white font-bold text-4xl sm:text-5xl lg:text-6xl max-w-xl transition-colors">
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
          <div className="relative h-full w-full hidden md:block">
             <div className="grid grid-cols-2 gap-4 absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-lg">
                {/* Top Left: Purple block */}
                <div className="aspect-square bg-primary-500/90 rounded-3xl flex items-center justify-center p-4 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"/>
                   <div className="w-3 h-3 bg-white rounded-full mx-1"></div>
                   <div className="w-3 h-3 bg-white rounded-full mx-1"></div>
                   <div className="w-3 h-3 bg-white rounded-full mx-1"></div>
                </div>

                {/* Top Right: Image 1 */}
                <div className="aspect-square relative rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/images/hero_2.png"
                    alt="User"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>

                {/* Bottom Left: Image 2 */}
                <div className="aspect-square relative rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-105 transition-transform duration-300 mt-8">
                  <Image
                    src="/images/hero_1.png"
                    alt="User"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                  {/* Green circle decoration behind/around */}
                  <div className="absolute -z-10 bg-secondary-500 inset-0 scale-110 rounded-full" />
                </div>

                {/* Bottom Right: Green block layout */}
                <div className="aspect-square bg-secondary-500 rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-3xl rounded-bl-3xl relative overflow-hidden flex items-center justify-center group">
                   <div className="absolute top-4 right-4 text-white/20 text-6xl font-bold">+</div>
                   <div className="relative z-10 w-2/3 h-2 bg-white/30 rounded-full mb-2"></div>
                   <div className="relative z-10 w-1/2 h-2 bg-white/30 rounded-full"></div>
                </div>

                 {/* Floating accents */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ffc107] w-20 h-20 rounded-full flex items-center justify-center shadow-lg animate-float z-20 border-4 border-white">
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                   </svg>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
