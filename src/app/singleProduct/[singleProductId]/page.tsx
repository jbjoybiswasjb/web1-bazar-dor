import Link from "next/link";
import { Suspense } from "react";

// 1. Define TypeScript interfaces matching your exact API payload structure
interface MarketData {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface ProductDetailsData {
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
    markets: MarketData[];
}

interface PriceSummaryCardProps {
    title: string;
    price: number;
    description: string;
    color: "green" | "red";
}

// 2. Separate Data Fetching Engine (Runs safely on the server side)
async function getProductData(productId: string | number): Promise<ProductDetailsData | null> {
    try {
        const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${productId}`, {
            next: { revalidate: 60 }, // Cache data for 60 seconds
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error fetching product data:", error);
        return null;
    }
}






// 3. Sub-Component: Individual Price Summary Card
function PriceSummaryCard({ title, price, description, color }: PriceSummaryCardProps) {
    return (
        <div className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
            <p className="text-sm text-gray-600">{title}</p>

            <p className={`mt-2 text-2xl font-bold ${color === "red" ? "text-red-600" : "text-green-700"}`}>
                {price.toLocaleString("bn-BD", { maximumFractionDigits: 2 })}{" "}
                <span className="text-sm font-medium text-gray-500">টাকা</span>
            </p>

            <p className="mt-2 text-xs text-gray-500">{description}</p>
        </div>
    );
}





// 4. Main Dynamic Wrapper Component
async function ProductContent({
    paramsPromise
}: {
    paramsPromise: Promise<{ singleProductId: string }>
}) {
    //  Unwrap the promise safely inside the Suspense boundary here
    const resolvedParams = await paramsPromise;

    // Note: The key name must match your folder name '[singleProductId]' exactly
    const productId = resolvedParams?.singleProductId;

    const data = await getProductData(productId);

    // Fallback UI if the API is down or product is missing
    if (!data) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-12 text-center text-gray-500">
                <p className="text-lg font-medium">পণ্যের তথ্য খুঁজে পাওয়া যায়নি।</p>
                <Link href="/" className="mt-4 inline-block text-green-700 hover:underline">
                    ← বাজারে ফিরে যান
                </Link>
            </div>
        );
    }

    // Extract computational values securely from the API payload arrays
    const minPrices = data.markets?.map((m) => m.min) || [];
    const maxPrices = data.markets?.map((m) => m.max) || [];

    const minPrice = minPrices.length > 0 ? Math.min(...minPrices) : data.today;
    const maxPrice = maxPrices.length > 0 ? Math.max(...maxPrices) : data.today;

    const avgPriceCalculated =
        data.markets?.length > 0
            ? data.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / data.markets.length
            : data.today;

    const formatPrice = (price: number) =>
        `${price.toLocaleString("bn-BD", { maximumFractionDigits: 2 })} টাকা`;

    // Localize unit keywords seamlessly
    const unitText = data.unit === "kg" ? "কেজি" : data.unit;

    return (
        <main className="mx-auto max-w-11/12 md:max-w-10/12 space-y-5 px-0 py-6">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-green-700">
                    হোম
                </Link>
                <span>›</span>
                <span>{data.categoryNameBn}</span>
                <span>›</span>
                <span className="font-medium text-gray-700">{data.nameBn}</span>
            </nav>

            {/* Product Summary Header Card */}
            <section className="flex flex-col justify-between gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:p-7 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-50 text-4xl sm:h-20 sm:w-20 shadow-inner">
                        {data.image}
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">{data.nameBn}</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            প্রতি {unitText} · {data.categoryNameBn}
                        </p>

                        <p className="mt-2 text-sm text-gray-600">
                            গতকালের তুলনায় আজকের দামে{" "}
                            <span
                                className={
                                    data.change?.dir === "up"
                                        ? "font-semibold text-red-600"
                                        : data.change?.dir === "down"
                                            ? "font-semibold text-green-700"
                                            : "font-semibold text-gray-600"
                                }
                            >
                                {data.change?.dir === "up"
                                    ? "বৃদ্ধি"
                                    : data.change?.dir === "down"
                                        ? "কমেছে"
                                        : "পরিবর্তন নেই"}{" "}
                                {Math.abs(data.change?.pct || 0).toLocaleString("bn-BD")}%
                            </span>
                        </p>
                    </div>
                </div>

                <div className="min-w-32 rounded-xl bg-green-50 px-6 py-4 text-center border border-green-100">
                    <p className="text-sm text-gray-600">আজকের দাম</p>
                    <p className="mt-1 text-3xl font-bold text-gray-900">
                        {data.today.toLocaleString("bn-BD")}
                    </p>
                    <p className="text-sm text-gray-500">টাকা / {unitText}</p>
                    <p
                        className={`mt-2 text-xs font-semibold ${data.change?.dir === "up"
                            ? "text-red-600"
                            : data.change?.dir === "down"
                                ? "text-green-700"
                                : "text-gray-500"
                            }`}
                    >
                        {data.change?.dir === "up" ? "▲" : data.change?.dir === "down" ? "▼" : "—"}{" "}
                        {Math.abs(data.change?.pct || 0).toLocaleString("bn-BD")}%
                    </p>
                </div>
            </section>

            {/* Price Cards Summary Section Matrix Grid */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <PriceSummaryCard
                        title="সর্বনিম্ন দাম"
                        price={minPrice}
                        description="সবচেয়ে কম দামের বাজার"
                        color="green"
                    />
                    <PriceSummaryCard
                        title="সর্বাধিক দাম"
                        price={maxPrice}
                        description="সবচেয়ে বেশি দামের বাজার"
                        color="red"
                    />
                    <PriceSummaryCard
                        title="গড় দাম"
                        price={avgPriceCalculated}
                        description={`প্রতি ${unitText}-এর গড় হিসেবে`}
                        color="green"
                    />
                </div>

                {/* Market-wise Data Breakdown Table Grid */}
                <h2 className="mt-7 text-lg font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>

                {!data.markets || data.markets.length === 0 ? (
                    <p className="mt-4 rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-500 border border-dashed">
                        বর্তমানে কোনো বাজারের দামের তথ্য পাওয়া যায়নি।
                    </p>
                ) : (
                    <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                        <table className="w-full min-w-[650px] border-collapse text-right text-sm">
                            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-4 font-semibold text-right">বাজার</th>
                                    <th className="px-4 py-4 font-semibold text-right">বিভাগ</th>
                                    <th className="px-4 py-4 text-right font-semibold">সর্বনিম্ন</th>
                                    <th className="px-4 py-4 text-right font-semibold">সর্বাধিক</th>
                                    <th className="px-4 py-4 text-right font-semibold">গড়</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.markets.map((market, index) => (
                                    <tr
                                        key={`${market.market}-${market.division}-${index}`}
                                        className="border-t border-gray-200 even:bg-gray-50/40 hover:bg-green-50/40 transition-colors"
                                    >
                                        <td className="px-4 py-4 text-right font-medium text-gray-900">
                                            {market.market}
                                        </td>
                                        <td className="px-4 py-4 text-right text-gray-600">
                                            {market.division}
                                        </td>
                                        <td className="px-4 py-4 text-right text-gray-700">
                                            {formatPrice(market.min)}
                                        </td>
                                        <td className="px-4 py-4 text-right text-gray-700">
                                            {formatPrice(market.max)}
                                        </td>
                                        <td className="px-4 py-4 text-right font-semibold text-gray-900">
                                            {formatPrice((market.min + market.max) / 2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {/* Actions Action Links Layout Block */}
            <div className="flex justify-end pt-2">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 transition-all"
                >
                    ← বাজারে ফিরে যান
                </Link>
            </div>
        </main>
    );
}




export default function ProductDetailsPage({
    params
}: {
    params: Promise<{ singleProductId: string }> // Changed 'id' to match your folder '[singleProductId]'
}) {
    return (
        <div className="bg-teal-50/30 min-h-screen py-4">
            <Suspense
                fallback={
                    <div className="text-center py-24 text-gray-500 font-medium animate-pulse">
                        পণ্যের বিস্তারিত তথ্য লোড করা হচ্ছে...
                    </div>
                }
            >
                {/*  Pass the raw params promise straight down into the child wrapper */}
                <ProductContent paramsPromise={params} />
            </Suspense>
        </div>
    );
}
