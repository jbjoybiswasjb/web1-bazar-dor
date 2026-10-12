"user client"

import { Suspense } from "react";
import CategoryHeader from "@/components/category/categoryHeader";
import CategoryProducts, { Product } from "@/components/category/CategoryProducts";
import EmptyCategory from "@/components/category/EmptyCategory";

interface CategoryPageProps {
  params: Promise<{
    categoryNameBn: string;
  }>;
}

// 1. Helper function handles the data isolation safely on the server
async function fetchCategoryData(categoryNameBn: string) {
  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(categoryNameBn)}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return { products: [], hasError: true };

    const data = await res.json();
    const productsList = Array.isArray(data)
      ? data
      : Array.isArray(data.products)
        ? data.products
        : Array.isArray(data.data)
          ? data.data
          : [];

    return { products: productsList, hasError: false };
  } catch {
    return { products: [], hasError: true };
  }
}

// 2. DataChild component consumes the promise params inside Suspense safely
async function CategoryContentWrapper({ params }: CategoryPageProps) {
  const { categoryNameBn } = await params;
  const { products, hasError } = await fetchCategoryData(categoryNameBn);

  const categoryIcons: Record<string, string> = {
    chal: "🍚",
    mach: "🐟",
    mangsho: "🥩",
    sobji: "🥬",
    fol: "🍎",
  };

  const categoryIcon = categoryIcons[categoryNameBn] ?? "🛒";

  return (
    <>
      <CategoryHeader
        name={categoryNameBn}
        icon={categoryIcon}
        productCount={products.length}
      />

      <section id="category-products" className="mt-8">
        <div className="mb-6 flex flex-col gap-4">
          {!hasError && products.length > 0 && (
            <CategoryProducts products={products} />
          )}
        </div>

        {hasError ? (
          <EmptyCategory
            title="পণ্য লোড করা যায়নি"
            description="ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"
          />
        ) : products.length === 0 ? (
          <EmptyCategory
            title="কোনো পণ্য পাওয়া যায়নি"
            description="এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।"
          />
        ) : null}
      </section>
    </>
  );
}

// 3. Root layout handles streaming architecture flawlessly
export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <main className="bg-teal-50 min-h-screen py-8 max-w-11/12 md:max-w-10/12 mx-auto">
      <Suspense 
        fallback={
          <div className="text-center py-20 text-gray-500 font-medium">
            লোড করা হচ্ছে...
          </div>
        }
      >
        <CategoryContentWrapper params={params} />
      </Suspense>
    </main>
  );
}