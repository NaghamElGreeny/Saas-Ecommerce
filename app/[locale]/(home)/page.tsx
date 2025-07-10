import { getHome } from "@/services/ApiHandler";
import { getTranslations } from "next-intl/server";
import FollowusSection from "@/components/sections/FollowusSection";
import Hero from "@/components/sections/Hero";
import ReservationForm from "@/components/sections/Reservation";
import { DblSection } from "@/components/shared/DblSection";
import Slider from "@/components/shared/Slider";

export default async function Home() {
  const data = await getHome();
  const t = await getTranslations("HOME");

  const sliders = data?.sliders || [];
  const webContent = data?.web_content;
  const popularProducts = data?.popular_products;
  const web_content_link = data?.web_content_link;
  const products = data?.products || [];
  const offers = data?.offers || [];

  return (
    <div className="space-y-12 overflow-hidden">
      <Hero sliders={sliders} />
      <Slider title={t("view_our_menus")} items={products} />
      <DblSection
        topMsg={t("welcome_message")}
        sectionData={webContent}
        sectionType="discover"
      />
      <Slider title={t("offers")} items={offers} offer={true} />
      <ReservationForm
        show={true}
        className={
          "container-custom relative md:my-5 flex min-h-screen flex-col justify-center"
        }
      />
      <DblSection
        sectionData={web_content_link}
        sectionType="download"
        reverse={true}
      />
      <FollowusSection />
      <Slider title={t("popular_items")} items={popularProducts} />
    </div>
  );
}
