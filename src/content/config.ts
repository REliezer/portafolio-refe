import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { TechSchema } from "@/schemas/tech";

const searchable = z.object({
  title: z.string(),
  description: z.string().optional(),
  autodescription: z.boolean().default(true),
  draft: z.boolean().default(false),
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
    techs: z.array(TechSchema),
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
      imageCover: image().optional(),
      imageCoverAlt: z.string().default(""),
      author: z.string().optional(),
      categories: z.array(z.string()).default([]),
      platform: z.record(z.boolean()).default({}),      
      resume: z.string().optional(),
      diagrama: z.
        object({
          resume: z.string().default(""),
          image: image(),
          imageAlt: z.string().optional().default(""),
          diagramaComponent: z
          .array(
                z.object({
                  nombre: z.string(),
                  resume: z.string().optional(),
                }))
              .optional(),
        })
      .optional(),
      stack: z.array(TechSchema).optional(),
      content: z.
        object({
          description: z.string().optional(),
          item: z
            .array(
                z.object({
                  nombre: z.string(),
                  resume: z.string().optional(),
                  modulos: z.array(z.string()).optional(),
                }))
              .optional(),
        })
      .optional(),      
      github: z
        .array(
          z.object({
            title: z.string().optional().default("Repositorio GitHub"),
            link: z.string()
              .url("Debe ser una URL válida")
              .startsWith("https://github.com/", "Debe ser un enlace a GitHub"),
          })
        )
        .optional(),
      link: z.string()
        //.url("Debe ser una URL válida")
        .optional(),
      gallery: z.
        array(
          z.object({
            img: image(),
            imgAlt: z.string().optional(),
          })
        ).optional(),
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
