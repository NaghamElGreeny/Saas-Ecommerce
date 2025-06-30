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
const orderNumber="50815036FY"
 const deliveryType="Delivery"
 const editNumber="Second"
const items = [
  { name: 'Shish kebab', quantity: 1 },
  { name: 'Kofta kebabs', quantity: 1 }
];
  return (
    <div className="mt-4 space-y-2">
      {orders.length === 0 ? (
        <p className="text-center text-gray-400">No orders found.</p>
          ) : (
                  <>   
                      <div className="grid min-h-[50vh] grid-cols-1 gap-2 md:grid-cols-2">
   {     orders.map((order) => (

            <Order
              key={order.id}
              order={order}
              status={status}
            />
  
   ))}
                </div> </> 
      )}
    </div>
  );
}
