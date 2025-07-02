"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import AddressSheet from "./AddressSheet";
import { ChevronRight } from "lucide-react";
import WishListContent from "./WishListContent";
import { ScrollArea } from "../ui/scroll-area";
// import GlobalSheet from "../shared/GlobalSheet";
import Loyality from "../ProfileSheetComponents/Loyality";
import Wallet from "../ProfileSheetComponents/Wallet";
import NotificationToggle from "../ProfileSheetComponents/Notification";
import DeleteAccountBtn from "../ProfileSheetComponents/DeleteAccountBtn";
import LogoutBtn from "../ProfileSheetComponents/LogoutBtn";
import AccountBtn from "../ProfileSheetComponents/AccountBtn";
import OrdersBtn from "../ProfileSheetComponents/OrdersBtn";

export default function ProfileSheet() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  return (
    <>
      <Sheet open={openProfile} onOpenChange={setOpenProfile}>
        <SheetTrigger>
          <Image
            src="/assets/icons/profile.png"
            alt="profile"
            width={60}
            height={60}
            className="cursor-pointer"
          />
        </SheetTrigger>
        {!openAddress && (
          <SheetContent className="bg-bg w-full rounded-l-2xl px-4 sm:min-w-[550px]">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold">Profile</SheetTitle>
            </SheetHeader>
            <ScrollArea className="w-full overflow-y-auto rounded-md px-2">
              {/* Address */}
              <div
                onClick={() => {
                  setOpenProfile(false);
                  setTimeout(() => setOpenAddress(true), 300);
                }}
                className="flex w-full cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/icons/address.svg"
                    alt="account"
                    width={65}
                    height={65}
                  />
                  My Address
                </div>
                <ChevronRight />
              </div>

              {/* Account */}
              <AccountBtn onClose={() => setOpenProfile(false)} />

              {/* Orders */}
              <OrdersBtn onClose={() => setOpenProfile(false)} />

              {/* Wishlist */}
              <div
                onClick={() => {
                  setOpenProfile(false);
                  setTimeout(() => setOpenWishList(true), 300);
                }}
                className="flex w-full cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/icons/wishlist.svg"
                    alt="wishlist"
                    width={65}
                    height={65}
                  />
                  Wish List
                </div>
                <ChevronRight />
              </div>

              {/* Notifications Toggle */}
              <NotificationToggle />

              {/* Loyality */}
              <Loyality />

              {/* Wallet */}
              <Wallet />

              {/* Delete Account */}
              <DeleteAccountBtn onClose={() => setOpenProfile(false)} />

              {/* Logout */}
              <LogoutBtn onClose={() => setOpenProfile(false)} />
            </ScrollArea>
            <SheetFooter className="flex flex-col items-center justify-center">
              <SheetClose asChild />
            </SheetFooter>
          </SheetContent>
        )}
      </Sheet>

      {/* Address Sheet */}
      <Sheet open={openAddress} onOpenChange={setOpenAddress}>
        <SheetContent className="bg-bg w-full rounded-l-2xl px-4 sm:min-w-[550px]">
          <AddressSheet />
        </SheetContent>
      </Sheet>

      {/* WishList Sheet */}
      <Sheet open={openWishList} onOpenChange={setOpenWishList}>
        <SheetContent className="bg-bg w-full rounded-l-2xl px-4 sm:min-w-[550px]">
          <WishListContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
