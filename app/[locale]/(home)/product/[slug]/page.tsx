import { getMenuItem } from "@/services/ApiHandler";
import ProductReview from "@/components/ProductReview";
import ProductForm from "@/components/Forms/ProductForm";
import { Star } from "lucide-react";
import ProductHeaderClient from "@/components/ProductHeaderClient";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const ProductDetails: React.FC<Props> = async ({ params }: Props) => {
  const t = await getTranslations("PRODUCT_DETAILS");

  const slug = (await params).slug;
  const product = await getMenuItem(decodeURIComponent(slug));
  const renderStars = (rating: number, className?: string) => {
    return (
      <div className={`flex items-center ${className || ""}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };
  const spicy = true; // This seems to be a hardcoded boolean, consider if it should be dynamic
  return (
    <section className="flex w-full justify-center bg-[#FBFAFC]">
      <div className="mt-16 flex w-4/5 flex-col gap-4 sm:w-11/12">
        {/* Header */}
        <div className="item">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">
            {t("item_details_title")}
          </h1>

          {/* Product Image */}
          <div className="mb-4 h-[200px] w-full overflow-hidden rounded-3xl bg-gray-100 md:h-[300px] lg:h-[450px] xl:h-[516px]">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="mb-2 flex items-center justify-between px-3">
            <h2 className="flex items-center gap-1 text-3xl font-bold text-gray-900">
              {product.name}
              <span>
                {spicy && (
                  <Image
                    width={24}
                    height={24}
                    src="/assets/icons/spicy.png"
                    alt={t("spicy_alt_text")}
                  />
                )}
              </span>
            </h2>
            <div className="flex items-center space-x-2">
              <ProductHeaderClient product={product} />
            </div>
          </div>

          {/* price */}
          <div className="mt-auto text-lg font-bold">
            <div className="text-lg text-indigo-400 line-through">
              {product.price.price.toFixed(2)}
              <span className="text-md ml-1 font-normal">
                {product.price.currency}
              </span>
            </div>
            <div>
              {product.price.price_after.toFixed(2)}
              <span className="text-md ml-1 font-normal">
                {product.price.currency}
              </span>
            </div>
          </div>

          {/* rating */}
          <div className="mb-3 flex items-center space-x-2">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-600">
              ({product.review_count})
            </span>
          </div>

          <p className="text-sm leading-relaxed text-gray-600">
            {product.desc}
          </p>
        </div>

        <ProductForm productId={product.id} modifiers={product.sub_modifiers} />
        {/* Customer Reviews */}
        <h3 className="mb-6 text-4xl font-bold">
          {t("customer_review_title")}
        </h3>
        <ProductReview productId={product.id} />
      </div>
    </section>
  );
};

export default ProductDetails;
