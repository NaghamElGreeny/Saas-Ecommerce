/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
// import { Spinner } from "@heroui/spinner";
import { CartProduct, ItemModifier } from "@/utils/cartTypes";
// import toast from "react-hot-toast";
// import { useCartStore } from "@/stores/cartStore";

type Props = {
  cartProduct: CartProduct;
};

export default function CheckoutCartItem({ cartProduct }: Props) {
  //   const { updateProductQuantity, removeProduct, actionLoading } = useCartStore();

  const product = cartProduct.product;

  const modifiers: ItemModifier[] =
    cartProduct.sub_modifiers?.flatMap((group: any) =>
      (group.item_modifiers ?? []).map((mod: ItemModifier) => ({
        id: mod.id,
        name: mod.name,
        quantity: mod.quantity,
        price: mod.price,
      })),
    ) ?? [];

  return (
    <div className="products-center border-line mb-4 flex justify-between gap-3 rounded-xl border p-2">
      <Image
        src={product.image}
        alt={product.name}
        width={121}
        height={84}
        className="rounded-2xl object-cover"
      />

      <div className="flex h-full w-full flex-col justify-between py-1">
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <div className="text-sm text-indigo-400">
              {modifiers.map((mod, index) => (
                <span key={mod.id}>
                  {mod.quantity}x {mod.name} ({mod.price.price}
                  {mod.price.currency}){index !== modifiers.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="mt-auto flex items-center gap-2.5 text-lg font-bold">
            <div>
              {product.price.price_after.toFixed(2)}
              <span className="ml-1 text-xs">{product.price.currency}</span>
            </div>
            <div className="text-sm text-indigo-400 line-through">
              {product.price.price.toFixed(2)}
              <span className="ml-1 text-xs">{product.price.currency}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
