'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import EmailSubscription from '../ui/SubscribeBtn';
import DownloadButtons from '../ui/Download';
import Btn from '../ui/Btn';

interface BannerProps {
    reverse?: boolean;
    topMsg?: string;
    title: string;
    subtitle?: string;
    description: string;
    // ctaText?: string;
    // onCtaClick?: () => void;
    section?: string;
    imageSrc?: string;
    imageAlt?: string;
}

export function DblSection({
    reverse = false,
    topMsg = '',
    title = '',
    subtitle = '',
    description = '',
    section = '',
    // ctaText = 'Discover More',
    // onCtaClick = () => { },
    imageSrc = "/assets/images/auth-image.png",
    imageAlt = "Delicious food",
}: BannerProps) {
    const [isRTL, setIsRTL] = useState(false);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            setIsRTL(document?.dir === 'rtl');
        }
    }, []);

    // Determines column order
    const imageFirst = reverse ? !isRTL : isRTL;

    return (
        <section dir={isRTL ? 'rtl' : 'ltr'} className="bg-gradient-to-r from-primary-50 to-secondary-50 py-16 md:py-24">
            <div className="container w-[90%] mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

                    {/* Image Section */}
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={1000}
                        height={1000}
                        className={`object-cover  relative h-80 w-80 md:h-96 lg:h-[700px] lg:w-[560px]
                        rounded-full overflow-hidden shadow-lg mx-auto
                        ${imageFirst ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Text Section */}
                    <div className={`
                        flex flex-col justify-center h-full px-2 mb-4
                        ${imageFirst ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}
                        ${isRTL ? 'text-right items-end' : 'text-left items-start'}
                    `}>
                        {topMsg && (
                            <div className={`flex items-center w-full mb-4 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                                <p className={`text-primary uppercase ${isRTL ? 'ml-4' : 'mr-4'}`}>{topMsg}</p>
                                <div className="line border-b border-primary w-[200px] h-0"></div>
                            </div>
                        )}

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            {title}
                        </h1>

                        <p className="text-lg text-gray-700 mb-4 ">
                            {subtitle && `${subtitle} `}
                            <span className="text-gray-500">{description.split('.')[0]}.</span>
                        </p>

                        <p className="text-gray-600 mb-8">
                            {description.split('.').slice(1).join('.')} .
                        </p>

                        {section === 'subscribe' && <EmailSubscription />}
                        {section === 'download' && <DownloadButtons />}
                        {section === 'discover' && <Btn text="Discover more" link="https://example.com" />}

                    </div>
                </div>
            </div>
        </section>
    );
}
