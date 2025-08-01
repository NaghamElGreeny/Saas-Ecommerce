"use client";

import {  useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import CartItemCard from "../cards/CartItem";
import TotalOrder from "../shared/TotalOrder";
import { ScrollArea } from "@/components/ui/scroll-area";
import GlobalSheet from "@/components/shared/GlobalSheet";
import { useTranslations } from "next-intl"; 
import { Spinner } from "../atoms/UI/Spinner";

export default function CartSheet() {
  const { cart, loading } = useCartStore();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("CART_SHEET"); 


  const products = cart?.data?.products || [];
  const hasProducts = products.length > 0;
  const totalItems = products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const trigger = (
    <div className="relative cursor-pointer">
      <Image
        src="/assets/icons/cart.png"
        alt="cart"
        width={60}
        height={60}
       className="cursor-pointer  sm:size-15 size-12"
      />
      {!loading && totalItems > 0 && (
        <span className="bg-primary absolute top-4 right-3 flex size-4 items-center justify-center rounded-full text-[8px] font-semibold text-white">
          {totalItems}
        </span>
      )}
    </div>
  );

  const footer = hasProducts && (
    <button
      onClick={() => {
        setOpen(false); 
        router.push("/checkout"); 
      }}
      className="confirm-btn  flex h-16 w-full items-center justify-center gap-2 rounded-full"
    >
      <span className="text-2xl">{t("checkout")}</span>
      <Image
        src="/assets/icons/arrow.svg"
        alt="checkout"
        width={24}
        height={24}
        className="confirm-btn rounded-full rtl:rotate-180"
      />
    </button>
  );

  const content = loading ? (
    <div className="flex h-full w-full items-center justify-center">
      <span className="animate-pulse">
        <Spinner variant="primary" size="large" />
      </span>
    </div>
  ) : hasProducts ? (
    <>
      <ScrollArea className="w-[97%] overflow-y-auto rounded-md p-4">
        {products.map((product) => (
          <CartItemCard cartProduct={product} key={product.id} />
        ))}
      </ScrollArea>
      <TotalOrder sheet />
    </>
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-2xl font-bold">{t("no_products_title")}</h2>{" "}
      <p>{t("no_products_message")}</p> 
    </div>
  );

  return (
    <GlobalSheet
      open={open}
      onOpenChange={setOpen}
      title={
        <>
          {t("my_cart")} 
          {hasProducts && (
            <span className="text-text-website-font ms-2 text-sm font-medium">
              ({totalItems} {t("items")}) 
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