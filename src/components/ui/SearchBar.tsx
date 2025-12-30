'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslations } from '@/i18n';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

  const inputSizeClasses = {
    sm: 'h-10 pl-10',
    md: 'h-12 pl-12',
    lg: 'h-14 pl-14 text-lg',
  };

  const iconSizeClasses = {
    sm: 'left-3 w-4 h-4',
    md: 'left-4 w-5 h-5',
    lg: 'left-5 w-6 h-6',
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center bg-background rounded-2xl shadow-xl shadow-foreground/10 overflow-hidden border border-input">
        {/* Search Icon */}
        <Search className={`absolute ${iconSizeClasses[size]} text-muted-foreground`} />

        {/* Input */}
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={inputPlaceholder}
          className={`flex-1 ${inputSizeClasses[size]} ${showButton ? 'pr-4' : 'pr-6'} border-0 bg-transparent shadow-none focus-visible:ring-0 rounded-2xl`}
        />

        {/* Search Button */}
        {showButton && (
          <Button
            type="submit"
            variant="gradient"
            className={size === 'lg' ? 'm-2 px-8 py-3 h-auto' : 'm-1.5 px-6 py-2 h-auto'}
          >
            {t.hero.searchButton}
          </Button>
        )}
      </div>
    </form>
  );
}
