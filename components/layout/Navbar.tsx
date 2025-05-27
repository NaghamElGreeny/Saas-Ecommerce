'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import LocationSelector from '../ui/LocationSelector';
import '@/styles/Navbar.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('NAV');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleLocale = () => {
        const newLocale = locale === 'en' ? 'ar' : 'en';
        const segments = pathname.split('/').filter(Boolean);
        segments[0] = newLocale;
        const newPath = `/${segments.join('/')}`;
        router.push(newPath);
    };

    const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (e: PointerEvent) => {
            if (
                isOpen &&
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                !(document.getElementById('toggleBtn')?.contains(e.target as Node))
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('pointerdown', handleClickOutside);
        return () => document.removeEventListener('pointerdown', handleClickOutside);
    }, [isOpen]);

    const logged = false;

    return (
        <nav className="navBar w-full h-28 px-4 md:px-10 lg:px-14 bg-bgPrimary flex items-center justify-between relative z-50">
            {/* Logo */}
            <div className="flex items-center ">
                <Link href="/" className="flex items-center">
                    <img src="/assets/logo/logo.svg" className="h-14 w-20" alt="shebl-logo" />
                </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 w-3/4 rtl:pr-8 ltr:pl-8">
                <Link href="/" className="hover:opacity-80">{t('home')}</Link>
                <Link href="/about" className="hover:opacity-80">{t('about')}</Link>
                <Link href="/reservation" className="hover:opacity-80">{t('reservation')}</Link>
                <Link href="/menu" className="hover:opacity-80">{t('menu')}</Link>
                <Link href="/contact" className="hover:opacity-80">{t('contact')}</Link>
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-4">
                <Link href="#"><img src="/assets/icons/cart.png" alt="cart" /></Link>
                <Link href="#"><img src="/assets/icons/notifications.png" alt="notifications" /></Link>
                {logged ? (
                    <LocationSelector />
                ) : (
                    <Link href={'/auth'} className="rounded-full w-32 h-10 bg-[#5A6AE8] text-white flex items-center justify-center gap-2">
                        {/* <button className="rounded-full w-32 h-10 bg-[#5A6AE8] text-white flex items-center justify-center gap-2"> */}
                        <img src="/assets/icons/login.png" alt="login" />
                        <span >{t('login')}</span>
                        {/* </button> */}
                    </Link>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button id="toggleBtn" onClick={toggleMenu} className="md:hidden z-50">
                <div className="w-10 h-10 border-2 border-primary rounded-full flex items-center justify-center hover:bg-primary/20 active:bg-primary/40">
                    {isOpen ? <FiX size={24} className="text-primary" /> : <FiMenu size={24} className="text-primary" />}
                </div>
            </button>

            {/* Mobile Menu */}
            {isOpen && (
                <div ref={menuRef} className="absolute top-full left-0 w-full bg-bgPrimary p-6 flex flex-col gap-4 shadow-lg md:hidden animate-slide-down">
                    <Link href="/" onClick={() => setIsOpen(false)}>{t('home')}</Link>
                    <Link href="/about" onClick={() => setIsOpen(false)}>{t('about')}</Link>
                    <Link href="/reservation" onClick={() => setIsOpen(false)}>{t('reservation')}</Link>
                    <Link href="/menu" onClick={() => setIsOpen(false)}>{t('menu')}</Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)}>{t('contact')}</Link>
                    <hr />
                    <Link href="#" className="flex items-center gap-2">
                        <img src="/assets/icons/cart.png" alt="cart" />
                        <span>Cart</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-2">
                        <img src="/assets/icons/notifications.png" alt="notifications" />
                        <span>Notifications</span>
                    </Link>
                    {!logged && (
                        <Link href={`/${locale}/auth`} className="mt-4 rounded-full w-full h-10 bg-[#5A6AE8] text-white flex items-center justify-center gap-2">
                            <img src="/assets/icons/login.png" alt="login" />
                            <span>Log In</span>
                        </Link>
                    )}
                </div>
            )}
        </nav>

    );
}
