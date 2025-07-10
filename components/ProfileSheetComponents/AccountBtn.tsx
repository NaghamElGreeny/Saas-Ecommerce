"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function AccountBtn({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const t = useTranslations("PROFILE_SHEET");

  const handleClick = () => {
    onClose();
    router.push("/profile");
  };

  return (
    <div
      onClick={handleClick}
      className="flex w-full cursor-pointer items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <Image
          src="/assets/icons/myaccount.svg"
          alt="account"
          width={65}
          height={65}
        />
        {t("my_account")}
      </div>
      {typeof document !== "undefined" && document.dir === "rtl" ? (
        <ChevronRight style={{ transform: "scaleX(-1)" }} />
      ) : (
        <ChevronRight />
      )}
    </div>
  );
}
