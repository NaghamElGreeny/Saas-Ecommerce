"use client";

import Image from "next/image";
import { useVerificationStore } from "@/stores/useVerificationStore";
import VerifyCode from "../components/verifyCode";
import PhoneInput from "../components/PhoneInput";
import { useState } from "react";

export default function VerifyPage() {
  const verificationType = useVerificationStore(
    (state) => state.verificationType,
  );
  const [status, setStatus] = useState<"phone" | "verify">(
    verificationType === "register" ? "verify" : "phone",
  ); 
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Left Image Section */}
      <div className="relative hidden w-1/2 md:block">
        <Image
          src="/assets/images/auth-image.png"
          alt="login"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Form Section */}
      <div className="relative flex w-full items-center justify-center bg-white md:w-1/2">
        <div className="absolute z-20 flex h-full w-full flex-col justify-center rounded-2xl bg-white px-[120px] py-[320px] ltr:right-3.5 rtl:left-3.5">
          <div className="mb-6 flex">
            <Image
              src="/assets/images/mea-logo.png"
              alt="Logo"
              width={154}
              height={115}
              className="h-[115px] w-[154px]"
              priority
            />
          </div>
          {status === "verify" ? (
            <VerifyCode />
          ) : (
            <PhoneInput setStatus={setStatus} />
          )}

        </div>
      </div>
    </div>
  );
}
