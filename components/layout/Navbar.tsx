"use client";

import Link from "next/link";
import Image from "next/image";
import NavLinks from "./NavLinks";
import CmsLinks from "./CmsLinks";
import ReservationDialog from "./ReservationDialog";
import CartSheet from "../Sheets/CartSheet";
import NotificationSheet from "../Sheets/NotificationSheet";
import ProfileSheet from "../Sheets/ProfileSheet";
import LocationSelector from "../ui/LocationSelector";
import MobileNav from "./MobileNav";

import { useAuthStore } from "@/stores/authStore";
import WishList from "../Sheets/WishListSheet";
import ToggleLang from "./ToggleLang";
import { useWebsiteStore } from "@/stores/useWebsiteStore";
export default function Navbar({ cms }) {
  const logged = !!useAuthStore((state) => state.token);
  const { getSetting } = useWebsiteStore();

  return (
    <nav className="navBar bg-bgPrimary relative z-50 flex h-28 w-full items-center justify-end 2xl:justify-between px-4 md:px-10 lg:px-14">
      {/* Desktop Navigation Links */}
      <div className="linksdiv hidden min-w-0 flex-1 items-center gap-6 ps-8 2xl:flex">
        <NavLinks />
        <ReservationDialog />
        <CmsLinks cms={cms} />
      </div>

      {/* Desktop Icons */}
      <div className="iconsdiv flex items-center gap-4">
        <WishList />
        <CartSheet />
        {logged ? (
          <>
          <NotificationSheet />
            <ProfileSheet />
            <div className="hidden 2xl:flex">
              <LocationSelector />
            </div>
          </>
        ) : (
          <>
            <Link
              href={"/auth"}
              className={`bg-primary hover:text-primary hover:border-primary w-26 cursor-pointer rounded-full border py-3 text-center text-white transition hover:bg-white`}
            >
              Log in
            </Link>
          </>
        )}

        <ToggleLang />
        <MobileNav cms={cms} />
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          {getSetting("website_logo") && (
            <Image
              src={getSetting("website_logo")}
              width={56}
              height={56}
              className="h-14"
              alt="logo"
              priority
            />
          )}
        </Link>
      </div>
    </nav>
  );
}
