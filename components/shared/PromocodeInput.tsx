"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/stores/cartStore";
import { applyCoupon } from "@/services/ClientApiHandler";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

export default function PromoCodeInput() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { cart, fetchCart ,setCart} = useCartStore();
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      const res = await applyCoupon(code);
      if (res.status === "success") {
        setCart(res)
        // await fetchCart();
        setIsApplied(true);
        toast.success("Coupon applied successfully");
      } else {
        toast.error(res.message || "Failed to apply coupon");
        console.log('copoun res msg',res.message)
      }
    } catch (err) {
        console.log('copoun res msg',res.message)
      console.error("Failed to apply coupon", err);
      toast.error("Failed to apply coupon");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      // You might need an API to remove coupon, or just refetch cart without coupon
      await fetchCart(); // This should fetch cart without coupon if you pass empty coupon code
      setIsApplied(false);
      setCode("");
      toast.success("Coupon removed");
    } catch (err) {
      console.error("Failed to remove coupon", err);
      toast.error("Failed to remove coupon");
    }
  };

  return (
    <div className="w-full p-5">
      <h2 className="text-xl font-bold mb-2">Promo Code</h2>
      {isApplied ? (
        <div className="flex items-center justify-between rounded-2xl px-4 py-3 border border-green-200">
          <div className="flex items-center">
    <svg
              className="me-2 bg-white text-green-500  border-green-500 rounded-full"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="9" fill="white" stroke="#22C55E" strokeWidth="2" />
              <path
                d="M6 10.5L9 13.5L14 8.5"
                stroke="#22C55E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h2 className=" font-medium">{cart?.coupon_code} <br />
              <span className="text-gray-400">-{cart?.price.coupon_price}</span>
            </h2>
          </div>
          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800 font-semibold"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" /> : "Remove"}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-2xl bg-gray-100 px-4 py-3">
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
            placeholder="Enter Promo Code"
            className="w-full h-10 bg-transparent outline-none placeholder:text-gray-400"
          />
          <button
            disabled={loading || !code.trim()}
            onClick={handleApply}
            className="text-primary font-semibold"
          >
            {loading ? <Loader className="animate-spin" /> : "Apply"}
          </button>
        </div>
      )}
    </div>
  );
}