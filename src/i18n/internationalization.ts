/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { ptBrTranslations, enUsTranslations } from "./locales";

export const i18nConfig = {
  resources: {
    "pt-BR": { translations: ptBrTranslations },
    "en-US": { translations: enUsTranslations },
  },
  fallbackLng: "pt-BR",
  defaultNS: "translations",
};

export function setupInternationalizations() {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(i18nConfig as any);
}

export default i18n;
