/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useLikedStore } from "@/stores/likedStore";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState } from "react";

type Props = {
  product: any;
};

export default function ProductHeaderClient({ product }: Props) {
  const { isLiked, toggleLike } = useLikedStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const liked = mounted ? isLiked(product.id) : false;
  return (


      <>
        <button className="cursor-pointer">
          <Image
            src="/assets/icons/share.svg"
            alt="Share"
            width={32}
            height={32}
            className="rounded-full bg-[#F6F6FD] p-1"
          />
        </button>

          {mounted && (
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   toggleLike(product);
                 }}
                 className="cursor-pointer"
               >
                 {liked ? (
                   <AiFillHeart className="text-primary text-xl size-8" />
                 ) : (
                   <AiOutlineHeart className="text-xl text-gray-400 transition-colors hover:text-blue-400 size-8" />
                 )}
               </button>
             )}
    </>
  );
}
