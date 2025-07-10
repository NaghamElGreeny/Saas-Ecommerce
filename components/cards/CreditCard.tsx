"use client";

import Image from "next/image";
import { useTranslations } from "next-intl"; 

const CreditCard = ({
  full_name,
  wallet,
  loyality,
}: {
  full_name: string;
  wallet?: { balance: number; currency: string };
  loyality?: number;
}) => {
  const t = useTranslations("CREDIT_CARD"); 

  return (
    <div className="relative h-[317px] overflow-hidden rounded-[30px] bg-[#5E6BF2] text-white">
      {/* Top-left circle */}
      <div className="absolute  -start-[25%] aspect-square h-full rounded-full bg-white/20 flex items-center justify-center">
        <div className="aspect-square w-[75%] rounded-full bg-white/10" />
      </div>

      {/* Bottom-right circle */}
      <div className="absolute -end-[13%] top-[50%] aspect-square w-[50%] rounded-full bg-white/10" />

      {/* User name */}
      <h2 className="animated wow fadeInLeft animated p-8 text-3xl font-semibold capitalize">
        {full_name}
      </h2>

      {/* Logo top-right */}
      <Image
        src="/assets/logo/mea-logo.png"
        alt="Logo"
        width={70}
        height={50}
        className="absolute top-6 right-6 object-contain opacity-60"
        priority
      />

      {/* Balance section */}
      {wallet && (
        <div className="bsolute absolute bottom-0 p-8">
          <p className="mb-3">{t("balance_label")}</p>
          <p className="flex items-baseline gap-1 text-[40px] leading-none font-bold">
            {wallet.balance}
            <span className="text-[16px] font-normal">{wallet.currency}</span>
          </p>
        </div>
      )}
      {/* loyality */}
      {loyality && (
        <div className="bsolute absolute bottom-0 p-8">
          <p className="mb-3">{t("loyalty_card_label")}</p>
          <p className="flex items-baseline gap-1 text-[40px] leading-none font-bold">
            {loyality}
            <span className="text-[16px] font-normal">{t("points_unit")}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CreditCard;