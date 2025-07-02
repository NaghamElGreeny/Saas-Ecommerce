'use client';
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreditCard from "../cards/CreditCard";
import Image from "next/image";
import { useLoyalityStore } from "@/stores/loyalityStore";

export default function Loyality() {
  const { points, transactions } = useLoyalityStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="loyality flex w-full cursor-pointer items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/assets/icons/loyalitycard.svg" alt="loyalitycard" width={65} height={65} />
            Loyality Card
          </div>
          <div className="greendiv loyalitypoints rounded-full bg-green-100 px-2 py-1.5 text-green-600">
            {points} points
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="xs:min-w-[100vw] h-[90vh] overflow-hidden px-3 py-8 sm:max-w-[700px] sm:min-w-[700px]">
        <ScrollArea className="h-[600px] px-4 py-2">
          <CreditCard full_name="User N" loyality={points} />
          <div className="mt-4 space-y-4">
            {transactions?.length > 0 ? (
              transactions.map((txn, index) => (
                <div key={index} className="bg-muted flex items-center justify-between rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <Image src={txn.image} alt="transaction" width={82} height={82} className="rounded-md object-cover" />
                    <div className="flex h-16 flex-col justify-between">
                      <div className="text-[22px] font-semibold">Transaction ID - {txn.id}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(txn.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-lg font-bold">
                      {txn.points} <span className="text-sm font-medium">Points</span>
                    </div>
                    <div className={`mt-1 text-xs ${txn.status === "come_in" ? "text-green-500" : "text-red-500"}`}>
                      <Image src={`/assets/icons/${txn.status}.svg`} alt={txn.status} width={24} height={24} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No transactions found.</p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
