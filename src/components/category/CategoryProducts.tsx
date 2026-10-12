"use client";

import { useState, useMemo } from "react";
import ProductCard from "../ProductCard";
import SortDropdown, { SortOption } from "./sortdropDown"; // Verify import path

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface CategoryProductsProps {
  products: Product[];
}

export default function CategoryProducts({ products }: CategoryProductsProps) {
  // 1. Manage state for current sort sorting choice
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // 2. Perform safe sorted compute steps using React useMemo
  const sortedProducts = useMemo(() => {
    const sortedList = [...products];

    if (sortBy === "price-asc") {
      return sortedList.sort((a, b) => a.today - b.today);
    }
    if (sortBy === "price-desc") {
      return sortedList.sort((a, b) => b.today - a.today);
    }
    
    return sortedList; // Returns fallback API index ordering on 'default'
  }, [products, sortBy]);

  return (
    <div className="w-full space-y-6">
      {/* 3. Dropdown aligned clean to the right side layout block */}
      <div className="flex w-full items-center justify-end border-b border-gray-200 border-2 mb-5 p-5 rounded-2xl bg-white">
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {/* 4. Display sorted array map elements safely */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}