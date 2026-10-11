'use client';

import Image from "next/image";
import LogoImage from "../../public/logo-icon.png"
import { useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {

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
        <div className="mt-5 max-w-11/12 md:max-w-10/12 mx-auto">
            <div className="flex justify-between">
                <Link href="/">
                    <div className="flex gap-2 md:gap-5">
                        <div className="bg-green-700 flex justify-center items-center rounded-md text-black">
                            <Image className="w-14 h-8" height={18} width={18} src={LogoImage} alt="Logo Image"></Image>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">বাজার দর</h1>
                            <p>{formattedDate || 'তারিখ লোড হচ্ছে...'}</p>
                        </div>
                    </div>
                </Link>

                <div className="flex gap-2">
                    <button className="btn btn-ghost">সাইন ইন</button>
                    <button className="btn btn-success">সাইন আপ</button>
                </div>
            </div>
        </div>
    );
};

export default Header;