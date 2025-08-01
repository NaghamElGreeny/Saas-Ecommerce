"use client";

import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { orderService } from "@/services/ClientApiHandler";
import ReservationDetails from "./ReservationDetails";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { OrderItem } from "@/utils/orderTypes";

type ReservationProps = {
  slugg: number;
};

const Reservation: React.FC<ReservationProps> = ({ slugg }) => {
  const [reservation, setReservation] = useState<OrderItem>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("RESERVATION_PAGE");

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const data = await orderService.getReservation(slugg);
        console.log("🚀 ~ fetchReservation ~ data:", data)
        setReservation(data.data);
      } catch (error) {
toast.error(error)
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [slugg, t]);

  if (loading)
    return (
      <div className="loading flex min-h-screen w-full items-center justify-center">
        <Loader color="blue" />
        <p>{t("loading_message")}</p>
      </div>
    );
  if (!reservation)
    return (
      <div className="loading flex min-h-screen w-full items-center justify-center">
        <h2>{t("reservation_not_found")}</h2>
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
            {t("booking_id_prefix")} {reservation.id}
          </h2>
        </div>
        <div className="totalamount flex w-full flex-col px-6 pt-5">
          <h3 className="mb-3 font-semibold">{t("booking_summary_title")}</h3>
          <div className="mt-3 flex flex-wrap items-center justify-between rounded-xl border border-[black] px-5 py-3 font-semibold">
            <p>{t("booking_confirmation_amount")}</p>
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