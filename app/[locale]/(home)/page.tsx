/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import FollowusSection from "@/components/sections/FollowusSection";
import Hero from "@/components/sections/Hero";
import ReservationForm from "@/components/sections/Reservation";
import { DblSection } from "@/components/shared/DblSection";
import Slider from "@/components/shared/Slider";
import { getHome } from "@/services/ApiHandler";
import { CardItem, HomePageData } from "@/utils/types";

export default async function Home() {
  const data = await getHome();
  const sliders = data?.sliders || [];
  const webContent = data?.web_content;
  const popularProducts = data?.popular_products;
  const web_content_link = data?.web_content_link;
  const products = data?.products || [];
  const offers = data?.offers || [];
  console.log('data :',data)
  console.log('products :',products)
  return (
    <div className="space-y-12 overflow-hidden">
      <Hero sliders={sliders} />
      <Slider title="View our menus" items={products} />
      {/* <Slider title="View our menus" items={products} /> */}
      <DblSection
        topMsg="HEY! WELCOME TO mea telecom"
        sectionData={webContent}
        sectionType="discover"
      />
      <Slider title="Offers" items={offers} />
      <ReservationForm
        show={true}
        className={
          "container-custom relative my-5 flex min-h-screen w-[80%] flex-col justify-center"
        }
      />
      <DblSection
        sectionData={web_content_link}
        sectionType="download"
        reverse={true}
      />
      <FollowusSection />
       <Slider title="Popular Items" items={popularProducts} />
      {/* <DblSection
   sectionData={followSection}
        sectionType='subscribe'
      /> */}

    </div>
  );
}
