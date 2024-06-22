import i18n from "./internationalization";

interface TranslatorProps {
  path: string;
}

export const Translator = ({ path }: TranslatorProps) => {
  return i18n.t(path);
};
