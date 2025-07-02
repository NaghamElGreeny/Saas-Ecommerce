
'use client';
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import CreditCard from "../cards/CreditCard";
import { useEffect, useState } from "react";
import { getWallet } from "@/services/ClientApiHandler";

export default function Wallet() {
  const [wallet, setWallet] = useState({ balance: 0, currency: "USD" });

  useEffect(() => {
    const fetchWallet = async () => {
      const w = await getWallet();
      setWallet((w as { data: { balance: number; currency: string } }).data);
    };
    fetchWallet();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-full cursor-pointer items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/assets/icons/wallet.svg" alt="wallet" width={65} height={65} />
            Wallet
          </div>
          <div className="greendiv loyalitypoints rounded-full bg-green-100 px-2.5 py-1.5 text-green-600">
            {wallet.balance} {wallet.currency}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="xs:min-w-[100vw] h-[90vh] overflow-hidden px-3 py-8 sm:max-w-[700px] sm:min-w-[700px]">
        <ScrollArea className="h-[600px] px-4 py-2">
          <CreditCard full_name="User N" wallet={wallet} />
          <div className="w-full m-4">
            <h2 className="font-bold text-lg">Cancelled Orders</h2>
            <div className="canceled w-full h-[200px] flex items-center justify-center">
              <p>no data in cancelled orders</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
