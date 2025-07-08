import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css"
import { cookies } from "next/headers";
import { Toaster } from 'react-hot-toast';
import { getMessages } from "next-intl/server";
// import { useEffect } from 'react';
// import { useAuthStore } from '@/stores/authStore';
import AuthProvider from "./auth/components/AuthProvider";
import { getSettings } from "@/services/ApiHandler";
import { Metadata } from "next";
import SettingsHydration from "@/components/SettingsHydration";

// export async function generateMetadata({
//   params,
// }: {
//   params: { locale: string };
// }): Promise<Metadata> {
//   const { locale } = await params;
//   const settings = await getSettings();

//   return {
//     title: settings.data?.website_setting.website_title,
//     icons: {
//       icon: settings.data?.website_setting.website_logo,
//     },
//   };
// }

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  const settings = await getSettings();

  return {
    title: 'test',
    description:'test',
    icons: {
      icon: "/logo.png",
    },
    // openGraph: {
    //   // images: "/logo.png",
    //   title: locale === "ar" ? settings.meta_title_ar : settings.meta_title_en,
    //   description: isArabic ? settings.meta_desc_ar : settings.meta_desc_en,
    // },
  };
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
params: { locale: string }

}) {
  const { locale } = params;
  const messages = await getMessages({ locale })
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const settings = await getSettings();
  const webSettings = settings.data?.website_setting;
  console.log(webSettings);
  const appCookies = await cookies()

  const themeMode = appCookies.get('modeLayout')

  return (
    <html className={`${themeMode ? themeMode : ''}`}
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <head>
        {/* <title>{webSettings.website_title}</title>
        <link rel="icon" href={webSettings.website_logo }/> */}
      </head>
      <body className=" flex flex-col ">
        <Toaster position="top-center" />
        {/* <ChangeThem /> */}
        <NextIntlClientProvider messages={messages}>
          <SettingsHydration data={settings.data} />
            <AuthProvider />
            {children}
            
         

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
