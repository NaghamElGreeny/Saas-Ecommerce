"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader } from "lucide-react";
import { orderService } from "@/services/ClientApiHandler";
import ReservationDetails from "./ReservationDetails";

type ReservationProps = {
  slugg: number;
};

const Reservation: React.FC<ReservationProps> = ({ slugg }) => {
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        console.log("🔍 Fetching reservation...");
        const data = await orderService.getReservation(slugg);
        console.log("✅ reservation:", data);
        setReservation(data);
      } catch (error) {
        console.error("❌ Failed to fetch reservation", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [slugg]);

  if (loading)
    return (
      <div className="loading flex min-h-screen w-full items-center justify-center">
        <Loader color="blue" />
      </div>
    );
  if (!reservation)
    return (
      <div className="loading flex min-h-screen w-full items-center justify-center">
        <h2>reservation not found</h2>
      </div>
    );

  return (
    <div className="containerr my-12 grid min-h-[70vh] w-full grid-cols-1 gap-y-4 px-10 lg:grid-cols-2">
      <div className="reservation-2 lg:reservation-1">
        <ReservationDetails order={reservation} />
      </div>
      <div className="reservation-1 lg:reservation-2 h-[300px] flex flex-col items-center rounded-2xl bg-white px-2">
        <div className="reservationid-status flex w-full px-6 pt-5">
          <h2 className="text-[32px] font-bold">
            Booking Id - {reservation.id}
          </h2>
        </div>
        <div className="totalamount flex w-full flex-col px-6 pt-5">
          <h3 className="mb-3 font-semibold">Booking Summary</h3>
          <div className="mt-3 flex flex-wrap items-center justify-between rounded-xl border border-[black] px-5 py-3 font-semibold">
            <p>Booking Confirmation Amount</p>
            <p>
              {reservation.total_amount}{" "}
              <span className="font-thin">{reservation.currency}</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Reservation;
