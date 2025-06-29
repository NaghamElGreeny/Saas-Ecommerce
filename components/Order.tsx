'use client';
import { getOrder } from "@/services/ClientApiHandler";


type OrderProps = {
  slugg: number;
};

const Order: React.FC<OrderProps> = ({ slugg }) => {

  console.log("🔍 before getOrder");


const order =  getOrder(slugg); 
console.log("✅ order after await:", order);


console.log('slug',slugg)
// console.log('order',order)
  return (
      <>
       <div className="containerr my-12 grid min-h-[70vh] w-full grid-cols-1 gap-y-4 px-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          {/* order form */}
          {/* <OrderForm /> */}
        </div>
        <div className="order-1 rounded-2xl bg-white px-2 lg:order-2">
          {/* orders show*/}
          {/* <CheckoutOrders /> */}

          {/* promo code*/}
          {/* <PromoCodeInput />

          <TotalOrder /> */}
        </div>
      </div>
      </>
  );
};

export default Order;
