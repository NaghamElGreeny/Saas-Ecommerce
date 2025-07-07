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

export default function ProfileSheet() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);

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
        <Image src={icon} alt={label} width={65} height={65} />
        {label}
      </div>
      <ChevronRight />
    </div>
  );

  return (
    <>
      {/* Profile Sheet */}
      <GlobalSheet
        open={openProfile}
        onOpenChange={setOpenProfile}
        title="Profile"
        trigger={
          <Image
            src="/assets/icons/profile.png"
            alt="profile"
            width={60}
            height={60}
            className="cursor-pointer"
          />
        }
      >
        {!openAddress && (
          <div className="w-full flex flex-col gap-4  px-4 py-4 h-[90vh] overflow-scroll scrollbar-thumb-primary scrollbar-track-transparent">
            
            <SheetItem
              icon="/assets/icons/address.svg"
              label="My Address"
              onClick={() => handleNestedOpen(setOpenAddress)}
            />

            <AccountBtn onClose={() => setOpenProfile(false)} />
            <OrdersBtn onClose={() => setOpenProfile(false)} />

            <SheetItem
              icon="/assets/icons/wishlist.svg"
              label="Wish List"
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
        title="My Address"
      >
        <AddressSheet />
      </GlobalSheet>

      {/* WishList Sheet */}
      <GlobalSheet
        open={openWishList}
        onOpenChange={setOpenWishList}
        title="Wish List"
      >
        <WishListContent />
      </GlobalSheet>
    </>
  );
}
