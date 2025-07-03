import Link from "next/link";
import { useTranslations } from "next-intl";
import { CmsPage } from "@/utils/types";


export default function CmsLinks({ cms }: { cms: CmsPage[] }) {

    const t = useTranslations("NAV");
  return (
    <>
      {cms.map((page) => {
    
        return (
          <Link key={page.id} href={`/pages/${page.slug}`} className="hover:opacity-80 whitespace-nowrap">
             {t(`${page.slug}`)}
          </Link>
        );
      })}
    </>
  );
}
