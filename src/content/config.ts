import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { TechSchema } from "@/schemas/tech";

// Configuración base
const baseSchema = z.object({
  //lang: z.enum(['es', 'en']).default('es'),
  draft: z.boolean().default(false),
});

// Esquema común para contenido buscable
const searchable = z.object({
  title: z.string(),
  description: z.string().optional(),
  autodescription: z.boolean().default(true),
  draft: z.boolean().default(false),
});

// Función helper para crear loaders con i18n
const createI18nLoader = (basePath: string) => {
  return glob({ 
    pattern: ["**/*.md", "**/*.mdx", "**/*.en.md", "**/*.es.md", "**/*.en.mdx", "**/*.es.mdx"],
    base: basePath 
  });
};

// Colección About
const about = defineCollection({
  loader: createI18nLoader("./src/content/about"),
  schema: ({ image }) =>
    baseSchema.extend({
      image: image().optional(),
      imageAlt: z.string().default(""),
      title: z.string(),
      description: z.string().optional(),
    }),
});

// Colección Home
const home = defineCollection({
  loader: createI18nLoader("./src/content/home"),
  schema: ({ image }) =>
    baseSchema.extend({
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
  loader: createI18nLoader("./src/content/terms"),
  schema: searchable,
});

// Colección Contact
const contact = defineCollection({
  loader: createI18nLoader("./src/content/contact"),
  schema: ({ image }) =>
    baseSchema.extend({
      image: image().optional(),
      imageAlt: z.string().default(""),
      title: z.string(),
    }),
});

// Colección Skills (lista de habilidades y tecnologías) con i18n
const skill = defineCollection({
  loader: createI18nLoader("./src/content/skill"),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    techs: z.array(TechSchema),
  }),
});

// Colección Projects con i18n
const projects = defineCollection({
  loader: createI18nLoader("./src/content/projects"),
  schema: ({ image }) =>
    baseSchema.extend({
      title: z.string(),
      description: z.string(),
      date: z.date().optional(),
      imageCover: image().optional(),
      imageCoverAlt: z.string().default(""),
      author: z.string().optional(),
      categories: z.array(z.string()).default([]),
      platform: z.record(z.boolean()).default({}),
      resume: z.string().optional(),
      diagrama: z.object({
          resume: z.string().default(""),
          image: image(),
          imageAlt: z.string().optional().default(""),
          diagramaComponent: z.array(
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
            title_en: z.string().optional().default("GitHub Repository"),
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
