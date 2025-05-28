'use client';

import React from 'react';
import { useLikedStore } from '@/store/likedStore';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { ArrowRight } from 'lucide-react';

type Item = {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    rating: number;
};

type SliderProps = {
    title?: string;
    items: Item[];
};

export default function Slider({ title, items }: SliderProps) {
    const likedItems = useLikedStore(state => state.likedItems);
    const toggleLike = useLikedStore(state => state.toggleLike);
    const isLiked = useLikedStore(state => state.isLiked);

    const handleViewAll = () => {
        console.log("View all clicked");
    };

    const handleItemPress = (item: Item) => {
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
                <div className="flex h-full overflow-x-auto scrollbar-hide ps-[120px] pb-4 px-4 gap-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleItemPress(item)}
                            className="flex-shrink-0 w-[408px] h-[509px] pt-2.5 pb-6 px-4  bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <div className="img relative mb-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-[325px] w-96 object-cover rounded-2xl"
                                />
                                <div className="absolute top-2 left-2 bg-yellow-50 rounded-full text-xs font-bold px-2 py-1  shadow">
                                    ⭐ {item.rating}
                                </div>
                            </div>
                            <div className="item-desc flex flex-col min-h-[134px] justify-around shrink-1">
                                <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                                <div className="flex  flex-1 justify-between items-center mt-2">
                                    <p className="text-2xl font-bold">{item.price}</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLike(item.id);
                                        }}
                                    >
                                        {isLiked(item.id) ? (
                                            <AiFillHeart className="text-red-600 text-xl" />
                                        ) : (
                                            <AiOutlineHeart className="text-gray-400 hover:text-red-400 text-xl transition-colors" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
