import { AppTranslations } from "../translations.interfaces";

export const ptBrTranslations: AppTranslations = {
  menu: {
    title: "Menu",
    item_modifiers: {
      count_prefix: "Selecione",
      count_sufix: "opção",
    },
  },
  signIn: {
    title: "Entrar",
  },
  contactUs: {
    title: "Contato",
    address: "Endereço",
    get_in_touch: "Entre em contato",
    form: {
      name_placeholder: "Nome",
      email_placeholder: "Email",
      message_placeholder: "Menssagem",
      submit: "Enviar Menssagem",
    },
  },
  basket: {
    title: "Carrinho",
    empty: "Seu carrinho está vazio",
    total: "Total",
    subtotal: "Sub total",
    update_order: "Atualizar Pedido",
    updated: "Carrinho atualizado",
  },
  languageToggle: {
    select_language: "Selecione o idioma",
    language_changed: {
      title: "Idioma alterado",
      description:
        "Alguns textos vindos da API podem não estar traduzidos.",
    },
  },
  noData: "Dados do local não encontrados", 
};
