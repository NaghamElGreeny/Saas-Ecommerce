"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { useCartStore } from "@/stores/cartStore";
import CartItemCard from "../shared/CartItem";
import TotalOrder from "../shared/TotalOrder";
 import { Spinner } from "@heroui/spinner";

export default function CartSheet() {
  const { cart, fetchCart, loading } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const products = cart?.data?.products || [];
  const hasProducts = products.length > 0;

  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">
        <Image
          src="/assets/icons/cart.png"
          alt="cart"
          width={60}
          height={60}
          className="size-[60px]"
        />
      </SheetTrigger>

      <SheetContent className="bg-bg w-full items-center rounded-l-2xl md:min-w-[600px]">
        <SheetHeader className="w-full rounded-tl-2xl bg-white">
          <SheetTitle className="text-2xl font-bold">
            My Cart
            {hasProducts && (
              <span className="text-primary ms-2 text-sm font-medium">
                ({products.length} items)
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
              {products.map((product) => (
                <CartItemCard cartProduct={product} key={product.id} />
              ))}
            </ScrollArea>

            <TotalOrder CartResponse={cart} />

            <SheetFooter className="flex w-[70%] flex-col items-center justify-center">
              <SheetClose asChild />
              <Link
                href="/"
                className="flex h-16 w-full items-center justify-center gap-2 rounded-full bg-primary text-white"
              >
                <span className="text-2xl">Checkout</span>
                <Image
                  src="/assets/icons/arrow.svg"
                  alt="checkout"
                  width={24}
                  height={24}
                />
              </Link>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-center">
            <h2 className="mb-4 text-2xl font-bold">No products</h2>
            <p>You don&#39;t have any products yet in your cart</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
