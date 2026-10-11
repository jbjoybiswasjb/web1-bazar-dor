import Marquee from "@/components/Marquee";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div className="mt-2 border-y-2 py-3 border-mist-100 max-w-11/12 md:max-w-10/12 mx-auto">লোডিং হচ্ছে...</div>}>
        <Marquee></Marquee>
      </Suspense>


    </div>
  );
}
