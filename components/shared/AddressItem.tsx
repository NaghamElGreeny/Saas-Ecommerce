"use client";

import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import { Address, useAddressStore } from "@/stores/addressStore";
import AddressForm from "../Forms/AddAdressForm";
import GlobalDialog from "../shared/GlobalDialog";
import GlobalAlertDialog from "../shared/GlobalAlertDialog";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  addr: Address;
};

export default function AddressItem({ addr }: Props) {
  const { deleteAddressItem, fetchAddresses, updateAddressItem } =
    useAddressStore();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const t = useTranslations("ADDRESS_ITEM");

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    updateAddressItem(addr);
    fetchAddresses();
  };

  const handleDeleteConfirm = async () => {
    await deleteAddressItem(addr.id);
    setIsAlertOpen(false);
    fetchAddresses();
  };

  return (
    <>
      <div className="rounded-lg border-border p-4 shadow hover:bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/map.png"
              alt="map"
              width={65}
              height={65}
              className="rounded-2xl object-cover"
            />
            <div>
              <h4 className="font-bold">{addr.title}</h4>
              <p className="text-sm text-gray-600">{addr.desc}</p>
            </div>
          </div>

          <div className="flex gap-2 text-gray-500">
            <button onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="text-text-website-font h-5 w-5 cursor-pointer" />
            </button>

            <button onClick={() => setIsAlertOpen(true)}>
              <Trash2 className="h-5 w-5 cursor-pointer text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <GlobalDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <AddressForm
          isUpdate
          initialData={{
            ...addr,
            lat: Number(addr.lat),
            lng: Number(addr.lng),
          }}
          onSuccess={handleEditSuccess}
        />
      </GlobalDialog>

      <GlobalAlertDialog
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title={t("delete_address_title")}
        description={t("delete_address_description")}
        confirmText={t("confirm_delete_button")}
        cancelText={t("cancel_button")}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}