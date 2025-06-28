"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@heroui/spinner";
import { useLikedStore } from "@/stores/likedStore";
import WishlistCard from "../shared/WishlistCard";

export default function WishList() {
  const { likedItems, fetchLikedItems, loading } = useLikedStore();
  useEffect(() => {
    fetchLikedItems();
  }, [fetchLikedItems]);
  console.log(likedItems);
  const totalItems = likedItems.length;
  const hasProducts = totalItems > 0;
  return (
    <Sheet>
      <SheetTrigger className="relative cursor-pointer">
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
      </SheetTrigger>

      <SheetContent className="bg-bg w-full items-center rounded-l-2xl sm:min-w-[550px]">
        <SheetHeader className="w-full rounded-tl-2xl bg-white">
          <SheetTitle className="text-2xl font-bold">
            WishList
            {hasProducts && (
              <span className="text-primary ms-2 text-sm font-medium">
                ({totalItems} items)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {loading ? (
          <div className="flex h-[60vh] w-full items-center justify-center">
            <Spinner size="lg" className="text-primary" />
          </div>
        ) : hasProducts ? (
          <>
            <ScrollArea className="w-[97%] overflow-y-auto rounded-md p-4">
              {likedItems.map((product) => (
                <WishlistCard cartProduct={product} key={product.id} />
              ))}
            </ScrollArea>

            <SheetFooter className="flex w-[70%] flex-col items-center justify-center">
              <SheetClose asChild></SheetClose>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-center">
            <h2 className="mb-4 text-2xl font-bold">No products</h2>
            <p>You don&#39;t have any products yet in your WishList</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
