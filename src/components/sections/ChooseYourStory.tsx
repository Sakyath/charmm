import { Link } from "@tanstack/react-router";
import { products, formatPrice } from "@/data/products";
import { Reveal } from "@/components/Reveal";

export function ChooseYourStory() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  return (
    <section className="bg-ivory px-5 py-24 md:px-10 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-gold">The collection</p>
        <h2 className="display-lg mt-6 text-espresso">CHOOSE YOUR STORY.</h2>
        <p className="body-lg mt-6 text-stone">A few of our favourite pieces. Each one made by hand.</p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-[1400px] grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-4 md:gap-x-8">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 100}>
            <Link to="/product/$slug" params={{ slug: p.slug }} className="group block">
              <div className="overflow-hidden bg-cream">
                <img src={p.images[0] ?? ""} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]" />
              </div>
              <h3 className="mt-4 font-display text-lg text-espresso">{p.name}</h3>
              <p className="mt-1 font-sans text-sm font-light text-wood">{formatPrice(p.price)}</p>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link to="/shop" className="hairline-link font-sans text-[0.62rem] uppercase tracking-[0.3em] text-espresso">
          View all pieces
        </Link>
      </div>
    </section>
  );
}
