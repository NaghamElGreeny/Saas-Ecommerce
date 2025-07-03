"use client";
import React, { useEffect } from "react";
import AOS from "aos";

import "aos/dist/aos.css";

const AosWrapper = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true, // Ensures animations run only once for better performance
            disable: "mobile", // Disables on mobile for better performance
        });
    }, []);

    return <>{children}</>;
};

export default AosWrapper;