'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from '@/i18n';
import { locales, languageNames, Locale } from '@/i18n-config';

const flags: Record<Locale, string> = {
  en: '🇬🇧',
  sq: '🇦🇱',
  mk: '🇲🇰',
};

export function LanguageSwitcher() {
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-2 text-lg bg-background border border-foreground/10 rounded-lg hover:bg-foreground/5 transition-colors"
        aria-label="Select language"
      >
        <span>{flags[locale]}</span>
        <svg
          className={`w-3.5 h-3.5 text-foreground/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-14 bg-background border border-foreground/10 rounded-lg shadow-lg z-50 overflow-hidden">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              title={languageNames[loc]}
              className={`w-full px-3 py-2 text-center text-lg hover:bg-foreground/5 transition-colors ${
                locale === loc
                  ? 'bg-primary/10'
                  : ''
              }`}
            >
              {flags[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}