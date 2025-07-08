import { useTranslations } from "next-intl";
import LocalePath from "../localePath";

const NAV_LINKS = [{ href: "/menu", labelKey: "menu" }];

export default function NavLinks() {
  const t = useTranslations("NAV");
  return (
    <>
      {NAV_LINKS.map(({ href, labelKey }) => (
        <LocalePath key={href} href={href} className="hover:text-primary">
          {t(labelKey)}
        </LocalePath>
      ))}
    </>
  );
}
