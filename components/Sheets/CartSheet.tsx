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
import { CartData, CartResponse } from "@/utils/cartTypes";
import CartItemCard from "../shared/CartItem";
import Btn from "../ui/Btn";
import Link from "next/link";
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
        setCart(data.data);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    fetchCart();
  }, []);
  // console.log("cart prices:", CartResponse.price);
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
        <SheetContent className="bg-bg w-[100%] items-center rounded-l-2xl md:min-w-[600px]">
          <SheetHeader className="w-full bg-white">
            <SheetTitle className="text-2xl font-bold">
              My Cart
              <span className="text-primary ms-2 text-sm font-medium">
                ({cart?.products.length} items)
              </span>
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="mb-0 h-2/5 w-[97%] overflow-y-auto rounded-md p-4">
            {cart?.products?.map((product) => (
              // <div className="card" >
              <CartItemCard cartProduct={product} key={product.id} />
              // </div>
            ))}
          </ScrollArea>
          <SheetTitle className="mt-0 w-[90%] text-2xl">
            Order Summary
          </SheetTitle>
          {cart &&
            <div className="order-summary  h-fit w-[90%] rounded-2xl bg-white p-4 space-y-4">
            <div className="subTotal flex w-full justify-between">
              <h3>
                Subtotal <span> ({cart?.products.length} items)</span>
              </h3>
              <h3>
               
                {CartResponse.price.sun_total}{" "}
                <span>{CartResponse.currency}</span>
              </h3>
            </div>
            <div className="VAT flex w-full flex justify-between">
              <h3>VAT</h3>
              <h3>
                {CartResponse.price.coupon_price}{" "}
                <span>{CartResponse.currency}</span>
              </h3>
            </div>
            <div className="Surcharge w-full flex justify-between">
                <h3>Surcharge</h3>
              <h3>
                {CartResponse.price.surcharge}{" "}
                <span>{CartResponse.currency}</span>
              </h3>
            </div>
            <div className="totalAmount w-full flex justify-between">      <h3>Total Amount</h3>
              <h3>
                {CartResponse.price.total}{" "}
                <span>{CartResponse.currency}</span>
              </h3></div>
            </div>}
          {/* {CartResponse &&
            CartResponse?.price?.Array.map((key) => {
            
            })} */}
          <SheetFooter className="flex flex-col items-center w-[70%] justify-center">
            <SheetClose asChild />
           <Link
            href={`/`}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white"
          >
            <Image src="" alt="checkout" width={24} height={24} />
            <span>Checkout</span>
          </Link>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
