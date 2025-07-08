"use client";
import React from "react";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@heroui/spinner";
import { useLikedStore } from "@/stores/likedStore";
import WishlistCard from "../cards/WishlistCard";
function WishListContent() {
  const { likedItems, loading } = useLikedStore();

  const totalItems = likedItems.length;
  const hasProducts = totalItems > 0;
  return (
    <>
      <SheetContent className="bg-bg w-full items-center rounded-l-2xl sm:min-w-[550px]">
        <SheetHeader className="w-full rounded-tl-2xl bg-white">
          <SheetTitle className="text-2xl font-bold">
            WishList
            {hasProducts && (
              <span className="text-text-website-font ms-2 text-sm font-medium">
                ({totalItems} items)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {loading ? (
          <div className="flex h-[60vh] w-full items-center justify-center">
            <Spinner size="lg" className="text-text-website-font" />
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
    </>
  );
}

export default WishListContent;
