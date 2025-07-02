"use client";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ReservationForm from "../sections/Reservation";
import { CmsPages } from "@/utils/types";
import ToggleLang from "./ToggleLang";
import GlobalSheet from "@/components/shared/GlobalSheet";
import LogoutBtn from "../ProfileSheetComponents/LogoutBtn";

const NAV_LINKS = [
  { href: "/menu", labelKey: "menu" },
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
  const [openSheet, setOpenSheet] = useState(false);

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
      <DialogContent className="mx-auto flex items-center justify-center rounded-[20px] p-0">
        <ReservationForm show={false} className="!w-full p-0" />
      </DialogContent>
    </Dialog>
  );

  const renderCmsPages = () =>
    cms.map((page) => {
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

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="flex items-center gap-4 2xl:hidden">
        <button id="toggleBtn" onClick={() => setOpenSheet((prev) => !prev)} className="z-50 2xl:hidden">
          <div className="border-primary hover:bg-primary/20 active:bg-primary/40 flex h-10 w-10 items-center justify-center rounded-full border-2">
            {openSheet ? (
              <FiX size={25} className="text-primary" />
            ) : (
              <FiMenu size={25} className="text-primary" />
            )}
          </div>
        </button>
      </div>

      {/* Mobile Menu as GlobalSheet */}
      <GlobalSheet
        open={openSheet}
        onOpenChange={setOpenSheet}
        // side="left"
        title={t("menu")}
        footer= {logged ? (
            <LogoutBtn onClose={() => setOpenSheet(false)} />
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
      >
        <div className="flex flex-col gap-4 p-4 w-full">
          {renderNavLinks()}
          {renderReservationDialog()}
          {renderCmsPages()}
          <ToggleLang />
         
        </div>
      </GlobalSheet>
    </>
  );
}

export default MobileNav;
