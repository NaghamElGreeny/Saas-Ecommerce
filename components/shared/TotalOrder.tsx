"use client";

import { useCartStore } from "@/stores/cartStore";
import { PriceSummary } from "@/utils/cartTypes";
import React from "react";
import LoyaltyCheckbox from "../LoyalityCheckBox";
import { useLoyalityStore } from "@/stores/loyalityStore";
import { useTranslations } from "next-intl"; // Import useTranslations

type Props = {
  priceDetail?: PriceSummary & { total?: number };
  total?: number;
  sheet?: boolean;
};

export default function TotalOrder({ priceDetail, total, sheet }: Props) {
  const { cart } = useCartStore();
  const { points, usePoints, setUsePoints } = useLoyalityStore();
  const t = useTranslations("TOTAL_ORDER"); // Initialize useTranslations

  const price = (priceDetail || cart?.price || {}) as Partial<PriceSummary>;
  const currency = price.currency || cart?.currency || "currency";

  const totalItems =
    total ??
    cart?.data?.products?.reduce((sum, product) => sum + product.quantity, 0) ??
    0;

  const subtotal = price.total_item_price_before_discount ?? price.sun_total ?? 0;
  const vatPercent = price.tax_rate_percentage ?? 0;
  const vatValue = price.tax_rate_value ?? 0;
  const surcharge = price.surcharge_value ?? price.surcharge ?? 0;
  const couponDiscount = price.coupon_price ?? 0;
  const deliveryFee = price.delivery_price ?? price.delivery_fee ?? 0;
  const totalAmount = price.total_price ?? price.total ?? 0;

  const isDelivery =
    cart?.data?.order_type === "delivery" || priceDetail?.delivery_price !== undefined;

  const showLoyaltyCheckbox =
    !sheet && points && cart?.price?.total && points < cart.price.total;

  return (
    <>
      {showLoyaltyCheckbox && (
        <LoyaltyCheckbox points={points} checked={usePoints} onChange={setUsePoints} />
      )}

      <h2 className="w-full p-0 px-5 text-2xl font-bold">{t("order_summary_title")}</h2>

      <div className="order-summary w-[90%] space-y-4 rounded-2xl bg-website-footer my-2 p-4">
        <OrderRow label={t("subtotal_label", { totalItems })} value={subtotal} currency={currency} />
        <OrderRow label={t("vat_label", { vatPercent })} value={vatValue} currency={currency} />
        <OrderRow label={t("surcharge_label")} value={surcharge} currency={currency} />

        {couponDiscount > 0 && (
          <OrderRow label={t("coupon_discount_label")} value={-couponDiscount} currency={currency} />
        )}

        {isDelivery && deliveryFee > 0 && (
          <OrderRow label={t("delivery_fee_label")} value={deliveryFee} currency={currency} />
        )}

        <hr />

        <OrderRow
          label={t("total_amount_label")}
          value={totalAmount}
          currency={currency}
          bold
        />
      </div>
    </>
  );
}

type RowProps = {
  label: string;
  value: number;
  currency: string;
  bold?: boolean;
};

function OrderRow({ label, value, currency, bold = false }: RowProps) {
  const textClass = bold ? "font-bold" : "";
  return (
    <div className={`flex w-full justify-between ${textClass}`}>
      <h3>{label}</h3>
      <h3>
        {value.toFixed(2)} <span className={bold ? "font-normal" : ""}>{currency}</span>
      </h3>
    </div>
  );
}