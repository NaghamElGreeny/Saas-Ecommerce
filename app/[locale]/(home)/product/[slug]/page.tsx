// "use client";
// import React, { useState } from "react";
import { Star, Plus, Minus } from "lucide-react";
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
import { Textarea } from "@/components/ui/textarea";
import ToppingItem from "@/components/ui/ToppingItem";
import { getMenuItem } from "@/services/ApiHandler";
// interface Review {
//   id: number;
//   userName: string;
//   rating: number;
//   comment: string;
//   daysAgo: number;
//   avatar: string;
// }

// interface ProductDetailsProps {
//   product?: {
//     id: number;
//     name: string;
//     image: string;
//     rating: number;
//     reviewCount: number;
//     description: string;
//     sizes: { name: string; price: number }[];
//     toppings: { name: string; price: number }[];
//     reviews: Review[];
//   };
// }
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const  ProductDetails: React.FC = async ({ params }: Props) => {
   const slug = (await params).slug;
    // const [selectedSize, setSelectedSize] = useState(0);
//   const [selectedToppings, setSelectedToppings] = useState<number[]>([]);
//   const [quantity, setQuantity] = useState(1);

    const   sizes= [
      { name: "Small", price: 200 },
      { name: "Double", price: 350 },
      { name: "Triple", price: 500 },
    ]
  // Default product data if none provided

  console.log(decodeURIComponent(slug),'sss')
    const product =await getMenuItem(decodeURIComponent(slug));
    console.log('producttt', product)
  const currentProduct = product || defaultProduct;

  const toggleTopping = (index: number) => {
    setSelectedToppings((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const calculateTotalPrice = () => {
    const basePrice = currentProduct.sizes[selectedSize].price;
    const toppingsPrice = selectedToppings.reduce(
      (sum, index) => sum + currentProduct.toppings[index].price,
      0,
    );
    return (basePrice + toppingsPrice) * quantity;
  };

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

  function setQty(arg0: number) {
    throw new Error("Function not implemented.");
  }

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

        {/* Size Selection */}
        <div className="size">
          <h3 className="mb-3 text-2xl font-bold text-gray-900">
            Size&nbsp; &nbsp;
            <span className="text-[16px] font-normal text-[#FCC230]">
              Select 2 sizes*
            </span>
          </h3>
          <div className="flex gap-3">
            {/* {sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(index)}
                className={`w-42 rounded-lg border p-3 text-center transition-colors ${
                  selectedSize === index
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium">{size.name}</div>
                <div className="text-sm text-gray-500">{size.price} EGP</div>
              </button>
            ))} */}
          </div>
        </div>

        {/* Toppings */}
        {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="section1">
            <h3 className="mb-3 text-2xl font-bold text-gray-900">
              Topping&nbsp; &nbsp;
              <span className="text-[16px] font-normal text-[#FCC230]">
                Select 2 Topping*
              </span>
            </h3>
            <div className="flex flex-col gap-4">
              {currentProduct.toppings.map((topping, index) => (
                <ToppingItem
                  key={index}
                  name={topping.name}
                  price={topping.price}
                  unit="70 gm"
                  quantity={1}
                  onAdd={() => setQty(quantity + 1)}
                  onRemove={() => setQty(Math.max(0, quantity - 1))}
                />
              ))}
            </div>
          </div>
          <div className="section2">
            <h3 className="mb-3 text-2xl font-bold text-gray-900">
              Topping&nbsp; &nbsp;
              <span className="text-[16px] font-normal text-[#FCC230]">
                Select 2 Topping*
              </span>
            </h3>
            <div className="flex flex-col gap-4">
              {currentProduct.toppings.map((topping, index) => (
                <ToppingItem
                  key={index}
                  name={topping.name}
                  price={topping.price}
                  unit="70 gm"
                  quantity={1}
                  onAdd={() => setQty(quantity + 1)}
                  onRemove={() => setQty(Math.max(0, quantity - 1))}
                />
              ))}
            </div>
          </div>
        </div> */}

        {/* Quantity and Add to Cart */}
        <div className="p-6">
          {/* <div className="flex h-12 items-center justify-end gap-2">
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
          </div> */}
        </div>

        {/* Customer Reviews */}
          <h3 className="mb-6 text-4xl font-bold">customer review</h3>
        <div className="p-6 grid grid-cols-1 gap-6 sm:grid-cols-2 rounded-2xl border mb-16 min-h-96">
          {/* <div className="mb-6 h-[282px] flex flex-col space-y-4">
            <div className="text-center my-8">
              <div className="text-2xl font-bold text-gray-900">
                {currentProduct.rating}
              </div>
              {renderStars(currentProduct.rating, "justify-center")}
            </div>

            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="mb-1 flex items-center space-x-2">
                  <span className="w-2 text-sm text-gray-600">{rating}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{
                        width:
                          rating === 5 ? "80%" : rating === 4 ? "60%" : "20%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {currentProduct.reviews.map((review) => (
              <div key={review.id} className="flex items-center space-x-3 border-t border-gray-300 h-40">
                <div className="flex  h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm ">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">
                      {review.userName}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {review.daysAgo} days ago
                    </span>
                  </div>
                  {renderStars(review.rating, "mb-2")}
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
