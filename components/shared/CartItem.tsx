/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";
import { CartProduct, ItemModifier } from "@/utils/cartTypes";
import { deleteItem, updateCount } from "@/services/ClientApiHandler";
import toast from "react-hot-toast";

type Props = {
  cartProduct: CartProduct;
};

export default function CartItemCard({ cartProduct }: Props) {
  // استخراج جميع الـ modifiers في مصفوفة واحدة
  const product = cartProduct.product;
  //   console.log(cartProduct);
  // Assuming each group is of type SubModifier and has an 'item_modifiers' property (adjust as needed)
  const modifiers: ItemModifier[] =
    cartProduct.sub_modifiers?.flatMap((group: any) =>
      (group.item_modifiers ?? []).map((mod: ItemModifier) => ({
        id: mod.id,
        name: mod.name,
        quantity: mod.quantity,
        price: mod.price,
      })),
    ) ?? [];
  console.log("product :", product);
  return (
    <div className="products-center mb-4 flex h-[160px] justify-between rounded-xl bg-white p-4 shadow-sm">
      {/* product image */}
      <Image
        src={product.image}
        alt={product.name}
        width={130}
        height={90}
        className="rounded-2xl object-cover"
      />

      {/* product content */}
      <div className="flex h-full w-full flex-col justify-between px-4">
        <div className="name-delete flex justify-between">
          <div className="products-start">
            <h2 className="line-clamp-1 text-lg font-semibold">
              {product.name}
            </h2>
            <div className="mt-.5 line-clamp-2 max-w-[60%] text-sm text-indigo-400">
              {modifiers.map((mod, index) => (
                <span key={mod.id}>
                  {mod.quantity}x {mod.name} ({mod.price.price}
                  {mod.price.currency}){index !== modifiers.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
          <button
            className="w-[20%]"
            onClick={async () => {
              try {
                await deleteItem(cartProduct.id);
                toast.success("item deleted successfully");
              } catch {
                toast.error("Failed to delete item");
              }
            }}
          >
            <Trash2 className="w-full grow-0 cursor-pointer text-red-500" />
          </button>
        </div>

        <div className="counter-price flex items-center justify-between">
          <div className="mt-auto text-lg font-bold">
            <div className="pricebefore text-sm text-indigo-400 line-through">
              {product.price.price.toFixed(2)}
              <span className="ml-1 text-xs font-normal">EGP</span>
            </div>
            <div className="priceafter">
              {" "}
              {product.price.price_after.toFixed(2)}
              <span className="ml-1 text-xs font-normal">EGP</span>
            </div>
          </div>
          <div className="counter flex h-[70%] items-center gap-4 rounded-full border p-1 text-gray-500">
            <Minus
              className="size-4 cursor-pointer"
              onClick={async () => {
                if (cartProduct.quantity === 1) return;
                try {
                  await updateCount({
                    cart_product_id: cartProduct.id,
                    quantity: cartProduct.quantity - 1,
                    _method: "put",
                  });
                  toast.success("Quantity decreased");
                } catch {
                  toast.error("Failed to update quantity");
                }
              }}
            />
            <span className="font-semibold text-black">
              {cartProduct.quantity}
            </span>
            <Plus
              className="size-4 cursor-pointer"
              onClick={async () => {
                try {
                  await updateCount({
                    cart_product_id: cartProduct.id,
                    quantity: cartProduct.quantity + 1,
                    _method: "put",
                  });
                  toast("Quantity decreased");
                } catch {
                  toast.error("Failed to update quantity");
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
