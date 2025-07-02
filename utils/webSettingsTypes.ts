export type WebsiteColor = {
  key: string;
  value: string;
};

export type WebsiteCustomization = {
  key: string;
  value: boolean | string;
};

export type WebsiteSetting = {
  key: string;
  value: string;
};

export type PhoneNumber = {
  phone: string;
  phone_code: string;
  flag: string;
};

export type ContactUs = {
  key: string;
  value:
    | string
    | { lat: string; lng: string; location: string }
    | string[]
    | PhoneNumber[];
};

export type PaymentMethod = {
  key: string;
  value: boolean;
};

export type WebsiteData = {
  website_colors: WebsiteColor[];
  website_customization: WebsiteCustomization[];
  website_setting: WebsiteSetting[];
  contact_us: ContactUs[];
  payment_methods: PaymentMethod[];
};
