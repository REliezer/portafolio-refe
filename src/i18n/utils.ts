export const LANGUAGES = {
  es: 'es',
  en: 'en',
} as const;

export type Language = keyof typeof LANGUAGES;

export const DEFAULT_LANGUAGE: Language = 'es';
export const LANGUAGE_LABELS: Record<Language, string> = {
  es: 'Español',
  en: 'English'
} as const;

export const LANGUAGE_FLAGS: Record<Language, string> = {
  es: '🇪🇸',
  en: '🇺🇸'
} as const;

// Generate localized URLs
export function localizeUrl(path: string, lang: Language): string {
  if (lang === DEFAULT_LANGUAGE) {
    return path;
  }

  // Remove the existing language if present
  const cleanPath = path.replace(/^\/[a-z]{2}(\/|$)/, '/');
  return `/${lang}${cleanPath === '/' ? '' : cleanPath}`;
}

// Get language from Astro context
export function getLangFromAstro(Astro: any): Language {
  const [, lang] = Astro.url.pathname.split('/');
  
  if (lang && lang in LANGUAGES) {
    return lang as Language;
  }

  return DEFAULT_LANGUAGE;  
}

// Validate if a language is valid
export function isValidLanguage(lang: string): lang is Language {
  return lang in LANGUAGES;
}

// Get alternate routes for other languages
export function getAlternateRoutes(currentPath: string, currentLang: Language): Record<Language, string> {
  const routes = {} as Record<Language, string>;

// Remove trailing slash de forma segura
  const normalizedPath =
    currentPath !== '/' && currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

  // Detectar idioma actual en la URL
  const segments = normalizedPath.split('/').filter(Boolean);
  const hasLangPrefix = segments[0] in LANGUAGES;

  const baseSegments = hasLangPrefix
    ? segments.slice(1)
    : segments;

  const basePath =
    baseSegments.length === 0
      ? '/'
      : `/${baseSegments.join('/')}`;

  Object.keys(LANGUAGES).forEach((lang) => {
    const langKey = lang as Language;

    // Home
    if (basePath === '/') {
      routes[langKey] =
        langKey === DEFAULT_LANGUAGE ? '/' : `/${langKey}`;
      return;
    }

    // Other pages
    routes[langKey] =
      langKey === DEFAULT_LANGUAGE
        ? basePath
        : `/${langKey}${basePath}`;
  });
  
  return routes;
}

// Formateo de fechas localizado
export function formatDate(date: Date, lang: Language, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
    ...defaultOptions,
    ...options
  }).format(date);
}

// FUNCIONES EXPORTADAS DE OTROS COMPONETES

export function normalizeContentIdToSlug(id: string): string {
  const parts = id.split("/").filter(Boolean);

  // quitar prefijo de idioma si viene como carpeta
  const first = parts[0];
  const rest = (first === "en" || first === "es") ? parts.slice(1) : parts;

  const last = rest[rest.length - 1] ?? "";

  // 1) quitar ".en" / ".es" si existiera
  let slug = last.replace(/\.(en|es)$/i, "");

  // 2) quitar "en" / "es" pegado al final (indexen, amazon-apien)
  slug = slug.replace(/(en|es)$/i, "");

  return slug;
}

// Obtener el slug base del proyecto (sin extensión de idioma)
export function getProjectSlug(id: string): string {
  return normalizeContentIdToSlug(id);
}


// Construir la URL correctamente según el idioma actual
export function getProjectUrl(entryId: string, lang: Language): string {
  const projectSlug = getProjectSlug(entryId);
  const basePath = `/projects/${projectSlug}`;
  return localizeUrl(basePath, lang);
  
}

