"use client";
import { Slider } from "@/utils/types";
import "@/styles/hero.css";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect, useRef } from "react";
import LocalePath from "../localePath";

export default function Hero({ sliders }: { sliders: Slider[] }) {
  const socials = ["facebook", "twitter", "messenger", "instagram"];
  const [current, setCurrent] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const images = sliders.map((s) => `url(${s.image})`);

  //   useEffect(() => {
  //     // startAutoSlide();
  //     return () => stopAutoSlide();
  //   }, []);

  //   const startAutoSlide = () => {
  //     stopAutoSlide();
  //     intervalRef.current = setInterval(() => {
  //       setCurrent((prev) => (prev + 1) % images.length);
  //     }, 3000);
  //   };

  //   const stopAutoSlide = () => {
  //     if (intervalRef.current) clearInterval(intervalRef.current);
  //   };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
    // startAutoSlide();
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    // startAutoSlide();
  };

  const style = {
    backgroundImage: images[current],
  };
  return (
    <section
      className="slider-bg h-[90vh] bg-cover bg-center bg-no-repeat"
      style={style}
    >
      <div className="h-full w-full bg-black/50 px-16 sm:px-6 lg:px-32">
        <div className="mx-auto flex h-4/5 max-w-2xl flex-col items-center justify-center text-center">
          <h1 className="mb-4 font-[Allura] text-4xl text-white md:text-6xl lg:text-7xl"  data-aos="fade-up" data-aos-delay="500">
            Exotic and Delicious
          </h1>

          <p className="mb-6 text-white"  data-aos="fade-up" data-aos-delay="700">
            Food is the foundation of true happiness, lorem ipsum
            <br />
            dolor sit amet, consectetur adipiscing elit aenean.
          </p>

          <LocalePath
            href="/" data-aos="fade-up" data-aos-delay="900"
            className="flex font-medium text-white md:text-xl rtl:flex-row-reverse"
          >
            <p className="underline" > Discover More </p>
            <ArrowUpRight />
          </LocalePath>
        </div>

        <div className="flex justify-between">
          <div className="flex w-56 gap-4">
            {socials.map((social, index) => (
              <Link
                key={index}
                className="flex size-11 items-center justify-center rounded-full border border-white"
                href={`${social}.com`}>
                <Image
                  src={`/assets/icons/${social}.svg`}
                  alt={social}
                  width={32}
                  height={32}
                  style={{ objectFit: "contain" }}
                />
              </Link>
            ))}
          </div>
          <div className="flex w-28 justify-between text-gray-400 rtl:flex-row-reverse">
            <ChevronLeft
              className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/50"
              onClick={handlePrev}
            />
            <ChevronRight
              className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/50"
              onClick={handleNext}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
