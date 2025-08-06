"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { productService } from "@/services/ClientApiHandler";

type Review = {
  id: number;
  rate: number;
  review: string;
  note: string;
  created_at: string;
  user: {
    id: number;
    full_name: string;
    avatar: string;
  };
};

type StarRate = {
  key: string;
  value: number;
};

type Props = {
  productId: number;
};

function ProductReview({ productId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRate, setAverageRate] = useState<number>(0);
  const [starRate, setStarRate] = useState<StarRate[]>([]);

 useEffect(() => {
  const fetchReviews = async () => {
    try {
      const data = await productService.getProductReviews(productId);

      if (data.status === "success") {
        setReviews(data.data);
        setAverageRate(data.rate);
        setStarRate(data.star_rate);
      }
    } catch (error) {
      console.error("Error loading reviews", error);
    }
  };

  fetchReviews();
}, [productId]);


  const renderStars = (rate: number, className = "") => {
    return (
      <div className={`flex ${className}`}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < rate ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.966a1 1 0 00-.363-1.118L2.075 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="mb-16 grid min-h-96 grid-cols-1 gap-6 rounded-2xl border p-6 sm:grid-cols-2">
      {/* Left side: rating summary */}
      <div className="mb-6 h-[282px] flex flex-col space-y-4">
        <div className="text-center my-8">
          <div className="text-2xl font-bold text-gray-900">{averageRate}</div>
          {renderStars(averageRate, "justify-center")}
        </div>

        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const star = starRate.find((s) => s.key === `star_${rating}`);
            return (
              <div key={rating} className="mb-1 flex items-center space-x-2">
                <span className="w-2 text-sm text-gray-600">{rating}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-yellow-400"
                    style={{ width: `${star?.value || 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side: review list */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex items-start space-x-3 border-t border-gray-300 pt-4">
            <Image
              src={review.user?.avatar}
              alt={review.user?.full_name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
           
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between">
                <h4 className="font-medium text-gray-900">
                  {review.user?.full_name}
                </h4>
                <span className="text-sm text-gray-500">
                  {review.created_at}
                </span>
              </div>
              {renderStars(review.rate, "mb-2")}
              <p className="text-sm line-clamp-3 text-gray-600">{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductReview;
