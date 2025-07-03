import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getAllPages, getSettings } from "@/services/ApiHandler";  
import AosWrapper from "@/components/atoms/AosWrapper";
import { WebsiteSetting } from "@/utils/webSettingsTypes";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let cmsPages = null;
  let websiteSettingsArray: WebsiteSetting[] = [];

  try {
    cmsPages = await getAllPages();
    const settingsResult = await getSettings();
    websiteSettingsArray = Array.isArray(settingsResult?.data?.web_settings) ? settingsResult?.data?.web_settings : [];
  } catch (err) {
    console.error("Failed to fetch CMS pages or website settings", err);
  }

  const websiteSettings = websiteSettingsArray.reduce((acc: Record<string, any>, setting: { key: string; value: any }) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});

  return (
    <>
      <AosWrapper>
        <Navbar cms={cmsPages?.data} />
        <div
          className="space-y-12 bg-right-bottom bg-no-repeat pb-28 md:space-y-24"
          style={{ backgroundImage: `url(${websiteSettings.website_background_image})` }}
        >
          {children}
        </div>
        <Footer />
      </AosWrapper>
    </>
  );
}
