"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function OrdersBtn({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const t = useTranslations("PROFILE_SHEET"); 

  const handleClick = () => {
    onClose();
    router.push("/orders");
  };

  return (
    <div
      onClick={handleClick}
      className="flex w-full cursor-pointer items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <Image
          src="/assets/icons/myorder.svg"
          alt="order"
          width={65}
          height={65}
        />
        {t("my_orders")}
      </div>
      <ChevronRight />
    </div>
  );
}
