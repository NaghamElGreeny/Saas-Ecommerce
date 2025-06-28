"use client";

import Image from "next/image";
import { useLikedStore } from "@/stores/likedStore";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"; // from shadcn/ui
import { X } from "lucide-react";
import { ShareButtons } from "./ShareButtons";
import { CartProduct } from "@/utils/cartTypes";



export default function ProductHeaderClient({ product }: CartProduct) {
  const { isLiked, toggleLike } = useLikedStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const liked = mounted ? isLiked(product.id) : false;


  return (
    <div className="flex items-center justify-end gap-4 px-2">
      {/* Share Modal Trigger */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="cursor-pointer">
            <Image
              src="/assets/icons/share.svg"
              alt="Share"
              width={32}
              height={32}
              className="rounded-full bg-[#F6F6FD] p-1"
            />
          </button>
        </DialogTrigger>

              <DialogContent className="max-h-[300px] min-h-[150px] rounded-3xl bg-[#FBFAFC] pb-3 "
              showCloseButton={false}>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">Share This Item</DialogTitle>
              <DialogClose asChild>
                <button>
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>
<ShareButtons />
        
        </DialogContent>
      </Dialog>

      {/* Like Button */}
      {mounted && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(product);
          }}
          className="cursor-pointer"
        >
          {liked ? (
            <AiFillHeart className="text-primary size-8" />
          ) : (
            <AiOutlineHeart className="text-gray-400 hover:text-blue-400 size-8 transition-colors" />
          )}
        </button>
      )}
    </div>
  );
}
