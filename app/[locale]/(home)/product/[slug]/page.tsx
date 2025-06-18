/* eslint-disable @next/next/no-img-element */

import { getMenuItem } from "@/services/ApiHandler";
import ProductReview from "@/components/ProductReview";
import ProductForm from "@/components/ProductForm";
import { Star } from "lucide-react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const ProductDetails: React.FC = async ({ params }: Props) => {
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
  const spicy = true;
  return (
  
          <section className="flex w-full justify-center bg-[#FBFAFC]">
            <div className="mt-16 flex w-4/5 flex-col gap-10 sm:w-11/12">
              {/* Header */}
              <div className="item">
                <h1 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">
                  Item Details
                </h1>

                {/* Product Image */}
                <div className="mb-4 h-[200px] w-full overflow-hidden rounded-3xl bg-gray-100 md:h-[300px] lg:h-[450px] xl:h-[516px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="flex items-center gap-1 text-3xl font-bold text-gray-900">
                    {product.name}
                    <span>
                      {spicy && (
                        <img src="/assets/icons/spicy.png" alt="spicy" />
                      )}
                    </span>
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="cursor-pointer text-gray-400">
                      <img src="/assets/icons/share.png" alt="share" />
                    </span>
                    <span className="cursor-pointer text-blue-500">
                      <img src="/assets/icons/love.png" alt="like" />
                    </span>
                  </div>
                </div>

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

              <ProductForm productId={product.id} modifiers={product.sub_modifiers}/>
              {/* Customer Reviews */}
              <h3 className="mb-6 text-4xl font-bold">customer review</h3>
              <ProductReview productId={product.id} />
            </div>
          </section>

  );
};

export default ProductDetails;
