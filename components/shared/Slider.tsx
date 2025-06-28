"use client";

import React from "react";
import { useLikedStore } from "@/stores/likedStore";
// import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../cards/Card";
import Link from "next/link";
import { CardItem } from "@/utils/types";
// Import Swiper styles

type SliderProps = {
  title?: string;
  items: CardItem[];
};

export default function Slider({ title, items }: SliderProps) {
  // const likedItems = useLikedStore((state) => state.likedItems);
  const toggleLike = useLikedStore((state) => state.toggleLike);
  const isLiked = useLikedStore((state) => state.isLiked);

  const handleItemPress = (item: CardItem) => {
    console.log("Item clicked:", item.name);
  };

  return (
    <div className="sliderr container my-6 min-h-screen px-10">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between px-28">
        <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h2>
        <Link
          href="/menu"
          className="flex cursor-pointer text-sm text-indigo-600 hover:text-indigo-800 rtl:flex-row-reverse"
        >
          <p className="me-1">View All</p> <ArrowRight />
        </Link>
      </div>

      {/* Items Slider */}
      <div className="relative w-full">
        <div className="scrollbar-hide flex w-full overflow-x-visible">
          <Swiper
            slidesPerView={3.5}
            spaceBetween={20}
            loop
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2.2, spaceBetween: 15 },
              768: { slidesPerView: 2.5, spaceBetween: 20 },
              992: { slidesPerView: 3.2, spaceBetween: 25 },
              1200: { slidesPerView: 3.5, spaceBetween: 30 },
            }}
            className="h-full w-full"
          >
            {items &&
              items.map((item) => (
                <SwiperSlide key={item.id} style={{ width: "400px" }}>
                  <Card
                    item={item}
                    // width="350px"
                    width="100%"
                    onPress={handleItemPress}
                    toggleLike={toggleLike}
                    isLiked={isLiked}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
