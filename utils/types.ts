/* eslint-disable @typescript-eslint/no-explicit-any */
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


export interface Category  {
  id: number;
  name: string;
  subCategories?: SubCategory[];
};

export interface SubCategory  {
  id: number;
  name: string;
};

export interface ApiCategories{
  subCategories: any;
  id: number;
  name: string;
  desc: string;
  image: string;
  icon: string;
}
