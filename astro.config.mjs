import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import vercel from '@astrojs/vercel';
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: false,
    }
  },
  vite: {
    plugins: [tailwindcss({
      config: {
        applyBaseStyles: false
      }
    }), AutoImport({
      imports: [
        "@components/common/Button.astro", 
      ]
    }

    )],
  },
  site: "https://portafolio-refe.vercel.app",
  base: "/",
  trailingSlash: "ignore",
  prefetch: {
    prefetchAll: true
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);

        // Excluir 404/500 (con y sin slash final)
        return !(
          pathname === "/404" || pathname === "/404/" ||
          pathname === "/en/404" || pathname === "/en/404/" ||
          pathname === "/500" || pathname === "/500/" ||
          pathname === "/en/500" || pathname === "/en/500/"
        );
      },
    }),
    mdx()
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, {
      test: "Table of contents"
    }]
  ],
    shikiConfig: {
      themes: { // https://shiki.style/themes
        light: "light-plus",
        dark: "dark-plus",
      }
    },
    extendDefaultPlugins: true
  },  
});