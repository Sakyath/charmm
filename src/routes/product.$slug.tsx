import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Heart, ChevronLeft } from "lucide-react";
import { productBySlug, products, formatPrice } from "@/data/products";
import { createWhatsAppOrderLink } from "@/lib/whatsapp";
import { useWishlist } from "@/hooks/use-wishlist";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const p = productBySlug(params.slug);
    return {
      title: p ? `${p.name} — Charmelle` : "Charmelle",
      meta: [
        { name: "description", content: p?.description ?? "Handmade charm jewellery by Charmelle." },
        { property: "og:title", content: p ? `${p.name} — Charmelle` : "Charmelle" },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: ProductComponent,
});

function ProductComponent() {
  const { slug } = Route.useParams();
  const product = productBySlug(slug);
  const { has, toggle } = useWishlist();
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="px-5 py-32 text-center">
        <h1 className="display-lg text-espresso">Piece not found.</h1>
        <Link to="/shop" className="mt-6 inline-block hairline-link font-sans text-[0.62rem] uppercase tracking-[0.3em] text-espresso">
          Back to shop
        </Link>
      </div>
    );
  }

  const wished = has(product.slug);
  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 4);
  const img = product.images[0] ?? "";

  return (
    <div>
      <div className="px-5 pt-8 md:px-10">
        <button onClick={() => navigate({ to: "/shop" })} className="flex items-center gap-2 font-sans text-[0.6rem] uppercase tracking-[0.25em] text-stone hover:text-espresso">
          <ChevronLeft className="h-4 w-4" strokeWidth={1.3} /> Back to shop
        </button>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-10 md:grid-cols-2 md:px-10 md:py-16 md:gap-16">
        <div>
          <div className="overflow-hidden bg-cream">
            <img src={img} alt={product.alt} className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="eyebrow text-gold">{product.category}</p>
          <h1 className="display-lg mt-4 text-espresso">{product.name}</h1>
          <p className="mt-3 font-sans text-xl font-light text-wood">{formatPrice(product.price)}</p>
          <p className="mt-6 body-lg text-stone">{product.description}</p>

          <ul className="mt-8 space-y-2">
            {product.details.map((d) => (
              <li key={d} className="flex items-center gap-3 font-sans text-[0.78rem] font-light text-wood">
                <span className="h-1 w-1 rounded-full bg-gold" /> {d}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex gap-3">
            <a href={createWhatsAppOrderLink(product)} target="_blank" rel="noreferrer" className="flex-1 bg-espresso py-4 text-center font-sans text-[0.65rem] uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-charcoal">
              Order Now
            </a>
            <button onClick={() => toggle(product.slug)} aria-pressed={wished} className="border border-espresso/20 px-5 transition-colors hover:bg-cream">
              <Heart className={`h-5 w-5 ${wished ? "fill-gold text-gold" : "text-espresso"}`} strokeWidth={1.2} />
            </button>
          </div>

          {product.customisable && (
            <p className="mt-5 script text-xl text-gold">Made to order — just for you.</p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-cream px-5 py-20 md:px-10 md:py-24">
          <Reveal className="text-center">
            <p className="eyebrow text-gold">You may also love</p>
            <h2 className="display-md mt-4 text-espresso">MORE TO WEAR.</h2>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-[1400px] grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-x-8">
            {related.map((p) => (
              <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} className="group block">
                <div className="overflow-hidden bg-ivory">
                  <img src={p.images[0] ?? ""} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]" />
                </div>
                <h3 className="mt-3 font-display text-base text-espresso">{p.name}</h3>
                <p className="font-sans text-sm font-light text-wood">{formatPrice(p.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
