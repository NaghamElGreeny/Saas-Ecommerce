"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import EmailSubscription from "../ui/SubscribeBtn";
import DownloadButtons from "../ui/Download";
import Btn from "../ui/Btn";
import { WebContent } from "@/utils/types";

export function DblSection({
  topMsg,
  sectionData,
  sectionType,
  reverse,
}: {
  topMsg?: string;
  sectionData: WebContent;
  sectionType: string;
  reverse?: boolean;
}) {
  const [isRTL, setIsRTL] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsRTL(document?.dir === "rtl");
    }
  }, []);

  const imageFirst = reverse ? !isRTL : isRTL;

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="from-primary-50 to-secondary-50 bg-gradient-to-r py-16 md:py-24"
    >
      <div className="container mx-auto w-[90%] px-4">
        <div className="grid grid-cols-1 items-center lg:grid-cols-2">
          {/* Image Section */}
          <Image
            src={sectionData.image}
            alt={"section"}
            width={1000}
            height={1000}
            className={`relative mx-auto h-80 w-80 overflow-hidden rounded-full object-cover shadow-lg md:h-96 lg:h-[700px] lg:w-[560px] ${imageFirst ? "order-1 lg:order-1" : "order-1 lg:order-2"}`}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Text Section */}
          <div
            className={`mb-4 flex h-full flex-col justify-center px-2 ${imageFirst ? "order-2 lg:order-2" : "order-2 lg:order-1"} ${isRTL ? "items-end text-right" : "items-start text-left"} `}
          >
            {topMsg && (
              <div
                className={`mb-4 flex w-full items-center ${isRTL ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`text-primary uppercase ${isRTL ? "ml-4" : "mr-4"}`}
                >
                  {topMsg}
                </p>
                <div className="line border-primary h-0 w-[200px] border-b"></div>
              </div>
            )}

            {mounted && (
              <h1
                className="mb-4 text-4xl leading-tight font-bold text-gray-900 md:text-5xl"
                dangerouslySetInnerHTML={{ __html: sectionData.title }}
              />
            )}

            {mounted && (
              <p
                className="mb-4 text-lg text-gray-700"
                dangerouslySetInnerHTML={{ __html: sectionData.desc }}
              />
            )}

            {sectionType === "subscribe" && <EmailSubscription />}
            {sectionType === "download" && (
              <DownloadButtons
                googlePlay={sectionData.google_play}
                appStore={sectionData.app_store}
              />
            )}
            {sectionType === "discover" && (
              <Btn text="Discover more" link="https://example.com" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
