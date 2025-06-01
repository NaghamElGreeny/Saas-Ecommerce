'use client';

import { CardItem } from '@/utils/types';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useLikedStore } from '@/store/likedStore';

type CardProps = {
    item: CardItem;
    offer?: string;
    width?:string;
};

function Card({ item, offer,width}: CardProps) {
    const likedItems = useLikedStore(state => state.likedItems);
    const toggleLike = useLikedStore(state => state.toggleLike);
    const liked = likedItems.includes(item.id);
    const handlePress = () => {
        console.log("Item clicked:", item.name);
    };

    return (
        <div
            onClick={handlePress}
            className={`flex-shrink-0 h-[509px] w-[${width}] pt-2.5 pb-6 px-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
        >
            <div className="img relative mb-4">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-[325px] w-96 object-cover rounded-2xl"
                />
                <div className="absolute top-2 left-2 bg-yellow-50 rounded-full text-xs font-bold px-2 py-1 shadow">
                    ⭐ {item.rating}
                </div>
            </div>
            <div className="item-desc flex flex-col min-h-[134px] justify-around shrink-1">
                <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <div className="flex flex-1 justify-between items-center mt-2">
                    <p className="text-2xl font-bold">{item.price}</p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(item.id);
                        }}
                    >
                        {liked ? (
                            <AiFillHeart className=" text-primary text-xl" />
                        ) : (
                            <AiOutlineHeart className="text-gray-400 hover:text-blue-400 text-xl transition-colors" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
