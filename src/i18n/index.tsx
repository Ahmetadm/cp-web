'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { Locale } from '@/i18n-config';
import enMessages from './messages/en.json';

// Messages type
export type Messages = typeof enMessages;

// Context type
interface LocaleContextType {
  locale: Locale;
  t: Messages;
}

// Create context
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Provider component
interface LocaleProviderProps {
  children: ReactNode;
  locale: Locale;
  messages: Messages;
}

export function LocaleProvider({ children, locale, messages }: LocaleProviderProps): React.ReactElement {
  const value = { locale, t: messages };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

// Hook to use locale context
export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

// Hook to get translations
export function useTranslations() {
  const { t } = useLocale();
  return t;
}