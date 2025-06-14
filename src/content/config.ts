import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const searchable = z.object({
  title: z.string(),
  description: z.string().optional(),
  autodescription: z.boolean().default(true),
  draft: z.boolean().default(false),
});

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

const about = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/about" }),
  schema: ({ image }) =>
    searchable.extend({
      image: image().optional(),
      imageAlt: z.string().default(""),
    }),
});

const home = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/home" }),
  schema: ({ image }) =>
    z.object({
      image: image().optional(),
      imageAlt: z.string().default(""),
      title: z.string(),
      content: z.string(),
      button: z
        .object({
          label: z.string(),
          link: z.string().optional(),
        })
        .optional(),
    }),
});

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
      categories: z.array(z.string()).optional().default([]),
      platform: z.record(z.boolean()).optional().default({}),
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
        .array(z
          .object({
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

const terms = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/terms" }),
  schema: searchable,
});

const contact = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/contact" }),
  schema: ({ image }) =>
    z.object({
      image: image().optional(),
      imageAlt: z.string().default(""),
      title: z.string(),
    }),
});

const skill = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    techs: z.array(
      z.object({
        label: z.string(),
        img: z.string(),
        level: z.number(),
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
