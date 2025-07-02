"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountBtn({ onClose }: { onClose: () => void }) {
  const router = useRouter();

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
        My Account
      </div>
      <ChevronRight />
    </div>
  );
}
