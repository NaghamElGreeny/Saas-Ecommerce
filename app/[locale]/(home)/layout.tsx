import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getAllPages } from "@/services/ApiHandler";
import AosWrapper from "@/components/atoms/AosWrapper";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let cmsPages = null;

  try {
    cmsPages = await getAllPages();
  } catch (err) {
    console.error("Failed to fetch CMS pages or website settings", err);
  }

  return (
    <>
      <AosWrapper >
        <Navbar cms={cmsPages?.data} />

        {children}

        <Footer />
      </AosWrapper>
    </>
  );
}
