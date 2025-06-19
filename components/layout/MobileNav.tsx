import React, { useEffect, useRef, useState } from "react";
import ProfileSheet from "../Sheets/ProfileSheet";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import cookies from "js-cookie";
import toast from "react-hot-toast";
import { logout } from "@/services/authApi";
import { useAuthStore } from "@/stores/authStore";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ReservationForm from "../sections/Reservation";
import { CmsPages } from "@/utils/types";
import CartSheet from "../Sheets/CartSheet";
import NotificationSheet from "../Sheets/Notification";
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

function MobileNav({ cms, logged }: { logged: boolean; cms: CmsPages[] }) {
  const t = useTranslations("NAV");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  // const setLogged = useLoggedStore((state) => state.setLogged);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

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
    const handleLinkClick = () => {
      setIsOpen(false);
    };
    if (isOpen && menuRef.current) {
      const links = menuRef.current.querySelectorAll("a");
      links.forEach((link) => {
        link.addEventListener("click", handleLinkClick);
      });

      return () => {
        document.removeEventListener("pointerdown", handleClickOutside);
        links.forEach((link) => {
          link.removeEventListener("click", handleLinkClick);
        });
      };
    }

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isOpen]);

  const Logout = async () => {
    try {
      await logout({ device_type: "web" });
      cookies.remove("token");
      useAuthStore.getState().setToken("");
      // setLogged(false);
      toast.success("Logged out successfully");
    } catch {
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
      <DialogTrigger className="w-fit cursor-pointer text-start hover:opacity-80">
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
          className="whitespace-nowrap hover:opacity-80"
        >
          {translatedTitle}
        </Link>
      );
    });
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="flex items-center gap-4 lg:hidden">
        {logged && <ProfileSheet />}

        <button id="toggleBtn" onClick={toggleMenu} className="z-50 lg:hidden">
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
          className="bg-bgPrimary animate-slide-down absolute top-full left-0 flex w-full flex-col gap-4 p-6 shadow-lg lg:hidden"
        >
          {renderNavLinks()}
          {renderReservationDialog()}
          {renderCmsPages()}
          <hr />

          <div className="flex items-center gap-5">
            <CartSheet /> <span>Cart</span>
          </div>
          <div className="flex items-center gap-5">
            <NotificationSheet /> <span>Notifications</span>
          </div>
          {logged ? (
            <button
              onClick={Logout}
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white"
            >
              <Image
                src="/assets/icons/login.png"
                alt="login"
                width={24}
                height={24}
                className="scale-x-[-1]"
              />
              <span>{t("logout")}</span>
            </button>
          ) : (
            <Link
              href={`/${locale}/auth`}
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white"
            >
              <Image
                src="/assets/icons/login.png"
                alt="login"
                width={24}
                height={24}
              />
              <span>{t("login")}</span>
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default MobileNav;
