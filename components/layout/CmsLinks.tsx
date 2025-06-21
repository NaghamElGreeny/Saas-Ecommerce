import Link from "next/link";
import { useLocale } from "next-intl";
import { CmsPages } from "@/utils/types";

const cmsTranslationMap: Record<string, { en: string; ar: string }> = {
  "تواصل معنا": { en: "Contact Us", ar: "تواصل معنا" },
  "من نحن": { en: "About Us", ar: "من نحن" },
  "الشروط والاحكام": { en: "Terms and Conditions", ar: "الشروط والأحكام" },
  "سياسة الخصوصية": { en: "Privacy Policy", ar: "سياسة الخصوصية" },
};

export default function CmsLinks({ cms }: { cms: CmsPages[] }) {
  const locale = useLocale();

  return (
    <>
      {cms.map((page) => {
        const translatedTitle = cmsTranslationMap[page.title]?.[locale] || page.title;
        return (
          <Link key={page.id} href={`/pages/${page.slug}`} className="hover:opacity-80 whitespace-nowrap">
            {translatedTitle}
          </Link>
        );
      })}
    </>
  );
}
