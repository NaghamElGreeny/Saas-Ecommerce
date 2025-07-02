"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrdersBtn({ onClose }: { onClose: () => void }) {
  const router = useRouter();

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
        My order
      </div>
      <ChevronRight />
    </div>
  );
}
