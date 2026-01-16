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

// Obtener el idioma desde el contexto de Astro
export function getLangFromAstro(Astro: any): Language {
  return getLangFromUrl(Astro.url);
}

// FUNCIONES EXPORTADAS DE OTROS COMPONETES
// Obtener el slug base del proyecto (sin extensión de idioma)
export function getProjectSlug(id: string): string {
  // Normalizar: quitar carpeta de idioma si existe (ej. "en/slug" -> "slug")
  let slug = id.replace(/^\//, '');
  if (slug.startsWith('en/')) slug = slug.replace(/^en\//, '');
  if (slug.startsWith('es/')) slug = slug.replace(/^es\//, '');

  // Quitar sufijos de idioma comunes (.en, .es, -en, -es, _en, _es)
  slug = slug.replace(/(\.en|\.es|[-_.]en|[-_.]es|es|en)$/, '');

  // Quitar índices residuales (index, -index)
  // slug = slug.replace(/\/?(-?index)$/, '');
  console.log("Computed project slug:", slug);
  return slug;
}


// Construir la URL correctamente según el idioma actual
export function getProjectUrl(entryId: string, lang: Language): string {
  const projectSlug = getProjectSlug(entryId);
  const basePath = `/projects/${projectSlug}`;
  return localizeUrl(basePath, lang);
  
}

