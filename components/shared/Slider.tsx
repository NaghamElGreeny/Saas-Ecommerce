"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../cards/Card";
import Link from "next/link";
import { Product } from "@/utils/menuTypes";


type SliderProps = {
  title?: string;
  items: Product[];
  offer?: boolean|false;
};

export default function Slider({ title, items,offer }: SliderProps) {


  return (
    <div className="sliderr container my-6 min-h-screen px-10">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between px-28">
        <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h2>
        <Link
          href={offer?'/offers':'/menu'}
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
                <SwiperSlide key={item.id} style={{ width: "420px" }}>
                  <Card
                    item={item}
                    // width="350px"
                    offer={offer}
                    width="100%"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
