import { CmsPage } from "@/utils/types";
import LocalePath from "../localePath";

export default function CmsLinks({ cms }: { cms: CmsPage[] }) {
  return (
    <>
    
      {cms.map((page) => {
        const href = page.slug === "contact-us" ? "/contact" : `/pages/${page.slug}`;
        return (
          <LocalePath
            key={page.id}
            href={href}
            className="hover:text-primary whitespace-nowrap"
          >
            {page.title}
          </LocalePath>
        );
      })}
    
    </>
  );
}
