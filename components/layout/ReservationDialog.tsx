import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import ReservationForm from "../sections/Reservation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function ReservationDialog() {
  const t = useTranslations("NAV");

  return (
    <Dialog>
      <DialogTrigger className="w-fit cursor-pointer text-start hover:opacity-80">
        {t("reservation")}
      </DialogTrigger>
      <DialogContent className="mx-auto flex items-center justify-center rounded-[20px] p-0">
        <VisuallyHidden>
          <DialogTitle>Hidden title for screen readers</DialogTitle>
        </VisuallyHidden>
        <ReservationForm show={false} className="!w-full p-0" />
      </DialogContent>
    </Dialog>
  );
}
