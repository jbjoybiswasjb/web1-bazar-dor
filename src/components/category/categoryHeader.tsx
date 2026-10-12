interface CategoryHeaderProps {
  name: string;
  icon?: string;
  productCount?: number;
}

export default function CategoryHeader({
  name,
  icon = "🛒",
  productCount,
}: CategoryHeaderProps) {
  // 1. Translation dictionary map for category slugs to Bengali labels
  const banglaNameMap: Record<string, string> = {
    chal: "চাল",
    mach: "মাছ",
    mangsho: "মাংস",
    sobji: "সবজি",
    fol: "ফল",
    dal: "ডাল",
    tel: "তেল",
    mosla: "মসলা",
    "dim-dui": "ডিম-দুধ",
  };

  // 2. Fallback gracefully to the original string if the slug isn't found in the map
  const displayNameBn = banglaNameMap[name.toLowerCase()] ?? name;

  return (
    <section className="rounded-2xl border border-gray-200 p-6 sm:p-8 bg-white dark:bg-zinc-900 dark:border-zinc-800">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-zinc-800 text-4xl shadow-sm border border-gray-100 dark:border-zinc-700">
          {icon}
        </div>

        <div>
          {/* 3. Rendered the converted Bengali Name */}
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-zinc-100 sm:text-3xl">
            {displayNameBn}
          </h1>

          {productCount !== undefined && (
            <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
              {productCount} টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          )}
        </div>
      </div>
    </section>
  );
}