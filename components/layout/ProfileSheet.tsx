'use client'
import React from 'react'
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
import Image from 'next/image';
import cookies from "js-cookie";
import toast from "react-hot-toast";
import { logout } from "@/services/ClientApiHandler";
import { useAuthStore, useLoggedStore } from "@/stores/authStore";
export default function ProfileSheet() {
    //  const logged = useLoggedStore((state) => state.logged);
  const setLogged = useLoggedStore((state) => state.setLogged);
      const Logout = async () => {
    try {
      await logout({ device_type: "web" });
      cookies.remove("token");
      useAuthStore.getState().setToken("");
      setLogged(false);
      toast.success("Logged out successfully");
    } catch {
      toast.error("Failed to logout");
    }
  };
  return (
      <>
       <Sheet>
      <SheetTrigger>
        <Image
          src="/assets/icons/profile.png"
          alt="profile"
         width={60}
          height={60}
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent className='rounded-l-2xl '>
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>
        <SheetFooter className="flex flex-col items-center justify-center">
          <AlertDialog>
            <AlertDialogTrigger className="mt-4 flex h-10 w-[80%] items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white">
              Log Out
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
                <AlertDialogAction onClick={Logout}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <SheetClose asChild />
        </SheetFooter>
      </SheetContent>
    </Sheet>
      </>
  )
}

