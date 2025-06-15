"use client";

import { useMenuFilterStore } from "@/stores/menuFilterStore";
import React from "react";

type SubCategory = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
  subCategories?: SubCategory[];
};

interface FilterProps {
  categories: Category[];
}

const Filter: React.FC<FilterProps> = ({ categories }) => {
  const {
    mainCategory,
    subCategory,
    setMainCategory,
    setSubCategory,
  } = useMenuFilterStore();

  const handleMainCategory = (name: string) => {
    setMainCategory(name);
    setSubCategory(""); // Reset subcategory when changing main category
  };

  const handleSubCategory = (name: string) => {
    setSubCategory(name);
  };
console.log(categories)
  return (
    <div className="col-span-1 pr-6 border-r space-y-6">
      <h3 className="text-xl font-semibold">Categories</h3>

    {Array.isArray(categories) && categories.map((cat,index) => (
  <div key={index} className="space-y-2">
    <button
      onClick={() => handleMainCategory(cat.name)}
      className={`font-bold transition ${
        mainCategory === cat.name ? "text-primary" : "text-gray-700"
      }`}
    >
      {cat.name}
    </button>

    {mainCategory === cat.name && cat.subCategories && (
      <div className="ml-4 space-y-1">
        {cat.subCategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => handleSubCategory(sub.name)}
            className={`block text-sm transition ${
              subCategory === sub.name ? "text-primary" : "text-gray-500"
            } hover:text-primary`}
          >
            {sub.name}
          </button>
        ))}
      </div>
    )}
  </div>
))}

    </div>
  );
};

export default Filter;
