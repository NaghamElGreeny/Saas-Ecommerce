"use client";

import { Suspense, useState } from "react";
import OrderStatusTabs from "@/components/ordersPage/OrderStatusTabs";
import OrdersList from "@/components/ordersPage/OrdersList";
import { Spinner } from "../atoms";

export default function OrdersPageClient() {
  const [status, setStatus] = useState("in_progress");

  return (
    <div className="p-4 w-full flex flex-col justify-center">
      <OrderStatusTabs onStatusChange={setStatus} />
      <Suspense fallback={<div className="flex justify-center items-center h-64"><Spinner className="text-primary"/></div>}>
        <OrdersList status={status} />
      </Suspense>
    </div>
  );
}
