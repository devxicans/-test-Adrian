import { NextRequest } from "next/server";
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'
import { SupportedDictionaries } from "@/lib";

export const supportedLocales: SupportedDictionaries[] = ['en', 'es'];
export const defaultLocale = 'en'

export const getLocale = (request: NextRequest): SupportedDictionaries => {
  const acceptedLanguage = request.headers.get('accept-language') ?? undefined
  const headers = { 'accept-language': acceptedLanguage }
  const languages = new Negotiator({ headers }).languages()

  return match(languages, supportedLocales, defaultLocale) as SupportedDictionaries;
}