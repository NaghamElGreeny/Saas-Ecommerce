// import HeroSection from "@/components/Sections/Hero";
// import AboutUs from "@/components/Sections/AboutUs";
// import Whyus from "@/components/Sections/Whyus";
// import OurServices from "@/components/Sections/OurServices";
// import Faq from "@/components/Sections/Faq";
// import ContactUs from "@/components/Sections/ContactUs";
// import { getServices, getFaq, getMainPage, getSocial, getWhyUsData, getSections } from "../../../services/ApiHandler";
// import { FaqResponse, mainPageResponse, ServicesResponse, Social, WhyUsResponse, Section } from "../../../types";


export default async function HomePage() {
  // const social: Social[] = await getSocial();
  // const MainData: any = await getSections();
  // const faqData: FaqResponse = await getFaq();
  // const WhyUsData = await getWhyUsData();
  // const servicesData: any = await getServices();
  // 
  // 
  // const services = servicesData?.our_services;
  // const banner = MainData.sections?.find((section: Section) => section.type === "main_banner");
  // const aboutSection = MainData.sections?.find((section: Section) => section.type === "about");
  const faqClass = "w-[95%] gap-16 rounded-[40px] bg-[url('/assets/images/faq.png')] bg-cover p-5";
  const btnClass = "block";
  const bgClass = "bg-[#001c34e6]";
  const roundClass = "rounded-[40px]";
  const titleClass = '!block'
  // console.log(MainData?.sections)
  // const t = useTranslations('Home')
  return (
    <div className=" space-y-12">
      <h2>NAghoma</h2>
      {/* {banner && <HeroSection maindata={banner} />} */}
      {/* {aboutSection && <AboutUs about={aboutSection} />} */}
      {/* {WhyUsData && <Whyus data={WhyUsData} />} */}
      {/* {services && <OurServices servicesArray={services} />} */}
      {/* {faqData ? <Faq faqClass={faqClass} btnClass={btnClass} roundClass={roundClass} bgClass={bgClass} /> : ''} */}
      {/* {social ? <ContactUs social={social} /> : ''} */}
    </div>
  );
}
