"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { useLikedStore } from "@/stores/likedStore";
import WishlistCard from "../cards/WishlistCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@heroui/spinner";
import GlobalSheet from "@/components/shared/GlobalSheet";
import { useTranslations } from "next-intl";

export default function WishList({
  triggerr,
  open,
  onOpenChange,
}: {
  triggerr?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const { likedItems, loading } = useLikedStore();
  const t = useTranslations("WISHLIST_SHEET");


  const totalItems = likedItems.length;
  const hasProducts = totalItems > 0;

  const trigger = triggerr ? (
    triggerr
  ) : (
    <div className="relative cursor-pointer">
      <Image
        src="/assets/icons/navheart.png"
        alt={t("wishlist_title")}
           width={60}
        height={60}
       className="cursor-pointer sm:size-15 size-12"
      />
      {!loading && totalItems > 0 && (
        <span className="bg-primary absolute top-4 right-3 flex size-4 items-center justify-center rounded-full text-[8px] font-semibold text-white">
          {totalItems}
        </span>
      )}
    </div>
  );

  const content = loading ? (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <Spinner size="lg" className="text-text-website-font" />
    </div>
  ) : hasProducts ? (
    <ScrollArea className="w-[97%] overflow-y-auto rounded-md p-4">
      {likedItems.map((product) => (
        <WishlistCard cartProduct={product} key={product.id} />
      ))}
    </ScrollArea>
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-2xl font-bold">{t("no_products_title")}</h2>
      <p>{t("no_products_message")}</p>
    </div>
  );

  return (
    <GlobalSheet
      open={open}
      onOpenChange={onOpenChange}
      title={
        <>
          {t("wishlist_title")}
          {hasProducts && (
            <span className="text-text-website-font ms-2 text-sm font-medium">
              {t("total_items_label", { totalItems })}
            </span>
          )}
        </>
      }
      description=""
      side="right"
      trigger={trigger}
    >
      {content}
    </GlobalSheet>
  );
}