"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../cards/Card";
import { Product } from "@/utils/menuTypes";
import { useTranslations } from "next-intl";
import LocalePath from "../localePath";

type SliderProps = {
  title?: string;
  items: Product[];
  offer?: boolean | false;
};

export default function Slider({ title, items, offer }: SliderProps) {
  const t = useTranslations("HOME");

  return (
    <div className="slider container my-12 min-h-fit px-10">
      {/* Items Slider */}
      <div className="relative w-full">
        <div className="scrollbar-hide flex w-full flex-col overflow-x-visible lg:ps-20">
          <div className="mb-10 flex w-full items-center justify-between">
            <h2
              data-aos="fade-up"
              className="text-lg font-bold md:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            <LocalePath
              href={offer ? "/offers" : "/menu"}
              className="flex cursor-pointer text-sm text-indigo-600 hover:text-indigo-800"
            >
              <p className="me-1">{t("view-all")}</p>{" "}
              <ArrowRight className="rtl:rotate-180" />
            </LocalePath>
          </div>
          <Swiper
            loop
            className="h-full w-full"
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
