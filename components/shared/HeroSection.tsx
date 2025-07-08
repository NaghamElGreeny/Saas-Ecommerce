'use client'

import { useTranslations } from "next-intl"

export default function HeroSection({ img, title }: {
    img?: string,
    title: string
}) {
    const t = useTranslations("NAV");
    return (
        <section className={`shared-hero h-[180px] w-full bg-[url('/assets/images/section-hero-bg.jpg')] bg-no-repeat bg-cover bg-center`}>
            <div className=" mx-auto text-center w-full h-full flex flex-col justify-center items-center bg-black/70">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-[Allura] text-white mb-4">
                    {title}
                </h1>

                <p className="text-white mb-6 ">
                    {t("home")} &gt; {title}
                </p>
            </div>
        </section>
    )
}