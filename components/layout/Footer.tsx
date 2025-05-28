// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
    const socials = [
        'facebook',
        'twitter',
        'messenger',
        'instagram'
    ]
    return (
        <footer className="bg-gray-900 w-full text-white py-12 px-4 sm:px-6 lg:px-8 bottom-0 left-0">
            <div className="max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="
                    grid 
                    grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-2 
                    lg:grid-cols-5 
                    gap-8 
                    mb-8
                ">
                    {/* Brand Info (takes 2 columns on lg) */}
                    <div className="lg:col-span-2 space-y-4">
                        <img src="/assets/images/MEA_Telecom.png" alt="mea telecome" className='w-36 h-24' />
                        <p className="text-gray-300">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo libero viverra dapibus odio sit malesuada in quis. Arcu tristique elementum viverra integer id.
                        </p>
                    </div>

                    {/* Sections */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Sections</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Menu
                                </Link>
                            </li>
                            <li className="">
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Offers
                                </Link>
                            </li>
                            <li className="">
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Reservation
                                </Link>
                            </li>
                            <li className="">
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Favorit
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Privacy policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Terms & conditions
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* Contact */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact</h3>
                            <ul className="space-y-2">
                                <li className="text-gray-300">Call Center <br />
                                    <span className='text-subFont'>(13) 3078-6114</span></li>
                                <div className="border-t-[.5px] border-gray-800 my-6"></div>
                                <li className="text-gray-300">Email <br />
                                    <span className='text-subFont'> michelle.rivera@example.com</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 my-6"></div>

                {/* Copyright & Social*/}
                <div className="flex justify-between">
                    <div className="text-center text-gray-400">
                        © {new Date().getFullYear()} All Rights Reserved
                    </div>
                    <div className="flex w-56 gap-4">
                        {socials.map((social, index) => {
                            return <Link key={index} className='size-11 border rounded-full flex items-center justify-center' href={`${social}.com`}><img src={`/assets/icons/${social}.svg`} alt={`${social}`} /></Link>
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
