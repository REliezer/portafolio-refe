import { LANGUAGES, DEFAULT_LANGUAGE, type Language } from './utils';

// Cache para las traducciones
const translationCache = new Map<Language, any>();

/**
 * Obtiene todas las traducciones para un idioma específico
 * Implementa caching para mejorar rendimiento
 */
export async function getTranslations(lang: Language) {
  // Verificar cache primero
  if (translationCache.has(lang)) {
    return translationCache.get(lang);
  }

  try {
    // Cargar traducciones dinámicamente
    const translations = await import(`./locales/${lang}.json`);
    const data = translations.default;
    
    // Guardar en cache
    translationCache.set(lang, data);
    return data;
  } catch (error) {
    console.warn(`❌ No se pudieron cargar las traducciones para ${lang}, usando idioma por defecto`);
    
    // Cargar idioma por defecto como fallback
    if (lang !== DEFAULT_LANGUAGE && !translationCache.has(DEFAULT_LANGUAGE)) {
      try {
        const fallback = await import(`./locales/${DEFAULT_LANGUAGE}.json`);
        const fallbackData = fallback.default;
        translationCache.set(DEFAULT_LANGUAGE, fallbackData);
        return fallbackData;
      } catch (fallbackError) {
        console.error('❌ Error crítico: no se pudo cargar el idioma por defecto', fallbackError);
        return {};
      }
    }
    
    return translationCache.get(DEFAULT_LANGUAGE) || {};
  }
}

/**
 * Obtiene una traducción específica usando dot notation
 * Ejemplo: t('nav.home') -> 'Inicio'
 */
export function getNestedProperty(obj: any, path: string): string | undefined {
  if (!obj || typeof path !== 'string') return undefined;
  
  return path.split('.').reduce((current, key) => {
    return current && typeof current === 'object' ? current[key] : undefined;
  }, obj);
}

/**
 * Función de traducción con soporte para interpolación
 * Ejemplo: t('welcome', { name: 'Juan' }) con traducción "Bienvenido {name}"
 */
export async function t(
  lang: Language, 
  key: string, 
  variables?: Record<string, string | number>,
  fallback?: string
): Promise<string> {
  const translations = await getTranslations(lang);
  let translation = getNestedProperty(translations, key);
  
  // Si no se encuentra la traducción, usar fallback o la clave
  if (!translation) {
    translation = fallback || key;
  }
  
  // Interpolación de variables
  if (variables && typeof translation === 'string') {
    Object.entries(variables).forEach(([varKey, value]) => {
      const placeholder = `{${varKey}}`;
      translation = translation.replace(new RegExp(placeholder, 'g'), String(value));
    });
  }
  
  return translation;
}

/**
 * Hook para uso en componentes Astro
 * Retorna una función de traducción pre-configurada para el idioma actual
 */
export async function useTranslations(lang: Language) {
  const translations = await getTranslations(lang);
  
  return {
    t: (key: string, variables?: Record<string, string | number>, fallback?: string) => {
      let translation = getNestedProperty(translations, key);
      
      if (!translation) {
        translation = fallback || key;
      }
      
      // Interpolación de variables
      if (variables && typeof translation === 'string') {
        Object.entries(variables).forEach(([varKey, value]) => {
          const placeholder = `{${varKey}}`;
          translation = translation.replace(new RegExp(placeholder, 'g'), String(value));
        });
      }
      
      return translation;
    },
    lang,
    translations
  };
}

/**
 * Valida que todas las claves de traducción estén presentes en todos los idiomas
 * Útil para desarrollo y testing
 */
export async function validateTranslations(): Promise<{
  valid: boolean;
  missing: Record<Language, string[]>;
  extra: Record<Language, string[]>;
}> {
  const allTranslations: Record<Language, any> = {} as Record<Language, any>;
  const allKeys: Set<string> = new Set();
  
  // Cargar todas las traducciones
  for (const lang of Object.keys(LANGUAGES) as Language[]) {
    allTranslations[lang] = await getTranslations(lang);
  }
  
  // Extraer todas las claves posibles
  function extractKeys(obj: any, prefix = ''): string[] {
    const keys: string[] = [];
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys.push(...extractKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    return keys;
  }
  
  // Recopilar todas las claves de todos los idiomas
  Object.values(allTranslations).forEach(translations => {
    extractKeys(translations).forEach(key => allKeys.add(key));
  });
  
  const missing: Record<Language, string[]> = {} as Record<Language, string[]>;
  const extra: Record<Language, string[]> = {} as Record<Language, string[]>;
  
  // Verificar claves faltantes y extras
  Object.entries(allTranslations).forEach(([lang, translations]) => {
    const langKey = lang as Language;
    const langKeys = new Set(extractKeys(translations));
    
    missing[langKey] = Array.from(allKeys).filter(key => !langKeys.has(key));
    extra[langKey] = Array.from(langKeys).filter(key => !allKeys.has(key));
  });
  
  const valid = Object.values(missing).every(arr => arr.length === 0) && 
                Object.values(extra).every(arr => arr.length === 0);
  
  return { valid, missing, extra };
}

/**
 * Limpia la cache de traducciones
 * Útil en desarrollo cuando se actualizan los archivos de traducción
 */
export function clearTranslationCache(): void {
  translationCache.clear();
}