"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../cards/Card";
import Link from "next/link";
import { Product } from "@/utils/menuTypes";
import { useTranslations } from "next-intl";

type SliderProps = {
  title?: string;
  items: Product[];
  offer?: boolean | false;
};

export default function Slider({ title, items, offer }: SliderProps) {
  const t = useTranslations("HOME");

  return (
    <div className="sliderr container my-6 min-h-screen px-10">
      {/* Header */}

      {/* Items Slider */}
     <div className="relative w-full">
  <div className="scrollbar-hide flex w-full overflow-x-visible lg:ps-20 flex-col">
      <div className="mb-10 flex items-center justify-between w-full">
        <h2
          data-aos="fade-up"
          className="text-lg font-bold md:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
        <Link
          href={offer ? "/offers" : "/menu"}
          className="flex cursor-pointer text-sm text-indigo-600 hover:text-indigo-800"
        >
          <p className="me-1">{t("view-all")}</p> <ArrowRight className="rtl:rotate-180"/>
        </Link>
      </div>
   <Swiper
  loop
  className="w-full h-full"
  spaceBetween={40}
  slidesPerView="auto"
>
  {items?.map((item) => (
    <SwiperSlide
      key={item.id}
      data-aos="fade-up"
      className="!w-[430px]" 
    >
      <Card item={item} offer={offer} className="w-full" />
    </SwiperSlide>
  ))}
</Swiper>

  </div>
</div>

    </div>
  );
}
