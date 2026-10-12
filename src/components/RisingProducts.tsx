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


export default function RisingProducts({
    products,
}: {
    products: Product[];
}) {
    const rising = [...products]
        .filter((product) => product.change.dir === "up" && product.change.pct > 0)
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    return (
        <section className="py-10">
            <h2 className="text-2xl font-bold">
                <span className="text-red-600 dark:text-red-500">▲ </span>আজ দাম বেড়েছে
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rising.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}