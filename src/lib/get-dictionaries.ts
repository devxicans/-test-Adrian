import 'server-only'

export type SupportedDictionaries = 'en' | 'es';

const dictionaries = {
  en: () => import('../../messages/en.json').then((module) => module.default),
  es: () => import('../../messages/es.json').then((module) => module.default),
}

export const getDictionary = async (locale : SupportedDictionaries) => dictionaries[locale]()