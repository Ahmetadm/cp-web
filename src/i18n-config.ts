export const locales = ['en', 'sq', 'mk'] as const;

export const i18n = {
  defaultLocale: 'en',
  locales,
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const languageNames: Record<Locale, string> = {
  en: 'English',
  sq: 'Shqip',
  mk: 'Македонски',
};
