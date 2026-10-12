
import Link from "next/link";

interface EmptyCategoryProps {
  title?: string;
  description?: string;
}

export default function EmptyCategory({
  title = "কোনো পণ্য পাওয়া যায়নি",
  description = "এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।",
}: EmptyCategoryProps) {
  return (
    <section className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-4xl">
        🛒
      </div>

      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}
