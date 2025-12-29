'use client';

import React from 'react';
import { useTranslations } from '@/i18n';

// Dummy complaint data for display - manually localized to Macedonian as per user request
const dummyComplaints = [
  { id: 1, user: 'A', userId: 1, views: 4100, category: 'Испорака на пратки', title: 'Лични податоци искористени без дозвола и додадени во спам група', description: 'Моите лични информации беа искористени без моја согласност и почнав да добивам спам пораки...' },
  { id: 2, user: 'B', userId: 2, views: 4200, category: 'Испорака на пратки', title: 'Лични податоци искористени без дозвола и додадени во спам група', description: 'Моите лични информации беа искористени без моја согласност и почнав да добивам спам пораки...' },
  { id: 3, user: 'C', userId: 3, views: 4300, category: 'Испорака на пратки', title: 'Лични податоци искористени без дозвола и додадени во спам група', description: 'Моите лични информации беа искористени без моја согласност и почнав да добивам спам пораки...' },
  { id: 4, user: 'D', userId: 4, views: 4400, category: 'Испорака на пратки', title: 'Лични податоци искористени без дозвола и додадени во спам група', description: 'Моите лични информации беа искористени без моја согласност и почнав да добивам спам пораки...' },
  { id: 5, user: 'E', userId: 5, views: 4500, category: 'Испорака на пратки', title: 'Лични податоци искористени без дозвола и додадени во спам група', description: 'Моите лични информации беа искористени без моја согласност и почнав да добивам спам пораки...' },
  { id: 6, user: 'F', userId: 6, views: 4600, category: 'Испорака на пратки', title: 'Лични податоци искористени без дозвола и додадени во спам група', description: 'Моите лични информации беа искористени без моја согласност и почнав да добивам спам пораки...' },
];

const dummyComplaints2 = [
  { id: 7, user: 'M', userId: 20, views: 3000, category: 'Корисничка услуга', title: 'Неовластени повици и проблеми со приватноста на моите податоци', description: 'Добивам неовластени повици откако ги споделив моите информации со оваа компанија...' },
  { id: 8, user: 'N', userId: 21, views: 3050, category: 'Корисничка услуга', title: 'Неовластени повици и проблеми со приватноста на моите податоци', description: 'Добивам неовластени повици откако ги споделив моите информации со оваа компанија...' },
  { id: 9, user: 'O', userId: 22, views: 3100, category: 'Корисничка услуга', title: 'Неовластени повици и проблеми со приватноста на моите податоци', description: 'Добивам неовластени повици откако ги споделив моите информации со оваа компанија...' },
  { id: 10, user: 'P', userId: 23, views: 3150, category: 'Корисничка услуга', title: 'Неовластени повици и проблеми со приватноста на моите податоци', description: 'Добивам неовластени повици откако ги споделив моите информации со оваа компанија...' },
  { id: 11, user: 'Q', userId: 24, views: 3200, category: 'Корисничка услуга', title: 'Неовластени повици и проблеми со приватноста на моите податоци', description: 'Добивам неовластени повици откако ги споделив моите информации со оваа компанија...' },
  { id: 12, user: 'R', userId: 25, views: 3250, category: 'Корисничка услуга', title: 'Неовластени повици и проблеми со приватноста на моите податоци', description: 'Добивам неовластени повици откако ги споделив моите информации со оваа компанија...' },
];

export function TrendingSection() {
  const t = useTranslations();

  // Duplicate cards for seamless scrolling
  const row1Cards = [...dummyComplaints, ...dummyComplaints];
  const row2Cards = [...dummyComplaints2, ...dummyComplaints2];

  return (
    <section className="overflow-hidden py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto mb-8 px-4">
        <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          {t.sections.trending.title}
        </h2>
      </div>

      {/* First row - scrolling right */}
      <div className="mb-8 overflow-hidden">
        <div className="flex w-max animate-scroll-right gap-6">
          {row1Cards.map((complaint, index) => (
            <div
              key={`row1-${complaint.id}-${index}`}
              className="w-[90vw] flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-shadow hover:shadow-md sm:w-[350px]"
            >
              <div className="p-6">
                <div className="mb-4 flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6c5ce7] font-medium text-white">
                    {complaint.user}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {t.complaint.user} {complaint.userId}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>
                        {complaint.views} {t.complaint.views}
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="rounded-full bg-purple-100 dark:bg-purple-900/30 px-2 py-1 text-xs text-purple-800 dark:text-purple-300">
                      {complaint.category}
                    </span>
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  {complaint.title}
                </h3>
                <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                  {complaint.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second row - scrolling left */}
      <div className="overflow-hidden">
        <div className="flex w-max animate-scroll-left gap-6">
          {row2Cards.map((complaint, index) => (
            <div
              key={`row2-${complaint.id}-${index}`}
              className="w-[90vw] flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-shadow hover:shadow-md sm:w-[350px]"
            >
              <div className="p-6">
                <div className="mb-4 flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10b981] font-medium text-white">
                    {complaint.user}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {t.complaint.user} {complaint.userId}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>
                        {complaint.views} {t.complaint.views}
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs text-green-800 dark:text-green-300">
                      {complaint.category}
                    </span>
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  {complaint.title}
                </h3>
                <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                  {complaint.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
