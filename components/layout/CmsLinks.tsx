import { CmsPage } from "@/utils/types";
import LocalePath from "../localePath";

export default function CmsLinks({ cms }: { cms: CmsPage[] }) {
  return (
    <>
      {cms.map((page) => {
        return (
          <LocalePath
            key={page.id}
            href={`/pages/${page.slug}`}
            className="hover:text-primary whitespace-nowrap"
          >
            {/* {t(`${page.slug}`)} */}
            {page.title}
          </LocalePath>
        );
      })}
    </>
  );
}
