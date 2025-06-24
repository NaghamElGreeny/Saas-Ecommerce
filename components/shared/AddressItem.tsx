"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Edit, Trash2 } from "lucide-react";
import { useAddressStore } from "@/stores/addressStore";
import AddressForm from "../Forms/AddAdressForm";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AddressItem({ addr }: { addr: any }) {
  const { deleteAddressItem, fetchAddresses } = useAddressStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this address?",
    );
    if (confirm) {
      await deleteAddressItem(addr.id);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className=" rounded-lg border p-4 shadow hover:bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/map.png"
              alt="map"
              width={65}
              height={65}
              className="rounded-2xl object-cover"
            />
            <div className="desc">
              <h4 className="font-bold">{addr.title}</h4>
              <p className="text-sm text-gray-600">{addr.desc}</p>
            </div>
          </div>

          <div className="flex h-full gap-2 text-gray-500">
            {/* Edit Button opens Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button onClick={() => setIsDialogOpen(true)}>
                  <Edit className="text-primary w-full cursor-pointer" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl p-0 sm:max-w-[600px]">
                <AddressForm
                  isUpdate
                  initialData={addr}
                  onSuccess={() => {
                    handleDialogClose();
                    fetchAddresses();
                  }}
                />
              </DialogContent>
            </Dialog>

            {/* Delete Button */}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <Trash2 className="w-full cursor-pointer text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
