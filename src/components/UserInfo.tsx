"use client"

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {

    const { data: sessionData } = authClient.useSession()
    const user = sessionData?.user;


    const handleSignOut = async() => {
        await authClient.signOut();
    }

    return (
        <div>
            {
                user ?
                    <div>
                        <div className="flex gap-2">
                            <div className="dropdown dropdown-end flex gap-2">
                                <div>
                                    <div className="w-12 rounded-full">
                                        <img className={user?.image as string}/>
                                    </div>
                                </div>
                                <h2 tabIndex={0} role="button" className="text-bold text-2xl btn btn-ghost">{user?.name} ⬇</h2>
                                <ul
                                    tabIndex={-1}
                                    className="menu menu-sm dropdown-content bg-base-100 z-1 mt-3 w-52 p-2 shadow">
                                    <div className="mb-2">
                                        <h2 className="text-bold text-2xl">{user?.name}</h2>
                                        <p>{user?.email}</p>
                                    </div>
                                    <li><a className="text-lg">👤 আমার প্রোফাইল</a></li>
                                    <li><button onClick={handleSignOut} className="text-lg">↩ সাইন আউট</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex gap-2">
                        <Link href={"/signin"} className="btn btn-ghost">সাইন ইন</Link>
                        <Link href={"/signup"} className="btn btn-success">সাইন আপ</Link>
                    </div>
            }
        </div>
    );
};

export default UserInfo;