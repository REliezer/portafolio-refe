import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss({
      config: {
        applyBaseStyles: false
      }
    }), AutoImport({
      imports: ["@components/common/Button.astro", "@shortcodes/Accordion", "@shortcodes/Notice", "@shortcodes/Youtube", "@shortcodes/Tabs", "@shortcodes/Tab"]
    }

    )],
  },
  site: "https://janedoe.com",
  base: "/",
  trailingSlash: "ignore",
  prefetch: {
    prefetchAll: true
  },
  integrations: [
    react(),
    sitemap(),
    mdx()
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, {
      test: "Table of contents"
    }], remarkMath],
    rehypePlugins: [[rehypeKatex, {}]],
    shikiConfig: {
      themes: { // https://shiki.style/themes
        light: "light-plus",
        dark: "dark-plus",
      }
    },
    extendDefaultPlugins: true
  },
});