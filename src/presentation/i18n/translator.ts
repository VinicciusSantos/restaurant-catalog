import { useTranslation } from "react-i18next";
import i18n from "./internationalization";

interface TranslatorProps {
  path: string;
}

export const Translator = ({ path }: TranslatorProps) => {
  const { t } = useTranslation();
  console.log("🚀 ~ Translator ~ t:", i18n.language)
  return t(path);
};
