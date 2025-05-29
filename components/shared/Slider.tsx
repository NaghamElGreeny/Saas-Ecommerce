'use client';

import React from 'react';
import { useLikedStore } from '@/store/likedStore';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from './Card';
import { CardItem } from '@/utils/types';
// Import Swiper styles



type SliderProps = {
    title?: string;
    items: CardItem[];
};

export default function Slider({ title, items }: SliderProps) {
    const likedItems = useLikedStore(state => state.likedItems);
    const toggleLike = useLikedStore(state => state.toggleLike);
    const isLiked = useLikedStore(state => state.isLiked);

    const handleViewAll = () => {
        console.log("View all clicked");
    };

    const handleItemPress = (item: CardItem) => {
        console.log("Item clicked:", item.name);
    };

    return (
        <div className="my-6">
            {/* Header */}
            <div className="flex justify-between items-center px-28 mb-10">
                <h2 className="lg:text-5xl md:text-4xl text-3xl font-bold">{title}</h2>
                <button
                    onClick={handleViewAll}
                    className="rtl:flex-row-reverse text-indigo-600 hover:text-indigo-800 text-sm flex"
                >
                    <p className="me-1">View All</p> <ArrowRight />
                </button>
            </div>

            {/* Items Slider */}
            <div className="relative">
                <div className="container flex h-full scrollbar-hide  pb-4">
                    <Swiper
                        slidesPerView={3.5}
                        centeredSlides={true}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={
                            {    // when window width is >= 320px
                                320: {
                                    slidesPerView: 2,
                                    spaceBetween: 10
                                },
                                // when window width is >= 480px
                                480: {
                                    slidesPerView: 2.5,
                                    spaceBetween: 20
                                },
                                // when window width is >= 640px
                                640: {
                                    slidesPerView: 3.5,
                                    spaceBetween: 30
                                }
                            }
                        }
                        className="mySwiper"
                    >
                        {items.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Card
                                    item={item}
                                    onPress={handleItemPress}
                                    toggleLike={toggleLike}
                                    isLiked={isLiked}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div >
    );
}
