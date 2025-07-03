/* eslint-disable @typescript-eslint/no-explicit-any */

// Auth Related Interfaces
export interface LoginPayload {
  phone_code: string;
  phone: string;
  password: string;
  device_type: DeviceType;
  device_token?: string;
}

export interface LogoutPayload {
  device_type: DeviceType;
  device_token?: string;
}

export interface RegisterPayload {
  phone_code: string;
  phone: string;
  password: string;
  full_name: string;
  password_confirmation: string;
  email: string;
  device_type: DeviceType;
  device_token?: string;
}

export interface ResetPasswordPayload {
  phone: string;
  phone_code: string;
  reset_code: string;
  password: string;
  password_confirmation: string;
  device_type?: DeviceType;
}

type DeviceType = "web" | "ios" | "android";

// Reservation Interface
export interface ReservationPayload {
  name: string;
  phone: string;
  phone_code: string;
  store_id: number;
  date: string;
  from_time: string;
  to_time: string;
  guests_number: number;
}

// Location Interfaces
export interface BrandCountry {
  id: number;
  name: string;
  phone_code: string;
  phone_limit: number;
  flag: string;
}

export interface Store {
  id: number;
  image: string;
  name: string;
  phone: string;
  phone_code: string;
  lat: number;
  lng: number;
  location_description: string;
}

// CMS Interfaces
export interface CmsPageBase {
  created_at: string;
  icon: string;
  id: number;
  in_menu: boolean;
  slug: string;
  title: string;
  user_type: "both" | "guest" | "registered";
}

export interface CmsPage extends CmsPageBase {
  desc: string;
  image: string;
  heading: string;
  addition_data: CmsAdditionalData[];
}

export interface CmsAdditionalData {
  id: number;
  image: string;
  heading: string;
  desc: string;
  created_at: string;
}

// Product Interfaces
export interface CardItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
}

export interface Slider {
  id: number;
  title: string;
  desc: string;
  link: string | null;
  image: string;
}

export interface WebContent {
  id: number;
  title: string;
  desc: string;
  image: string;
  google_play?: string;
  app_store?: string;
}

export interface HomePageData {
  address: string | null;
  sliders: Slider[];
  web_content: WebContent;
  popular_products: any[]; 
  web_content_link: WebContent;
  products: any[];
  subscription_content: any | null;
  offers: any[];
}

// Category Interfaces
export interface Category {
  id: number;
  name: string;
  subCategories?: SubCategory[];
}

export interface SubCategory {
  id: number;
  name: string;
}

export interface ApiCategories {
  subCategories: any;
  id: number;
  name: string;
  desc: string;
  image: string;
  icon: string;
}

// Review Interfaces
export interface Review {
  id: number;
  rate: number;
  review: string;
  note: string;
  created_at: string;
  user: {
    id: number;
    full_name: string;
    avatar: string;
  };
}

export interface ReviewResponse {
  status: string;
  message: string;
  data: Review[];
  rate: number;
  review_count: number;
  star_rate: {
    key: string;
    value: number;
  }[];
}

// Modifier Interfaces
export interface Modifier {
  id: number;
  name: string;
  selections_type: "exact" | "min_max";
  min_num_of_selection: number | null;
  max_num_of_selection: number | null;
  item_modifiers: ItemModifier[];
}

export interface ItemModifier {
  id: number;
  name: string;
  image: string;
  price: { price: number; currency: string } | null;
}

// Order Interfaces
export interface OrderItemProduct {
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

export interface FoodIcon {
  id: number;
  name: string;
  image: string;
}

export interface ProductPrice {
  price: number;
  currency: string;
  percentage: number;
  discount_value: number;
  price_after: number;
  offer: ProductOffer;
}

export interface ProductOffer {
  id: number;
  from_day: string | null;
  to_day: string | null;
  from_time: string | null;
  to_time: string | null;
}

export interface OrderItemModifier {
  id: number;
  name: string;
  selections_type: string;
  min_num_of_selection: number;
  max_num_of_selection: number;
  item_modifiers: OrderItemModifierDetail[];
}

export interface OrderItemModifierDetail {
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

export interface OrderItem {
  id: number;
  product: OrderItemProduct;
  quantity: number;
  total_price: number;
  note: string | null;
  combo: any[];
  sub_modifiers: OrderItemModifier[];
  is_rate: boolean;
  review: {
    id: number;
    rate: number;
    review: string;
    note: string;
  };
}

export interface OrderPriceDetail {
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

export interface OrderStatus {
  key: string;
  value: string;
  status: string;
  icon: string;
}

export interface OrderStore {
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
  payment_method: {
    id: number;
    main_type: string;
    type: string;
  }[];
}

export interface OrderData {
  id: number;
  order_num: string;
  status: string;
  status_trans: string;
  order_type: string;
  is_schedule: boolean;
  address: string | null;
  is_payment: boolean;
  pay_type: {
    cash?: number;
    credit?: number;
  }[];
  order_time: string;
  order_date: string;
  can_cancel: boolean;
  store: OrderStore;
  driver: null;
  item: OrderItem[];
  item_count: number;
  cancel_reason: string | null;
  desc_cancel_reason: string | null;
  price_detail: OrderPriceDetail;
  call_center: string;
  call_center_message: string;
  order_status: OrderStatus[];
}

// Static Page Interface
export interface StaticPage {
  id: number;
  title: string;
  slug: string;
  in_menu: boolean;
  icon: string;
  user_type: "both" | "guest" | "auth";
  created_at: string;
}