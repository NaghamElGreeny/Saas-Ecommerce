"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";

import { Address, useAddressStore } from "@/stores/addressStore";
import AddressForm from "../Forms/AddAdressForm";
import GlobalDialog from "../shared/GlobalDialog";
import GlobalAlertDialog from "../shared/GlobalAlertDialog";

type Props = {
  addr: Address;
};

export default function AddressItem({ addr }: Props) {
  const { deleteAddressItem, fetchAddresses , updateAddressItem} = useAddressStore();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

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
      <div className="rounded-lg border p-4 shadow hover:bg-gray-50">
        <div className="flex items-center justify-between">
          {/* Address info */}
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

          {/* Actions */}
          <div className="flex gap-2 text-gray-500">
            {/* Edit */}
            <button onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="text-primary w-5 h-5 cursor-pointer" />
            </button>

            {/* Delete */}
            <button onClick={() => setIsAlertOpen(true)}>
              <Trash2 className="text-red-500 w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <GlobalDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <AddressForm
          isUpdate
          initialData={addr}
          onSuccess={handleEditSuccess}
        />
      </GlobalDialog>

      {/* Confirm Delete */}
      <GlobalAlertDialog
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title="Delete Address"
        description="Are you sure you want to delete this address? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
