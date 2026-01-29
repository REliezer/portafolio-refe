import { getEntries } from "./contentParser";
import type { CollectionKey } from "astro:content";

export const getTaxa = async (collection: CollectionKey, name: string) => {
  const entries = await getEntries(collection);
  const taxonomyPages = entries.map((entry: any) => entry.data[name]);
  let taxonomies: string[] = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];

    if (!Array.isArray(categoryArray)) continue;

    for (let j = 0; j < categoryArray.length; j++) {
      const key = categoryArray[j];
      if (typeof key === "string" && key.trim()) {
        taxonomies.push(key);
      }
    }
  }
  const taxonomy = [...new Set(taxonomies)];
  taxonomy.sort((a, b) => a.localeCompare(b)); // alphabetize
  return taxonomy;
};

export const getTaxaMultiset = async (collection: CollectionKey, name: string) => {
  const entries = await getEntries(collection);
  const taxonomyPages = entries.map((entry: any) => entry.data[name]);
  let taxonomies: string[] = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    for (let j = 0; j < categoryArray.length; j++) {
      const key = categoryArray[j];
      if (typeof key === "string" && key.trim()) {
        taxonomies.push(key);
      }
    }
  }
  return taxonomies;
};
