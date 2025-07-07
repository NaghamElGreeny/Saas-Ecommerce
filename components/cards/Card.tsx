"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useLikedStore } from "@/stores/likedStore";
import { Product } from "@/utils/menuTypes";
import Image from "next/image";

function Card({
  item,
  width,
  offer,
  className = "",
}: {
  item: Product;
  width?: string;
  offer?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const { isLiked, toggleLike } = useLikedStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const liked = mounted ? isLiked(item.id) : false;

  const handlePress = () => {
    router.push(`/product/${item.slug}`);
  };

  return (
    <div
      onClick={handlePress}
      style={{ width }}
      className={`${className} relative  base-card-1 bg-website_white mx-1 flex h-full w-full flex-col !rounded-3xl !p-3`}
      // className="h-[509px] min-w-[402px] max-w-[450px] flex flex-col   cursor-pointer rounded-2xl bg-white px-4 pt-2.5 pb-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="img overflow-hidden relative mb-4 rounded-2xl">
        <Image
          // data-aos="zoom-out"
          src={item.image}
          alt={item.name}
          width={325}
          height={325}
          className="h-[325px] !w-full hover:scale-110  object-cover transition-transform"
        />
        <div className="absolute top-2 left-2 rounded-full bg-yellow-50 px-2 py-1 text-xs font-bold shadow">
          ⭐ {item.rating}
        </div>
      </div>
      <div className="item-desc flex min-h-[134px] shrink-1 flex-col justify-around">
        <h3 className="mb-1 text-lg font-bold">{item.name}</h3>
        <p className="mb-2 text-sm text-gray-600">{item.desc}</p>
        <div className="mt-2 flex flex-1 items-center justify-between">
          <div className="mt-auto text-lg font-bold">
            <div className="text-sm text-indigo-400 line-through">
              {item.price.price.toFixed(2)}
              <span className="ml-1 text-xs font-normal">
                {item.price.currency}
              </span>
            </div>
            <div>
              {item.price.price_after.toFixed(2)}
              <span className="ml-1 text-xs font-normal">
                {item.price.currency}
              </span>
            </div>
          </div>
          {offer ? (
            <div className="bg-primary flex h-14 w-14 flex-col items-center justify-center rounded-full text-[14px] leading-4 font-[400] text-white">
              <p>off</p>
              <p>% {item.price.percentage}</p>
            </div>
          ) : (
            mounted && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(item);
                }}
                className="cursor-pointer"
              >
                {liked ? (
                  <AiFillHeart className="text-primary text-xl" />
                ) : (
                  <AiOutlineHeart className="text-xl text-gray-400 transition-colors hover:text-blue-400" />
                )}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
