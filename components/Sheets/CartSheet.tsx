"use client";
import React, { useEffect, useState } from "react";
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

import Image from "next/image";
import { getCart } from "@/services/ClientApiHandler";
import {  CartData, CartResponse } from "@/utils/cartTypes";
import CartItemCard from "../shared/CartItem";
// import { getCart } from "@/services/ClientApiHandler";
// import { useCartStore } from "@/stores/cartStore";
export default function CartSheet() {
  const [cart, setCart] = useState<CartData>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [CartResponse, setCartResponse] = useState<CartResponse>();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCartResponse(data);
        setCart(data.data)
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    fetchCart();
  }, []);
// console.log('cart:',cart)
  return (
    <>
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
        <SheetContent className="rounded-l-2xl bg-bg items-center md:min-w-[600px] w-[100%] ">
          <SheetHeader className="bg-white w-full">
            <SheetTitle className="text-2xl font-bold ">
              My Cart
              <span className="text-primary ms-2 text-sm font-medium">
                ({cart?.products.length} items)
              </span>
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-1/2  w-[97%] rounded-md p-4 overflow-y-auto ">
            {cart?.products?.map((product) => (
              // <div className="card" >
              <CartItemCard cartProduct={product}  key={product.id}/>
                // </div>
            ))} 
          </ScrollArea>
          <SheetFooter className="flex flex-col items-center justify-center">
            <SheetClose asChild />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
