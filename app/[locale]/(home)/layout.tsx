import "@/styles/globals.css"
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getAllPages } from "@/services/ApiHandler";
export default async function LocaleLayout({
    children,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    let cmsPages = null;
    try {
        cmsPages = await getAllPages(); // بدون slug
        console.log("CMS pages fetched successfully", cmsPages);
    } catch (err) {
        console.error("Failed to fetch CMS pages", err);
    }
    
    return (
        <>
        <Navbar cms={cmsPages.data} />
        {children}
        <Footer />
        </>
    );
}
