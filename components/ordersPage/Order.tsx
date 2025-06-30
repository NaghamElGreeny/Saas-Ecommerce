import Image from "next/image";
import Link from "next/link";
import React from "react";
import OverlappingImages from "./Overlapp";

const Order: React.FC<{ order: any; status: any }> = ({ order, status }) => {
  //   console.log("order Sent ", order);
  return (
    <div className="max-h-48 animate-[zoomIn_1.3s] rounded-3xl bg-white p-5 shadow-md">
      {/* Top Row */}
      <div className="mb-3 grid grid-cols-2 items-center">
        <p className="text-gray-500">
          {order.order_num ? `Order #${order.order_num}` : order.name}
        </p>
        <p className="ms-auto h-fit w-fit rounded-full px-4 py-2 text-sm text-blue-700 capitalize">
          {status}
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-wrap justify-between gap-4">
        {/* Left: Image + Item Count */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex h-fit ">
            {/* المفروض يلف عالايتمز ويعرض صورهم */}
            <OverlappingImages
              images={order.type === "order" ? order.item.map(item => item.product?.image) : [order.store.image]}
              size={50}
              overlap={50 * (0.15 * (order.type === "order" ?order.item.length:1))}
            />{" "}
     
          </div>
          <p className="text-sm text-gray-500">
            {order.type === "order"
              ? `(${order.item_count} Item)`
              : `(${order.guests_number} Person)`}
          </p>
        </div>

        {/* Middle: Product Info */}
        <div className="flex flex-col justify-center">
          <p className="font-semibold capitalize">{order.productName}</p>
          <p className="text-sm text-gray-500">{order.productType}</p>
        </div>

        {/* Right: Details Button */}
        <Link
          href={""}
          className="ms-auto mt-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
        >
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h306.8l-105.5 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Order;
