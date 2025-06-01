"use client";
import { useState } from 'react';
import { items } from "@/app/[locale]/(home)/page";
import Card from "./shared/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const categories = [
  'All',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Mexican',
  'Italian',
  'Desserts',
  'Drinks',
];

const Menu: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // إعادة تعيين الصفحة عند تغيير الفئة
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage > 2) pages.push(1);
      if (currentPage > 3) pages.push("...");

      for (
        let i = Math.max(1, currentPage - 1);
        i <= Math.min(totalPages, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      if (currentPage < totalPages - 1) pages.push(totalPages);
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          className={`px-4 py-2 rounded-full transition ${
            page === currentPage
              ? "bg-primary text-white"
              : "bg-primary/20 text-gray-700 hover:bg-primary/90 hover:text-white"
          }`}
        >
          {page}
        </button>
      ) : (
        <span key={index} className="px-2 py-2 text-gray-500">
          ...
        </span>
      )
    );
  };

  return (
    <div className="min-h-screen p-4 col-span-3">
      {/* Categories */}
      <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide whitespace-nowrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-4 py-2 rounded-full ${
              category === selectedCategory
                ? 'bg-primary text-white'
                : 'bg-primary/20 text-gray-700'
            } hover:bg-primary/80 hover:text-white transition`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center gap-3">
        {currentItems.map((item, index) => (
          <Card key={index} item={item} width="full" />
        ))}
      </div>

      {/* Smart Pagination */}
      <div className="flex justify-center mt-6 space-x-2 flex-wrap items-center">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-full ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-primary/80 hover:text-white"
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-primary/80 hover:text-white"
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Menu;
