import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import { getMessages } from "next-intl/server";
import AuthProvider from "./auth/components/AuthProvider";
import { getSettings } from "@/services/ApiHandler";
import { Metadata } from "next";
import SettingsHydration from "@/components/SettingsHydration";
import { convertSettingsArrayToObject } from "@/utils/settings";
import 'leaflet/dist/leaflet.css';
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {

const settings = await getSettings();
const rawSettingsArray = settings.data?.website_setting || [];

const webSettings = convertSettingsArrayToObject(rawSettingsArray);
  console.log('raw',settings);

  return {
    title: webSettings.website_title || "MEA - Telecome",
    description: "test",
    icons: {
      icon: webSettings.website_fav_icon || "/assets/logo/logo.svg",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  const settings = await getSettings() ;
  const webSettings = convertSettingsArrayToObject(settings.data);

  const appCookies = await cookies();
  const themeMode = appCookies.get("modeLayout")?.value ?? "";

  return (
    <html
      className={themeMode}
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <head>
        {/* <link rel="icon" href={webSettings.website_fav_icon || "/logo.png"} /> */}
      </head>
      <body className="flex flex-col">
        <Toaster position="top-center" />
        <NextIntlClientProvider messages={messages}>
          <SettingsHydration data={settings.data} />
          <AuthProvider />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
