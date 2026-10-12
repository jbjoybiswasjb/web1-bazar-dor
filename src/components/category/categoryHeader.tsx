"use client";

// Reusing your application's defined Product structure
interface Product {
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

interface CategoryHeaderProps {
    products: Product[];
}

export default function CategoryHeader({ products }: CategoryHeaderProps) {
    // 1. Check if products exist to safely capture values
    const hasProducts = products && products.length > 0;
    
    // 2. Extract values dynamically or provide safe fallback alternatives
    const categoryNameBn = hasProducts ? products[0].categoryNameBn : "ক্যাটাগরি";
    const categoryIcon = hasProducts ? products[0].categoryIcon : "🛒";
    const productCount = products ? products.length : 0;

    return (
        <section className="rounded-2xl border border-gray-200 p-6 sm:p-8 bg-white">
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">
                    {categoryIcon}
                </div>

                <div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                        {categoryNameBn}
                    </h1>

                    {hasProducts && (
                        <p className="mt-2 text-sm text-gray-500">
                            {productCount} টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}