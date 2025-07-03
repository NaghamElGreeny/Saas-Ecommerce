export interface OrderItem {
  id: number;
  order_num: string;
  status: string;
  status_trans: string;
  order_type: "delivery" | "take_away" | "reservation";
  type: string;
  is_schedule: boolean;
  address: Address;
  is_payment: boolean;
  pay_type: { points: number }[];
  order_time: string;
  order_date: string;
  can_cancel: boolean;
  store: Store;
  driver: any | null;
  item: OrderProduct[];
  item_count: number;
  cancel_reason: string | null;
  desc_cancel_reason: string | null;
  price_detail: PriceDetail;
  call_center: string;
  call_center_message: string;
  order_status: OrderStatus[];
}

interface Address {
  id: number;
  type: string | null;
  title: string;
  lat: string;
  lng: string;
  desc: string;
  is_default: boolean;
  building: string;
  floor: string;
  apartment: string;
  created_at: string;
}

interface Store {
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
  order_type: {
    web_delivery: boolean;
    web_take_away: boolean;
    app_delivery: boolean;
    app_take_away: boolean;
  };
  payment_method: PaymentMethod[];
}

interface PaymentMethod {
  id: number;
  main_type: string;
  type: string;
}

interface OrderProduct {
  id: number;
  product: Product;
  quantity: number;
  total_price: number;
  note: string | null;
  combo: any[];
  sub_modifiers: SubModifier[];
  is_rate: boolean;
  review: any | null;
}

interface Product {
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
  favourite_id: number;
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
  offer: {
    id: number;
    from_day: string | null;
    to_day: string | null;
    from_time: string | null;
    to_time: string | null;
  };
}

interface SubModifier {
  id: number;
  name: string;
  selections_type: string;
  min_num_of_selection: number;
  max_num_of_selection: number;
  item_modifiers: ItemModifier[];
}

interface ItemModifier {
  id: number;
  order_item_id: number;
  price: {
    price: number;
    currency: string;
  };
  name: string;
  image: string;
  quantity: number;
}

interface PriceDetail {
  total_price: number;
  discount_value: number;
  total_item_price_before_discount: number;
  delivery_price: number;
  surcharge_value: number;
  tax_rate_percentage: number;
  tax_rate_value: number;
  price_paied_from_wallet: number;
  points: number;
  currency: string;
}

interface OrderStatus {
  key: string;
  value: string;
  status: string;
  icon: string;
}
