/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteAddress, getAddress } from "@/services/ClientApiHandler";
import { useAddressStore } from "@/stores/addressStore";

export default function AddressItem(addr) {
    const address = addr.addr;
 const { setAddresses } = useAddressStore();

  const handleRemove = async () => {
    try {
      await deleteAddress(address.id);
      const res = await getAddress();
      setAddresses((res as { data: any }).data); // refresh addresses
      toast.success('Address deleted successfully');
    } catch {
      toast.error('Failed to delete address');
    }
  };
  const handleUpdate  = async () => {
  //update address data
  };


  return (
    <div className="mb-3 flex justify-between rounded-xl bg-white p-4">
      <Image
        src="/assets/images/map.png"
        alt="map"
        width={65}
        height={65}
        className="rounded-2xl object-cover"
      />

      <div className="flex w-full flex-col justify-between px-4">
        <div className="flex justify-between items-center">
          <div className="w-4/5">
            <h2 className="text-lg font-semibold">{address.title}</h2>
    
            <p>{address.desc}</p>
          </div>
          <div className="btns flex items-center w-1/5 justify-around">
            <button className="" onClick={handleUpdate}>
              <Edit className="w-full cursor-pointer text-primary" />
            </button>
            <button className="" onClick={handleRemove}>
              <Trash2 className="w-full cursor-pointer text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

