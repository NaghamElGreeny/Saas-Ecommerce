/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import FollowusSection from "@/components/sections/FollowusSection";
import Hero from "@/components/sections/Hero";
import ReservationForm from "@/components/sections/Reservation";
import { DblSection } from "@/components/shared/DblSection";
import Slider from "@/components/shared/Slider";
import { getHome } from "@/services/ApiHandler";
import { CardItem, HomePageData } from "@/services/types";

// export const items = [
//   {
//     id: '1',
//     name: "Shish Tawook meal",
//     description: "Pickled carrots - celery, tomatoes, cilantro, blue cheese, za'atar",
//     price: "50.00 EGP",
//     image: "/assets/images/menu/tawook.jpg",
//     rating: 4.5
//   },
//   {
//     id: '2',
//     name: "Grilled steak",
//     description: "Grilled to perfection with vegetables and herbs,Grilled to perfection with vegetables and herbs",
//     price: "35.00 EGP",
//     image: "/assets/images/menu/steak.jpg",
//     rating: 4.7
//   },
//   {
//     id: '3',
//     name: "Vegetable pizza",
//     description: "Fresh vegetables and mozzarella on a crispy crust",
//     price: "40.00 EGP",
//     image: "/assets/images/menu/pizza.jpg",
//     rating: 4.3
//   },
// ];
export default async function Home() {
  // const sharedSection =
  // {
  //   topMsg: "HEY! WELCOME TO mea telecom",
  //   title: 'We Provide Good Food For Your Family!',
  //   subtitle: "Food is the foundation of true happiness.",
  //   description: `Food is the foundation of true happiness. </br> Iorem ipsum dolor sit amet, consectetuer adipiscing elit aenean commodo. We see our customers as invited guests to a party, and we are the hosts. It's our job every day to make every important aspect of the customer experience a little bit better. Donec quam felis, ultricies nec, pellentesque eu.`,
  //   ctaText: "Discover More",
  // }

  const data = await getHome();
  const sliders = data?.sliders || [];
  const webContent = data?.web_content;
  const popularProducts = data?.popular_products;
  const web_content_link = data?.web_content_link;
  const products = data?.products || [];
  // const productsData: CardItem[] = products?.content.map((item: any) => ({
  //   id: item.id,
  //   name: item.name,
  //   description: item.desc,
  //   price: `${item.price?.price_after || item.price?.price} ${item.price?.currency}`,
  //   image: item.image,
  //   rating: item.rating,
  // })) || [];

  return (
    <div className="space-y-12 overflow-hidden">
      <Hero sliders={sliders} />
      {/* <Slider title="View our menus" items={items} /> */}
      {/* <Slider title="View our menus" items={products} /> */}
      <DblSection
        topMsg="HEY! WELCOME TO mea telecom"
        sectionData={webContent}
        sectionType="discover"
      />
      <Slider title="Popular Items" items={products} />
            <ReservationForm
        show={true}
        className={
          "relative my-5 flex min-h-screen w-[80%] flex-col justify-center"
        }
      />
      <DblSection
        sectionData={web_content_link}
        sectionType="download"
        reverse={true}
      />
   <FollowusSection />
      {/* <DblSection
   sectionData={followSection}
        sectionType='subscribe'
      /> */}

    </div>
  );
}
