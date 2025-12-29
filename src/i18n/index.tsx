'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enMessages from './messages/en.json';
import sqMessages from './messages/sq.json';
import mkMessages from './messages/mk.json';

// Supported locales
export type Locale = 'en' | 'sq' | 'mk';

export const locales: Locale[] = ['en', 'sq', 'mk'];
export const defaultLocale: Locale = 'en';

// Language display names
export const languageNames: Record<Locale, string> = {
  en: 'English',
  sq: 'Shqip',
  mk: 'Македонски',
};

// Messages type
type Messages = typeof enMessages;

// All messages by locale
const messages: Record<Locale, Messages> = {
  en: enMessages,
  sq: sqMessages,
  mk: mkMessages,
};

// Context type
interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
}

// Create context
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Storage key
const LOCALE_STORAGE_KEY = 'preferred-locale';

// Provider component
interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps): React.ReactElement {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load locale from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (stored && locales.includes(stored)) {
      setLocaleState(stored);
    }
    setIsHydrated(true);
  }, []);

  // Save locale to localStorage when it changes
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  };

  // Get translations for current locale
  const t = messages[locale];

  const value = { locale: isHydrated ? locale : defaultLocale, setLocale, t: isHydrated ? t : messages[defaultLocale] };

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
