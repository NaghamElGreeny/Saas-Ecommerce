/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FiMenu, FiX } from "react-icons/fi";
import cookies from "js-cookie";
import toast from "react-hot-toast";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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

import "@/styles/Navbar.css";
import { useAuthStore } from "@/stores/authStore";
import { getStores, logout } from "@/services/ClientApiHandler";

import ReservationForm from "../sections/Reservation";
import LocationSelector from "../ui/LocationSelector";
import { CmsPages, Store } from "@/services/types";

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
  const [logged, setLogged] = useState(false);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const Logout = async () => {
    try {
      await logout({ device_type: "web" });
      cookies.remove("token");
      useAuthStore.getState().setToken("");
      setLogged(false);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  useEffect(() => {
    const token = cookies.get("token");
    setLogged(!!token);
    useAuthStore.getState().setToken(token || "");

    const fetchStores = async () => {
      try {
        const fetchedStores = await getStores();
        setStores(fetchedStores);
        setSelectedStore(fetchedStores[0]);
      } catch (err) {
        toast.error("Failed to load stores");
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !document.getElementById("toggleBtn")?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen]);

  const renderNavLinks = () =>
    NAV_LINKS.map(({ href, labelKey }) => (
      <Link
        key={href}
        href={href}
        className="hover:opacity-80"
        onClick={() => setIsOpen(false)}
      >
        {t(labelKey)}
      </Link>
    ));

  const renderReservationDialog = () => (
    <Dialog>
      <DialogTrigger className="hover:opacity-80 text-start">
        {t("reservation")}
      </DialogTrigger>
      <DialogContent className="mx-auto flex w-[80%] items-center justify-center rounded-[20px] p-0">
        <ReservationForm show={false} className="w-full p-0" />
      </DialogContent>
    </Dialog>
  );

  const renderProfileMenu = () => (
    <Sheet>
      <SheetTrigger>
        <img
          src="/assets/icons/profile.png"
          alt="profile"
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent>
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
  );
const renderCmsPages = () => {
  return cms.map((page) => {
    const translatedTitle =
      cmsTranslationMap[page.title]?.[locale] || page.title;

    return (
      <Link
        key={page.id}
        href={`/pages/${page.slug}`}
        className="hover:opacity-80"
        onClick={() => setIsOpen(false)}
      >
        {translatedTitle}
      </Link>
    );
  });
};


  return (
    <nav className="navBar bg-bgPrimary relative z-50 flex h-28 w-full items-center justify-between px-4 md:px-10 lg:px-14">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <img
          src="/assets/logo/logo.svg"
          className="h-14 w-20"
          alt="shebl-logo"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden w-3/4 items-center gap-8 md:flex ltr:pl-8 rtl:pr-8">
        {renderNavLinks()}
        {renderReservationDialog()}
        {renderCmsPages()}
      </div>

      {/* Desktop Icons */}
      <div className="hidden items-center gap-4 md:flex">
        <Link href="#">
          <img src="/assets/icons/cart.png" alt="cart" />
        </Link>
        <Link href="#">
          <img src="/assets/icons/notifications.png" alt="notifications" />
        </Link>

        {logged ? (
          <>
            {renderProfileMenu()}
            <LocationSelector active />
          </>
        ) : (
          <Link
            href={`/${locale}/auth`}
            className="flex h-10 w-32 items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white"
          >
            <img src="/assets/icons/login.png" alt="login" />
            <span>{t("login")}</span>
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex items-center gap-4 md:hidden">
        {logged && renderProfileMenu()}

        <button id="toggleBtn" onClick={toggleMenu} className="z-50 md:hidden">
          <div className="border-primary hover:bg-primary/20 active:bg-primary/40 flex h-10 w-10 items-center justify-center rounded-full border-2">
            {isOpen ? (
              <FiX size={24} className="text-primary" />
            ) : (
              <FiMenu size={24} className="text-primary" />
            )}
          </div>
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="bg-bgPrimary animate-slide-down absolute top-full left-0 flex w-full flex-col gap-4 p-6 shadow-lg md:hidden"
        >
          {renderNavLinks()}
          {renderReservationDialog()}
          {renderCmsPages()}
          <hr />
          <Link href="#" className="flex items-center gap-2">
            <img src="/assets/icons/cart.png" alt="cart" />
            <span>Cart</span>
          </Link>
          <Link href="#" className="flex items-center gap-2">
            <img src="/assets/icons/notifications.png" alt="notifications" />
            <span>Notifications</span>
          </Link>

          {logged ? (
            <button
              onClick={Logout}
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white"
            >
              <span>Log out</span>
            </button>
          ) : (
            <Link
              href={`/${locale}/auth`}
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white"
            >
              <img src="/assets/icons/login.png" alt="login" />
              <span>{t("login")}</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
