"use client";
import React, { PropsWithChildren } from "react";

import Link from "next/link";
import { useLocale } from "next-intl";

type props = {
  href: string;
  className?: string;
};

export default function LocalePath({
  href,
  className = "",
  children,
}: PropsWithChildren<props>) {
  const locale = useLocale();

  return (
    <Link
      className={className}
      href={`${locale === "ar" ? `/${locale}${href}` : `${href}`}`}
    >
      {children}
    </Link>
  );
}
