"use client";

import Link from "next/link";
import Image from "next/image";
import cookies from "js-cookie";
import toast from "react-hot-toast";

import NavLinks from "./NavLinks";
import CmsLinks from "./CmsLinks";
import ReservationDialog from "./ReservationDialog";
import LogoutButton from "./LogoutButton";
import CartSheet from "../Sheets/CartSheet";
import NotificationSheet from "../Sheets/NotificationSheet";
import ProfileSheet from "../Sheets/ProfileSheet";
import LocationSelector from "../ui/LocationSelector";
import MobileNav from "./MobileNav";

import { useAuthStore } from "@/stores/authStore";
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
import WishList from "../Sheets/WishListSheet";

export default function Navbar({ cms }) {
  const logged = !!useAuthStore((state) => state.token);
  const { setToken } = useAuthStore();

  const handleLogout = () => {
    cookies.remove("token");
    setToken(null);
    toast.success("Logged out");
  };

  return (
    <nav className="navBar bg-bgPrimary relative z-50 flex h-28 w-full items-center justify-between px-4 md:px-10 lg:px-14">
      {/* Logo */}
      <Link href="/" className="flex shrink-0 items-center">
        <Image
          src="/assets/logo/logo.svg"
          width={80}
          height={56}
          className="h-14 w-20"
          alt="shebl-logo"
          priority
        />
      </Link>

      {/* Desktop Navigation Links */}
      <div className="linksdiv hidden min-w-0 flex-1 items-center gap-6 ps-8 xl:flex">
        <NavLinks />
        <ReservationDialog />
        <CmsLinks cms={cms} />
      </div>

      {/* Desktop Icons */}
      <div className="iconsdiv hidden items-center gap-4 lg:flex">
        <WishList />
        <CartSheet />
        <NotificationSheet />
        {logged ? (
          <>
            <ProfileSheet />
            <LocationSelector />
          </>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger className="w-full">
              <LogoutButton />
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
        )}
      </div>

      {/* Mobile Navigation */}
      <MobileNav logged={logged} cms={cms} />
    </nav>
  );
}
