"use client";

import { Suspense, useState } from "react";
import OrderStatusTabs from "@/components/ordersPage/OrderStatusTabs";
import OrdersList from "@/components/ordersPage/OrdersList";
import { Spinner } from "../atoms";

export default function OrdersPageClient() {
  const [status, setStatus] = useState("in_progress");

  return (
    <div className="flex w-full flex-col justify-center p-4">
      <OrderStatusTabs onStatusChange={setStatus} />
      <Suspense
        fallback={
          <div className="flex h-64 items-center justify-center">
            <Spinner className="text-text-website-font" />
          </div>
        }
      >
        <OrdersList status={status} />
      </Suspense>
    </div>
  );
}
