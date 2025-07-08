"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ReservationForm from "../sections/Reservation";
import { CmsPage } from "@/utils/types";
import ToggleLang from "./ToggleLang";
import GlobalSheet from "@/components/shared/GlobalSheet";
import { Menu, X } from "lucide-react";
import LocationSelector from "../ui/LocationSelector";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import LocalePath from "../localePath";

const NAV_LINKS = [{ href: "/menu", labelKey: "menu" }];

function MobileNav({ cms }: {  cms: CmsPage[] }) {
  const t = useTranslations("NAV");
  const [openSheet, setOpenSheet] = useState(false);

  const renderNavLinks = () =>
    NAV_LINKS.map(({ href, labelKey }) => (
      <LocalePath key={href} href={href} className="hover:text-primary">
        {t(labelKey)} 
      </LocalePath>
    ));

  const renderReservationDialog = () => (
    <Dialog>
      <DialogTrigger className="w-fit cursor-pointer text-start hover:text-primary">
        {t("reservation")}
      </DialogTrigger>
      <DialogContent className="mx-auto flex items-center justify-center rounded-[20px] p-0">
            <VisuallyHidden>
    <DialogTitle>Hidden title for screen readers</DialogTitle>
  </VisuallyHidden>
        <ReservationForm show={false} className="!w-full p-0" />
      </DialogContent>
    </Dialog>
  );

  const renderCmsPages = () =>
    cms.map((page) => {

      return (
        <Link
          key={page.id}
          href={`/pages/${page.slug}`}
          className="whitespace-nowrap hover:text-primary"
        >
          {page.title}
        </Link>
      );
    });

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="flex items-center gap-4 2xl:hidden">
        <button
          id="toggleBtn"
          onClick={() => setOpenSheet((prev) => !prev)}
          className="z-50 2xl:hidden"
        >
          <div className="cursor-pointer flex h-10 w-10 items-center justify-center text-2xl">
            {openSheet ? (
              <X size={25} className="text-text-website-font" />
            ) : (
              <Menu size={25} className="text-text-website-font" />
            )}
          </div>
        </button>
      </div>

      {/* Mobile Menu as GlobalSheet */}
      <GlobalSheet
        open={openSheet}
        onOpenChange={setOpenSheet}
        title={t("menu")}
        // side="left"
      >
        <div className="flex w-full flex-col gap-6 p-4">
          <LocationSelector />
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
