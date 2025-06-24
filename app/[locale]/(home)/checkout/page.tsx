"use client";
import React from "react";

// import CartItemCard from "@/components/shared/CartItem";

// import BaseInputField from "@/components/shared/BaseInputField";
// import { t } from "i18next";
// import { useTranslations } from "next-intl";
import TotalOrder from "@/components/shared/TotalOrder";
import CheckoutOrders from "@/components/shared/CheckoutOrders";
// import { Formik } from "formik";
import OrderForm from "@/components/sections/OrderForm";
import PromoCodeInput from "@/components/shared/PromocodeInput";

export default function ChecoutPage() {
  // const t =useTranslations()
  return (
    <>
      <div className="containerr my-12 grid min-h-[70vh] w-full grid-cols-1 gap-y-4 px-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          {/* ordeer form */}
          <OrderForm />
        </div>
        <div className="order-1 rounded-2xl bg-white px-2 lg:order-2">
          {/* orders */}
          <CheckoutOrders />
          {/* <Formik>
            
  </Formik> */}

          {/* promo */}
          <PromoCodeInput />
          {/* <div className="promo relative w-full p-5">
            <label htmlFor="promo" className="mb-1 block text-2xl font-bold">
              Promo Code
            </label>
            <input
              name={"promocode"}
              id={"promo"}
              type="text"
              className="bg-bg w-full h-12 rounded-xl"
              placeholder={"Enter Promo Code"}
            />
            <span><img src="/assets/icons/" alt="" /></span>
          </div> */}
          <TotalOrder />
        </div>
      </div>
    </>
  );
}
