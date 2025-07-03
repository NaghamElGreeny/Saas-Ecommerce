"use client";
import React, { useEffect, useState } from "react";
// import { getPrivacy, getTerms } from '../../../services/ClientApiHandler';

interface PopupData {
  id: number;
  type: string;
  title: string;
  description: string;
}

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [privacy, setPrivacy] = useState<PopupData | null>(null);
  const [terms, setTerms] = useState<PopupData | null>(null);
  // useEffect(() => {
  //     getPrivacy().then((data: any) => {
  //         setPrivacy(data?.privacy);
  //     });
  //     getTerms().then((data: any) => {
  //         setTerms(data?.terms);
  //     });
  // }, []);

  // console.log(privacy)

  const openPopupWithData = (data: PopupData) => {
    setPopupData(data);
    setIsOpen(true);
  };
  const closePopup = () => {
    setIsOpen(false);
    setPopupData(null);
  };

  return (
    <div className="flex flex-row gap-4">
      <button
        onClick={() =>
          terms &&
          openPopupWithData({
            id: terms?.id,
            type: "terms",
            title: terms?.title,
            description: terms?.description,
          })
        }
      >
        <p> {terms?.title} </p>
      </button>

      <button
        onClick={() =>
          privacy &&
          openPopupWithData({
            id: privacy?.id,
            type: "privacy",
            title: privacy?.title,
            description: privacy?.description,
          })
        }
      >
        <p> {privacy?.title} </p>
      </button>

      {isOpen && popupData && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex w-full items-center justify-center bg-black p-5">
          <div className="dark:bg-darkBg relative w-3/4 rounded-2xl bg-white p-6 shadow-xl">
            <button onClick={closePopup} className="absolute top-1 left-5">
              <p className="text-4xl font-bold text-red-500 hover:text-red-700">
                {" "}
                ×
              </p>
            </button>

            <div className="p-4">
              <h2 className="text-text-website-fontFont dark:text-darkFont mb-4 text-xl font-bold">
                {popupData.title}
              </h2>
              <div
                className="text-text-website-fontFont dark:text-darkFont overflow-x-auto text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: popupData.description }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
