import { useEffect, useState } from "react";
import { getOrdersByStatus } from "@/services/ClientApiHandler"; 
import { Spinner } from "../atoms";
import Order from "./Order";


interface Props {
  status: string;
}

export default function OrdersList({ status }: Props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const ordersPerPage = 10;

    const indexOfLastOrder = currentPage * ordersPerPage;
const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
const totalPages = Math.ceil(orders.length / ordersPerPage);

const handlePageChange = (direction: "prev" | "next") => {
  setCurrentPage((prev) => {
    if (direction === "prev") return Math.max(prev - 1, 1);
    if (direction === "next") return Math.min(prev + 1, totalPages);
    return prev;
  });
};
    
    
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getOrdersByStatus(status);
        setOrders(res.data); 
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [status]);

  if (loading) return <Spinner />;

 return (
  <div className="mt-4 space-y-4">
    {loading ? (
      <Spinner />
    ) : orders.length === 0 ? (
      <p className="text-center text-gray-400">No orders found.</p>
    ) : (
      <>
        <div className="grid min-h-[50vh] grid-cols-1 gap-2 md:grid-cols-2">
          {currentOrders.map((order) => (
            <Order key={order.id} order={order} status={status} />
          ))}
        </div>

    {/* Pagination Controls */}
<div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
  {/* Previous Button */}
  <button
    onClick={() => handlePageChange("prev")}
    disabled={currentPage === 1}
    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
  >
    <span>&lsaquo;</span>
  </button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
    <button
      key={number}
      onClick={() => setCurrentPage(number)}
      className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
        currentPage === number
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {number}
    </button>
  ))}

  {/* Next Button */}
  <button
    onClick={() => handlePageChange("next")}
    disabled={currentPage === totalPages}
    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
  >
    <span>&rsaquo;</span>
  </button>
</div>

      </>
    )}
  </div>
);

}
