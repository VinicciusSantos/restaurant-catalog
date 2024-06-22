export interface AppTranslations {
  menu: MenuPageTranslations;
  signIn: SignInPageTranslations;
  contactUs: ContactUsPageTranslations;
  basket: BasketTranslations;
  languageToggle: LanguageToggleTranslations;
}

interface PageTransations {
  title: string;
}

export interface MenuPageTranslations extends PageTransations {
  item_modifiers: {
    count_prefix: string;
    count_sufix: string;
  };
}

export interface SignInPageTranslations extends PageTransations {}

export interface ContactUsPageTranslations extends PageTransations {
  get_in_touch: string;
  address: string;
  form: {
    name_placeholder: string;
    email_placeholder: string;
    message_placeholder: string;
    submit: string;
  };
}

export interface BasketTranslations {
  title: string;
  empty: string;
  total: string;
  subtotal: string;
  update_order: string;
  updated: string;
}

export interface LanguageToggleTranslations {
  select_language: string;
  language_changed: {
    title: string;
    description: string;
  };
}
