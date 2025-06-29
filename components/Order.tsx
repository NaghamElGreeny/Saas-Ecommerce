"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getOrder } from "@/services/ClientApiHandler";
import TotalOrder from "./shared/TotalOrder";
import { ScrollArea } from "./ui/scroll-area";
import CheckoutCartItem from "./shared/CheckoutCartItem";
import OrderDetails from "./OrderDetails";

type OrderProps = {
  slugg: number;
};

const Order: React.FC<OrderProps> = ({ slugg }) => {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        console.log("🔍 Fetching order...");
        const data = await getOrder(slugg);
        console.log("✅ order:", data);
        setOrder(data);
      } catch (error) {
        console.error("❌ Failed to fetch order", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [slugg]);

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div className="containerr my-12 grid min-h-[70vh] w-full grid-cols-1 gap-y-4 px-10 lg:grid-cols-2">
      <div className="order-2 lg:order-1">
        <OrderDetails
         order={order}
        />
      </div>
      <div className="order-1 flex flex-col items-center rounded-2xl bg-white px-2 lg:order-2">
        <div className="orderid-status flex w-full justify-between px-6 pt-5">
          <h2 className="text-[32px] font-bold">
            order Id - {order.order_num}
          </h2>
          <div className="flex items-center gap-2 text-lg font-semibold text-[#52B788]">
            <Image
              src={`/assets/icons/${order.status_trans === "finished" ? "completed" : "cancelled"}.svg`}
              alt=""
              width={24}
              height={24}
            />
            <p>
              {order.status_trans === "finished" ? "completed" : "cancelled"}
            </p>
          </div>
        </div>
        <ScrollArea className="max-h-[350px] w-[97%] overflow-y-auto rounded-md p-4">
          {order.item.map((product) => (
            <CheckoutCartItem cartProduct={product} key={product.id} />
          ))}
        </ScrollArea>
        <TotalOrder priceDetail={order.price_detail} total={order.item_count} />
      </div>
    </div>
  );
};

export default Order;
