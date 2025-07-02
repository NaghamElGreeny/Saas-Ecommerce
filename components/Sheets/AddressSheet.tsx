"use client";

import { useEffect, useState } from "react";
import { SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAddressStore } from "@/stores/addressStore";

import AddressItem from "../shared/AddressItem";
import AddressForm from "../Forms/AddAdressForm";
import GlobalDialog from "../shared/GlobalDialog";


export default function AddressSheet() {
  const { addresses, fetchAddresses } = useAddressStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
 
  };

  return (
    <>
      <SheetHeader className="flex items-center justify-between">
        <SheetTitle className="start-0 text-2xl font-bold">My Address</SheetTitle>
        <div style={{ width: 24 }} />
      </SheetHeader>

      <div className="flex-grow overflow-hidden p-4">
        <ScrollArea className="flex h-full w-full overflow-y-auto cscrollbar scrollbar-thumb-primary scrollbar-track-transparent px-4 py-2">
          <div className="flex w-full flex-col space-y-4">
            {addresses?.length > 0 ? (
              addresses.map((address) => (
                <AddressItem key={address.id} addr={address} />
              ))
            ) : (
              <p className="mt-8 text-center text-gray-500">
                No addresses found.
              </p>
            )}
          </div>
        </ScrollArea>
      </div>

      <SheetFooter className="flex h-fit flex-col items-center justify-center">
        <button
          onClick={() => {
            setIsDialogOpen(true);
          }}
          className="mt-4 flex h-10 w-[80%] items-center justify-center gap-2 rounded-full bg-primary border border-primary text-white cursor-pointer hover:bg-white hover:text-primary"
        >
          Add new address
        </button>
      </SheetFooter>

      <GlobalDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) handleDialogClose();
        }}
     
      >
        <AddressForm
          onSuccess={() => {
            handleDialogClose();
            fetchAddresses();
          }}
        />
      </GlobalDialog>
    </>
  );
}
