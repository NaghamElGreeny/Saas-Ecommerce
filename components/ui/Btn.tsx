import Link from 'next/link';
import React from 'react';

interface ButtonProps {
    text: string;
    link: string;
}

export default function Btn({ text, link }: ButtonProps) {
    return (
        <div className="flex flex-row gap-4 items-center justify-center">
            <Link href={link} target="_blank" rel="noopener noreferrer">
                <button className="border border-primary bg-white text-primary px-6 py-3 rounded-full hover:bg-blue-700 hover:text-white transition">
                    {text}
                </button>
            </Link>
        </div>
    );
}


