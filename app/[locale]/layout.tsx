// app/[locale]/layout.tsx

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { cookies } from 'next/headers';

// import '@/globals.scss';
// import 'aos/dist/aos.css';

// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
// import AosWrapper from '@/components/layout/AosWrapper';
// import ScrollBtn from '@/components/ui/ScrollBtn';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Read theme from cookies
  const appCookies = await cookies();
  const themeMode = appCookies.get('modeLayout')?.value ?? '';

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={themeMode}
    >
      <head>
        <title>{locale === 'ar' ? 'نغم' : 'Nagham'}</title>
        <link rel="icon" href="/assets/logo/logo-head.png" />
      </head>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider locale={locale}>
          {/* <AosWrapper>
            <Navbar /> */}
          {children}
          {/* <Footer />
          </AosWrapper>
          <ScrollBtn /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
