"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
// import { useRouter, usePathname } from 'next/navigation';
import { FiMenu, FiX } from "react-icons/fi";
import LocationSelector from "../ui/LocationSelector";
import "@/styles/Navbar.css";
import { useAuthStore } from "@/stores/authStore";
import cookies from "js-cookie";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getStores, logout, LogoutPayload } from "@/services/ClientApiHandler";
import toast from "react-hot-toast";
import ReservationForm from "../sections/Reservation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
    const [logged, setLogged] = useState(false);
    const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const t = useTranslations("NAV");
  const locale = useLocale();
  // const router = useRouter();
  // const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !document.getElementById("toggleBtn")?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen]);

  // const logged = false;
  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      setLogged(true);
      useAuthStore.getState().setToken(token);
      // useLoggedStore.getState().setLogged(true);
    } else {
      setLogged(false);
      useAuthStore.getState().setToken("");
      // useLoggedStore.getState().setLogged(false);
    }
      
        const fetchData = async () => {
      try {
          const stores = await getStores(); 
            setStores(stores);
          setSelectedStore(stores[0]); 
      } catch (err) {
        toast.error('Failed to load country codes and stores');
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const Logout = async () => {
    const payload: LogoutPayload = {
      device_type: "web",
    //   device_token: "ios",
    };

    try {
      const data = await logout(payload);
      if (data) {
        cookies.remove("token");
        useAuthStore.getState().setToken("");
        setLogged(false);
        toast.success("Logged out successfully");
      }
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navBar bg-bgPrimary relative z-50 flex h-28 w-full items-center justify-between px-4 md:px-10 lg:px-14">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <img
            src="/assets/logo/logo.svg"
            className="h-14 w-20"
            alt="shebl-logo"
          />
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden w-3/4 items-center gap-8 md:flex ltr:pl-8 rtl:pr-8">
        <Link href="/" className="hover:opacity-80">
          {t("home")}
        </Link>
        <Link href="/about" className="hover:opacity-80">
          {t("about")}
        </Link>
        {/* <Link href="/reservation" className="hover:opacity-80">{t('reservation')}</Link> */}

        <Dialog>
          <DialogTrigger className="hover:opacity-80">
            {t("reservation")}
          </DialogTrigger>
                  <DialogContent className="p-0 rounded-[20px] flex justify-center items-center mx-auto w-[80%]">
                      
                      <ReservationForm show={false} className={'w-full p-0'} />
        </DialogContent>
        
        </Dialog>

        <Link href="/menu" className="hover:opacity-80">
          {t("menu")}
        </Link>
        <Link href="/contact" className="hover:opacity-80">
          {t("contact")}
        </Link>
      </div>

      {/* Desktop Icons */}
      <div className="hidden items-center gap-4 md:flex">
        <Link href="#">
          <img src="/assets/icons/cart.png" alt="cart" />
        </Link>
        <Link href="#">
          <img src="/assets/icons/notifications.png" alt="notifications" />
        </Link>
        {logged ? (
          <>
            <Sheet>
              <SheetTrigger>
                <img
                  src="/assets/icons/profile.png"
                  alt="profile"
                  className="cursor-pointer"
                />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter className="flex flex-col items-center justify-center">
                  {/* <button
                    onClick={Logout}
                    className="mt-4 flex h-10 w-[80%] items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white"
                  >
                    <span>Log out</span>
                                  </button> */}
                  <AlertDialog>
                    <AlertDialogTrigger className="mt-4 flex h-10 w-[80%] items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white">
                      Log Out
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will log out your
                          account.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={Logout}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <SheetClose asChild>
                    {/* <Button variant="outline">Close</Button> */}
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* <Link href="#"><img src="/assets/icons/profile.png" alt="profile" /></Link> */}
            <LocationSelector active={true} />
          </>
        ) : (
          <Link
            href={`/${locale}/auth`}
            className="flex h-10 w-32 items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white"
          >
            {/* <button className="rounded-full w-32 h-10 bg-[#5A6AE8] text-white flex items-center justify-center gap-2"> */}
            <img src="/assets/icons/login.png" alt="login" />
            <span>{t("login")}</span>
            {/* </button> */}
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button id="toggleBtn" onClick={toggleMenu} className="z-50 md:hidden">
        <div className="border-primary hover:bg-primary/20 active:bg-primary/40 flex h-10 w-10 items-center justify-center rounded-full border-2">
          {isOpen ? (
            <FiX size={24} className="text-primary" />
          ) : (
            <FiMenu size={24} className="text-primary" />
          )}
        </div>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="bg-bgPrimary animate-slide-down absolute top-full left-0 flex w-full flex-col gap-4 p-6 shadow-lg md:hidden"
        >
          <Link href="/" onClick={() => setIsOpen(false)}>
            {t("home")}
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            {t("about")}
          </Link>
          <Link href="/reservation" onClick={() => setIsOpen(false)}>
            {t("reservation")}
          </Link>
          <Link href="/menu" onClick={() => setIsOpen(false)}>
            {t("menu")}
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            {t("contact")}
          </Link>
          <hr />
          <Link href="#" className="flex items-center gap-2">
            <img src="/assets/icons/cart.png" alt="cart" />
            <span>Cart</span>
          </Link>
          <Link href="#" className="flex items-center gap-2">
            <img src="/assets/icons/notifications.png" alt="notifications" />
            <span>Notifications</span>
          </Link>
          {logged ? (
            <button
              onClick={Logout}
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white"
            >
              <span>Log out</span>
            </button>
          ) : (
            <Link
              href={`/${locale}/auth`}
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#5A6AE8] text-white"
            >
              <img src="/assets/icons/login.png" alt="login" />
              <span>Log In</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
