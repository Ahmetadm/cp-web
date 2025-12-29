'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ComplaintCard } from '@/components/cards/ComplaintCard';
import { dummyComplaints } from '@/constants/dummy-data';
import { useTranslations } from '@/i18n';

export function RecentComplaintsSection() {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const complaints = dummyComplaints;
  const itemsPerView = 3;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev + 1 >= complaints.length - itemsPerView + 1 ? 0 : prev + 1
    );
  }, [complaints.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? complaints.length - itemsPerView : prev - 1
    );
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white transition-colors">
              {t.sections.recentComplaints.title}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 transition-colors">
              {t.sections.recentComplaints.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Carousel controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
                className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
                aria-label="Previous"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
                className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
                aria-label="Next"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <Link
              href="/complaints"
              className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors group"
            >
              {t.sections.recentComplaints.viewAll}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                <ComplaintCard complaint={complaint} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(complaints.length / itemsPerView) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrentIndex(idx * itemsPerView); setIsAutoPlaying(false); }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / itemsPerView) === idx
                  ? 'bg-indigo-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
