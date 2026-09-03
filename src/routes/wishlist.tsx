import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { useWishlist } from "@/hooks/use-wishlist";
import { createWhatsAppInquiryLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    title: "Wishlist — Charmelle",
    meta: [
      { name: "description", content: "Your saved Charmelle pieces." },
      { property: "og:title", content: "Wishlist — Charmelle" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: WishlistComponent,
});

function WishlistComponent() {
  const { items, toggle } = useWishlist();
  const saved = products.filter((p) => items.includes(p.slug));

  return (
    <section className="bg-ivory px-5 py-16 md:px-10 md:py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-gold">Saved</p>
        <h1 className="display-lg mt-6 text-espresso">YOUR WISHLIST.</h1>
      </Reveal>

      {saved.length === 0 ? (
        <div className="mx-auto mt-16 max-w-md text-center">
          <Heart className="mx-auto h-10 w-10 text-stone/40" strokeWidth={1} />
          <p className="mt-6 font-sans text-sm font-light text-stone">No saved pieces yet. Tap the heart on any piece to keep it here.</p>
          <Link to="/shop" className="mt-8 inline-block hairline-link font-sans text-[0.62rem] uppercase tracking-[0.3em] text-espresso">
            Browse the collection
          </Link>
        </div>
      ) : (
        <>
          <div className="mx-auto mt-14 grid max-w-[1400px] grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
            {saved.map((p) => (
              <div key={p.slug} className="group">
                <div className="relative overflow-hidden bg-cream">
                  <Link to="/product/$slug" params={{ slug: p.slug }}>
                    <img src={p.images[0] ?? ""} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                  </Link>
                  <button onClick={() => toggle(p.slug)} aria-label={`Remove ${p.name}`} className="absolute right-3 top-3 rounded-full bg-ivory/80 p-2 backdrop-blur-sm">
                    <Heart className="h-4 w-4 fill-gold text-gold" strokeWidth={1.2} />
                  </button>
                </div>
                <h3 className="mt-4 font-display text-lg text-espresso">{p.name}</h3>
                <p className="font-sans text-sm font-light text-wood">{formatPrice(p.price)}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <a href={createWhatsAppInquiryLink("I'd like to order a few pieces from my wishlist.")} target="_blank" rel="noreferrer" className="inline-block bg-espresso px-9 py-4 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-ivory">
              Enquire on WhatsApp
            </a>
          </div>
        </>
      )}
    </section>
  );
}
