import "@/styles/globals.css"
// import { NextIntlClientProvider, hasLocale } from "next-intl";
// import { notFound } from "next/navigation";
// import { routing } from "@/i18n/routing";
// import { cookies } from "next/headers";
// import { Toaster } from 'react-hot-toast';
// import { getMessages } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export default async function LocaleLayout({
    children,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>


    );
}
