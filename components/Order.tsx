"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { orderService } from "@/services/ClientApiHandler";
// import { OrderItem } from "@/utils/orderTypes";

import TotalOrder from "./shared/TotalOrder";
import CheckoutCartItem from "./shared/CheckoutCartItem";
import OrderDetails from "./OrderDetails";
import CancelOrderDialog from "./shared/CancelOrderDialog";
import { ScrollArea } from "./ui/scroll-area";
import { Loader } from "lucide-react";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { OrderData } from "@/utils/types";

type OrderProps = {
  slugg: number;
};
export type CancelReason = {
  id: number;
  desc: string | null;
  created_at: string;
};
const Order: React.FC<OrderProps> = ({ slugg }) => {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);
  const [reasons, setReasons] = useState<CancelReason[]>([]);
  const t = useTranslations("ORDER_PAGE");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderService.getOrder(slugg);
        // console.log("🚀 ~ fetchOrder ~ data:", data)
      
        setOrder(data);
      } catch (error) {
        console.error(t("failed_to_fetch_order"), error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [slugg, t]);

  const fetchCancelReasons = async () => {
    try {
      const res = await orderService.getCancelReasons();
      setReasons(res.data);
    } catch (error) {
      console.error(t("failed_to_fetch_cancel_reasons"), error);
    }
  };

  const handleCancelConfirm = async (reasonKey: string, reasonNote: string) => {
    const isOther = reasonKey === "other";

    if (isOther && !reasonNote.trim()) {
      toast.error(t("please_provide_reason"));
      return;
    }

    const payload = {
      ...(isOther
        ? { desc_cancel_reason: reasonNote }
        : { cancel_reason_id: reasonKey }),
      _method: "PUT",
    };

    try {
       await orderService.cancelOrder(order!.id, payload);
      toast.success( t("order_cancelled_success"));
      setIsCancelOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error("Cancel failed", err);
      toast.error(err?.message || t("something_went_wrong"));
    }
  };

  if (loading) {
    return (
      <div className="loading flex min-h-screen w-full items-center justify-center">
        <Loader color="blue" />
        <p>{t("loading_message")}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="loading flex min-h-screen w-full items-center justify-center">
        <h2>{t("order_not_found")}</h2>
      </div>
    );
  }

  const isPending = order.status === "pending";
  const isFinished = order.status === "finished";

  return (
    <div className="containerr my-12 grid min-h-[70vh] w-full grid-cols-1 gap-y-4 px-10 lg:grid-cols-2">
      <div className="order-2 lg:order-1">
        <OrderDetails order={order} />
      </div>

      <div className="order-1 flex flex-col items-center rounded-2xl bg-white px-2 lg:order-2">
        <div className="orderid-status flex w-full justify-between px-6 pt-5">
          <h2 className="text-[28px] font-bold lg:text-[32px]">
            {t("order_id_prefix")} {order.order_num}
          </h2>

          <div className="flex items-center gap-2 text-lg font-semibold">
            {isPending ? (
              <button
                onClick={() => {
                  fetchCancelReasons();
                  setIsCancelOpen(true);
                }}
                className="px-3 py-1 text-red-500 cursor-pointer"
              >
                {t("cancel_order_button")}
              </button>
            ) : (
              <>
                <Image
                  src={`/assets/icons/${isFinished ? "completed" : "cancelled"}.svg`}
                  alt={order.status}
                  width={24}
                  height={24}
                />
                <p className={isFinished ? "" : "text-red-500"}>
                  {isFinished ? t("completed_status") : t("cancelled_status")}
                </p>
              </>
            )}
          </div>
        </div>

        <ScrollArea className="max-h-[350px] w-[97%] overflow-y-auto rounded-md p-4">
          {order.item.map((product) => (
            <CheckoutCartItem cartProduct={product} key={product.id} />
          ))}
        </ScrollArea>

        <TotalOrder priceDetail={order.price_detail} total={order.item_count} />
      </div>

      <CancelOrderDialog
        open={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        reasons={reasons}
        onConfirm={handleCancelConfirm}
      />
    </div>
  );
};

export default Order;