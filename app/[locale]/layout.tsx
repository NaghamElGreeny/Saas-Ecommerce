import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
// import "../../styles/globals.scss";
import "@/styles/globals.css"
import { cookies } from "next/headers";
// import ChangeThem from "@/components/layout/changeThem";
// import AosWrapper from "@/components/layout/AosWrapper";
// import "aos/dist/aos.css";
import { Toaster } from 'react-hot-toast';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const appCookies = await cookies()

  const themeMode = appCookies.get('modeLayout')

  return (
    <html className={`${themeMode ? themeMode : ''}`} lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <title>{locale === "ar" ? "نغم" : "MEA"}</title>
        <link rel="icon" href="/assets/logo/logo.svg" />
      </head>
      <body className=" flex flex-col ">
        <Toaster position="top-center" />
        {/* <ChangeThem /> */}
        <NextIntlClientProvider>
          <>
            {/* <AosWrapper> */}

            {/* <Navbar /> */}
            {children}
            {/* <Footer /> */}
            {/* </AosWrapper> */}
            {/* <ScrollBtn /> */}
          </>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
