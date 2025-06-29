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
export interface Modifier {
  id: number;
  name: string;
  selections_type: "exact" | "min_max";
  min_num_of_selection: number | null;
  max_num_of_selection: number | null;
  item_modifiers: {
    id: number;
    name: string;
    image: string;
    price: { price: number; currency: string } | null;
  }[];
};

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

export type OrderData = {
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
  store: {
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
  };
  driver: null;
  item: {
    id: number;
    product: {
      id: number;
      name: string;
      slug: string;
      desc: string;
      type: string;
      image: string;
      food_icon: {
        id: number;
        name: string;
        image: string;
      }[];
      rating: number;
      review_count: number;
      rate: number;
      is_favourite: boolean;
      favourite_id: number | null;
      price: {
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
      };
    };
    quantity: number;
    total_price: number;
    note: string | null;
    combo: any[]; // إذا عايزة تعملي نوع مفصل ليه، ممكن تبعتيلي شكل الـ combo
    sub_modifiers: {
      id: number;
      name: string;
      selections_type: string;
      min_num_of_selection: number;
      max_num_of_selection: number;
      item_modifiers: {
        id: number;
        order_item_id: number;
        price: {
          price: number;
          currency: string;
        };
        name: string;
        image: string;
        quantity: number;
      }[];
    }[];
    is_rate: boolean;
    review: {
      id: number;
      rate: number;
      review: string;
      note: string;
    };
  }[];
  item_count: number;
  cancel_reason: string | null;
  desc_cancel_reason: string | null;
  price_detail: {
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
  };
  call_center: string;
  call_center_message: string;
  order_status: {
    key: string;
    value: string;
    status: string;
    icon: string;
  }[];
};
