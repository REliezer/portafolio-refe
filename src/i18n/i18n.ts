export const i18nConfig = {
  defaultLocale: "es",
  locales: ["es", "en"] as const,
  localeNames: {
    es: "Español",
    en: "English",
  },
  localeFlags: {
    es: "🇪🇸",
    en: "🇺🇸",
  },
  showFlags: true,
  showNames: true
} as const;