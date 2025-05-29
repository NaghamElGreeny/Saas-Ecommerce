// components/AppButtons.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ButtonData {
    label: string;
    image: string;
    link: string;
}

export default function DownloadButtons() {
    // const [buttons, setButtons] = useState<ButtonData[]>([]);

    // useEffect(() => {
    //     async function fetchButtons() {
    //         try {
    //             const res = await fetch('/api/buttons');
    //             const data = await res.json();
    //             setButtons(data.buttons);
    //         } catch (err) {
    //             console.error('Error fetching buttons:', err);
    //         }
    //     }

    //     fetchButtons();
    // }, []);
    const buttons =
        [
            {
                "label": "App Store",
                "image": "/assets/icons/google-play.png",
                "link": "https://apps.apple.com/app"
            },
            {
                "label": "Google Play",
                "image": "/assets/icons/app-store.png",
                "link": "https://play.google.com/store"
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
                    <img src={btn.image} alt={btn.label} />

                </a>
            ))}
        </div>
    );
}
