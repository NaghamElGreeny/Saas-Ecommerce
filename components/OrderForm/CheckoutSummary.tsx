"use client";
import { useEffect, useState } from "react";

interface Props {
  subtotal: number;
  deliveryFee: number;
  discount?: number;
}

const CheckoutSummary = ({ subtotal, deliveryFee, discount = 0 }: Props) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(subtotal + deliveryFee - discount);
  }, [subtotal, deliveryFee, discount]);

  return (
    <div className="rounded-lg border p-4 bg-white space-y-3">
      <h2 className="text-lg font-semibold">ملخص الطلب</h2>
      <div className="flex justify-between">
        <span>الإجمالي</span>
        <span>{subtotal.toFixed(2)} ج.م</span>
      </div>
      <div className="flex justify-between">
        <span>رسوم التوصيل</span>
        <span>{deliveryFee.toFixed(2)} ج.م</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>الخصم</span>
          <span>-{discount.toFixed(2)} ج.م</span>
        </div>
      )}
      <hr />
      <div className="flex justify-between font-bold text-lg">
        <span>المجموع</span>
        <span>{total.toFixed(2)} ج.م</span>
      </div>
    </div>
  );
};

export default CheckoutSummary;