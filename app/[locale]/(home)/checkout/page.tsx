import React from "react";
import TotalOrder from "@/components/shared/TotalOrder";
import CheckoutOrders from "@/components/shared/CheckoutOrders";
import OrderForm from "@/components/sections/OrderForm";
import PromoCodeInput from "@/components/shared/PromocodeInput";


export default async function ChecoutPage({ searchParams }:{searchParams:Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  return (
    <>
      <div className="containerr my-12 grid min-h-[70vh] w-full grid-cols-1 gap-y-4 px-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          {/* order form */}
          <OrderForm params={ params} />
        </div>
        <div className="order-1 rounded-2xl bg-white px-2 lg:order-2">
          {/* orders show*/}
          <CheckoutOrders />

          {/* promo code*/}
          <PromoCodeInput />

          <TotalOrder/>
        </div>
      </div>
    </>
  );
}
