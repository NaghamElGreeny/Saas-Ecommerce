import HomeContent from "@/components/layout/HomeContent";
import { getHome } from "@/services/ApiHandler";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Home() {
  const data = await getHome();
  const locale = await getLocale();
  const t = await getTranslations("HOME");

  return (
    <>
      {locale}
      {t("offers")}
      <HomeContent data={data} />
    </>
  );
}
