"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CreditCard from "../cards/CreditCard";
import { getWallet } from "@/services/ClientApiHandler";
import GlobalDialog from "@/components/shared/GlobalDialog";

export default function Wallet() {
  const [wallet, setWallet] = useState({ balance: 0, currency: "" });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchWallet = async () => {
      const w = await getWallet();
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
            alt="wallet"
            width={65}
            height={65}
          />
          Wallet
        </div>
        <div className="greendiv loyalitypoints rounded-full bg-green-100 px-2.5 py-1.5 text-green-600">
          {wallet.balance} {wallet.currency}
        </div>
      </div>

      {/* Global Dialog */}
      <GlobalDialog open={open} onOpenChange={setOpen} title="Wallet">
        <CreditCard full_name="User N" wallet={wallet} />
        <div className="w-full m-4">
          <h2 className="font-bold text-lg">Cancelled Orders</h2>
          <div className="canceled w-full h-[200px] flex items-center justify-center">
            <p>no data in cancelled orders</p>
          </div>
        </div>
      </GlobalDialog>
    </>
  );
}
