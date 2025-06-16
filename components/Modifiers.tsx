"use client";

import React, { useState } from "react";
import ToppingItem from "./ui/ToppingItem";

type Modifier = {
  id: number;
  name: string;
  selections_type: "exact" | "min_max";
  min_num_of_selection: number | null;
  max_num_of_selection: number | null;
  item_modifiers: {
    id: number;
    name: string;
    image: string;
    price: { price: number; currency: string } | null;
  }[];
};

type Props = {
  modifiers: Modifier[];
};

export default function ModifierSection({ modifiers }: Props) {
  const [selectedSizes, setSelectedSizes] = useState<{
    [key: number]: number | null;
  }>({});
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleSizeSelect = (modifierId: number, index: number) => {
    setSelectedSizes((prev) => ({ ...prev, [modifierId]: index }));
  };

  const getTotalQuantityForModifier = (modifier: Modifier) => {
    return modifier.item_modifiers.reduce((total, item) => {
      return total + (quantities[item.id] || 0);
    }, 0);
  };

  const handleAdd = (itemId: number, modifier: Modifier) => {
    const total = getTotalQuantityForModifier(modifier);
    if (
      modifier.max_num_of_selection !== null &&
      total >= modifier.max_num_of_selection
    )
      return;

    setQuantities((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const handleRemove = (itemId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {modifiers.map((modifier) => {
          const isExact = modifier.selections_type === "exact";

          return isExact ? (
            <div className="size col-span-2" key={modifier.id}>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                {modifier.name}&nbsp;&nbsp;
                <span className="text-[16px] font-normal text-[#FCC230]">
                  Select {modifier.max_num_of_selection} sizes*
                </span>
              </h3>

              <div className="flex flex-wrap gap-3">
                {modifier.item_modifiers.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleSizeSelect(modifier.id, index)}
                    className={`w-42 rounded-lg border p-3 text-center transition-colors ${
                      selectedSizes[modifier.id] === index
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.price
                        ? `${item.price.price} ${item.price.currency}`
                        : "Free"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="section" key={modifier.id}>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                {modifier.name}&nbsp;&nbsp;
                <span className="text-[16px] font-normal text-[#FCC230]">
                  Select {modifier.max_num_of_selection} Topping*
                </span>
              </h3>

              <div className="flex flex-col gap-4">
                {modifier.item_modifiers.map((item) => {
                  const quantity = quantities[item.id] || 0;
                  const totalSelected = getTotalQuantityForModifier(modifier);
                  const maxReached =
                    modifier.max_num_of_selection !== null &&
                    totalSelected >= modifier.max_num_of_selection;

                  return (
                    <ToppingItem
                      key={item.id}
                      name={item.name}
                      price={item.price}
                      unit="70 gm"
                      quantity={quantity}
                      onAdd={() => handleAdd(item.id, modifier)}
                      onRemove={() => handleRemove(item.id)}
                      disableAdd={maxReached}
                      disableRemove={quantity === 0}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
