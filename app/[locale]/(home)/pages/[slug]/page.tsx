import { DblSection } from "@/components/shared/DblSection";
import HeroSection from "@/components/shared/HeroSection";
import { getPagesBySlug } from "@/services/ApiHandler";
import { CmsPage } from "@/utils/types";
// import Image from "next/image";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DynamicCmsPage({ params }: Props) {
  const slug = (await params).slug;
  const pageData: CmsPage = await getPagesBySlug(slug);
  // console.log("CMS page data:", pageData);
  return (
    <>
      <HeroSection title={pageData.slug} />
      <div className="container mx-auto py-10">
        <h1 className="mb-4 text-3xl font-bold">{pageData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: pageData.desc }} />
        <DblSection
          // title={pageData.title}
          sectionData={pageData}
          // description={pageData.desc}
          // imageSrc={pageData.image}
        />
      </div>
    </>
  );
}
// <div className="container mx-auto py-10">
//   <h1 className="text-3xl font-bold mb-4">{pageData.title}</h1>

//   {pageData.icon && (
//     <div className="mb-6">
//       <Image
//         src={`${process.env.NEXT_PUBLIC_BASE_URL}/${pageData.icon}`}
//         alt={pageData.title}
//         width={600}
//         height={400}
//         className="rounded-lg"
//       />
//     </div>
//   )}

//   <p className="text-gray-600 mb-4">
//     Created at: {new Date(pageData.created_at).toLocaleDateString()}
//   </p>

//   <p><strong>User Type:</strong> {pageData.user_type}</p>
//   <p><strong>Visible in Menu:</strong> {pageData.in_menu ? "Yes" : "No"}</p>
// </div>
