// components/hero-banner.tsx
'use client';

import React from 'react';
import { Button } from '../ui/Button'; // Assuming you have a Button component
import Image from 'next/image';


interface BannerProps {
    title: string;
    subtitle: string;
    description: string;
    ctaText?: string;
    onCtaClick?: () => void;
    imageSrc?: string;
    imageAlt?: string;
    // className?: string;
}

export function DblSection({
    title = '',
    subtitle = '',
    description = '',
    ctaText = '',
    onCtaClick = () => { },
    imageSrc = "/assets/images/auth-image.png",
    imageAlt = "Delicious food",
}: BannerProps) {
    const handleClick = () => {
        console.log('Discover More clicked');
    };
    return (
        <section className={`bg-gradient-to-r from-primary-50 to-secondary-50 py-16 md:py-24`}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="order-2 lg:order-1">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            {title}
                        </h1>

                        <p className="text-lg text-gray-700 mb-6">
                            {subtitle} <span className="text-gray-500">{description.split('.')[0]}.</span>
                        </p>

                        <p className="text-gray-600 mb-8">
                            {description.split('.').slice(1).join('.')}.
                        </p>

                        <Button
                            onClick={handleClick}
                            variant="primary"
                            size="lg"
                        >
                            {ctaText}
                        </Button>
                    </div>

                    {/* Image Section - Updated with proper Next.js Image component */}
                    <div className="relative h-80 md:h-96 lg:h-[700px] lg:w-[560px] rounded-full  overflow-hidden shadow-lg order-1 lg:order-2">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}