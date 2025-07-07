/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import {
  Phone,
  MapPin,
  Calendar,
  Clock,
  Wallet,
  ShoppingBag,
} from "lucide-react";
import OrderStatusStepper from "./OrderStatus";
import InfoCard from "./OrderInfoCard";
import { orderService } from "@/services/ClientApiHandler";
import { useCartStore } from "@/stores/cartStore";
import { useTranslations } from "next-intl"; 
type OrderDetailsProps = {
  order: any;
};

export default function OrderDetails({ order }: OrderDetailsProps) {
  const t = useTranslations("ORDER_DETAILS");
  const branch = {
    image: order.store.image,
    name: order.store.complete_name,
    area: order.store.location_description,
  };
  const callCenter = order.call_center;
  const orderType =
    order.order_type === "take_away" ? t("takeaway_type") : t("delivery_type");

  const paymentType = order.pay_type.map((method: any) =>
    Object.keys(method)[0] === "cash" ? t("cash_method") : t("card_method"),
  );

  const orderDate = order.order_date;
  const orderTime = order.order_time;
  const { setCart, fetchCart } = useCartStore();

  const handleClick = async () => {
    const res = await orderService.reOrder(order.id);
    setCart(res);
    fetchCart();
  };

  return (
    <div className="bg-whiteee space-y-6 rounded-2xl p-4 text-black">
      <OrderStatusStepper
        orderType={order.order_type}
        statusList={order.order_status}
      />

      <div>
        <div className="mb-3 flex items-center gap-2 text-xl font-semibold">
          <MapPin size={19} color="blue" />
          {order.order_type === "take_away" ? t("branch_label") : t("address_label")}
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-gray-100 p-3">
          <Image
            src={branch.image}
            alt={t("branch_label")}
            width={56}
            height={56}
            className="h-14 w-14 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{branch.name}</p>
            <p className="text-text-website-font text-sm">{branch.area}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2 text-xl font-semibold">
          <Phone size={19} color="blue" />
          <p>{t("call_center_title")}</p>
        </div>
        <div className="flex h-[50px] items-center justify-between rounded-xl bg-gray-100 px-2 py-4 md:px-6">
          <a href={`tel:${callCenter}`} className="text-text-website-font">
            {callCenter}
          </a>
          <a href={`tel:${callCenter}`} className="text-text-website-font">
            <Phone />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <InfoCard
          title={t("order_type_title")}
          icon={<ShoppingBag size={20} color="blue" />}
        >
          {orderType}
        </InfoCard>

        <InfoCard title={t("payment_type_title")} icon={""}>
          <div className="flex flex-wrap gap-2">
            {paymentType.map((type: string, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-1 rounded-full px-2 py-1 text-sm"
              >
                <Wallet size={20} color="blue" />
                {type}
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard
          title={t("date_of_order_title")}
          icon={<Calendar size={20} color="blue" />}
        >
          {orderDate}
        </InfoCard>

        <InfoCard title={t("time_of_order_title")} icon={<Clock size={20} color="blue" />}>
          {orderTime}
        </InfoCard>
      </div>

      {order.status_trans !== "finished" ? (
        <></>
      ) : (
        <div className="flex justify-end">
          <button
            className="bg-primary hover:bg-primary/90 rounded-full px-6 py-2 text-white shadow-md transition"
            onClick={handleClick}
          >
            {t("reorder_button")}
          </button>
        </div>
      )}
    </div>
  );
}