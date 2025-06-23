'use client';
import React, { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
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
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import cookies from 'js-cookie';
import toast from 'react-hot-toast';
import AddressSheet from './AddressSheet';
import { ChevronRight } from 'lucide-react';

export default function ProfileSheet() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);

  const handleLogout = () => {
    cookies.remove('token');
    toast.success('Logged out');
    setOpenProfile(false);
  };

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

            {/* Show address trigger */}
            <div
              onClick={() => {
                setOpenProfile(false);
                setTimeout(() => setOpenAddress(true), 300); // slight delay to avoid UI overlap
              }}
              className="w-full flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                     <Image
                src="/assets/icons/profile.png"
                alt="address"
                width={65}
                height={65}
              />
              My Address
         </div>
              <ChevronRight />
            </div>

            <SheetFooter className="flex flex-col items-center justify-center">
              <AlertDialog>
                <AlertDialogTrigger className="mt-4 flex h-10 w-[80%] items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white">
                  <Image
                    src="/assets/icons/login.png"
                    alt="login"
                    width={24}
                    height={24}
                    className="scale-x-[-1]"
                  />
                  Log Out
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>This will log you out.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <SheetClose asChild />
            </SheetFooter>
          </SheetContent>
        )}
      </Sheet>

      {/* Address Sheet */}
      <Sheet open={openAddress} onOpenChange={setOpenAddress}>
        <SheetContent className="bg-bg w-full rounded-l-2xl px-4 sm:min-w-[550px]">
          <AddressSheet onBack={() => {
            setOpenAddress(false);
            setTimeout(() => setOpenProfile(true), 300);
          }} />
        </SheetContent>
      </Sheet>
    </>
  );
}
