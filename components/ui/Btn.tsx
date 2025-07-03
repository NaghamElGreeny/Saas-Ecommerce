import Link from "next/link";
import React from "react";

interface ButtonProps {
  text: string;
  link: string;
}

export default function Btn({ text, link }: ButtonProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <button className="border-primary text-text-website-font rounded-full border bg-white px-6 py-3 transition hover:bg-blue-700 hover:text-white">
          {text}
        </button>
      </Link>
    </div>
  );
}
