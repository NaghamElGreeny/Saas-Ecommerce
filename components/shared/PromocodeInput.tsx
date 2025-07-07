"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/stores/cartStore";
import { cartService } from "@/services/ClientApiHandler";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { CartResponse } from "@/utils/cartTypes";
import { useTranslations } from "next-intl";

export default function PromoCodeInput() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchCart, setCart, couponCode, couponValue } = useCartStore();
  const t = useTranslations("PROMO_CODE_INPUT");

  const isApplied = !!couponCode;
  const isInvalid = !code.trim();

  const handleApply = async () => {
    if (isInvalid) return;
    setLoading(true);
    try {
      const res: CartResponse = (await cartService.applyCoupon(
        code,
      )) as CartResponse;
      if (res.status === "success") {
        setCart(res);
        toast.success(res.message);
      } else {
        console.error("Coupon error:", res.message);
        toast.error(res.message || t("failed_to_apply_coupon"));
      }
    } catch (err) {
      console.error("Failed to apply coupon", err);
      toast.error(err.message || t("failed_to_apply_coupon"));
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      await fetchCart();

      toast.success("Coupon removed successfully");

      setCode("");
    } catch (err) {
      console.error("Failed to remove coupon", err);

      toast.error("Failed to remove coupon");
    }
  };

  return (
    <div className="w-full p-5">
      <h2 className="mb-2 text-xl font-bold">{t("promo_code_title")}</h2>

      {isApplied ? (
        <div className="bg-website-footer flex items-center justify-between rounded-2xl border-2 border-green-200 px-4 py-3">
          <div className="flex items-center">
            <svg
              className="me-2 rounded-full bg-white text-green-500"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="10"
                cy="10"
                r="9"
                fill="white"
                stroke="#22C55E"
                strokeWidth="2"
              />
              <path
                d="M6 10.5L9 13.5L14 8.5"
                stroke="#22C55E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="font-medium">
              {couponCode} <br />
              <span className="text-gray-400">-{couponValue ?? 0}</span>
            </h2>
          </div>
          <button
            onClick={handleRemove}
            disabled={loading}
            className="font-semibold text-red-600 hover:text-red-800"
          >
            {loading ? <Loader className="animate-spin" /> : t("remove_button")}
          </button>
        </div>
      ) : (
        <div className="bg-website-footer flex items-center justify-between rounded-2xl px-4 py-3">
          <Image
            src="/assets/icons/promocode.svg"
            alt="promo"
            width={35}
            height={35}
            className="me-2"
          />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t("enter_promo_code_placeholder")}
            className="h-10 w-full bg-transparent outline-none placeholder:text-gray-400"
          />
          <button
            disabled={loading || isInvalid}
            onClick={handleApply}
            className="text-primary font-semibold"
          >
            {loading ? <Loader className="animate-spin" /> : t("apply_button")}
          </button>
        </div>
      )}
    </div>
  );
}
