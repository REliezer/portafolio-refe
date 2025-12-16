import { getEntry, getCollection, type CollectionKey } from "astro:content";
import type { GenericEntry } from "@/types";

// Nueva interfaz para opciones i18n
interface GetContentOptions {
  lang?: string;
  sortFunction?: (array: any[]) => any[];
  noIndex?: boolean;
  noDrafts?: boolean;
  fallbackToDefault?: boolean;
}

// Función para determinar el idioma a usar
const determineLang = (lang?: string): string => {
  return lang || 'es';
};

// Función para extraer idioma del id
const extractLangFromId = (id: string): string => {
  const parts = id.split('/');
  const slug = parts[parts.length - 1];

  // Buscar patrones como "indexen", "amazon-apien"
  if (slug.endsWith('en')) return 'en';
  if (slug.endsWith('es')) return 'es';

  return 'es'; // default
};

// Obtener índice con soporte i18n
export const getIndex = async (
  collection: CollectionKey,
  lang?: string,
): Promise<GenericEntry | null> => {
  const targetLang = lang || 'es';

  try {
    const allEntries = await getCollection(collection);
    // 1: Buscar por patrón: index + idioma
    const indexId = `index${targetLang}`;
    // 1. Buscar exactamente index{lang}
    let entry = allEntries.find(e => e.id === indexId);
    if (entry) {
      return entry;
    } else {
      console.log(`✗ No se encontró índice exacto: ${indexId}`);
      //Si no se encuentra, buscar cualquier archivo en el idioma
      const entriesInLang = allEntries.filter(e => extractLangFromId(e.id) === targetLang);

      if (entriesInLang.length > 0) {
        console.log(`⚠ Usando primer archivo en ${targetLang}: ${entriesInLang[0].id}`);
        return entriesInLang[0];
      }
    }
    console.log(`✗ No hay archivos en ${targetLang}`);
    return null;

  } catch (error) {
    console.error(`Error:`, error);
    return null;
  }
}

// Obtener entradas
export const getEntries = async (
  collection: CollectionKey,
  options?: GetContentOptions | ((array: any[]) => any[]),
  noIndex: boolean = true,
  noDrafts: boolean = true
): Promise<GenericEntry[]> => {
  // Manejar opciones
  let lang: string = 'es';
  let sortFunction: ((array: any[]) => any[]) | undefined;

  if (typeof options === 'function') {
    sortFunction = options;
  } else if (typeof options === 'object') {
    lang = options.lang || 'es';
    sortFunction = options.sortFunction;
    noIndex = options.noIndex ?? noIndex;
    noDrafts = options.noDrafts ?? noDrafts;
  } else if (typeof options === 'string') {
    lang = options;
  }

  try {
    let entries: GenericEntry[] = await getCollection(collection);
    // Filtrar por idioma
    entries = entries.filter(entry => extractLangFromId(entry.id) === lang);
    // Filtrar índices si es necesario
    if (noIndex) {
      entries = entries.filter(entry => {
        const slug = extractLangFromId(entry.id);
        return !slug.includes('index');
      });
    }
    // Filtrar drafts si es necesario
    if (noDrafts) {
      entries = entries.filter(entry =>
        !('draft' in entry.data) || !entry.data.draft
      );
    }
    // Ordenar si hay función
    if (sortFunction) {
      entries = sortFunction(entries);
    }

    return entries;

  } catch (error) {
    console.error(`Error getting entries for ${collection} in ${lang}:`, error);
    return [];
  }
};

// Obtener entradas de múltiples colecciones
export const getEntriesBatch = async (
  collections: CollectionKey[],
  options?: GetContentOptions | ((array: any[]) => any[]),
  noIndex: boolean = true,
  noDrafts: boolean = true
): Promise<GenericEntry[]> => {
  const allCollections = await Promise.all(
    collections.map(async (collection) => {
      return await getEntries(collection, options as any, noIndex, noDrafts);
    })
  );
  return allCollections.flat();
};

// Obtener grupos con soporte i18n
export const getGroups = async (
  collection: CollectionKey,
  options?: GetContentOptions | ((array: any[]) => any[]),
): Promise<GenericEntry[]> => {
  let lang: string = 'es';
  let sortFunction: ((array: any[]) => any[]) | undefined;

  if (typeof options === 'function') {
    sortFunction = options;
  } else if (typeof options === 'object') {
    lang = determineLang(options.lang);
    sortFunction = options.sortFunction;
  }

  let entries = await getEntries(collection, { lang, noIndex: false });

  entries = entries.filter((entry: GenericEntry) => {
    const id = entry.id || '';
    const segments = id.split("/");
    return segments.length === 2 && segments[1] === "-index";
  });

  return sortFunction ? sortFunction(entries) : entries;
};

// Obtener entradas dentro de un grupo con i18n
export const getEntriesInGroup = async (
  collection: CollectionKey,
  groupSlug: string,
  options?: GetContentOptions | ((array: any[]) => any[]),
): Promise<GenericEntry[]> => {
  let lang: string = 'es';
  let sortFunction: ((array: any[]) => any[]) | undefined;

  if (typeof options === 'function') {
    sortFunction = options;
  } else if (typeof options === 'object') {
    lang = determineLang(options.lang);
    sortFunction = options.sortFunction;
  }

  let entries = await getEntries(collection, { lang });

  entries = entries.filter((data: GenericEntry) => {
    const id = data.id || '';
    const segments = id.split("/");
    return segments[0] === groupSlug && segments.length > 1 && segments[1] !== "-index";
  });

  return sortFunction ? sortFunction(entries) : entries;
};

// Funciones auxiliares
export const getI18nIndex = async (
  collection: CollectionKey,
  lang: string = 'es',
  fallbackToDefault: boolean = true
): Promise<GenericEntry | null> => {
  return getIndex(collection, lang);
};

export const getI18nEntries = async (
  collection: CollectionKey,
  sortFunction?: ((array: any[]) => any[]),
  lang: string = 'es',
  noIndex: boolean = true,
  noDrafts: boolean = true
): Promise<GenericEntry[]> => {
  return getEntries(collection, {
    lang,
    sortFunction,
    noIndex,
    noDrafts
  });
};