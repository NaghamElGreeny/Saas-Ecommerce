"use client"
import NavLinks from "./NavLinks";
import CmsLinks from "./CmsLinks";
import ReservationDialog from "./ReservationDialog";
import LogoutButton from "./LogoutButton";
import CartSheet from "../Sheets/CartSheet";
import NotificationSheet from "../Sheets/Notification";
import ProfileSheet from "../Sheets/ProfileSheet";
import LocationSelector from "../ui/LocationSelector";
import MobileNav from "./MobileNav";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ cms }) {
  const logged = !!useAuthStore((state) => state.token);
  return (
    <nav className="navBar bg-bgPrimary relative z-50 flex h-28 w-full items-center justify-between px-4 md:px-10 lg:px-14">
      {/* Logo */}
      <Link href="/" className="flex items-center shrink-0">
        <Image src="/assets/logo/logo.svg" width={80} height={56} className="h-14 w-20" alt="shebl-logo" priority />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden w-3/4 items-center gap-5 xl:flex ps-8 flex-nowrap">
        <NavLinks />
        <ReservationDialog />
        <CmsLinks cms={cms} />
      </div>

      {/* Desktop Icons */}
      <div className="hidden items-center gap-4 lg:flex flex-nowrap shrink-0">
        <CartSheet />
        <NotificationSheet />
        {logged ? (
          <>
            <ProfileSheet />
            <LocationSelector  />
          </>
        ) : (
          <LogoutButton />
        )}
      </div>

      <MobileNav logged={logged} cms={cms} />
    </nav>
  );
}
