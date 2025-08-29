"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const t = useTranslations("AUTH_FORM"); 
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <div className="hidden w-1/2 lg:block">
        <Image
          src="/assets/images/auth-image.png"
          alt="login"
          objectFit="cover"
          width={300}
          height={400}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <div className="relative w-full lg:w-1/2">
        <div className="absolute z-20 flex h-full w-full flex-col justify-center rounded-2xl bg-white lg:px-28 lg:py-48 md:p-10 p-4  lg:ltr:right-3.5 lg:rtl:left-3.5">
          <div className="mb-6 flex">
            <Image
              src="/assets/images/mea-logo.png"
              alt="logo"
              width={154}
              height={115}
              className="h-[115px] w-[154px]"
            />
          </div>

          <h2 className="mb-4 text-2xl md:text-3xl font-bold lg:text-4xl">
            {isLogin ? t("welcome_back") : t("create_account")}
          </h2>
          {isLogin ? <p className="text-sub mb-3">{t("login_prompt")}</p> : ""}
          {isLogin ? <LoginForm /> : <RegisterForm />}

          <p className="mt-4 text-center text-sm">
            {isLogin ? (
              <>
                {t("no_account_yet")}{" "}
                <button
                  className="font-semibold text-blue-600"
                  onClick={() => setIsLogin(false)}
                >
                  {t("sign_up")}
                </button>
              </>
            ) : (
              <>
                {t("have_account")}{" "}
                <button
                  className="font-semibold text-blue-600"
                  onClick={() => setIsLogin(true)}
                >
                  {t("login")}
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
