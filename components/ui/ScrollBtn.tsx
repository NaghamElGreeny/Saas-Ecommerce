"use client";
import React, { useEffect, useState } from "react";

const ScrollBtn = () => {
    const [showTopButton, setShowTopButton] = useState(false);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const onScrollHandler = () => {
        if (
            document.body.scrollTop > 50 ||
            document.documentElement.scrollTop > 50
        ) {
            setShowTopButton(true);
        } else {
            setShowTopButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", onScrollHandler);

        return () => {
            window.removeEventListener("scroll", onScrollHandler);
        };
    }, []);
    return (
        <>
            {showTopButton && (
                <div className="fixed bottom-6 ltr:right-6 rtl:left-6 z-50 bg-MainColor border-SharedFontSub border-2 rounded-full">
                    <button
                        type="button"
                        className=" rounded-full p-2 animate-pulse bg-main  hover:bg-primary group"
                        onClick={goToTop}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-[#1E3A81] group-hover:text-white transition-all duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 7l4-4m0 0l4 4m-4-4v18"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
};

export default ScrollBtn;
