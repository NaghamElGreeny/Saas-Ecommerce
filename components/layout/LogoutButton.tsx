import { useLocale, useTranslations } from "next-intl";
import cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";
import { logout } from "@/services/authApi";
import Link from "next/link";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function LogoutButton({ isMobile = false }: { isMobile?: boolean }) {
  const locale = useLocale();
  const t = useTranslations("NAV");
  const token = useAuthStore((state) => state.token);

  const handleLogout = async () => {
    try {
      await logout({ device_type: "web" });
      cookies.remove("token");
      useAuthStore.getState().setToken("");
      toast.success("Logged out successfully");
    } catch {
      toast.error("Failed to logout");
    }
  };

  if (token) {
    return (
      <button
        onClick={handleLogout}
        className={`mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white`}
      >
        <Image
          src="/assets/icons/login.png"
          alt="logout"
          width={24}
          height={24}
          className="scale-x-[-1]"
        />
        <span>{t("logout")}</span>
      </button>
    );
  }

  return (
    <Link
      href={`/${locale}/auth`}
      className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white"
    >
      <Image src="/assets/icons/login.png" alt="login" width={24} height={24} />
      <span>{t("login")}</span>
    </Link>
  );
}
