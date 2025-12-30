'use client';

import React, { useState } from 'react';
import { useTranslations } from '@/i18n';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  size?: 'sm' | 'md' | 'lg';
  showButton?: boolean;
}

export function SearchBar({
  placeholder,
  onSearch,
  size = 'lg',
  showButton = true,
}: SearchBarProps) {
  const t = useTranslations();
  const [query, setQuery] = useState('');

  // Use translation if placeholder not provided
  const inputPlaceholder = placeholder || t.hero.searchPlaceholder;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-5 text-base',
    lg: 'py-4 px-6 text-lg',
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center bg-background rounded-2xl shadow-xl shadow-foreground/10 overflow-hidden border border-foreground/10">
        {/* Search Icon */}
        <div className="absolute left-5 text-foreground/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={inputPlaceholder}
          className={`
            flex-1 bg-transparent
            ${sizeStyles[size]}
            ${size === 'lg' ? 'pl-14' : 'pl-12'}
            ${showButton ? 'pr-4' : 'pr-6'}
            text-foreground placeholder-foreground/50
            focus:outline-none
          `}
        />

        {/* Search Button */}
        {showButton && (
          <button
            type="submit"
            className={`
              ${size === 'lg' ? 'm-2 px-8 py-3' : 'm-1.5 px-6 py-2'}
              bg-gradient-to-r from-indigo-600 to-purple-600
              text-white font-semibold rounded-xl
              hover:from-indigo-700 hover:to-purple-700
              transition-all duration-300
              shadow-lg shadow-indigo-500/25
            `}
          >
            {t.hero.searchButton}
          </button>
        )}
      </div>
    </form>
  );
}
