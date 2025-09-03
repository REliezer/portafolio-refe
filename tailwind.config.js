const plugin = require("tailwindcss/plugin");

let font_base = 16;
let font_scale = 1.25;
let sm_factor = 0.5;

const scale = (level) => (font_base / font_base) * Math.pow(font_scale, level);

let fontPrimary = "Inter";
let fontPrimaryType = "sans-serif";

let fontSecondary = "Centra";
let fontSecondaryType = "sans-serif";

let fontMono = "Ubuntu Mono";
let fontMonoType = "monospace";

const animations = require("./src/tailwind/animations.js");

fontPrimary = fontPrimary
  .replace(/\+/g, " ")
  .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");

fontSecondary = fontSecondary
  .replace(/\+/g, " ")
  .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
    "./src/**/*.css",
    "./styles/**/*.{css,scss}",
  ],
  safelist: [],
  darkMode: "class",
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        text: {
          base: "#1a1a1a",
          secondary: "#4a4a4a",
          light: "#6b7280",
        },
        background: {
          base: "#fbfcf8",
          secondary: "#f8fafc",
          tertiary: "#f1f5f9",
        },
        border: {
          DEFAULT: "#231a4c",     // Primary border color
        },
        dark: {
          text: {
            base: "#f8fafc",
            secondary: "#cbd5e1",
            light: "#94a3b8",
          },
          background: {
            base: "#0f172a",
            secondary: "#1e293b",
            tertiary: "#334155",
          },
          border: {
            DEFAULT: "#827ffa",       // Primary border color (dark mode)
          },
        },
      },
      minHeight: {
        static_sidemenu: "calc(100vh - 6rem)",
      },
      maxHeight: {
        static_sidemenu: "calc(100vh - 6rem)",
      },
      fontSize: {
        base: `${font_base}px`,
        h6: `${scale(0)}rem`,
        h5: `${scale(1)}rem`,
        h4: `${scale(2)}rem`,
        h3: `${scale(3)}rem`,
        h2: `${scale(4)}rem`,
        h1: `${scale(5)}rem`,
        "h1-sm": `${scale(5) * sm_factor}rem`,
        "h2-sm": `${scale(4) * sm_factor}rem`,
        "h3-sm": `${scale(3) * sm_factor}rem`,
        "h4-sm": `${scale(2) * sm_factor}rem`,
        lg: `${font_base + 2}px`,
        sm: `${font_base - 2}px`,
        lh1: `${scale(6)}rem`,
      },
      fontFamily: {
        primary: [fontPrimary, fontPrimaryType],
        secondary: [fontSecondary, fontSecondaryType],
        mono: [fontMono, fontMonoType],
      },
      spacing: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        "9/16": "56.25%",
      },
      ...animations,
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({
      generateContainer: false,
      gridGutterWidth: "2rem",
      gridGutters: {
        1: "0.25rem",
        2: "0.5rem",
        3: "1rem",
        4: "1.5rem",
        5: "3rem",
      },
    }),
    plugin(({ addVariant }) => {
      addVariant("intersect", "&:not([no-intersect])");
    }),
  ],
};
