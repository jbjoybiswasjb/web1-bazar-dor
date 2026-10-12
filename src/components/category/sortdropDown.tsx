"use client";

export type SortOption = "default" | "price-asc" | "price-desc";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    // Elements aligned to the right side using flex positioning classes
    <div className="border-white flex items-center justify-end gap-3 ml-auto w-full sm:w-auto">
      <label
        htmlFor="product-sort"
        className="shrink-0 text-sm font-medium text-gray-600"
      >
        সাজান:
      </label>

      <select
        id="product-sort"
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="w-full sm:w-48 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
      </select>
    </div>
  );
}