import Link from "next/link";
import { CmsPage } from "@/utils/types";


export default function CmsLinks({ cms }: { cms: CmsPage[] }) {
  return (
    <>
      {cms.map((page) => {
    
        return (
          <Link key={page.id} href={`/pages/${page.slug}`} className="hover:text-primary whitespace-nowrap">
             {/* {t(`${page.slug}`)} */}
             {page.title}
          </Link>
        );
      })}
    </>
  );
}
