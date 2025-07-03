"use client";
import Image from "next/image";
import { Edit } from "lucide-react";
import { useState } from "react";

import GlobalDialog from "../shared/GlobalDialog";
import AddressItem from "../shared/AddressItem";
import { Address } from "@/stores/addressStore";

interface Props {
  selectedAddress?: Address;
  selectedAddressId: number | null;
  addresses: Address[];
  error?: string;
  onSelect: (id: number) => void;
}

const AddressSelector = ({
  selectedAddress,
  selectedAddressId,
  addresses,
  error,
  onSelect,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [dialogSelectedId, setDialogSelectedId] = useState<number | null>(
    selectedAddressId || null
  );

  return (
    <div>
      <h2 className="text-lg font-semibold">Your Shipping Address</h2>
      <div
        onClick={() => {
          setDialogSelectedId(selectedAddressId);
          setOpen(true);
        }}
        className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-100 p-3"
      >
        <div className="flex items-center gap-2">
          <Image
            src="/assets/images/map.png"
            alt="map"
            width={64}
            height={64}
            className="rounded-lg"
          />
          <div>
            <h2 className="font-bold">{selectedAddress?.title}</h2>
            <p className="text-text-website-font">{selectedAddress?.desc}</p>
          </div>
        </div>
        <Edit className="text-text-website-font" />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}

      <GlobalDialog
        open={open}
        onOpenChange={setOpen}
        title="Select Address"
        footer={
          <button
            className="hover:text-primary hover:border-primary h-10 w-5/6 rounded-full border bg-blue-600 py-2 text-white hover:bg-white"
            onClick={() => {
              if (dialogSelectedId) {
                onSelect(dialogSelectedId);
                setOpen(false);
              }
            }}
          >
            Confirm
          </button>
        }
      >
        <div className="space-y-4">
          {addresses.map((address) => {
            const isSelected = dialogSelectedId === address.id;
            return (
              <div
                key={address.id}
                onClick={() => setDialogSelectedId(address.id)}
                className={`rounded-lg border p-2 transition ${
                  isSelected ? "border-primary bg-blue-50" : "border-gray-200"
                }`}
              >
                <AddressItem addr={address} />
              </div>
            );
          })}
        </div>
      </GlobalDialog>
    </div>
  );
};

export default AddressSelector;