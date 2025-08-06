import { useEffect, useState } from "react";
import { orderService } from "@/services/ClientApiHandler";
import Order from "./Order";
import Pagination from "../Pagination";
import { Spinner } from "../atoms/UI/Spinner";
import {  OrderItem } from "@/utils/types";


interface Props {
  status: string;
}
type OrderResponse = {
  data: OrderItem[];
  status: string;
  message: string;
  meta: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    last_page: number;
    total_pages: number;
  };
  links: {
    next: string | null;
    previous: string | null;
  };
};
export default function OrdersList({ status }: Props) {
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = async ({page,status}) => {
    setLoading(true);
    try {
      const res = await orderService.getOrdersByStatus({ status, page }) as OrderResponse;
      //   || {
      //   data: [],
      //   status: "",
      //   message: "",
      //   meta: {
      //     total: 0,
      //     count: 0,
      //     per_page: 0,
      //     current_page: 1,
      //     last_page: 1,
      //     total_pages: 1,
      //   },
      //   links: {
      //     next: null,
      //     previous: null,
      //   },
      // };
      console.log("🚀 ~ fetchOrders ~ res statusssssssss:", res)
      setOrders(res.data); 
      setMeta(res.meta ); 
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };
console.log(meta)
  useEffect(() => {
    fetchOrders({page:currentPage,status});
  }, [currentPage, status]);
  useEffect(() => {
    fetchOrders({page:1,status});
  }, [status]);


  if (loading) return <Spinner />;

  return (
    <div className="mt-4 space-y-4">
      {orders?.length === 0 ? (
        <p className="text-center text-gray-400">No orders found.</p>
      ) : (
        <>
          <div className="grid min-h-[50vh] grid-cols-1 gap-2 md:grid-cols-2">
            {orders?.map((order) => (
              <Order key={order.id} order={order} />
            ))}
          </div>

          <Pagination meta={meta} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
}
