"use client";

import Image from "next/image";
import { useLikedStore } from "@/stores/likedStore";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import GlobalDialog from "@/components/shared/GlobalDialog";
import { ShareButtons } from "./ShareButtons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,

} from "@/components/ui/drawer"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductHeaderClient({ product }: any) {
  const { isLiked, toggleLike } = useLikedStore();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  const liked = mounted ? isLiked(product.id) : false;

  return (
    <div className="flex items-center justify-end gap-4 px-2">
      {/* Share Modal Trigger */}
 <button
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Image
          src="/assets/icons/share.svg"
          alt="Share"
          width={32}
          height={32}
          className="rounded-full bg-[#F6F6FD] p-1"
        />
      </button>
  {/* Global Dialog */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="bg-bg !rounded-3xl max-w-[480px] min-w-[400px] mx-auto !rounded-b-none h-[200px]" data-aos="fade-up">
          <DrawerHeader>
        <DrawerTitle>Share This Item</DrawerTitle>
        <DrawerDescription />
          </DrawerHeader>
          <div className="px-4">
        <ShareButtons />
          </div>
          <DrawerFooter>
        <DrawerClose asChild>
          <button className="mt-2 w-full rounded bg-gray-200 py-2 font-semibold">Close</button>
        </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

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
