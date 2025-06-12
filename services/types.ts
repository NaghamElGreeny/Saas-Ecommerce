export interface LoginPayload {
  phone_code: string;
  phone: string;
  password: string;
  device_type: "web" | "ios" | "android";
  device_token?: string;
}

export interface LogoutPayload {
  device_type: "web" | "ios" | "android";
  device_token?: string;
}

export interface RegisterPayload {
  phone_code: string;
  phone: string;
  password: string;
  full_name: string;
  password_confirmation: string;
  email: string;
  device_type: "web" | "ios" | "android";
  device_token?: string;
}

export interface ResetPasswordPayload {
  phone: string;
  phone_code: string;
  reset_code: string;
  password: string;
  password_confirmation: string;
  device_type?: "web" | "ios" | "android";
}

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

export interface CmsPages { 
  
  created_at: string;
  icon: string;
  id: number;
  in_menu: boolean;
  slug: string;
  title: string;
  user_type: "both" | "guest" | "registered";
}

export interface CmsPage extends CmsPages {
  desc: string;
  image: string;
  heading: string;
  addition_data: Array<{
    id: number;
    image: string;
    heading: string;
    desc: string;
    created_at: string;
  }>;
}
// export interface Slider {
//   id: number;
//   title: string;
//   desc: string;
//   image: string;
//   link: string | null;
// }
export interface CardItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
}

export interface HomePageData {
  content: Product[];
  type: string;
  text: string;
search_by?:string;
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
