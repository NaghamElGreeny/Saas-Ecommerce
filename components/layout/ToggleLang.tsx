import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
function ToggleLang() {
  const router = useRouter();
  const pathname = usePathname();
  // You need to define locale, or get it from props/context/etc.
  // For now, let's assume it's a prop or you can adjust as needed.
  const locale = pathname?.split("/")[1] === "ar" ? "ar" : "en";

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = newLocale; // نبدل اللغة في أول جزء من الرابط
    const newPath = `/${segments.join("/")}`;
    router.push(newPath);
  };
  return (
    <button
      onClick={toggleLocale}
      className="flex flex-row items-center gap-1 px-2 py-1"
    >
      <Image
        src="/assets/globe.svg"
        alt="Language icon"
        width={24}
        height={24}
        className="text-text-website-font"
        color="blue"
      />
      {locale === "en" ? "ع" : "EN"}
    </button>
  );
}

export default ToggleLang;
