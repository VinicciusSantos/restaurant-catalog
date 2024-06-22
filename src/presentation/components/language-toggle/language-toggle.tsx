import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@presentation/ui";
import { cn } from "@presentation/utils/shadcn";
import { BR, US } from "country-flag-icons/react/3x2";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { toast } from "../../../hooks";

interface LanguageToggleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LanguageToggle: FunctionComponent<LanguageToggleProps> = (
  props
) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      setSelectedLanguage(lng);
      toast({
        title: t("languageToggle.language_changed.title"),
        description: t("languageToggle.language_changed.description"),
      });
    });
  };

  const languages = [
    { code: "en-US", name: "English", flag: US },
    { code: "pt-BR", name: "Português", flag: BR },
  ];

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setSelectedLanguage(lng);
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const currentLanguage = languages.find(
    (language) => language.code === selectedLanguage
  )!;

  return (
    <div className={cn("flex items-center gap-4", props.className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 p-3">
            {currentLanguage ? (
              <>
                <currentLanguage.flag
                  className="w-4"
                  title={currentLanguage.name}
                />
                <span className="hidden md:hidden lg:block sm:block">{currentLanguage.name}</span>
                <ChevronDownIcon className=" hidden h-4 w-4 sm:block md:block" />
              </>
            ) : (
              <>{selectedLanguage}</>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuLabel>{"Select Language"}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => changeLanguage(language.code)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 w-full text-nowrap">
                  <language.flag className="w-4" title={language.name} />
                  <span>{language.name}</span>
                </div>
                {i18n.language === language.code && (
                  <CheckIcon className="h-5 w-5 text-primary" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
