'use client';

import Image from "next/image";

// import { useEffect, useState } from 'react';


export default function DownloadButtons({ googlePlay, appStore }: {
    googlePlay: string;
    appStore: string;
}) {

    const buttons =
        [
            {
                "label": "App Store",
                "image": "/assets/icons/google-play.png",
                "link": `${appStore}`,
            },{
                "label": "Google Play",
                "image": "/assets/icons/app-store.png",
                "link": `${googlePlay}`
            }
        ]
        ;

    if (buttons.length === 0) return null;

    return (
        <div className="flex flex-row gap-4 items-center justify-center">
            {buttons.map((btn, idx) => (
                <a
                    key={idx}
                    href={btn.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                >
                    <Image src={btn.image} alt={btn.label} width={24} height={24}/>

                </a>
            ))}
        </div>
    );
}
