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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { changeNotification, getUser, getWallet } from "@/services/ClientApiHandler";
import { useLoyalityStore } from "@/stores/loyalityStore";

export default function ProfileSheet() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const { setToken,userData,setUserData } = useAuthStore();
  const [notifiable,setNotifiable] = useState(userData.notifiable);
  const [wallet,setWallet] = useState({});
 const {
    points,
    transactions,
    fetchLoyality,
    loading,
    error,
  } = useLoyalityStore();

  useEffect(() => {
    fetchLoyality();
    const fetchWallet = async () => {
      const w = await getWallet();
      // If getWallet returns { data: { balance: number, currency: string } }
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
    //delete account request
       cookies.remove("token");
    toast.success("Logged out");
    setOpenProfile(false);
    setToken(null);
  }
  const router = useRouter();
  const handlePress = () => {
    // console.log(notification.notify_id)
    router.push(`/profile`);
  };
  const handleToggle =async () => {
    await changeNotification();
    const user = await getUser();
    setUserData(user)
    setNotifiable(user.notifiable);
  }
  return (
    <>
      {/* Profile Sheet */}
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
              {/* Show address trigger */}
              <div
                onClick={() => {
                  setOpenProfile(false);
                  setTimeout(() => setOpenAddress(true), 300); // slight delay to avoid UI overlap
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
                onClick={() => handlePress()}
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
              {/* Order */}
              <div
                onClick={() => {
                  router.push("/orders")
                }}
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
                  setTimeout(() => setOpenWishList(true), 300); // slight delay to avoid UI overlap
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
              {/* notification */}
              <div
             
                className="flex w-full  items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/icons/notification.svg"
                    alt="notification"
                    width={65}
                    height={65}
                  />
                  Notifications
                </div>
                {/* toglle btn to turn it on or off */}
                    <AlertDialog>
                <AlertDialogTrigger asChild>
    <div className="cursor-pointer">
      <Switch checked={notifiable} />
    </div>
  </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will Change notification status.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No,Keep it</AlertDialogCancel>
                    <AlertDialogAction onClick={handleToggle}>
                     Yes, Change
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
 

           
              </div>
              {/* loyality card */}
              <div
                onClick={() => {
                  console.log("loyality clicked");
                }}
                className="flex w-full cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/icons/loyalitycard.svg"
                    alt="loyalitycard"
                    width={65}
                    height={65}
                  />
                  Loyality Card
                </div>
                <div className="greendiv loyalitypoints bg-green-100  text-green-600 rounded-full py-1.5 px-2">{points} points</div>
              </div>
              {/* wallet */}
              <div
                onClick={() => {
                  console.log("Wallet clicked");
                }}
                className="flex w-full cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/icons/wallet.svg"
                    alt="wallet"
                    width={65}
                    height={65}
                  />
                  Wallet
                </div>
                <div className="greendiv loyalitypoints  bg-green-100  text-green-600 rounded-full py-1.5 px-2.5">{wallet.balance} {wallet.currency}</div>
              </div>

              {/* delete account */}
              <AlertDialog>
                <AlertDialogTrigger className="w-[80%]">
                  <div className="flex w-full cursor-pointer items-center justify-between">
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
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will Delete your Account Permenantly.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No,Keep it</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRemoveAccount}>
                     Yes, delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {/* logout */}
              <AlertDialog>
                <AlertDialogTrigger className="w-[80%]">
                  <div className="flex w-full cursor-pointer items-center justify-between">
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
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will log you out.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>


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


