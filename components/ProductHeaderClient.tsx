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
} from "@/components/ui/dialog"; 
import { X } from "lucide-react";
import { ShareButtons } from "./ShareButtons";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductHeaderClient({ product }: any) {
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

        <DialogContent
          className=" w-full max-w-md -translate-x-1/2 rounded-t-3xl bg-[#FBFAFC] px-4 pt-3 pb-4 shadow-lg"
          showCloseButton={false}
        >
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">
                Share This Item
              </DialogTitle>
              <DialogClose asChild>
                <button>
                  <X className="h-6 w-6 text-gray-600 cursor-pointer" />
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
            <AiOutlineHeart className="size-8 text-gray-400 transition-colors hover:text-blue-400" />
          )}
        </button>
      )}
    </div>
  );
}
