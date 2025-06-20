import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";


const searchable = z.object({
  title: z.string(),
  description: z.string().optional(),
  autodescription: z.boolean().default(true),
  draft: z.boolean().default(false),
});

// Esquema para redes sociales (todos opcionales)
const social = z.object({
  discord: z.string().optional(),
  email: z.string().optional(),
  facebook: z.string().optional(),
  github: z.string().optional(),
  instagram: z.string().optional(),
  linkedIn: z.string().optional(),
  pinterest: z.string().optional(),
  tiktok: z.string().optional(),
  website: z.string().optional(),
  youtube: z.string().optional(),
});

// Colección About (solo archivos -index.md/mdx)
const about = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/about" }),
  schema: ({ image }) =>
    searchable.extend({
      image: image().optional(),
      imageAlt: z.string().default(""),
    }),
});

// Colección Home (solo archivos -index.md/mdx)
const home = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/home" }),
  schema: ({ image }) =>
    z.object({
      image: image().optional(),
      imageAlt: z.string().default(""),
      title: z.string(),
      subtitle: z.string(),
      content: z.string(),
      button: z
        .object({
          label: z.string(),
          link: z.string(),
        })
        .optional(),
    }),
});

// Colección Projects (archivos con nombre diferente a _*.md/mdx)
const projects = defineCollection({
  loader: glob({
    pattern: "**\/[^_]*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    searchable.extend({
      title: z.string(),
      date: z.date().optional(),
      image: image().optional(),
      imageAlt: z.string().default(""),
      author: z.string().optional(),
      categories: z.array(z.string()).default([]),
      platform: z.record(z.boolean()).default({}),
      resume: z.string().optional(),
      stack: z
        .object({
          frontend: z.array(z.string()),
          backend: z.array(z.string()).optional(),
          baseDatos: z.array(z.string()).optional(),
          almacenamiento: z.array(z.string()).optional(),
          otros: z.array(z.string()).optional(),
        })
        .optional(),
      content: z
        .array(
          z.object({
            nombre: z.string(),
            modulos: z.array(z.string()).optional(),
          }))
        .optional(),
      github: z.string()
        .url("Debe ser una URL válida")
        .startsWith("https://github.com/", "Debe ser un enlace a GitHub")
        .optional(),
      link: z.string()
        //.url("Debe ser una URL válida")
        .optional(),
    }),
});

// Colección Terms (solo archivos -index.md/mdx)
const terms = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/terms" }),
  schema: searchable,
});

// Colección Contact (solo archivos -index.md/mdx)
const contact = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/contact" }),
  schema: ({ image }) =>
    z.object({
      image: image().optional(),
      imageAlt: z.string().default(""),
      title: z.string(),
    }),
});

// Colección Skills (lista de habilidades y tecnologías)
const skill = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    techs: z.array(
      z.object({
        label: z.string(),
        img: z.string(),
        level: z.number().min(10).max(100).optional(), // Nivel entre 10 y 100
        group: z.string()
      })
    ),
  }),
});

// Export collections
export const collections = {
  about,
  home,
  projects,
  terms,
  contact,
  skill,
};
