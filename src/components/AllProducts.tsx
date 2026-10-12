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

export default function AllProducts({
    products,
}: {
    products: Product[];
}) {
    return (
        <section
            id="সব-পণ্য"
            className="scroll-mt-32 py-10"
        >
            <div>
                <h2 className="text-2xl font-bold">
                    সব পণ্য
                </h2>

                <p className="mt-2 text-default-500">
                    আপনার প্রয়োজনীয় সব পণ্যের আজকের দাম। এখানে {new Intl.NumberFormat('bn-BD').format(products.length)} টি পণ্য দেখানো হচ্ছে।
                </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}