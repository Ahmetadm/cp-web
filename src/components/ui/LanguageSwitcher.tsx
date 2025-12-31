'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from '@/i18n';
import { locales, languageNames, Locale } from '@/i18n-config';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const flags: Record<Locale, string> = {
  en: '🇬🇧',
  sq: '🇦🇱',
  mk: '🇲🇰',
};

export function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { locale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  // Prevent hydration mismatch by not rendering dropdown until client-side
  if (!mounted) {
    return (
      <Button variant="ghost" className="gap-1.5 px-2" aria-label="Select language">
        <span className="text-lg">{flags[locale]}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-1.5 px-2" aria-label="Select language">
          <span className="text-lg">{flags[locale]}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-0 w-14">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            title={languageNames[loc]}
            className={`justify-center text-lg ${locale === loc ? 'bg-primary/10' : ''}`}
          >
            {flags[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}