"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CreditCard from "../cards/CreditCard";
import { loyaltyService } from "@/services/ClientApiHandler";
import GlobalDialog from "@/components/shared/GlobalDialog";
import { useTranslations } from "next-intl"; // Import useTranslations

export default function Wallet() {
  const [wallet, setWallet] = useState({ balance: 0, currency: "" });
  const [open, setOpen] = useState(false);
  const t = useTranslations("WALLET_COMPONENT"); // Initialize useTranslations

  useEffect(() => {
    const fetchWallet = async () => {
      const w = await loyaltyService.getWallet();
      setWallet((w as { data: { balance: number; currency: string } }).data);
    };
    fetchWallet();
  }, []);

  return (
    <>
      {/* Trigger */}
      <div
        onClick={() => setOpen(true)}
        className="flex w-full cursor-pointer items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Image
            src="/assets/icons/wallet.svg"
            alt={t("wallet_label")}
            width={65}
            height={65}
          />
          {t("wallet_label")}
        </div>
        <div className="greendiv loyalitypoints rounded-full bg-green-100 px-2.5 py-1.5 text-green-600">
          {wallet.balance} {wallet.currency}
        </div>
      </div>

      {/* Global Dialog */}
      <GlobalDialog open={open} onOpenChange={setOpen} title={t("wallet_title")}>
        {/* Assuming CreditCard component itself handles its own translations or receives necessary props */}
        <CreditCard full_name="User N" wallet={wallet} />
        <div className="w-full m-4">
          <h2 className="font-bold text-lg">{t("cancelled_orders_title")}</h2>
          <div className="canceled w-full h-[200px] flex items-center justify-center">
            <p>{t("no_data_cancelled_orders")}</p>
          </div>
        </div>
      </GlobalDialog>
    </>
  );
}