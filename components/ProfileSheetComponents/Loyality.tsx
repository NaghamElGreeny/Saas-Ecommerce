"use client";

import { useState } from "react";
import Image from "next/image";
import CreditCard from "../cards/CreditCard";
import { useLoyalityStore } from "@/stores/loyalityStore";
import GlobalDialog from "@/components/shared/GlobalDialog";
import { useTranslations } from "next-intl"; 
import { useAuthStore } from "@/stores/authStore";

export default function Loyality() {
  const { points, transactions } = useLoyalityStore();
  const { userData } = useAuthStore();
  const [open, setOpen] = useState(false);
  const t = useTranslations("LOYALTY_CARD"); 

  return (
    <>
      {/* Trigger */}
      <div
        onClick={() => setOpen(true)}
        className="loyality flex w-full cursor-pointer items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Image
            src="/assets/icons/loyalitycard.svg"
            alt={t("loyalty_card_label")}
            width={65}
            height={65}
          />
          {t("loyalty_card_label")}
        </div>
        <div className="greendiv loyalitypoints rounded-full bg-green-100 px-2 py-1.5 text-green-600">
          {t("points_label", { points })}
        </div>
      </div>

      {/* Global Dialog */}
      <GlobalDialog open={open} onOpenChange={setOpen} title={t("loyalty_card_title")}>
        <CreditCard full_name={userData.full_name} loyality={points} />
        <div className="mt-4 space-y-4">
          {transactions?.length > 0 ? (
            transactions.map((txn, index) => (
              <div
                key={index}
                className="bg-muted flex items-center justify-between rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={txn.image}
                    alt="transaction" 
                    width={82}
                    height={82}
                    className="rounded-md object-cover"
                  />
                  <div className="flex h-16 flex-col justify-between">
                    <div className="text-[22px] font-semibold">
                      {t("transaction_id_prefix")} {txn.id}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(txn.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-lg font-bold">
                    {txn.points}{" "}
                    <span className="text-sm font-medium">{t("points_unit")}</span>
                  </div>
                  <div
                    className={`mt-1 text-xs ${
                      txn.status === "come_in"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <Image
                      src={`/assets/icons/${txn.status}.svg`}
                      alt={txn.status} // This alt text could also be translated
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">
              {t("no_transactions_found")}
            </p>
          )}
        </div>
      </GlobalDialog>
    </>
  );
}