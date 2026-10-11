import Link from "next/link";

interface MenuItem {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const NavLinks = async () => {

    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories")
    const data = await res.json()

    return (
        <div className="mt-2 border-y-2 py-3 border-mist-100">
            <nav className="max-w-11/12 md:max-w-10/12 mx-auto">
                <ul className="flex-wrap flex gap-5">
                    {
                        data.map((item: MenuItem) => (
                            <li key={item.id}>
                                <Link href={`/${item.slug}`}>
                                    {item.icon} {item.nameBn}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    );
};

export default NavLinks;