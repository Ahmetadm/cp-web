'use client';

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Building2 } from 'lucide-react';
import { RecentComplaint } from './types';
import { ComplaintCard } from './ComplaintCard';

interface ComplaintsCarouselProps {
  complaints: RecentComplaint[];
  companyName: string;
  translations: {
    last7DaysComplaints?: string;
  };
}

export function ComplaintsCarousel({ complaints, companyName, translations }: ComplaintsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280; // Card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(updateScrollButtons, 300);
    }
  };

  if (complaints.length === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t border-border/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-semibold text-foreground text-lg">
            {translations.last7DaysComplaints || 'Last 7 Days Complaints'}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <Building2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-muted-foreground">{companyName}</span>
            <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium rounded">
              PRO
            </span>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`
              p-2 rounded-full border border-border transition-colors
              ${canScrollLeft
                ? 'hover:bg-accent text-foreground'
                : 'opacity-40 cursor-not-allowed text-muted-foreground'
              }
            `}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`
              p-2 rounded-full border border-border transition-colors
              ${canScrollRight
                ? 'hover:bg-accent text-foreground'
                : 'opacity-40 cursor-not-allowed text-muted-foreground'
              }
            `}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={updateScrollButtons}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {complaints.map((complaint) => (
          <ComplaintCard key={complaint.id} complaint={complaint} />
        ))}
      </div>
    </div>
  );
}
