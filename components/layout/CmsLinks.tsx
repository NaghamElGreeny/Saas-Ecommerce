import { CmsPage } from "@/utils/types";
import LocalePath from "../localePath";

export default function CmsLinks({ cms }: { cms: CmsPage[] }) {
  return (
    <>
      {cms.map((page) => {
        return (
          <>
            {page.slug === "contact-us" ? (
              <LocalePath
                key={page.id}
                href={`/contact`}
                className="hover:text-primary whitespace-nowrap"
              >
                {page.title}
              </LocalePath>
            ) : (
              <LocalePath
                key={page.id}
                href={`/pages/${page.slug}`}
                className="hover:text-primary whitespace-nowrap"
              >
                {page.title}
              </LocalePath>
            )}
          </>
        );
      })}
    </>
  );
}
