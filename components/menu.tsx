"use client";

import { useEffect, useState } from "react";
import { useMenuFilterStore } from "@/stores/menuFilterStore";
import Link from "next/link";
import Card from "./shared/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/utils/menuTypes";
import { useLikedStore } from "@/stores/likedStore";

const ITEMS_PER_PAGE = 6;


const Menu = ({ items }: { items: Product[] }) => {
  const { mainCategory, subCategory, search } = useMenuFilterStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState<Product[]>(items);
  const { fetchLikedItems } = useLikedStore();
  useEffect(() => {
    let result = [...items];

    if (mainCategory) {
      result = result.filter(
        (item) => item.category?.toLowerCase() === mainCategory.toLowerCase()
      );
    }

    if (subCategory) {
      result = result.filter(
        (item) => item.sub_category?.toLowerCase() === subCategory.toLowerCase()
      );
    }

    if (search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    fetchLikedItems();
    setFilteredItems(result);
  }, [items, mainCategory, subCategory, search,fetchLikedItems]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  return (
    <div className="col-span-3 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((item) => (
          // <Link key={item.id} href={`/product/${item.slug}?lat=${item.lat || 0}&lng=${item.lng || 0}`}>
            <Card key={item.id} item={item} width="full" />
          //</Link> 
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
          <ChevronLeft />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Menu;
