"use client";

import { usePagesStore } from "@/stores/usePagesStore";
import { useWebsiteStore } from "@/stores/useWebsiteStore";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import WishList from "../Sheets/WishListSheet";
import ReservationForm from "../sections/Reservation";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { PhoneNumber } from "@/utils/webSettingsTypes";

export default function Footer() {
  const { pages, fetchPages } = usePagesStore();
  const { data, fetchSettings, getContact, getSetting } = useWebsiteStore();
  const t = useTranslations("NAV"); // استخدام الـ hook للترجمة
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    const src = getSetting("website_logo");
    if (src) setLogo(src);
  }, [getSetting]);

  useEffect(() => {
    if (!data) {
      fetchSettings();
      fetchPages();
    }
  }, [data, fetchSettings, fetchPages]);
  if (!logo) return null;

  const phoneNumbers = getContact("phone_number") as PhoneNumber[];
  const firstPhone =
    Array.isArray(phoneNumbers) && phoneNumbers.length > 0
      ? phoneNumbers[0]
      : null;

  const emails = getContact("email");
  const email = Array.isArray(emails) && emails.length > 0 ? emails[0] : null as string[];

  const renderReservationDialog = () => (
    <Dialog>
      <DialogTrigger className="w-fit cursor-pointer text-start hover:text-primary">
        {t("reservation")} {/* ترجمة "Reservation" */}
      </DialogTrigger>
      <DialogContent className="mx-auto flex items-center justify-center rounded-[20px] p-0">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <ReservationForm show={false} className="!w-full p-0" />
      </DialogContent>
    </Dialog>
  );

  const socialLinks = ["facebook", "twitter", "messenger", "instagram"];
  const cmsPages = pages.filter((page) => page.in_menu);

  return (
    <footer className="bg-gray-900 px-4 py-12 text-white sm:px-6 lg:px-8 text-third">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            
              <Image
                src={logo}
                alt="mea telecom"
                width={96}
                height={96}
                className="h-24"
              />
            
            {getSetting("footer_desc") && (
              <p className="pt-3 text-third">{getSetting("footer_desc")}</p>
            )}
          </div>

          {/* Static Sections */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("sections")}</h3> {/* ترجمة "Sections" */}
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="text-third hover:text-primary">
                   {t("menu")}
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-third hover:text-primary">
                  {t("offers")} 
                </Link>
              </li>
              <li>{renderReservationDialog()}</li>
              <li>
                <WishList
                  triggerr={
                    <p className="cursor-pointer text-third hover:text-primary">
                      {t("fav")} 
                    </p>
                  }
                />
              </li>
            </ul>
          </div>

          {/* Dynamic Pages */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("links")}</h3> 
            <ul className="space-y-2">
              {cmsPages.length > 0 ? (
                cmsPages.map((page) => (
                  <li key={page.id}>
                    <Link
                      href={`/pages/${page.slug}`}
                      className="flex items-center gap-2 text-third hover:text-primary"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))
              ) : (
                <></>  
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("contact")}</h3> 
            <ul className="space-y-4 text-third">
              {firstPhone &&
                typeof firstPhone === "object" &&
                "phone_code" in firstPhone &&
                "phone" in firstPhone && (
                  <li>
                    <strong>{t("call_center")}</strong> 
                    <br />
                    <a
                      href={`tel:+${firstPhone.phone_code}${firstPhone.phone}`}
                      className="text-subFont hover:text-primary"
                    >
                      +{firstPhone.phone_code} {firstPhone.phone}
                    </a>
                  </li>
                )}

              {email && (
                <li>
                  <strong>{t("email")}</strong>
                  <br />
                  <a
                    href={`mailto:${email}`}
                    className="text-subFont hover:text-primary"
                  >
                    {email as string}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="my-6 border-t border-gray-700"></div>

        <div className="flex flex-col items-center justify-between gap-4 text-gray-400 md:flex-row">
          <div>© {new Date().getFullYear()} {t("all_rights_reserved")}</div> 
          <div className="flex gap-4">
            {socialLinks.map((social, idx) => (
              <Link
                key={idx}
                href={`https://${social}.com`}
                className="flex h-11 w-11 items-center justify-center rounded-full border transition hover:bg-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/assets/icons/${social}.svg`}
                  alt={social}
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}