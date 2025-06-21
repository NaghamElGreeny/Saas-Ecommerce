import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import ReservationForm from "../sections/Reservation";

export default function ReservationDialog() {
  const t = useTranslations("NAV");

  return (
    <Dialog>
      <DialogTrigger className="text-start w-fit hover:opacity-80 cursor-pointer">
        {t("reservation")}
      </DialogTrigger>
      <DialogContent className="mx-auto flex items-center justify-center rounded-[20px] p-0">
        <ReservationForm show={false} className="!w-full p-0" />
      </DialogContent>
    </Dialog>
  );
}
