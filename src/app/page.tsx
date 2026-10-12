import AllProducts from "@/components/AllProducts";
import FallingProducts from "@/components/FallingProducts";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import RisingProducts from "@/components/RisingProducts";
import { Suspense } from "react";

// The fetch function now validates that the response is actually JSON before parsing
async function getProducts() {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
      next: { revalidate: 60 },
      headers: {
        "Accept": "application/json"
      }
    });

    if (!res.ok) {
      console.error(`API status error: ${res.status}`);
      return [];
    }

    // 1. Verify the content type header to prevent parsing HTML error pages
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("API Error: Did not receive JSON. Received:", contentType);
      return []; // Returns empty array to prevent Prerender from crashing
    }

    // 2. Safe parse wrapper
    return await res.json();
  } catch (error) {
    console.error("Network or parsing error inside getProducts:", error);
    return []; // Graceful fallback
  }
}

async function RisingProductsWrapper() {
  const products = await getProducts();
  return <RisingProducts products={products} />;
}

async function FallingProductsWrapper() {
  const products = await getProducts();
  return <FallingProducts products={products} />;
}

async function  AllProductsWrapper() {
  const products = await getProducts();
  return <AllProducts products={products} />;
}

export default async function Home() {
  return (
    <div className="bg-teal-50">
      <Suspense fallback={<div className="border-y-2 py-3 border-mist-100 max-w-11/12 md:max-w-10/12 mx-auto">লোডিং হচ্ছে...</div>}>
        <Marquee />
      </Suspense>

      <div className="py-6 max-w-11/12 md:max-w-10/12 mx-auto">
        <div>
          <Hero />
        </div>

        <div>
          <Suspense fallback={<div className="mt-2 border-y-2 py-3 border-mist-100 max-w-11/12 md:max-w-10/12 mx-auto">লোডিং হচ্ছে...</div>}>
            <RisingProductsWrapper />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<div className="mt-2 border-y-2 py-3 border-mist-100 max-w-11/12 md:max-w-10/12 mx-auto">লোডিং হচ্ছে...</div>}>
            <FallingProductsWrapper />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<div className="mt-2 border-y-2 py-3 border-mist-100 max-w-11/12 md:max-w-10/12 mx-auto">লোডিং হচ্ছে...</div>}>
            <AllProductsWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}