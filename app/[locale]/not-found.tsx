// app/not-found.tsx (Server Component)
import Link from "next/link";
import Head from "next/head";
import { cookies } from "next/headers";
import "@/styles/globals.css"
import Image from "next/image";

export default async function NotFoundPage() {
  const cookieStore =await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const isArabic = locale === "ar";

  return (
    <>
      <Head>
        <title>{isArabic ? "الصفحة غير موجودة" : "Page Not Found"}</title>
      </Head>

      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
      >
        <div className="text-center max-w-md">
          <Image
            src="/assets/images/cuate.png"
            alt="404 Not Found"
            className="mx-auto mb-8 w-4/5"
          />
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
            404 - {isArabic ? "الصفحة غير موجودة" : "Page Not Found"}
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            {isArabic
              ? "عذرًا، الصفحة التي تبحث عنها غير موجودة."
              : "Sorry, the page you're looking for doesn't exist."}
          </p>
          <Link href={`/${locale}`}>
            <span className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#5A6AE8] text-white font-medium shadow-md hover:bg-[#4e5dd8] transition cursor-pointer">
              {isArabic ? "العودة للرئيسية" : "Go to Home"}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
