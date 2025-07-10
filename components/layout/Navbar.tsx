"use client";

import Image from "next/image";
import NavLinks from "./NavLinks";
import CmsLinks from "./CmsLinks";
import ReservationDialog from "./ReservationDialog";
import CartSheet from "../Sheets/CartSheet";
//import NotificationSheet from "../Sheets/NotificationSheet";
import ProfileSheet from "../Sheets/ProfileSheet";
import LocationSelector from "../ui/LocationSelector";
import MobileNav from "./MobileNav";

import { useAuthStore } from "@/stores/authStore";
import WishList from "../Sheets/WishListSheet";
import { useWebsiteStore } from "@/stores/useWebsiteStore";
import { useEffect, useState } from "react";
import LocalePath from "../localePath";
import dynamic from "next/dynamic";
// import { Skeleton } from "../ui/skeleton";
const NotificationSheet = dynamic(() => import("../Sheets/NotificationSheet"), {
  loading: () => (
    <div className="size-12 animate-pulse rounded-full bg-gray-300 sm:size-15" />
  ),
});
export default function Navbar({ cms }) {
  const logged = !!useAuthStore((state) => state.token);
  const { getSetting } = useWebsiteStore();
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    const src = getSetting("website_logo");
    if (src) setLogo(src);
  }, [getSetting]);

  if (!logo) return null;
  return (
    <nav className="navBar bg-bgPrimary relative z-50 flex h-28 w-full items-center justify-end px-4 md:px-10 lg:px-14 2xl:justify-between">
      {/* Desktop Navigation Links */}
      <div className="linksdiv hidden min-w-0 flex-1 items-center gap-6 ps-8 2xl:flex">
        <NavLinks />
        <ReservationDialog />
        <CmsLinks cms={cms} />
      </div>

      {/* Desktop Icons */}
      <div className="iconsdiv flex shrink-0 items-center gap-2 sm:gap-4">
        <WishList />
        <CartSheet />
        {logged ? (
          <>
            <NotificationSheet />
            <ProfileSheet />
            <LocationSelector />
          </>
        ) : (
          <>
            <LocalePath
              href={"/auth"}
              className={`bg-primary hover:text-primary hover:border-primary w-26 cursor-pointer rounded-full border py-3 text-center text-white transition hover:bg-white`}
            >
              Log in
            </LocalePath>
          </>
        )}

        {/* <ToggleLang /> */}
        <MobileNav cms={cms} />
        {/* Logo */}
        <LocalePath href="/" className="flex shrink-0 items-center">
          <Image
            src={logo}
            width={56}
            height={56}
            className="h-14"
            alt="logo"
            priority
          />
        </LocalePath>
      </div>
    </nav>
  );
}
