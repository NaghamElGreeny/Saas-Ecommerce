'use client';

import React from 'react';
import { useLikedStore } from '@/stores/likedStore';
// import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from './Card';
import Link from 'next/link';
import { CardItem } from '@/services/types';
// Import Swiper styles



type SliderProps = {
    title?: string;
    items: CardItem[];
};

export default function Slider({ title, items }: SliderProps) {
    // const likedItems = useLikedStore(state => state.likedItems);
    const toggleLike = useLikedStore(state => state.toggleLike);
    const isLiked = useLikedStore(state => state.isLiked);

    const handleItemPress = (item: CardItem) => {
        console.log("Item clicked:", item.name);
    };

    return (
        <div className="sliderr container px-10  my-6 min-h-screen h-[450px]">
            {/* Header */}
            <div className="flex justify-between items-center px-28 mb-10">
                <h2 className="lg:text-5xl md:text-4xl text-3xl font-bold">{title}</h2>
                <Link
                    href='/menu'
                    className="rtl:flex-row-reverse text-indigo-600 hover:text-indigo-800 text-sm flex cursor-pointer"
                >
                    <p className="me-1">View All</p> <ArrowRight />
                </Link>
            </div>

            {/* Items Slider */}
            <div className="relative h-full">
                <div className="container w-full flex h-full  overflow-x-visible scrollbar-hide  ">
       <Swiper
//   dir="rtl"
  slidesPerView={3.5}
  spaceBetween={10}
  loop
  breakpoints={{
    320: { slidesPerView: 1, spaceBetween: 10 },
    640: { slidesPerView: 2.5, spaceBetween: 20 },
    992: { slidesPerView: 3.5, spaceBetween: 30 },
    1024: { slidesPerView: 3.5, spaceBetween: 30 },
  }}
  className="w-full"
>
                        {items.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Card
                                    item={item}
                                    width='408px'
                                    // onPress={handleItemPress}
                                    // toggleLike={toggleLike}
                                    // isLiked={isLiked}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div >
    );
}
