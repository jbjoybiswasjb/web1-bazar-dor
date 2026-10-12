"use client";

import { useRouter } from "next/navigation";
import PriceChangeBadge from "./PriceChangeBadge";
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string; // Used for the emoji icon
  today: number; // Represents the today price
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  return (
    <Link href={`/singleProduct/${product.id}`}
      className="w-full text-left bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-1 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden"
    >
      <div className="p-5">
        {/* 1. Mapped 'image' as emoji icon source */}
        <div className="mb-5 text-5xl">
          {product.image}
        </div>

        {/* 2. Mapped 'nameBn' for the Bengali Product Title */}
        <h3 className="font-semibold text-lg text-gray-900 dark:text-zinc-100">
          {product.nameBn}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
          প্রতি {product.unit}
        </p>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              আজকের দাম
            </p>
            {/* 3. Mapped 'today' for the numeric price amount */}
            <p className="text-xl font-bold text-gray-900 dark:text-zinc-100">
              ৳ {product.today} টাকা
            </p>
          </div>
          <PriceChangeBadge change={product.change} />
        </div>
      </div>
    </Link>
  );
}