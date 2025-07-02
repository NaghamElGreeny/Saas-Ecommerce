"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useLikedStore } from "@/stores/likedStore";
import WishlistCard from "../cards/WishlistCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@heroui/spinner";
import GlobalSheet from "@/components/shared/GlobalSheet"; // غير الباث لو لازم

export default function WishList() {
  const { likedItems, fetchLikedItems, loading } = useLikedStore();

  useEffect(() => {
    fetchLikedItems();
  }, [fetchLikedItems]);

  const totalItems = likedItems.length;
  const hasProducts = totalItems > 0;

  const trigger = (
    <div className="relative cursor-pointer">
      <Image
        src="/assets/icons/navheart.png"
        alt="wishlist"
        width={60}
        height={60}
        className="size-[60px] shrink-0"
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
      <Spinner size="lg" className="text-primary" />
    </div>
  ) : hasProducts ? (
    <ScrollArea className="w-[97%] overflow-y-auto rounded-md p-4">
      {likedItems.map((product) => (
        <WishlistCard cartProduct={product} key={product.id} />
      ))}
    </ScrollArea>
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-2xl font-bold">No products</h2>
      <p>You don&apos;t have any products yet in your wishlist</p>
    </div>
  );

  return (
    <GlobalSheet
      open={undefined} // لو محتاج تخليه controlled قولهالي
      onOpenChange={() => {}} // placeholder
      title={
        <>
          WishList
          {hasProducts && (
            <span className="text-primary ms-2 text-sm font-medium">
              ({totalItems} items)
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
