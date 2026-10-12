import ProductCard from "./ProductCard";

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

interface FallingProductsProps {
    products: Product[];
}

export default function FallingProducts({ products }: FallingProductsProps) {
    // 1. Structural defense for build/prerender pipelines
    if (!products || !Array.isArray(products)) {
        return null;
    }

    // 2. Extracts only products going "down", sorted by the largest price drop percentage
    const falling = [...products]
        .filter((product) => product.change.dir === "down" && product.change.pct < 0)
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, 6);

    // 3. Prevent rendering empty grid sections if no market drops occurred today
    if (falling.length === 0) {
        return null;
    }

    return (
        <section className="py-10">
            <h2 className="text-2xl font-bold">
               <span className="text-green-600 dark:text-green-500">▼</span> আজ দাম কমেছে
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {falling.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}