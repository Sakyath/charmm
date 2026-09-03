import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/shop")({
  head: () => ({
    title: "Shop All — Charmelle Handmade Charm Jewellery",
    meta: [
      { name: "description", content: "Shop handmade charm bracelets, beaded bracelets and necklaces. Order on WhatsApp." },
      { property: "og:title", content: "Shop — Charmelle" },
      { property: "og:type", content: "website" },
    ],
  }),
  validateSearch: z.object({ q: z.string().optional() }).parse,
  component: ShopComponent,
});

function ShopComponent() {
  const search = Route.useSearch();
  const q = search.q ?? "";
  return (
    <div className="px-5 py-16 md:px-10 md:py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-gold">The collection</p>
        <h1 className="display-lg mt-6 text-espresso">ALL PIECES.</h1>
        {q ? <p className="body-lg mt-4 text-stone">Results for “{q}”.</p> : null}
      </Reveal>
      <div className="mx-auto mt-14 max-w-[1500px]">
        <ProductGrid query={q} />
      </div>
    </div>
  );
}
