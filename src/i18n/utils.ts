import type { APIRoute } from 'astro';

// Idiomas soportados
export const LANGUAGES = {
  es: 'es',
  en: 'en',
} as const;

export type Language = keyof typeof LANGUAGES;

// Idioma por defecto
export const DEFAULT_LANGUAGE: Language = 'es';

// Detectar idioma desde la URL
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in LANGUAGES) {
    return lang as Language;
  }
  return DEFAULT_LANGUAGE;
}

// Generar URLs localizadas
export function localizeUrl(path: string, lang: Language): string {
  if (lang === DEFAULT_LANGUAGE) {
    return path;
  }

  // Remover el idioma existente si está presente
  const cleanPath = path.replace(/^\/[a-z]{2}(\/|$)/, '/');
  return `/${lang}${cleanPath === '/' ? '' : cleanPath}`;
}

// Obtener rutas alternativas para otros idiomas
export function getAlternateRoutes(currentPath: string, currentLang: Language) {
  const routes: Record<Language, string> = {} as Record<Language, string>;

  // Obtener la ruta base sin el idioma
  const basePath = currentLang === DEFAULT_LANGUAGE
    ? currentPath
    : currentPath.replace(`/${currentLang}`, '');

  Object.keys(LANGUAGES).forEach(lang => {
    const langKey = lang as Language;
    routes[langKey] = localizeUrl(basePath, langKey);
  });

  return routes;
}

// Obtener el idioma desde el contexto de Astro
export function getLangFromAstro(Astro: any): Language {
  return getLangFromUrl(Astro.url);
}

// Validar si un idioma es válido
export function isValidLanguage(lang: string): lang is Language {
  return lang in LANGUAGES;
}

// Redirección automática basada en Accept-Language
export function getPreferredLanguage(acceptLanguage?: string): Language {
  if (!acceptLanguage) return DEFAULT_LANGUAGE;

  const supportedLangs = Object.keys(LANGUAGES);
  const preferredLangs = acceptLanguage
    .split(',')
    .map(lang => lang.trim().split(';')[0].toLowerCase())
    .map(lang => lang.split('-')[0]); // es-ES -> es

  for (const preferred of preferredLangs) {
    if (supportedLangs.includes(preferred)) {
      return preferred as Language;
    }
  }

  return DEFAULT_LANGUAGE;
}
