"use client";

import { useEffect, useState } from "react";
import { SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  // DialogTitle,
} from "@/components/ui/dialog";
import { getAddress } from "@/services/ClientApiHandler";
import { useAddressStore } from "@/stores/addressStore";
import AddressItem from "../shared/AddressItem";
import AddressForm from "../Forms/AddAdressForm";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AddressSheet() {
  const { addresses, setAddresses } = useAddressStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await getAddress();
        // If you know the shape, you can type it more specifically
        setAddresses((res as { data: typeof addresses }).data);
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

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
            addresses.map((addr) => <AddressItem addr={addr} key={addr.id} />)
          ) : (
            <p className="mt-8 text-center text-gray-500">
              No addresses found.
            </p>
          )}
        </ScrollArea>
      </div>

      <SheetFooter className="flex flex-col items-center justify-center h-fit">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="mt-4 flex h-10 w-[80%] items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white">
              Add new address
            </button>
          </DialogTrigger>

          <DialogContent className="h-[90vh] max-w-[90vw] overflow-hidden rounded-3xl p-0 sm:max-w-[750px]">
            <AddressForm />
          </DialogContent>
        </Dialog>
      </SheetFooter>
    </>
  );
}
