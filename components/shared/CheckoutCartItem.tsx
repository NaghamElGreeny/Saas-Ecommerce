/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import {  ItemModifier } from "@/utils/cartTypes";
import { OrderItem } from "@/utils/types";

type Props = {
  // cartProduct: CartProduct;
  cartProduct: OrderItem;
};

export default function CheckoutCartItem({ cartProduct }: Props) {
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
    <div className="products-center border border-border mb-4 flex justify-between gap-3 rounded-2xl  p-2">
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
                           {modifiers?.map((mod, index) => (
                <span key={mod.id}>
                  {mod.quantity}x {mod.name} ({mod.price?.price ?? 0}{" "}
                  {mod.price?.currency ?? ""})
                  {index !== modifiers.length - 1 && ", "}
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
