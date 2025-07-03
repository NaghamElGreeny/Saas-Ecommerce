import Link from "next/link";
import { useTranslations } from "next-intl";

const NAV_LINKS = [{ href: "/menu", labelKey: "menu" }];

export default function NavLinks() {
  const t = useTranslations("NAV");
  return (
    <>
      {NAV_LINKS.map(({ href, labelKey }) => (
        <Link key={href} href={href} className="hover:text-primary">
          {t(labelKey)}
        </Link>
      ))}
    </>
  );
}
