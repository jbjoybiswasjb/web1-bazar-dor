"use client"

import Image from "next/image";
import Link from "next/link";
import bannerImage from "../../public/bazar-hero.png";
import { useEffect, useState } from "react";

export default function Hero() {


    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        queueMicrotask(() => {
            setIsMounted(true);
        });
    }, []);

    const formattedDate = isMounted
        ? new Date().toLocaleDateString("bn-BD", { dateStyle: "full" })
        : '';


    return (
        <section className="bg-white rounded-4xl">
            <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2">

                <div>
                    <p className="inline text-sm font-semibold bg-success/20 p-3 text-green-600 rounded-4xl ">
                        {formattedDate || 'তারিখ লোড হচ্ছে...'}
                    </p>

                    <h2 className="text-xl mt-6 font-bold leading-tight md:text-5xl">
                        আজকের বাজারের দাম, এক নজরে।
                    </h2>

                    <p className="mt-5 max-w-lg text-default-500">
                        আপনার প্রয়োজনীয় পণ্যের সর্বশেষ বাজার মূল্য
                        সহজেই দেখে নিন।
                    </p>

                    <Link
                        href="#সব-পণ্য"
                        className="mt-7 inline-flex rounded-xl bg-success px-6 py-3 font-semibold text-white"
                    >
                        সব পণ্য দেখুন
                    </Link>
                </div>

                <div>
                    <Image
                        src={bannerImage}
                        alt="Bazar Dor"
                        width={600}
                        height={500}
                        className="w-full"
                    />
                </div>

            </div>
        </section>
    );
}