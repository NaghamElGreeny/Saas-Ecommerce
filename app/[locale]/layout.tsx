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
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale })
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const appCookies = await cookies()

  const themeMode = appCookies.get('modeLayout')

  // const setToken = useAuthStore((state) => state.setToken);
  // // توكن 
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) setToken(token);
  // }, [setToken]);


  return (
    <html className={`${themeMode ? themeMode : ''}`} lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <title>{locale === "ar" ? "نغم" : "MEA"}</title>
        <link rel="icon" href="/assets/logo/logo.svg" />
      </head>
      <body className=" flex flex-col ">
        <Toaster position="top-center" />
        {/* <ChangeThem /> */}
        <NextIntlClientProvider messages={messages}>
          <>
            <AuthProvider />
            {children}
            
          </>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
