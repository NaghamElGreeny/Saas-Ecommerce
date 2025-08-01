import { useEffect, useState } from "react";
import { orderService } from "@/services/ClientApiHandler";
import Order from "./Order";
import Pagination from "../Pagination";
import { Spinner } from "../atoms/UI/Spinner";


interface Props {
  status: string;
}

export default function OrdersList({ status }: Props) {
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = async ({page,status}) => {
    setLoading(true);
    try {
      const res = await orderService.getOrdersByStatus({status, page});
      setOrders(res.data); 
      setMeta(res.meta); 
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
              <Order key={order.id} order={order} status={status} />
            ))}
          </div>

          <Pagination meta={meta} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
}
