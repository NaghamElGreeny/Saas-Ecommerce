/* eslint-disable @next/next/no-img-element */

import { Star } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { getMenuItem } from "@/services/ApiHandler";
import Modifier from "@/components/Modifiers";
import ProductReview from "@/components/ProductReview";
// interface Review {
//   id: number;
//   userName: string;
//   rating: number;
//   comment: string;
//   daysAgo: number;
//   avatar: string;
// }

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const ProductDetails: React.FC = async ({ params }: Props) => {
  const slug = (await params).slug;
  //   const [quantity, setQuantity] = useState(1);

  const product = await getMenuItem(decodeURIComponent(slug));
  console.log("producttt", product);
  // Default product data if none provided
  const defaultProduct = {
    id: 1,
    name: "Pepperoni pizza",
    image: "/lovable-uploads/8faa2050-86be-4163-a0a1-3453388182e6.png",
    rating: 4.5,
    reviewCount: 1205,
    description:
      "Fresh and crispy pizza loaded with our special cheese recipe with cheese and filled, Italian and olive pepperoni and chicken stuffed with excellent taste and original taste.",
    sizes: [
      { name: "Small", price: 200 },
      { name: "Double", price: 350 },
      { name: "Triple", price: 500 },
    ],
    toppings: [
      { name: "Onions", price: 25 },
      { name: "Pepper", price: 30 },
      { name: "Pepper Green", price: 25 },
      { name: "Tomato", price: 20 },
    ],
    reviews: [
      {
        id: 1,
        userName: "Hector Self",
        rating: 5,
        comment: "This pizza has amazing big quality. We loved it!",
        daysAgo: 4,
        avatar: "👨‍💼",
      },
      {
        id: 2,
        userName: "Nada Ayman",
        rating: 5,
        comment: "This pizza has amazing big quality. We loved it!",
        daysAgo: 5,
        avatar: "👩‍💼",
      },
    ],
  };
  const currentProduct = product || defaultProduct;

  //total price
  // const calculateTotalPrice = () => {
  //   const basePrice = currentProduct.sizes[selectedSize].price;
  //   const toppingsPrice = selectedToppings.reduce(
  //     (sum, index) => sum + currentProduct.toppings[index].price,
  //     0,
  //   );
  //   return (basePrice + toppingsPrice) * quantity;
  // };

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

  console.log(product.sub_modifiers);
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
              src={currentProduct.image}
              alt={currentProduct.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="mb-2 flex items-center justify-between">
            <h2 className="flex items-center gap-1 text-3xl font-bold text-gray-900">
              {currentProduct.name}
              <span>
                {spicy && <img src="/assets/icons/spicy.png" alt="spicy" />}
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
            {renderStars(currentProduct.rating)}
            <span className="text-sm text-gray-600">
              ({currentProduct.review_count})
            </span>
          </div>

          <p className="text-sm leading-relaxed text-gray-600">
            {currentProduct.desc}
          </p>
        </div>

        {/* Leave a Note */}
        <div className="note w-full">
          <h3 className="mb-6 text-2xl font-bold">Note</h3>
          <Textarea placeholder="Write notes here." className="!h-20" />
        </div>
        {/* Toppings(modifiers) */}
        <Modifier modifiers={product.sub_modifiers} />

        {/* Quantity and Add to Cart */}
        {/* <div className="p-6">
          <div className="flex h-12 items-center justify-end gap-2">
            <div className="flex h-full items-center space-x-3 rounded-lg border border-[#F1F1FF]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-8 w-8 items-center justify-center hover:bg-gray-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-primary flex h-8 w-8 items-center justify-center hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button className="bg-primary hover:bg-primary/85 h-full rounded-lg px-8 text-white">
              Add to cart - {calculateTotalPrice()} EGP
            </button>
          </div>
        </div> */}

        {/* Customer Reviews */}
        <h3 className="mb-6 text-4xl font-bold">customer review</h3>
        <ProductReview productId={product.id} />
      </div>
    </section>
  );
};

export default ProductDetails;
