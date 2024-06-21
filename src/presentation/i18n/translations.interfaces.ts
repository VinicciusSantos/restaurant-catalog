export interface AppTranslations {
  menu: MenuPageTranslations;
  signIn: SignInPageTranslations;
  contactUs: ContactUsPageTranslations;
  basket: BasketTranslations;
}

interface PageTransations {
  title: string;
}

export interface MenuPageTranslations extends PageTransations {}

export interface SignInPageTranslations extends PageTransations {}

export interface ContactUsPageTranslations extends PageTransations {
  get_in_touch: string;
  address: string;
  form: {
    name_placeholder: string;
    email_placeholder: string;
    message_placeholder: string
    submit: string
  }
}

export interface BasketTranslations {
  title: string;
  empty: string;
  total: string;
  subtotal: string;
  add_to_order: string;
}