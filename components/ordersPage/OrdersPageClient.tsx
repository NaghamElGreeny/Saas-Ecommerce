"use client";

import { Suspense, useState } from "react";
import OrderStatusTabs from "@/components/ordersPage/OrderStatusTabs";
import OrdersList from "@/components/ordersPage/OrdersList";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersPageClient() {
  const [status, setStatus] = useState("in_progress");

  return (
    <div className="flex w-full flex-col justify-center p-4">
      <OrderStatusTabs onStatusChange={setStatus} />
      <Suspense fallback={<OrdersListSkeleton />}>
        <OrdersList status={status} />
      </Suspense>
    </div>
  );
}

function OrdersListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[...Array(4)].map((_, idx) => (
        <div
          key={idx}
          className="flex items-center gap-4 rounded-2xl border p-4 shadow-sm"
        >
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
