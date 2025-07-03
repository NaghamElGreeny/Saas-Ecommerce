import React from "react";
import TotalOrder from "@/components/shared/TotalOrder";
import CheckoutOrders from "@/components/shared/CheckoutOrders";
import OrderForm from "@/components/OrderForm/OrderForm";
import PromoCodeInput from "@/components/shared/PromocodeInput";


export default async function ChecoutPage({ searchParams }:{searchParams:Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  return (
    <>
      <div className="py-6 grid min-h-[70vh] w-full grid-cols-1 gap-y-4 px-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          {/* order form */}
          <OrderForm params={ params} />
        </div>
        <div className="order-1  p-4 lg:order-2 bg-white rounded-3xl flex flex-col items-center">
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
