import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";
import { CartProduct, ItemModifier, SubModifier } from "@/utils/cartTypes";

// type Modifier = {
//   id: number;
//   name: string;
//   quantity: number;
// };

type Props = {
  cartProduct: CartProduct
};

export default function CartItemCard({ cartProduct }: Props) {
    // استخراج جميع الـ modifiers في مصفوفة واحدة
    const product = cartProduct.product;
    console.log(cartProduct)
  // Assuming each group is of type SubModifier and has an 'item_modifiers' property (adjust as needed)
  const modifiers: ItemModifier[] = cartProduct.sub_modifiers
    ?.flatMap((group: any) =>
      (group.item_modifiers ?? []).map((mod: ItemModifier) => ({
        id: mod.id,
        name: mod.name,
          quantity: mod.quantity,
        price:mod.price
      }))
    ) ?? [];
console.log('product :',product)
  return (
    <div className="flex w-[590px] h-[136px] products-center justify-between rounded-xl bg-white p-4 shadow-sm">
      {/* صورة المنتج */}
      <Image
        src={product.image}
        alt={product.name}
        width={90}
        height={90}
        className="rounded-2xl object-cover"
      />

      {/* محتوى المنتج */}
      <div className="flex flex-col justify-between h-full flex-grow px-4">
        {/* الاسم والحذف */}
        <div className="flex products-start justify-between">
          <h2 className="text-lg font-semibold line-clamp-1">{product.name}</h2>
          <Trash2 className="text-red-500 cursor-pointer" />
        </div>

        {/* modifiers */}
        <div className="text-sm text-indigo-400 mt-1 line-clamp-1">
          {modifiers.map((mod, index) => (
            <span key={mod.id}>
              {mod.quantity}x {mod.name} ({mod.price.price}{mod.price.price})
              {index !== modifiers.length - 1 && ", "}
            </span>
          ))}
        </div>

        {/* السعر */}
        <div className="font-bold text-lg mt-auto">
          {/* {product.total_price.toFixed(2)} */}
          <span className="text-xs font-normal ml-1">EGP</span>
        </div>
      </div>

      {/* عداد الكمية */}
      <div className="flex products-center border rounded-full px-4 py-2 text-gray-500 gap-4">
        <Minus className="cursor-pointer" />
        <span className="text-black font-semibold">{cartProduct.quantity}</span>
        <Plus className="cursor-pointer" />
      </div>
    </div>
  );
}
