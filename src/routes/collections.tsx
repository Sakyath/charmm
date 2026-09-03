import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import { COLLECTIONS, products } from "@/data/products";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/collections")({
  head: () => ({
    title: "Collections — Charmelle",
    meta: [
      { name: "description", content: "Browse Charmelle collections — charm bracelets, beaded bracelets, necklaces and gifts." },
      { property: "og:title", content: "Collections — Charmelle" },
      { property: "og:type", content: "website" },
    ],
  }),
  validateSearch: z.object({ c: z.string().optional() }).parse,
  component: CollectionsComponent,
});

function CollectionsComponent() {
  const { c } = Route.useSearch();
  const keys = Object.keys(COLLECTIONS);
  const activeKey = c && c in COLLECTIONS ? c : keys[0]!;
  const active = COLLECTIONS[activeKey]!;
  const items = products.filter((p) => p.collections.includes(activeKey));

  return (
    <div className="px-5 py-16 md:px-10 md:py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-gold">Collections</p>
        <h1 className="display-lg mt-6 text-espresso">{active.name.toUpperCase()}.</h1>
        <p className="body-lg mt-4 text-stone">{active.blurb}</p>
      </Reveal>

      <div className="mx-auto mt-10 flex max-w-[1400px] flex-wrap justify-center gap-x-6">
        {keys.map((k) => (
          <Link
            key={k}
            to="/collections"
            search={{ c: k }}
            className={`font-sans text-[0.62rem] uppercase tracking-[0.25em] transition-colors ${k === activeKey ? "text-espresso" : "text-stone hover:text-wood"}`}
          >
            {COLLECTIONS[k]!.name}
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-14 grid max-w-[1400px] grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
        {items.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 100}>
            <Link to="/product/$slug" params={{ slug: p.slug }} className="group block">
              <div className="overflow-hidden bg-cream">
                <img src={p.images[0] ?? ""} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]" />
              </div>
              <h3 className="mt-4 font-display text-lg text-espresso">{p.name}</h3>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
