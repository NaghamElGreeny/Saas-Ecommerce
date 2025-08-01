export type WebsiteColor = {
  key:
    | "website_primary_color"
    | "website_secondary_color"
    | "website_tertiary_color"
    | "website_light_border_color"
    | "website_font_color"
    | "website_light_font_color"
    | "website_success_color"
    | "website_warning_color"
    | "website_dark_border_color"
    | "website_white_color"
    | "website_footer_color";
  value: string;
};

export type WebsiteCustomization = {
  key:
    | "top_bar_availability"
    | "top_bar_logo_position"
    | "slider_availability"
    | "slider_multi_image"
    | "title_availability"
    | "footer_main_part_availability"
    | "offers"
    | "driver_tips"
    | "schedule_orders";
  value: boolean | string;
};

export type WebsiteSetting = {
  key:
    | "website_logo"
    | "website_default_language"
    | "website_fav_icon"
    | "footer_desc"
    | "website_title"
    | "website_host_name"
    | "website_background_image";
  value: string;
};

export type ContactUs = 
  | {
      key: "store_address";
      value: {
        lat: string;
        lng: string;
        location: string;
      };
    }
  | {
      key: "store_location";
      value: string;
    }
  | {
      key: "email";
      value: string[];
    }
  | {
      key: "phone_number";
      value: Array<{
        phone: string;
        phone_code: string;
        flag: string;
      }>;
    };

export type PaymentMethod = {
  key: "cash_on_delivery" | "card" | "loyalty_card" | "wallet";
  value: boolean;
};

export type WebsiteData = {
  website_colors: WebsiteColor[];
  website_customization: WebsiteCustomization[];
  website_setting: WebsiteSetting[];
  contact_us: ContactUs[];
  payment_methods: PaymentMethod[];
};

export type SettingsResponse = {
  status: string;
  message: string;
  data: WebsiteData;
};
