export interface AppTranslations {
  menu: MenuPageTranslations;
  signIn: SignInPageTranslations;
  contactUs: ContactUsPageTranslations;
}

interface PageTransations {
  title: string;
}

export interface MenuPageTranslations extends PageTransations {}

export interface SignInPageTranslations extends PageTransations {}

export interface ContactUsPageTranslations extends PageTransations {}
