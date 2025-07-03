/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import {
  Phone,
  MapPin,
  Calendar,
  Clock,
  Wallet,
  ShoppingBag,
} from "lucide-react";
import { reOrder } from "@/services/ClientApiHandler";
import { useCartStore } from "@/stores/cartStore";
import InfoCard from "../OrderInfoCard";

export default function ReservationDetails({ order }: any) {
  const branch = {
    image: order.store.image,
    name: order.store.complete_name,
    area: order.store.location_description,
  };
  const callCenter = `+${order.phone_code} - ${order.phone}`;
  const orderType = order.order_type === "take_away" ? "Takeaway" : "Delivery";

  const orderDate = order.order_date;
  const orderTime = order.order_time;
  const { setCart, fetchCart } = useCartStore();
  const handleClick = async () => {
    //pay now
    //   const res = await reOrder(order.id);
    //   setCart(res);
    //   fetchCart();
  };
  return (
    <div className="bg-whiteee space-y-6 rounded-2xl p-4 text-black">
      {/* Branch Info -  Location */}
      <div>
        <div className="mb-3 flex items-center gap-2 text-xl font-semibold">
          <MapPin size={19} color="blue" />
          Branch
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-gray-100 p-3">
          <Image
            src={branch.image}
            alt="Branch"
            width={56}
            height={56}
            className="h-14 w-14 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{branch.name}</p>
            <p className="text-text-website-font text-sm">{branch.area}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* Call Center */}
        <div>
          <div className="mb-3 flex items-center gap-2 text-xl font-semibold">
            <Phone size={19} color="blue" />
            <p> Call Center</p>
          </div>
          <div className="flex h-fit min-h-[80px] items-center justify-between rounded-xl bg-gray-100 px-2 py-4 md:px-6">
            <a href={`tel:${callCenter}`} className="text-text-website-font">
              {callCenter}
            </a>
            <a href={`tel:${callCenter}`} className="text-text-website-font">
              <Phone />
            </a>
          </div>
        </div>

        {/* Name */}
        <InfoCard title="Name" icon={""}>
          {order.name}
        </InfoCard>
      </div>
      {/* persons  */}
      <InfoCard
        title="Number Of Persons"
        icon={<Calendar size={20} color="blue" />}
      >
        {order.guests_number}
      </InfoCard>

      {/* date  */}
      <InfoCard
        title="Date Of Booking"
        icon={<Calendar size={20} color="blue" />}
      >
        {order.date}
      </InfoCard>
      {/* Order Info */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <InfoCard
          title="Time Of Booking  from"
          icon={<Clock size={20} color="blue" />}
        >
          {order.from_time}
        </InfoCard>
        <InfoCard
          title="Time Of Booking  to"
          icon={<Clock size={20} color="blue" />}
        >
          {order.to_time}
        </InfoCard>
      </div>
      {/* Reorder Button */}
      <span className="w-full text-red-600">
        Booked successfully. To cancel your reservation, contact our call
        center!
      </span>
      <div className="flex justify-end">
        <button
          className="bg-primary hover:bg-primary/90 rounded-full px-6 py-2 text-white shadow-md transition"
          onClick={handleClick}
        >
          PayNow
        </button>
      </div>
    </div>
  );
}
