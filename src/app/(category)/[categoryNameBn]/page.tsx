import { Suspense } from "react";
import CategoryHeader from "@/components/category/categoryHeader";
import CategoryProducts from "@/components/category/CategoryProducts";
import EmptyCategory from "@/components/category/EmptyCategory";

interface CategoryPageProps {
  params: Promise<{
    categoryNameBn: string; // This holds the URL slug value (e.g., "chal")
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

  return (
    <>
      {/* Passing ONLY the products array down here */}
      <CategoryHeader products={products} />

      <section id="category-products" className="mt-8">
        <div className="mb-6 flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-bold">সকল পণ্য</h2>
            <p className="mt-1 text-sm text-gray-500">
              এই ক্যাটাগরির পণ্যের দাম দেখুন।
            </p>
          </div>

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