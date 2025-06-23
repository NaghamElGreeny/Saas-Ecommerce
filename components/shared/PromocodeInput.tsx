import React, { useState } from "react";
// import { Input } from "@/components/ui/input"; // لو عندك كومبوننت جاهز
import { useCartStore } from "@/stores/cartStore";
import { applyCoupon } from "@/services/ClientApiHandler"; // هنعملها كمان

export default function PromoCodeInput() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchCart } = useCartStore();

  const handleApply = async () => {
    if (!code) return;
    setLoading(true);
    try {
      await applyCoupon(code); // API call
      await fetchCart(); // تحديث الأسعار بعد الخصم
      setCode("");
    } catch (err) {
      console.error("Failed to apply coupon", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Promo Code</h2>
      <div className="flex items-center justify-between rounded-2xl bg-gray-100 px-4 py-3">
        <div className="flex items-center gap-2 w-full">
          <img src="/assets/icons/promo.svg" alt="promo" className="size-5" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Promo Code"
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>
        <button
          disabled={loading}
          onClick={handleApply}
          className="text-primary font-semibold text-sm"
        >
          {loading ? "Applying..." : "Apply"}
        </button>
      </div>
    </div>
  );
}
