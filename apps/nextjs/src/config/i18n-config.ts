export const i18n = {
  defaultLocale: "zh",
  locales: ["en", "zh", "ko", "ja", "zht"]
} as const;

export type Locale = (typeof i18n)["locales"][number];

// 新增的映射对象
export const localeMap = {
  en: "English",
  zh: "简体中文",
  ko: "한국어",
  ja: "日本語",
  zht: "繁体中文",
} as const;
