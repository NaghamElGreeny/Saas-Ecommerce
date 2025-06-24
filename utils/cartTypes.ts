export interface CartResponse {
  data: CartData;
  status: string;
  message: string;
  auto_coupon: boolean;
  hint: string | null;
  coupon_code: string | null;
  currency: string;
  have_delivery: boolean;
  price: PriceSummary;
}

export interface CartData {
  id: number;
  guest_token: string | null;
  store: Store;
  products: CartProduct[];
  item_count: number;
  points: number;
  wallet: number;
  order_type?: 'delivery' | 'take_away';
}

export interface Store {
  id: number;
  image: string;
  name: string;
  complete_name: string;
  phone: string;
  phone_code: string;
  logo: string | null;
  lat: number;
  lng: number;
  location_description: string;
  location_info: string | null;
  order_type: OrderType;
  payment_method: PaymentMethod[];
}

interface OrderType {
  web_delivery: boolean;
  web_take_away: boolean;
  app_delivery: boolean;
  app_take_away: boolean;
}

export interface PaymentMethod {
  id: number;
  main_type: string;
  type: string;
}

export interface CartProduct {
  id: number;
  in_store: boolean;
  product: Product;
  quantity: number;
  total_price: number;
  note: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  combo: any[]; 
  sub_modifiers: SubModifier[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  desc: string;
  type: string;
  image: string;
  food_icon: FoodIcon[];
  rating: number;
  review_count: number;
  rate: number;
  is_favourite: boolean;
  favourite_id: number | null;
  price: ProductPrice;
}

interface FoodIcon {
  id: number;
  name: string;
  image: string;
}

interface ProductPrice {
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

export interface SubModifier {
  id: number;
  name: string;
  selections_type: 'exact' | 'min_max'; // possible values
  min_num_of_selection: number;
  max_num_of_selection: number;
  item_modifiers: ItemModifier[];
}

export interface ItemModifier {
  id: number;
  in_store: boolean;
  cart_product_id: number;
  price: SimplePrice;
  name: string;
  image: string;
  quantity: number;
}

interface SimplePrice {
  price: number;
  currency: string;
}

interface PriceSummary {
  tax_rate_percentage: number;
  tax_rate_value: number;
  sun_total: number;
  surcharge: number;
  coupon_price: number;
  delivery_price: number;
  total: number;
}


// import { Product } from "./menuTypes";

// export interface CartResponse {
//   data: CartData;
//   status: string;
//   message: string;
//   auto_coupon: boolean;
//   hint: string | null;
//   coupon_code: string | null;
//   currency: string;
//   have_delivery: boolean;
//   price: CartPrice;
// }

// export interface CartData {
//   id: number;
//   guest_token: string | null;
//   store: Store;
//   products: CartItem[];
//   item_count: number;
//   points: number;
//   wallet: number;
// }

// export interface Store {
//   id: number;
//   image: string;
//   name: string;
//   complete_name: string;
//   phone: string;
//   phone_code: string;
//   logo: string | null;
//   lat: number;
//   lng: number;
//   location_description: string;
//   location_info: string | null;
//   order_type: {
//     web_delivery: boolean;
//     web_take_away: boolean;
//     app_delivery: boolean;
//     app_take_away: boolean;
//   };
//   payment_method: PaymentMethod[];
// }

// export interface PaymentMethod {
//   id: number;
//   main_type: string;
//   type: string;
// }

// export interface CartProduct {
//   id: number;
//   in_store: boolean;
//   product: Product;
//   quantity: number;
//   total_price: number;
//   note: string | null;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   combo: any[];
//   sub_modifiers: SubModifier[];
// }

// export interface FoodIcon {
//   id: number;
//   name: string;
//   image: string;
// }

// export interface ProductPrice {
//   price: number;
//   currency: string;
//   percentage: number;
//   discount_value: number;
//   price_after: number;
//   offer: {
//     id: number;
//     from_day: string | null;
//     to_day: string | null;
//     from_time: string | null;
//     to_time: string | null;
//   };
// }

// export interface SubModifier {
//   id: number;
//   name: string;
//   selections_type: "exact" | "min_max";
//   min_num_of_selection: number;
//   max_num_of_selection: number;
//   item_modifiers: ItemModifier[];
// }

// export interface ItemModifier {
//   id: number;
//   in_store: boolean;
//   cart_product_id: number;
//   price: {
//     price: number;
//     currency: string;
//   };
//   name: string;
//   image: string;
//   quantity: number;
// }

// export interface CartPrice {
//   tax_rate_percentage: number;
//   tax_rate_value: number;
//   sun_total: number;
//   surcharge: number;
//   coupon_price: number;
//   delivery_price: number;
//   total: number;
// }

// ///////////
// export interface CartItem {
//   id: number;
//   in_store: boolean;
//   product: {
//     id: number;
//     name: string;
//     slug: string;
//     desc: string;
//     type: string;
//     image: string;
//     food_icon: {
//       id: number;
//       name: string;
//       image: string;
//     }[];
//     rating: number;
//     review_count: number;
//     rate: number;
//     is_favourite: boolean;
//     favourite_id: number | null;
//     price: {
//       price: number;
//       currency: string;
//       percentage: number;
//       discount_value: number;
//       price_after: number;
//       offer: {
//         id: number;
//         from_day: string | null;
//         to_day: string | null;
//         from_time: string | null;
//         to_time: string | null;
//       };
//     };
//   };
//   quantity: number;
//   total_price: number;
//   note: string | null;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   combo: any[];
//   sub_modifiers: SubModifier[];
// }

// export interface SubModifier {
//   id: number;
//   name: string;
//   selections_type: "exact" | "min_max";
//   min_num_of_selection: number;
//   max_num_of_selection: number;
//   item_modifiers: ItemModifier[];
// }

// export interface ItemModifier {
//   id: number;
//   in_store: boolean;
//   cart_product_id: number;
//   price: {
//     price: number;
//     currency: string;
//   };
//   name: string;
//   image: string;
//   quantity: number;
// }

