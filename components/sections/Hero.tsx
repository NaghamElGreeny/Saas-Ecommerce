'use client'
import '@/styles/hero.css'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Hero() {
    const socials = ['facebook', 'twitter', 'messenger', 'instagram'];
    const images = [
        "url('/assets/images/img1.jpg')",
        "url('/assets/images/img2.jpg')",
        "url('/assets/images/img3.jpg')",
        "url('/assets/images/img4.jpg')",
    ];

    const [current, setCurrent] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide();
    }, [current]);

    const startAutoSlide = () => {
        stopAutoSlide();
        intervalRef.current = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 3000);
    };

    const stopAutoSlide = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const handleNext = () => {
        setCurrent(prev => (prev + 1) % images.length);
        startAutoSlide();
    };

    const handlePrev = () => {
        setCurrent(prev => (prev - 1 + images.length) % images.length);
        startAutoSlide();
    };

    const style = {
        backgroundImage: images[current],
    };

    return (
        <section
            className="slider-bg h-[90vh] bg-no-repeat bg-cover bg-center"
            style={style}
        >
            <div className="container h-full w-full px-16 sm:px-6 lg:px-32  bg-black/50">
                <div className="max-w-2xl mx-auto text-center h-4/5 flex flex-col justify-center items-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-[Allura] text-white mb-4">
                        Exotic and Delicious
                    </h1>

                    <p className="text-white mb-6">
                        Food is the foundation of true happiness, lorem ipsum<br />
                        dolor sit amet, consectetur adipiscing elit aenean.
                    </p>

                    <Link
                        href="/discover"
                        className="text-white font-medium md:text-xl flex rtl:flex-row-reverse"
                    >
                        <p className='underline'> Discover More </p>
                        <ArrowUpRight />
                    </Link>
                </div>

                <div className="flex justify-between">
                    <div className="flex w-56 gap-4">
                        {socials.map((social, index) => (
                            <Link key={index} className='size-11 border rounded-full border-white flex items-center justify-center' href={`${social}.com`}>
                                <img src={`/assets/icons/${social}.svg`} alt={social} />
                            </Link>
                        ))}
                    </div>
                    <div className="flex w-28 justify-between rtl:flex-row-reverse text-gray-400">
                        <ChevronLeft
                            className='size-11 bg-white/30 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-white/50'
                            onClick={handlePrev}
                        />
                        <ChevronRight
                            className='size-11 bg-white/30 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-white/50'
                            onClick={handleNext}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
