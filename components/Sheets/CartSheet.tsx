"use client";
import React, { useEffect } from "react";
import {Spinner} from "@heroui/spinner";
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
import CartItemCard from "../shared/CartItem";
import Link from "next/link";
import TotalOrder from "../shared/TotalOrder";
import { useCartStore } from "@/stores/cartStore";
export default function CartSheet() {
  // const { actionLoading, updateProductQuantity } = useCartStore();
  const { cart, fetchCart, loading, error, actionLoading, updateProductQuantity } = useCartStore();

  useEffect(() => {
    fetchCart();

  }, [fetchCart]);
  // if (loading) return <p>جار تحميل السلة...</p>;
  // if (error) return <p style={{ color: 'red' }}>{error}</p>;
console.log(cart)

  return (
    <>
      {/* <Spinner classNames={{label: "text-foreground mt-4"}} label="wave" variant="wave" /> */}
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
                ({cart?.data?.products.length} items)
              </span>
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-3/5 w-[97%] overflow-y-auto rounded-md p-4">
            {cart?.data?.products?.map((product) => (
              <CartItemCard cartProduct={product} key={product.id} />
            ))}
          </ScrollArea>
          <SheetTitle className="m-0 w-[90%] p-0 text-2xl">
            Order Summary
          </SheetTitle>
          {cart?.data?.products ? (
            <>
              <TotalOrder CartResponse={cart} />
    {/* <div className="order-summary h-fit w-[90%] space-y-4 rounded-2xl bg-white p-4">
      <div className="subTotal flex w-full justify-between">
        <h3>
          Subtotal{" "}
          <span className="ms-1 text-sm text-gray-300">
            {" "}
            ({cart?.data?.products.length} items)
          </span>
        </h3>
        <h3>
          {cart.price.sun_total}{" "}
          <span>{cart.currency}</span>
        </h3>
      </div>
      <div className="VAT flex w-full justify-between">
        <h3>VAT</h3>
        <h3>
          {cart.price.coupon_price}{" "}
          <span>{cart.currency}</span>
        </h3>
      </div>
      <div className="Surcharge flex w-full justify-between">
        <h3>Surcharge</h3>
        <h3>
          {cart.price.surcharge}{" "}
          <span>{cart.currency}</span>
        </h3>
      </div>
      <hr />
      <div className="totalAmount flex w-full justify-between font-bold">
        <h3>Total Amount</h3>
        <h3>
          {cart.price.total}{" "}
          <span className="font-normal">{cart.currency}</span>
        </h3>
      </div>
    </div> */}
  
    <SheetFooter className="flex w-[70%] flex-col items-center justify-center">
      <SheetClose asChild />
      <Link
        href="/"
        className="flex h-16 w-full items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white"
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
  <div className="no-items text-center">
    <h2>No products</h2>
    <p>You don&#39;t have any products yet in your cart</p>
  </div>
)}
        </SheetContent>
      </Sheet>
    </>
  );
}
