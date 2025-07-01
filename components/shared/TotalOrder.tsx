"use client";
import { useCartStore } from "@/stores/cartStore";
import { PriceSummary } from "@/utils/cartTypes";
import React, { useState } from "react";
import LoyaltyCheckbox from "../LoyalityCheckBox";
import { useLoyalityStore } from "@/stores/loyalityStore";

export default function TotalOrder({
  priceDetail,
  total,
}: {
  priceDetail?: PriceSummary & { total?: number };
  total?: number;
}) {
  const CartResponse = useCartStore();
  const cart = CartResponse.cart;

  const price = priceDetail || cart?.price || {};
  const currency = price.currency || cart?.currency || "currencyTest";

   const { points, usePoints, setUsePoints } = useLoyalityStore();


  const totalItems =
    total ??
    cart?.data?.products?.reduce(
      (total, product) => total + product.quantity,
      0,
    ) ??
    0;

  const subtotal =
    price.total_item_price_before_discount ?? price.sun_total ?? 0;
  const taxPercentage = price.tax_rate_percentage ?? 0;
  const taxValue = price.tax_rate_value ?? 0;
  const surcharge = price.surcharge_value ?? price.surcharge ?? 0;
  const coupon = price.coupon_price ?? 0;
  const deliveryFee = price.delivery_price ?? price.delivery_fee ?? 0;
  const totalAmount = price.total_price ?? price.total ?? 0;
  const isDelivery =
    cart?.data?.order_type === "delivery" ||
    priceDetail?.delivery_price !== undefined;
  return (
    <>
     {points &&
        points < cart.price.total && (
          <LoyaltyCheckbox
            points={points}
            checked={usePoints}
            onChange={setUsePoints}
          />
        )}
      <h2 className="m-0 w-[90%] p-0 text-2xl font-bold">Order Summary</h2>
      <div className="order-summary h-fit w-[90%] space-y-4 rounded-2xl bg-white p-4">
        <div className="subTotal flex w-full justify-between">
          <h3>
            Subtotal
            <span className="ms-1 text-sm text-gray-300">
              ({totalItems} items)
            </span>
          </h3>
          <h3>
            {subtotal.toFixed(2)} <span>{currency}</span>
          </h3>
        </div>

        <div className="VAT flex w-full justify-between">
          <h3>VAT ({taxPercentage}%)</h3>
          <h3>
            {taxValue.toFixed(2)} <span>{currency}</span>
          </h3>
        </div>

        <div className="Surcharge flex w-full justify-between">
          <h3>Surcharge</h3>
          <h3>
            {surcharge.toFixed(2)} <span>{currency}</span>
          </h3>
        </div>

        {coupon > 0 && (
          <div className="Coupon flex w-full justify-between">
            <h3>Coupon Discount</h3>
            <h3>
              -{coupon.toFixed(2)} <span>{currency}</span>
            </h3>
          </div>
        )}
        {/* 
        {(cart?.data?.order_type === "delivery" || priceDetail) && deliveryFee > 0 && (
          <div className="DeliveryFee flex w-full justify-between">
            <h3>Delivery Fee</h3>
            <h3>{deliveryFee.toFixed(2)} <span>{currency}</span></h3>
          </div>
        )} */}
        {isDelivery && deliveryFee > 0 && (
          <div className="DeliveryFee flex w-full justify-between">
            <h3>Delivery Fee</h3>
            <h3>
              {deliveryFee.toFixed(2)} <span>{currency}</span>
            </h3>
          </div>
        )}

        <hr />

        <div className="totalAmount flex w-full justify-between font-bold">
          <h3>Total Amount</h3>
          <h3>
            {totalAmount.toFixed(2)}{" "}
            <span className="font-normal">{currency}</span>
          </h3>
        </div>
      </div>
    </>
  );
}
