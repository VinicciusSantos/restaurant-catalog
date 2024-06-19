export interface Menu {
  id: number;
  name: string;
  type: string;
  collapse: number;
  sections: Section[];
}

export interface Section {
  id: number;
  name: string;
  description?: string;
  position: number;
  visible?: number;
  images: Image[];
  items: Item[];
}

export interface Image {
  id: number;
  image: string;
}

export interface Item {
  id: number;
  name: string;
  description?: string;
  alcoholic: number;
  price: number;
  position: number;
  visible?: number;
  availabilityType: string;
  sku?: string;
  images?: Image[];
  available: boolean;
  modifiers?: Modifier[];
}

export interface Modifier {
  id: number;
  name: string;
  minChoices: number;
  maxChoices: number;
  items: ModifierItem[];
}

export interface ModifierItem {
  id: number;
  name: string;
  price: number;
  maxChoices: number;
  position: number;
  visible: number;
  availabilityType: string;
  available: boolean;
  qty?: number;
}
