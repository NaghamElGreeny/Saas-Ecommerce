"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

import Image from "next/image";
import { useLocale } from "next-intl";
function ToggleLang() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const setLanguage = () => {
    const lang = locale === "en" ? "ar" : "en";

    Cookies.set("NEXT_LOCALE", lang);
    if (pathname.includes("/ar")) {
      router.push(`/${lang}/${pathname.slice(3)}`);
    } else {
      router.push(`/${lang}/${pathname}`);
    }
  };
  return (
    <button
      onClick={setLanguage}
      className="hover:text-primary flex cursor-pointer flex-row items-center gap-1 px-2 py-1"
    >
      <Image
        src="/assets/globe.svg"
        alt="Language icon"
        width={24}
        height={24}
        className="text-text-website-font hover:text-primary"
      />
      {locale === "en" ? "ع" : "EN"}
    </button>
  );
}

export default ToggleLang;
