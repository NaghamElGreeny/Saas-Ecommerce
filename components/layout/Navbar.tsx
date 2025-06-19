/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {  useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FiMenu, FiX } from "react-icons/fi";
import cookies from "js-cookie";
import toast from "react-hot-toast";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";


import "@/styles/Navbar.css";
import { useAuthStore } from "@/stores/authStore";
import { logout } from "@/services/ClientApiHandler";

import ReservationForm from "../sections/Reservation";
import LocationSelector from "../ui/LocationSelector";
import { CmsPages } from "@/utils/types";
import ProfileSheet from "../Sheets/ProfileSheet";
import CartSheet from "../Sheets/CartSheet";
import NotificationSheet from "../Sheets/Notification";
import MobileNav from "./MobileNav";

const NAV_LINKS = [
  // { href: "/", labelKey: "home" },
  // { href: "/about", labelKey: "about" },
  { href: "/menu", labelKey: "menu" },
  // { href: "/contact", labelKey: "contact" },
];

const cmsTranslationMap: Record<string, { en: string; ar: string }> = {
  "تواصل معنا": {
    en: "Contact Us",
    ar: "تواصل معنا",
  },
  "من نحن": {
    en: "About Us",
    ar: "من نحن",
  },
  "الشروط والاحكام": {
    en: "Terms and Conditions",
    ar: "الشروط والأحكام",
  },
  "سياسة الخصوصية": {
    en: "Privacy Policy",
    ar: "سياسة الخصوصية",
  },
};

export default function Navbar({ cms }: { cms: CmsPages[] }) {
  const t = useTranslations("NAV");
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const logged= !!useAuthStore((state) => state.token);
  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const Logout = async () => {
    try {
      await logout({ device_type: "web" });
      cookies.remove("token");
      useAuthStore.getState().setToken("");
      // setLogged(false);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const renderNavLinks = () =>
    NAV_LINKS.map(({ href, labelKey }) => (
      <Link key={href} href={href} className="hover:opacity-80">
        {t(labelKey)}
      </Link>
    ));

  const renderReservationDialog = () => (
    <Dialog>
      <DialogTrigger className="text-start w-fit hover:opacity-80 cursor-pointer">
        {t("reservation")}
      </DialogTrigger>
      {/* <DialogTitle className="w-0 m-0 p-0"></DialogTitle> */}
      <DialogContent className="mx-auto flex items-center justify-center rounded-[20px] p-0">
        <ReservationForm show={false} className="!w-full p-0" />
      </DialogContent>
    </Dialog>
  );

  const renderCmsPages = () => {
    return cms.map((page) => {
      const translatedTitle =
        cmsTranslationMap[page.title]?.[locale] || page.title;

      return (
        <Link
          key={page.id}
          href={`/pages/${page.slug}`}
          className="hover:opacity-80 whitespace-nowrap"
        >
          {translatedTitle}
        </Link>
      );
    });
  };
// console.log('is Logged?',logged)
  return (
    <nav className="navBar bg-bgPrimary relative z-50 flex h-28 w-full items-center justify-between px-4 md:px-10 lg:px-14">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/assets/logo/logo.svg"
          width={80}
          height={56}
          className="h-14 w-20"
          alt="shebl-logo"
          priority
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden w-3/4 items-center gap-5 lg:flex ps-8 flex-nowrap">
        {renderNavLinks()}
        {renderReservationDialog()}
        {renderCmsPages()}
      </div>

      {/* Desktop Icons */}
      <div className="hidden items-center gap-4 lg:flex flex-nowrap">
        <CartSheet />
        <NotificationSheet />
        {logged ? (
          <>
            {/* {renderProfileMenu()} */}
            <ProfileSheet />
            <LocationSelector active />
          </>
        ) : (
          <Link
            href={`/${locale}/auth`}
            className="flex h-10 w-32 items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white"
          >
            <Image src="/assets/icons/login.png" alt="login" width={24} height={24} />
            <span>{t("login")}</span>
          </Link>
        )}
      </div>

      <MobileNav logged={logged} cms={cms}/>
    </nav>
  );
}
