"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePagesStore } from "@/stores/usePagesStore";
import { useLocale } from "next-intl";

export default function CmsPages({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const locale = useLocale();
  const { pages } = usePagesStore();


  const handleClick = (slug) => {
    onClose();
    router.push(`/${locale}/pages/${slug}`);
  };

  return (
    <>
          {pages.map((page) => {
            //   console.log(page);
              return (<div
                  key={page.id}
                  onClick={() => handleClick(page.slug)}
                  className="flex w-full cursor-pointer items-center justify-between gap-3"
              >
                  <div className="flex items-center gap-3 ">
                      <div className="flex h-[55px] w-[55px] items-center justify-center rounded-full bg-secondary p-3">
                          <Image src={page.icon} alt={page.slug} width={30} height={30} className="size-[30px]" />
                    </div>
                      
                      {page.title}
                  </div>
                 {typeof document !== "undefined" && document.dir === "rtl" ? (
                     <ChevronRight style={{ transform: "scaleX(-1)" }} />
                     ) : (
                     <ChevronRight />
                     )}
              </div>
              );
      })}
    </>
  );
}
