import { useMemo, useState } from "react";
import { CATEGORIES, products, type Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { QuickView } from "@/components/QuickView";

type SortOption = "featured" | "low-high" | "high-low" | "newest";

type Props = {
  query?: string;
};

export function ProductGrid({ query }: Props) {
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<SortOption>("featured");
  const [quickView, setQuickView] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let result = [...products];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
      );
    }
    if (category !== "All") result = result.filter((p) => p.category === category);
    switch (sort) {
      case "low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.collections.includes("new") ? 1 : 0) - (a.collections.includes("new") ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [category, sort, query]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`font-sans text-[0.62rem] uppercase tracking-[0.25em] transition-colors ${
                category === cat ? "text-espresso" : "text-stone hover:text-wood"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="border border-espresso/15 bg-transparent px-3 py-2 font-sans text-[0.62rem] uppercase tracking-[0.2em] text-espresso focus:outline-none"
          aria-label="Sort products"
        >
          <option value="featured">Featured</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center font-sans text-sm font-light text-stone">No pieces found. Try a different search.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} onQuickView={setQuickView} />
          ))}
        </div>
      )}

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
