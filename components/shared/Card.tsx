/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useLikedStore } from "@/stores/likedStore";
import { Product } from "@/utils/menuTypes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Card({
  item,
  offer,
  width,
}: {
  item: Product;
  offer?: any;
  width?: string;
}) {
  const likedItems = useLikedStore((state) => state.likedItems);
  const toggleLike = useLikedStore((state) => state.toggleLike);
    const liked = likedItems.includes(item.id);
     const router = useRouter();
  const handlePress = () => {
      console.log("Item clicked:", item.name);
      //  router.push(`/product/${item.slug}?lat=${item.lat || 0}&lng=${item.lng || 0}`);
       router.push(`/product/${item.slug}`);
  };
  console.log(item);
  return (
    <div
      onClick={handlePress}
      style={{ width }}
      className={`h-[509px] w-[302px] flex-shrink-0 cursor-pointer rounded-2xl bg-white px-4 pt-2.5 pb-6 shadow-sm transition-shadow hover:shadow-md`}
    >
      <div className="img relative mb-4">
        <img
          src={item.image}
          alt={item.name}
          className="h-[325px] w-96 rounded-2xl object-cover"
        />
        <div className="absolute top-2 left-2 rounded-full bg-yellow-50 px-2 py-1 text-xs font-bold shadow">
          ⭐ {item.rating}
        </div>
      </div>
      <div className="item-desc flex min-h-[134px] shrink-1 flex-col justify-around">
        <h3 className="mb-1 text-lg font-bold">{item.name}</h3>
        <p className="mb-2 text-sm text-gray-600">{item.desc}</p>
        <div className="mt-2 flex flex-1 items-center justify-between">
          <p className="text-2xl font-bold">
            {item.price.price}{" "}
            <span className="text-lg">{item.price.currency}</span>{" "}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(item.id);
              console.log("liked");
            }}
          >
            {liked ? (
              <AiFillHeart className="text-primary text-xl" />
            ) : (
              <AiOutlineHeart className="text-xl text-gray-400 transition-colors hover:text-blue-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
