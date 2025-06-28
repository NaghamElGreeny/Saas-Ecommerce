/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useLikedStore } from "@/stores/likedStore";

type Props = {
  cartProduct: any;
};

export default function WishlistCard({ cartProduct }: Props) {
  const { removeFromWishlist } = useLikedStore();

  const handleRemove = async () => {
await removeFromWishlist(cartProduct.favourite_id);
  };

  return (
    <div className="products-center mb-4 flex h-[160px] justify-between rounded-xl bg-white p-4">
      <Image
        src={cartProduct.image}
        alt={cartProduct.name}
        width={130}
        height={90}
        className="rounded-2xl object-cover"
      />

      <div className="flex h-full w-full flex-col justify-between px-4">
        <div className="flex justify-between">
          <div>
            <h2 className="line-clamp-1 text-lg font-semibold">
              {cartProduct.name}
            </h2>
            <div className="mt-0.5 line-clamp-2 max-w-[60%] text-sm text-indigo-400">
              {/* {modifiers?.map((mod, index) => (
                <span key={mod.id}>
                  {mod.quantity}x {mod.name} ({mod.price?.price ?? 0}{" "}
                  {mod.price?.currency ?? ""})
                  {index !== modifiers.length - 1 && ", "}
                </span>
              ))} */}
              <span>{cartProduct.desc}</span>
            </div>
          </div>
          <button className="w-[20%]" onClick={handleRemove}>
            <Trash2 className="w-full cursor-pointer text-red-500" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="mt-auto text-lg font-bold">
            <div className="text-sm text-indigo-400 line-through">
              {cartProduct.price.price.toFixed(2)}
              <span className="ml-1 text-xs font-normal">
                {cartProduct.price.currency}
              </span>
            </div>
            <div>
              {cartProduct.price.price_after.toFixed(2)}
              <span className="ml-1 text-xs font-normal">
                {cartProduct.price.currency}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
