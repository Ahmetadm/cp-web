import 'server-only'
import type { Locale } from '../i18n-config'

const dictionaries = {
  en: () => import('./messages/en.json').then((module) => module.default),
  sq: () => import('./messages/sq.json').then((module) => module.default),
  mk: () => import('./messages/mk.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.en()
