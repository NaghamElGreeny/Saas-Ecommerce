export interface ProductResponse {
  data: Product;
  status: string;
  message: string;
}

export interface Product {
  lat?: number;
  lng?: number;
  id: number;
  name: string;
  slug?: string;
  desc: string;
  type: string;
  image: string;
  images?: Image[];
  food_icon: FoodIcon[];
  rating: number;
  review_count: number;
  rate: number;
  is_favourite: boolean;
  favourite_id: number | null;
  price: PriceDetails;
  seo: Seo;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  combo: any[]; 
  sub_modifiers: SubModifier[];
}

interface Image {
  id: number;
  image: string;
}

interface FoodIcon {
  id: number;
  name: string;
  image: string;
}

interface PriceDetails {
  price: number;
  currency: string;
  percentage: number;
  discount_value: number;
  price_after: number;
  offer: Offer;
}

interface Offer {
  id: number;
  from_day: string | null;
  to_day: string | null;
  from_time: string | null;
  to_time: string | null;
}

interface Seo {
  url: string;
  description: string;
  keywords: string;
}

interface SubModifier {
  id: number;
  name: string;
  selections_type: string;
  min_num_of_selection: number | null;
  max_num_of_selection: number | null;
  item_modifiers: ItemModifier[];
}

interface ItemModifier {
  id: number;
  name: string;
  image: string;
  price: {
    price: number;
    currency: string;
  } | null;
}
