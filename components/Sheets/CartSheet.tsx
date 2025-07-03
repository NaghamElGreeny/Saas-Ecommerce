"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import CartItemCard from "../cards/CartItem";
import TotalOrder from "../shared/TotalOrder";
import { Spinner } from "@heroui/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import GlobalSheet from "@/components/shared/GlobalSheet"; // adjust path if needed

export default function CartSheet() {
  const { cart, fetchCart, loading } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const products = cart?.data?.products || [];
  const hasProducts = products.length > 0;
  const totalItems = products.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  const trigger = (
    <div className="relative cursor-pointer">
      <Image
        src="/assets/icons/cart.png"
        alt="cart"
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

  const footer = hasProducts && (
    <Link
      href="/checkout"
      className="bg-primary flex h-16 w-full items-center justify-center gap-2 rounded-full text-white"
    >
      <span className="text-2xl">Checkout</span>
      <Image
        src="/assets/icons/arrow.svg"
        alt="checkout"
        width={24}
        height={24}
      />
    </Link>
  );

  const content = loading ? (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <Spinner size="lg" className="text-text-website-font" />
    </div>
  ) : hasProducts ? (
    <>
      <ScrollArea className="w-[97%] overflow-y-auto rounded-md p-4">
        {products.map((product) => (
          <CartItemCard cartProduct={product} key={product.id} />
        ))}
      </ScrollArea>
      <TotalOrder sheet={true} />
    </>
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-2xl font-bold">No products</h2>
      <p>You don&#39;t have any products yet in your cart</p>
    </div>
  );

  return (
    <GlobalSheet
      open={undefined} // if you're using internal state, set it
      onOpenChange={() => {}} // optional: if you need controlled behavior
      title={
        <>
          My Cart
          {hasProducts && (
            <span className="text-text-website-font ms-2 text-sm font-medium">
              ({totalItems} items)
            </span>
          )}
        </>
      }
      description=""
      side="right"
      trigger={trigger}
      footer={footer}
    >
      {content}
    </GlobalSheet>
  );
}
