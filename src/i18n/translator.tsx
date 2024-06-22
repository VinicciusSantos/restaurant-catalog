import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

interface TranslatorProps {
  path: string;
}

export const Translator: FunctionComponent<TranslatorProps> = ({ path }) => {
  const { t } = useTranslation();

  return <>{t(path)}</>;
};
