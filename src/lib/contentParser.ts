import { getCollection, type CollectionKey } from "astro:content";
import type { GenericEntry } from "@/types";

// Interface for i18n options
interface GetContentOptions {
  lang?: string;
  sortFunction?: (array: any[]) => any[];
  noIndex?: boolean;
  noDrafts?: boolean;
  fallbackToDefault?: boolean;
}

// Function to determine the language to use
const determineLang = (lang?: string): string => {
  return lang || 'es';
};

// Helper: remove language suffix from last segment
// supports: "indexen", "indexes", "index.en", "-indexes", "amazon-apien"
const stripLangSuffix = (value: string): string => {
  return value.replace(/\.(en|es)$/i, "").replace(/(en|es)$/i, "");
};

// Function to extract language from id
const extractLangFromId = (id: string): string => {
  const parts = id.split("/").filter(Boolean);

  // folder language
  if (parts.includes("en")) return "en";
  if (parts.includes("es")) return "es";

  // suffix language (with dot or glued)
  const last = parts[parts.length - 1] || "";
  if (/(\.en|en)$/i.test(last)) return "en";
  if (/(\.es|es)$/i.test(last)) return "es";

  return "es";
};

// Function to check if an entry is an index
const isIndexEntry = (id: string): boolean => {
  const parts = id.split("/").filter(Boolean);
  const last = (parts[parts.length - 1] || "").toLowerCase();

  const base = stripLangSuffix(last);
  return base === "index" || base === "-index";
};

// Get index with i18n support
export const getIndex = async (
  collection: CollectionKey,
  lang?: string,
): Promise<GenericEntry | null> => {
  const targetLang = determineLang(lang);

  try {
    const allEntries = await getCollection(collection);
    
    const candidates = [
      // folder format (if exists)
      `${targetLang}/index`,
      `${targetLang}/-index`,

      // glued suffix (your current ids: indexen / indexes)
      `index${targetLang}`,
      `-index${targetLang}`,

      // dot suffix (if any collection uses index.en)
      `index.${targetLang}`,
      `-index.${targetLang}`,
    ];

    const exact = allEntries.find((e) => candidates.includes(e.id));
    if (exact) return exact;

    const entriesInLang = allEntries.filter(
      (e) => extractLangFromId(e.id) === targetLang
    );

    // Preferir una entrada cuyo último segmento sea "index" o "-index"
    const maybeIndex = entriesInLang.find((e) => isIndexEntry(e.id));
    if (maybeIndex) return maybeIndex;

    if (entriesInLang.length > 0) {
      return entriesInLang[0];
    }

    return null;

  } catch (error) {
    console.error(`Error:`, error);
    return null;
  }
}

// Get entries
export const getEntries = async (
  collection: CollectionKey,
  options?: GetContentOptions | ((array: any[]) => any[]),
  noIndex: boolean = true,
  noDrafts: boolean = true
): Promise<GenericEntry[]> => {
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
    // Filter by language
    entries = entries.filter((entry) => extractLangFromId(entry.id) === lang);

    // Ignore "_" entries
    entries = entries.filter((entry) => {
      const parts = entry.id.split("/").filter(Boolean);
      const last = parts[parts.length - 1] ?? "";
      const base = stripLangSuffix(last);
      return !base.startsWith("_");
    });

    // Filter indices if necessary
    if (noIndex) {
      entries = entries.filter((entry) => !isIndexEntry(entry.id));
    }
    // Filter drafts if necessary
    if (noDrafts) {
      entries = entries.filter((entry) =>
        !('draft' in entry.data) || !entry.data.draft
      );
    }
    // Order if there is a function
    if (sortFunction) {
      entries = sortFunction(entries);
    }

    return entries;

  } catch (error) {
    console.error(`Error getting entries for ${collection} in ${lang}:`, error);
    return [];
  }
};