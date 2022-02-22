import Vue from "vue";
import VueI18n, { LocaleMessages } from "vue-i18n";
import { system } from "@/plugins/device";

Vue.use(VueI18n);

export const availableLanguages: string[] = [
  "it",
  "en",
  "de",
  "fr",
  "es",
  "ru",
  "ja",
  "kr"
];

const loadLocaleMessages = (): LocaleMessages => {
  const locales = require.context(
    "./locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages: LocaleMessages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
};

const i18n = new VueI18n({
  locale: system.language || process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages(),
});

export const updateLocaleMessages = (locale: string): string => {
  i18n.locale = locale;
  document.querySelector("html")?.setAttribute("lang", locale);
  //(axios as any).defaults.headers.common['Accept-Language'] = locale
  return locale;
};

export default i18n;
