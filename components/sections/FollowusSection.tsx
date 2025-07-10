import { useTranslations } from 'next-intl'
import React from 'react'

function FollowusSection() {
const t=useTranslations("HOME")
    return (
        <div className="relative w-full min-h-[838px] grid  lg:grid-cols-7 md:grid-cols-7 grid-cols-2 lg:grid-rows-2 md:grid-rows-2 gap-5">
            <div className={`lg:col-span-2 md:col-span-2  bg-[url('/assets/images/menu/1.jpg')] bg-cover min-h-[350px]`}></div>
            <div className={`lg:col-span-3 md:col-span-3  bg-[url('/assets/images/menu/2.jpg')] bg-cover min-h-[350px]`}></div>
            <div className={`lg:col-span-2 md:col-span-2  bg-[url('/assets/images/menu/3.jpg')] bg-cover min-h-[350px]`}></div>
            <div className={`lg:col-span-5 md:col-span-5  bg-[url('/assets/images/menu/4.jpg')] bg-cover min-h-[350px]`}></div>
            <div className={`lg:col-span-2 md:col-span-2 hidden md:block  bg-[url('/assets/images/menu/5.jpg')] bg-cover min-h-[350px]`}></div>
            <div className="follow absolute size-56 rounded-full bg-primary text-white text-2xl font-medium flex items-center justify-center text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <p>{ t("follow")}</p>
            </div>
        </div>
    )
}

export default FollowusSection