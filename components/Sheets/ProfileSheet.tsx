"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import cookies from "js-cookie";
import toast from "react-hot-toast";
import AddressSheet from "./AddressSheet";
import { ChevronRight } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

import WishListContent from "./WishListContent";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";
import { changeNotification, getWallet } from "@/services/ClientApiHandler";
import { useLoyalityStore } from "@/stores/loyalityStore";
import CreditCard from "../cards/CreditCard";
import WishList from "./WishListSheet";

import GlobalAlertDialog from "@/components/shared/GlobalAlertDialog";
import GlobalSheet from "../shared/GlobalSheet";
import Loyality from "../ProfileSheetComponents/Loyality";
import Wallet from "../ProfileSheetComponents/Wallet";
import NotificationToggle from "../ProfileSheetComponents/Notification";

export default function ProfileSheet() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openNotifDialog, setOpenNotifDialog] = useState(false);

  const { setToken, userData, fetchUserData } = useAuthStore();
  const [notifiable, setNotifiable] = useState(userData.notifiable);
  const [wallet, setWallet] = useState({});
  const { points, transactions, fetchLoyality } = useLoyalityStore();

  useEffect(() => {
    fetchLoyality();
    const fetchWallet = async () => {
      const w = await getWallet();
      setWallet((w as { data: { balance: number; currency: string } }).data);
    };
    fetchWallet();
  }, [fetchLoyality]);

  const handleLogout = () => {
    cookies.remove("token");
    toast.success("Logged out");
    setOpenProfile(false);
    setToken(null);
  };

  const handleRemoveAccount = () => {
    cookies.remove("token");
    toast.success("Account deleted successfully");
    setOpenProfile(false);
    setToken(null);
  };

  const router = useRouter();
  const handlePress = () => {
    router.push(`/profile`);
  };

  const handleToggle = async () => {
    await changeNotification();
    fetchUserData();
    setNotifiable(userData.notifiable);
  };

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
              <div
                onClick={handlePress}
                className="flex w-full cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/icons/myaccount.svg"
                    alt="account"
                    width={65}
                    height={65}
                  />
                  My Account
                </div>
                <ChevronRight />
              </div>

              {/* Orders */}
              <div
                onClick={() => router.push("/orders")}
                className="flex w-full cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/icons/myorder.svg"
                    alt="order"
                    width={65}
                    height={65}
                  />
                  My order
                </div>
                <ChevronRight />
              </div>

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
              <div
                onClick={() => setOpenDeleteDialog(true)}
                className="flex w-full cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-3 text-red-600">
                  <Image
                    src="/assets/icons/deleteaccount.svg"
                    alt="deleteaccount"
                    width={65}
                    height={65}
                  />
                  Delete Account
                </div>
              </div>

              {/* Logout */}
              <div
                onClick={() => setOpenLogoutDialog(true)}
                className="flex w-full cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-3 text-red-600">
                  <Image
                    src="/assets/icons/logout.svg"
                    alt="logout"
                    width={65}
                    height={65}
                  />
                  Logout
                </div>
              </div>
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

      {/* Global Alert Dialogs */}
      <GlobalAlertDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title="Are you sure?"
        description="This will delete your account permanently."
        confirmText="Yes, delete"
        cancelText="No, keep it"
        onConfirm={handleRemoveAccount}
      />

      <GlobalAlertDialog
        open={openLogoutDialog}
        onOpenChange={setOpenLogoutDialog}
        title="Are you sure?"
        description="This will log you out."
        confirmText="Continue"
        cancelText="Cancel"
        onConfirm={handleLogout}
      />
    </>
  );
}
