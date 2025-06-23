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

export default function ChecoutPage() {

  // const t =useTranslations()
  return (
    <>
      <div className="containerr my-12 grid min-h-[70vh] grid-cols-1 gap-y-4 lg:grid-cols-2 w-full px-10">
        <div className="order-2 lg:order-1">
          {/* ordeer form */}
                <OrderForm />
        </div>
        <div className="order-1 rounded-2xl bg-white lg:order-2 px-2">
          {/* orders */}
          <CheckoutOrders />
          {/* <Formik>
            
  </Formik> */}
    
          {/* promo */}
          {/* <BaseInputField
            label={t(`Promo Code`)}
            name={'promocode'}
            id={'promo'}
            type="text"
            className="border"
            placeholder={'Enter Promo Code'}
          /> */}

          <TotalOrder />
        </div>
      </div>
    </>
  );
}
