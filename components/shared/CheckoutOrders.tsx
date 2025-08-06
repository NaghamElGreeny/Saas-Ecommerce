"use client";
import React from "react";
import { useCartStore } from "@/stores/cartStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import CheckoutCartItem from "./CheckoutCartItem";

function CheckoutOrders() {
  const { cart } = useCartStore();
  const products = cart?.data?.products  || [];
  return (
    <>
      <ScrollArea className="scrollArea max-h-[350px] w-[97%] overflow-y-auto rounded-md p-4">
        {products.map((product) => (
          <CheckoutCartItem cartProduct={product} key={product.id} />
        ))}
      </ScrollArea>
    </>
  );
}

export default CheckoutOrders;
