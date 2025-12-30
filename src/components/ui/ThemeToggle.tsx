'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from '@/i18n';
import { useIsMounted } from '@/lib/hooks';
import { Sun, Moon, Monitor } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type ThemeOption = 'light' | 'dark' | 'system';

export function ThemeToggle() {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <span className="w-4 h-4 bg-foreground/20 rounded-full animate-pulse" />
      </Button>
    );
  }

  const themeOptions: { value: ThemeOption; label: string; icon: React.ReactNode }[] = [
    {
      value: 'light',
      label: t.theme.light,
      icon: <Sun className="h-4 w-4" />,
    },
    {
      value: 'dark',
      label: t.theme.dark,
      icon: <Moon className="h-4 w-4" />,
    },
    {
      value: 'system',
      label: t.theme.system,
      icon: <Monitor className="h-4 w-4" />,
    },
  ];

  const currentIcon = theme === 'light'
    ? <Sun className="h-4 w-4" />
    : theme === 'dark'
    ? <Moon className="h-4 w-4" />
    : <Monitor className="h-4 w-4" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          {currentIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={theme === option.value ? 'bg-primary/10 text-primary font-medium' : ''}
          >
            {option.icon}
            <span className="ml-2">{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
