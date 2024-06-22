import { AppTranslations } from "../translations.interfaces";

export const enUsTranslations: AppTranslations = {
  menu: {
    title: "Menu",
    item_modifiers: {
      count_prefix: "Select",
      count_sufix: "option",
    },
  },
  signIn: {
    title: "Sign Up",
  },
  contactUs: {
    title: "Contat Us",
    address: "Address",
    get_in_touch: "Get in Touch",
    form: {
      name_placeholder: "Name",
      email_placeholder: "Email",
      message_placeholder: "Message",
      submit: "Send Message",
    },
  },
  basket: {
    title: "Basket",
    empty: "Your basket is empty",
    total: "Total",
    subtotal: "Sub total",
    update_order: "Update Order",
    updated: "Basket updated",
    your_basket: "Your Basket",
    items: "items",
    checkout_now: "Checkout Now",
  },
  languageToggle: {
    select_language: "Select Language",
    language_changed: {
      title: "Language Changed",
      description: "Language changed to english with success",
    },
  },
  noData: "Venue data not found",
  searchbar: {
    search_placeholder: "Search menu items",
    no_items_found: "No items found searching for ",
  }
};
