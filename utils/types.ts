/* eslint-disable @typescript-eslint/no-explicit-any */

// AUTH

/**
 * @interface LoginPayload
 * @description The payload for the login request.
 */
export interface LoginPayload {
  phone_code: string;
  phone: string;
  password: string;
  device_type: DeviceType;
  device_token?: string;
}

/**
 * @interface LogoutPayload
 * @description The payload for the logout request.
 */
export interface LogoutPayload {
  device_type: DeviceType;
  device_token?: string;
}

/**
 * @interface RegisterPayload
 * @description The payload for the registration request.
 */
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

/**
 * @interface ResetPasswordPayload
 * @description The payload for the password reset request.
 */
export interface ResetPasswordPayload {
  phone: string;
  phone_code: string;
  reset_code: string;
  password: string;
  password_confirmation: string;
  device_type?: DeviceType;
}

/**
 * @type ChangePasswordPayload
 * @description The payload for the password change request.
 */
export type ChangePasswordPayload = {
  old_password: string;
  password: string;
  password_confirmation: string;
};

/**
 * @type DeviceType
 * @description The type of device used for the request.
 */
type DeviceType = "web" | "ios" | "android";

/**
 * @interface LoginResponse
 * @description The response after a successful login.
 */
export interface LoginResponse extends ProfileResponse {
  token: any;
}

// USER & PROFILE

/**
 * @interface ProfileResponse
 * @description The response containing user profile data.
 */
export type ProfileResponse = {
  data: UserData;
  status: "success" | "error" | string;
  message: string;
};

/**
 * @type UserData
 * @description The user's data.
 */
export type UserData = {
  id: number;
  full_name: string;
  avatar: string;
  email: string;
  phone_code: string;
  phone: string;
  user_type: "customer" | string;
  notifiable: boolean;
  token: string;
  points: number;
  wallet: number;
  country: Country;
  default_address: Address;
  tenant: string;
  is_active: boolean;
};

/**
 * @type Country
 * @description A country's data.
 */
type Country = {
  id: number;
  name: string;
  phone_code: string;
  phone_limit: number;
  flag: string;
};

/**
 * @type Address
 * @description A user's address.
 */
type Address = {
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
};

/**
 * @interface UploadImageResponse
 * @description The response after uploading an image.
 */
export type UploadImageResponse = {
  data: string; // The URL of the uploaded image
  message: string;
  status: string;
};

// LOCATIONS & STORES

/**
 * @interface BrandCountry
 * @description Data for a country related to a brand.
 */
export interface BrandCountry {
  id: number;
  name: string;
  phone_code: string;
  phone_limit: number;
  flag: string;
}

/**
 * @interface Store
 * @description Data for a store.
 */
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

// RESERVATIONS

/**
 * @interface ReservationPayload
 * @description The payload for creating a reservation.
 */
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

// CMS & STATIC PAGES

/**
 * @interface CmsPageBase
 * @description The base interface for a CMS page.
 */
export interface CmsPageBase {
  created_at: string;
  icon: string;
  id: number;
  in_menu: boolean;
  slug: string;
  title: string;
  user_type: "both" | "guest" | "registered";
}

/**
 * @interface CmsPage
 * @description The full interface for a CMS page, including additional data.
 */
export interface CmsPage extends CmsPageBase {
  desc: string;
  image: string;
  heading: string;
  addition_data: CmsAdditionalData[];
}

/**
 * @interface CmsAdditionalData
 * @description Additional data for a CMS page.
 */
export interface CmsAdditionalData {
  id: number;
  image: string;
  heading: string;
  desc: string;
  created_at: string;
}

/**
 * @interface StaticPage
 * @description Data for a static page.
 */
export interface StaticPage {
  id: number;
  title: string;
  slug: string;
  in_menu: boolean;
  icon: string;
  user_type: "both" | "guest" | "auth";
  created_at: string;
}

// PRODUCTS & HOME PAGE

/**
 * @interface CardItem
 * @description Data for a product card item.
 */
export interface CardItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
}

/**
 * @interface Slider
 * @description Data for a homepage slider.
 */
export interface Slider {
  id: number;
  title: string;
  desc: string;
  link: string | null;
  image: string;
}

/**
 * @interface WebContent
 * @description Data for web content on the homepage.
 */
export interface WebContent {
  id: number;
  title: string;
  desc: string;
  image: string;
  google_play?: string;
  app_store?: string;
}

/**
 * @interface HomePageData
 * @description Data for the homepage.
 */
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

// CATEGORIES

/**
 * @interface Category
 * @description A product category.
 */
export interface Category {
  id: number;
  name: string;
  subCategories?: SubCategory[];
}

/**
 * @interface SubCategory
 * @description A sub-category of a product category.
 */
export interface SubCategory {
  id: number;
  name: string;
}

/**
 * @interface ApiCategories
 * @description A category from the API.
 */
export interface ApiCategories {
  subCategories: any;
  id: number;
  name: string;
  desc: string;
  image: string;
  icon: string;
}

// REVIEWS

/**
 * @interface Review
 * @description A user's review of a product.
 */
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

/**
 * @interface ReviewResponse
 * @description The response containing product reviews.
 */
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

// MODIFIERS

/**
 * @interface Modifier
 * @description A product modifier.
 */
export interface Modifier {
  id: number;
  name: string;
  selections_type: "exact" | "min_max";
  min_num_of_selection: number | null;
  max_num_of_selection: number | null;
  item_modifiers: ItemModifier[];
}

/**
 * @interface ItemModifier
 * @description An item within a modifier.
 */
export interface ItemModifier {
  id: number;
  name: string;
  image: string;
  price: { price: number; currency: string } | null;
}

// ORDERS

/**
 * @interface OrderItemProduct
 * @description Product details within an order item.
 */
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

/**
 * @interface FoodIcon
 * @description An icon representing a food item's properties.
 */
export interface FoodIcon {
  id: number;
  name: string;
  image: string;
}

/**
 * @interface ProductPrice
 * @description Price details for a product.
 */
export interface ProductPrice {
  price: number;
  currency: string;
  percentage: number;
  discount_value: number;
  price_after: number;
  offer: ProductOffer;
}

/**
 * @interface ProductOffer
 * @description An offer applied to a product.
 */
export interface ProductOffer {
  id: number;
  from_day: string | null;
  to_day: string | null;
  from_time: string | null;
  to_time: string | null;
}

/**
 * @interface OrderItemModifier
 * @description Modifier details for an order item.
 */
export interface OrderItemModifier {
  id: number;
  name: string;
  selections_type: string;
  min_num_of_selection: number;
  max_num_of_selection: number;
  item_modifiers: OrderItemModifierDetail[];
}

/**
 * @interface OrderItemModifierDetail
 * @description Details of an item within an order item modifier.
 */
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

/**
 * @interface OrderItem
 * @description An item within an order.
 */
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
  in_store: boolean;
}

/**
 * @interface OrderPriceDetail
 * @description The price breakdown of an order.
 */
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

/**
 * @interface OrderStatus
 * @description An object representing an order status.
 */
export interface OrderStatus {
  key: string;
  value: string;
  status: string;
  icon: string;
}

/**
 * @interface OrderStore
 * @description Details of the store associated with an order.
 */
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

/**
 * @interface OrderData
 * @description The full data for a single order.
 */
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
