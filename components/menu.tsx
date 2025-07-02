"use client";

import { useEffect, useState } from "react";
import { useMenuFilterStore } from "@/stores/menuFilterStore";

import Card from "./cards/Card";
import { Product } from "@/utils/menuTypes";
import { useLikedStore } from "@/stores/likedStore";
import Pagination from "./Pagination"; // استورد Pagination الجديد

const ITEMS_PER_PAGE = 6;

const Menu = ({
  items,
  offer,
}: {
  items: Product[];
  offer?: boolean | false;
}) => {
  const { mainCategory, subCategory, search } = useMenuFilterStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState<Product[]>(items);
  const { fetchLikedItems } = useLikedStore();

  useEffect(() => {
    let result = [...items];
    // if (mainCategory) {
    //   result = result.filter(
    //     (item) => item.category?.toLowerCase() === mainCategory.toLowerCase(),
    //   );
    // }
    // if (subCategory) {
    //   result = result.filter(
    //     (item) =>
    //       item.sub_category?.toLowerCase() === subCategory.toLowerCase(),
    //   );
    // }

    if (search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    fetchLikedItems();
    setFilteredItems(result);
    setCurrentPage(1); 
  }, [items, mainCategory, subCategory, search, fetchLikedItems]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="col-span-3 space-y-8 w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 w-full content-baseline place-items-center">
        {currentItems.map((item) => (
          <Card key={item.id} item={item} width="full" offer={offer} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          meta={{ current_page: currentPage, last_page: totalPages }}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Menu;
