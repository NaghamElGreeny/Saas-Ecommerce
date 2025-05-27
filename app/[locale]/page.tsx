import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';


export default async function HomeRedirect() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale');

  const locale = localeCookie?.value || 'en';

  // redirect(`/${locale}/auth`);

  return (
    <>
      <Navbar />
      <div className=" space-y-12">

      </div>
      <Footer />
    </>
  )
}
// export default async function HomePage() {

//   return (
//     <div className=" space-y-12">
//       <h2>NAghoma</h2>
//       {/* {banner && <HeroSection maindata={banner} />} */}
//       {/* {aboutSection && <AboutUs about={aboutSection} />} */}
//       {/* {WhyUsData && <Whyus data={WhyUsData} />} */}
//       {/* {services && <OurServices servicesArray={services} />} */}
//       {/* {faqData ? <Faq faqClass={faqClass} btnClass={btnClass} roundClass={roundClass} bgClass={bgClass} /> : ''} */}
//       {/* {social ? <ContactUs social={social} /> : ''} */}
//     </div>
//   );
// }
