import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from 'react-native-localize';

import en from "./locales/en.json";
import vi from "./locales/vi.json";
import { loadSettings, updateSettings } from "../Storage";

const initI18n = async () => {
  const deviceLanguage = RNLocalize.getLocales()[0].languageCode;
  const settings = await loadSettings();
  
  const language = settings?.language;
  const supportedLanguages = ["en", "vi"];
  const defaultLanguage = supportedLanguages.includes(language)
    ? language
    : supportedLanguages.includes(deviceLanguage)
      ? deviceLanguage
      : "en";

  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      resources: {
        en: en,
        vi: vi,
      },
      lng: defaultLanguage,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });
};

initI18n();

export default i18n;
export const changeLanguage = async (newLanguage) => {
  await updateSettings({ language: newLanguage });
  i18n.changeLanguage(newLanguage);
}
