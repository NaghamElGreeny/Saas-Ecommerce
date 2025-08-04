"use client";

import React, { useState, useCallback, useEffect } from "react";
import ToppingItem from "@/components/ui/ToppingItem";
import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/ui/scroll-area";

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

type SubModifier = {
  item_modifier_id: number;
  sub_modifier_id: number;
  quantity: number;
};

type Props = {
  modifiers: Modifier[];
  onGetCurrentResult: (fn: () => SubModifier[]) => void;
};

export default function ModifierSection({
  modifiers,
  onGetCurrentResult,
}: Props) {
  const [selectedModifiers, setSelectedModifiers] = useState<{
    [key: number]: number | null;
  }>({});
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
console.log(modifiers)
  const handleSizeSelect = (modifierId: number, index: number) => {
    setSelectedModifiers((prev) => ({ ...prev, [modifierId]: index }));
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

  const modifiersResults = useCallback((): SubModifier[] => {
    const result: SubModifier[] = [];

    modifiers.forEach((modifier) => {
      if (modifier.selections_type === "exact") {
        const selectedIndex = selectedModifiers[modifier.id];
        if (
          selectedIndex !== undefined &&
          selectedIndex !== null &&
          modifier.item_modifiers[selectedIndex]
        ) {
          const item = modifier.item_modifiers[selectedIndex];
          result.push({
            item_modifier_id: item.id,
            sub_modifier_id: modifier.id,
            quantity: 1,
          });
        }
      } else {
        modifier.item_modifiers.forEach((item) => {
          const qty = quantities[item.id] || 0;
          if (qty > 0) {
            result.push({
              item_modifier_id: item.id,
              sub_modifier_id: modifier.id,
              quantity: qty,
            });
          }
        });
      }
    });

    return result;
  }, [modifiers, selectedModifiers, quantities]);

  useEffect(() => {
    onGetCurrentResult(modifiersResults);
  }, [modifiersResults,onGetCurrentResult]); 

  const t = useTranslations();

  return (
    <div className="modifiers">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {modifiers.map((modifier) => {
          const isExact = modifier.selections_type === "exact";

          return (
            <div className={`${ isExact ? 'lg:col-span-2 2xl:col-span-3': ''}`} key={modifier.id}>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                {modifier.name}&nbsp;&nbsp;
                <span className="text-[16px] font-normal text-[#FCC230]">
                  {t("LABELS.selectItem", {
                    value: isExact ? modifier.max_num_of_selection : `(${ modifier.min_num_of_selection||'0'} ~ ${ modifier.max_num_of_selection})`,
                    name: t("LABELS.Topping"),
                  })}
                  {/* Select {modifier.max_num_of_selection} {modifier.name}* */}
                </span>
              </h3>

              <ScrollArea className={` ${ isExact ? 'min-h-[100px]': 'h-[300px]'}  w-full overflow-y-auto rounded-md px-4 py-4  flex gap-5`}>
                {isExact ? (
                  <div>
                    <div
                      className={`flex flex-wrap gap-3 ${modifier.selections_type}`}
                    >
                      {modifier.item_modifiers.map((item, index) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => handleSizeSelect(modifier.id, index)}
                          className={`label_with_check rounded-2xl border border-[#F0F0F0] bg-card  ${
                            selectedModifiers[modifier.id] === index
                              ? "border-primary/70 bg-blue-50 text-primary"
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
                  <div className="space-y-4 pe-2">
                    {modifier.item_modifiers.map((item) => {
                      const quantity = quantities[item.id] || 0;
                      const totalSelected =
                        getTotalQuantityForModifier(modifier);
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
                )}
            </ScrollArea>
              </div>
          );
        })}
      </div>
    </div>
  );
}
