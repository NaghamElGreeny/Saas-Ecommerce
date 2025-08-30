"use client";
import { Slider } from "@/utils/types";
import "@/styles/hero.css";
import { ArrowUpRight } from "lucide-react";
//  ChevronLeft, ChevronRight 
import Link from "next/link";
import Image from "next/image";
// import { useState} from "react";
import LocalePath from "../localePath";
import { useTranslations } from "next-intl"; 

export default function Hero({ sliders }: { sliders: Slider[] }) {
  const socials = ["facebook", "twitter", "messenger", "instagram"];
  // const [current, setCurrent] = useState(0);
  // const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations("HERO"); 

  const images = sliders.map((s) => `url(${s.image})`);
  
  //عشان الراجع من الباك صوره واحده ف ملوش لازمه دلوقتي 
  
  // useEffect(() => {
  //   startAutoSlide();
  //   return () => stopAutoSlide();
  // }, []);

  // const startAutoSlide = () => {
  //   stopAutoSlide();
  //   intervalRef.current = setInterval(() => {
  //     setCurrent((prev) => (prev + 1) % images.length);
  //   }, 3000);
  // };

  // const stopAutoSlide = () => {
  //   if (intervalRef.current) clearInterval(intervalRef.current);
  // };

  // const handleNext = () => {
  //   setCurrent((prev) => (prev + 1) % images.length);
  //   // startAutoSlide();
  // };

  // const handlePrev = () => {
  //   setCurrent((prev) => (prev - 1 + images.length) % images.length);
  //   // startAutoSlide();
  // };

  const style = {
    // backgroundImage: images[current],
    backgroundImage: images[0],
  };
  return (
    <section
      className="slider-bg h-[90vh] bg-cover bg-center bg-no-repeat"
      style={style}
    >
      <div className="h-full w-full bg-black/50 px-16 sm:px-6 lg:px-32">
        <div className="mx-auto flex h-4/5 max-w-2xl flex-col items-center justify-center text-center">
          <h1
            className="animated mb-4 font-[Allura] text-4xl text-white md:text-6xl lg:text-7xl"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {t("title")}
          </h1>

          <p
            className="mb-6 text-white"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            {t("description")}
          </p>

          <LocalePath
            href="/"
            data-aos="fade-up"
            data-aos-delay="900"
            className="animated flex font-medium text-white md:text-xl rtl:flex-row-reverse"
          >
            <p className="underline">{t("discover_more_button")}</p>
            <ArrowUpRight />
          </LocalePath>
        </div>

        <div className="flex md:justify-between justify-center">
          <div className="flex w-56 gap-4">
            {socials.map((social, index) => (
              <Link
                key={index}
                className="flex size-11  items-center justify-center rounded-full border border-white"
                href={`${social}.com`}
              >
                <Image
                  src={`/assets/icons/${social}.svg`}
                  alt={social}
                  width={24}
                  height={24}
                  style={{ objectFit: "contain" }}
                />
              </Link>
            ))}
          </div>
          {/* <div className="flex w-28 justify-between text-gray-400 rtl:flex-row-reverse">
            <ChevronLeft
              className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/50"
              onClick={handlePrev}
            />
            <ChevronRight
              className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/50"
              onClick={handleNext}
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}