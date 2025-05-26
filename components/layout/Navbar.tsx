'use client'
import { useEffect, useState, useRef } from 'react';
// import '../../styles/Nav.scss'
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import LocationSelector from '../ui/LocationSelector';
import { FiMenu, FiX } from 'react-icons/fi';
// import ChangeThem from './changeThem';

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
        setIsOpen(prevState => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (e: PointerEvent) => {
            const toggleButton = document.getElementById('toggleBtn');
            if (
                isOpen &&
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                toggleButton &&
                !toggleButton.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('pointerdown', handleClickOutside);
        return () => {
            document.removeEventListener('pointerdown', handleClickOutside);
        };
    }, [isOpen]);


    const logged = false;

    return (
        <nav className={`navBar  md:flex-shrink-0 w-full h-28 z-10 px-13 flex items-center justify-between bg-[#FBFAFC]`}>
            <div className="flex gap-[50px]">
                {/* logo  */}
                <div className='logodiv px-2'>
                    <Link href="/" className="flex items-center space-x-8  rtl:space-x-reverse">
                        <img src={"/assets/logo/logo.svg"} className='h-14 w-20' alt="shebl-logo" />
                    </Link>
                </div>
                {/* links */}
                <div ref={menuRef} className={`linksdiv items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block menublock' : 'hidden'}`} id="navbar-sticky">
                    <ul className="flex flex-col  p-4 md:p-0 mt-4 font-medium border rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                        <li>
                            <Link href="/" className="block py-2 px-3 md:p-0" aria-current="page" onClick={() => setIsOpen(false)}> {t("home")} </Link>
                        </li>
                        <li>
                            <Link href="/about" className="block py-2 px-3 md:p-0" aria-current="page" onClick={() => setIsOpen(false)}> {t("about")} </Link>
                        </li>
                        <li>
                            <Link href="/reservation" className="block py-2 px-3 md:p-0" onClick={() => setIsOpen(false)}>{t("reservation")}</Link>
                        </li>
                        <li>
                            <Link href="/menu" className="block py-2 px-3 md:p-0 " onClick={() => setIsOpen(false)}> {t("menu")}</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="block py-2 px-3 md:p-0 " onClick={() => setIsOpen(false)}> {t("contact")}</Link>
                        </li>
                    </ul>
                </div>
                <button data-collapse-toggle="navbar-sticky" type="button" id='toggleBtn' className="inline-flex items-center  justify-center md:hidden" aria-controls="navbar-sticky" aria-expanded="false" onClick={e => toggleMenu(e)}>
                    <span className="sr-only">Open main menu</span>
                    <div className="w-10 h-10" aria-hidden="true" >
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </div>
                </button>
            </div>
            <div className="iconsdiv flex md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse items-center">
                {/* account */}
                <div className="account flex gap-4" ref={menuRef}>
                    <div className="shared-icons flex gap-2">
                        <button>   <img src="/assets/icons/cart.png" alt="cart" /></button>
                        <button>   <img src="/assets/icons/notifications.png" alt="notifications" /></button>
                    </div>
                    {logged ?
                        <LocationSelector />
                        :
                        <div className="login">
                            <button className='rounded-full w-40 h-12 py-3 px-10 bg-[#5A6AE8] flex gap-2.5'>
                                <img src="/assets/icons/login.png" alt="login" />
                                <p className='font-medium text-[#F5F6FF]'> Log In</p>
                            </button>
                        </div>
                    }
                </div>


            </div>


        </nav>
    );
}
{/* <ChangeThem /> */ }
{/* <button
                    onClick={toggleLocale}
                    className="items-center px-2 py-1 flex flex-row gap-1 "
                >
                    <img src={'/assets/icons/lang-icon.png'} />
                    {locale === 'en' ? 'AR' : 'EN'}
                </button> */}


//<button
//     onClick={() => setIsOpen(!isOpen)}
//     className="text-white focus:outline-none"
// >
//     {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
// </button>