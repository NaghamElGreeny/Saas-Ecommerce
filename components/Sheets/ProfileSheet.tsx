"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import GlobalSheet from "../shared/GlobalSheet";

// Components
import AddressSheet from "./AddressSheet";
import WishListContent from "./WishListContent";
import NotificationToggle from "../ProfileSheetComponents/Notification";
import Loyality from "../ProfileSheetComponents/Loyality";
import Wallet from "../ProfileSheetComponents/Wallet";
import DeleteAccountBtn from "../ProfileSheetComponents/DeleteAccountBtn";
import LogoutBtn from "../ProfileSheetComponents/LogoutBtn";
import AccountBtn from "../ProfileSheetComponents/AccountBtn";
import OrdersBtn from "../ProfileSheetComponents/OrdersBtn";
import CmsPages from "../ProfileSheetComponents/CmsPages";
import { useTranslations } from "next-intl"; 

export default function ProfileSheet() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const t = useTranslations("PROFILE_SHEET"); 

  const handleNestedOpen = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setOpenProfile(false);
    setTimeout(() => setter(true), 300);
  };

  const SheetItem = ({
    icon,
    label,
    onClick,
  }: {
    icon: string;
    label: string;
    onClick: () => void;
  }) => (
    <div
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-between"
    >
      <div className="flex items-center gap-3">
      <Image src={icon} alt={label} width={65} height={65}/>
      {label}
      </div>
      {typeof document !== "undefined" && document.dir === "rtl" ? (
      <ChevronRight style={{ transform: "scaleX(-1)" }} />
      ) : (
      <ChevronRight />
      )}
    </div>
  );

  return (
    <>
      {/* Profile Sheet */}
      <GlobalSheet
        open={openProfile}
        onOpenChange={setOpenProfile}
        title={t("profile_title")}
        trigger={
          <Image
            src="/assets/icons/profile.png"
            alt={t("profile_title")}
            width={60}
            height={60}
            className="cursor-pointer  sm:size-15 size-12"
          />
        }
      >
        {!openAddress && (
          <div className="w-full flex flex-col gap-4  px-4 py-4 h-[90vh] overflow-scroll scrollbar-thumb-primary scrollbar-track-transparent">

            <SheetItem
              icon="/assets/icons/address.svg"
              label={t("my_address_label")}
              onClick={() => handleNestedOpen(setOpenAddress)}
            />

            <AccountBtn onClose={() => setOpenProfile(false)} />
            <OrdersBtn onClose={() => setOpenProfile(false)} />

            <SheetItem
              icon="/assets/icons/wishlist.svg"
              label={t("wish_list_label")}
              onClick={() => handleNestedOpen(setOpenWishList)}
            />

            <NotificationToggle />
            <Loyality />
            <Wallet />

            <CmsPages onClose={() => setOpenProfile(false)}/>

            <DeleteAccountBtn onClose={() => setOpenProfile(false)} />
            <LogoutBtn onClose={() => setOpenProfile(false)} />
          </div>
        )}
      </GlobalSheet>

      {/* Address Sheet */}
      <GlobalSheet
        open={openAddress}
        onOpenChange={setOpenAddress}
        title={t("my_address_label")}
      >
        <AddressSheet />
      </GlobalSheet>

      {/* WishList Sheet */}
      <GlobalSheet
        open={openWishList}
        onOpenChange={setOpenWishList}
        title={t("wish_list_label")}
      >
        <WishListContent />
      </GlobalSheet>
    </>
  );
}