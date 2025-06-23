"use client";

import { useEffect, useState } from "react";
import {
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { getAddress } from "@/services/ClientApiHandler";
import { useAddressStore } from "@/stores/addressStore";

import AddressItem from "../shared/AddressItem";
import AddressForm from "../Forms/AddAdressForm";

export default function AddressSheet() {
  const { addresses, setAddresses } = useAddressStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any | null>(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await getAddress();
      setAddresses(response.data);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  };

  const handleEdit = (addressData: any) => {
    setEditingAddress(addressData);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingAddress(null);
  };

  return (
    <>
      <SheetHeader className="flex items-center justify-between">
        <SheetTitle className="start-0 text-2xl font-bold">
          My Address
        </SheetTitle>
        <div style={{ width: 24 }} />
      </SheetHeader>

      <div className="flex-grow overflow-hidden p-4">
        <ScrollArea className="h-full w-full overflow-y-auto">
          {addresses?.length > 0 ? (
            addresses.map((address) => (
              <AddressItem
                key={address.id}
                addr={address}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <p className="mt-8 text-center text-gray-500">
              No addresses found.
            </p>
          )}
        </ScrollArea>
      </div>

      <SheetFooter className="flex h-fit flex-col items-center justify-center">
        <Dialog open={isDialogOpen} onOpenChange={(open) => open ? null : handleDialogClose()}>
          <DialogTrigger asChild>
            <button className="mt-4 flex h-10 w-[80%] items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white">
              Add new address
            </button>
          </DialogTrigger>

          <DialogContent className="h-[90vh] max-w-[90vw] overflow-hidden rounded-3xl p-0 sm:max-w-[750px]">
            <AddressForm
              isUpdate={!!editingAddress}
              initialData={editingAddress}
              onSuccess={() => {
                handleDialogClose();
                fetchAddresses();
              }}
            />
          </DialogContent>
        </Dialog>
      </SheetFooter>
    </>
  );
}
