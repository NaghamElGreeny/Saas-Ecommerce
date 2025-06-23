/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
// import { Spinner } from "@heroui/spinner";
import { CartProduct, ItemModifier } from "@/utils/cartTypes";
import toast from "react-hot-toast";
import { useCartStore } from "@/stores/cartStore";

type Props = {
  cartProduct: CartProduct;
};

export default function CartItemCard({ cartProduct }: Props) {
  const { updateProductQuantity, removeProduct, actionLoading } =
    useCartStore();

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

  const handleRemove = async () => {
    try {
      await removeProduct(cartProduct.id);
      toast.success("Item deleted successfully");
    } catch {
      toast.error("Failed to delete item");
    }
  };

  const handleDecrease = async () => {
    if (cartProduct.quantity === 1) return;
    try {
      await updateProductQuantity(cartProduct.id, cartProduct.quantity - 1);
      toast.success("Quantity decreased");
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const handleIncrease = async () => {
    try {
      await updateProductQuantity(cartProduct.id, cartProduct.quantity + 1);
      toast.success("Quantity increased");
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  return (
    <div className="products-center mb-4 flex h-[160px] justify-between rounded-xl bg-white p-4 ">
      <Image
        src={product.image}
        alt={product.name}
        width={130}
        height={90}
        className="rounded-2xl object-cover"
      />

      <div className="flex h-full w-full flex-col justify-between px-4">
        <div className="flex justify-between">
          <div>
            <h2 className="line-clamp-1 text-lg font-semibold">
              {product.name}
            </h2>
            <div className="mt-0.5 line-clamp-2 max-w-[60%] text-sm text-indigo-400">
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
            onClick={handleRemove}
            disabled={actionLoading}
          >
            {/*actionLoading ? (
              <Spinner size="sm" className="text-red-500" />
            ) : (
            )*/}
            <Trash2 className="w-full cursor-pointer text-red-500" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="mt-auto text-lg font-bold">
            <div className="text-sm text-indigo-400 line-through">
              {product.price.price.toFixed(2)}
              <span className="ml-1 text-xs font-normal">{product.price.currency}</span>
            </div>
            <div>
              {product.price.price_after.toFixed(2)}
              <span className="ml-1 text-xs font-normal">{product.price.currency}</span>
            </div>
          </div>
          <div
            className={`counter flex h-[70%] items-center gap-4 rounded-full border p-1 text-gray-500 transition-opacity ${
              actionLoading ? "pointer-events-none opacity-50" : ""
            }`}
          >
       <Minus className="size-4 cursor-pointer" onClick={handleDecrease} />
            <span className="font-semibold text-black">
              {cartProduct.quantity}
            </span>
            <Plus className="size-4 cursor-pointer" onClick={handleIncrease} />
          </div>
         
        </div>
      </div>
    </div>
  );
}
