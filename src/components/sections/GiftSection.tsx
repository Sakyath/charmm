import { Reveal } from "@/components/Reveal";
import { giftCategories } from "@/data/products";
import { GENERAL_WHATSAPP_LINK } from "@/lib/whatsapp";

export function GiftSection() {
  return (
    <section className="bg-ivory px-5 py-24 md:px-10 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-gold">Gifting</p>
        <h2 className="display-lg mt-6 text-espresso">GIFT A MEMORY.</h2>
        <p className="body-lg mt-6 text-stone">For the people who are hard to shop for — because they already have everything except a story.</p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-[1400px] gap-6 md:grid-cols-3">
        {giftCategories.map((gift, i) => (
          <Reveal key={gift.name} delay={i * 120}>
            <a href={GENERAL_WHATSAPP_LINK} target="_blank" rel="noreferrer" className="group block overflow-hidden bg-cream">
              <div className="relative overflow-hidden">
                <img src={gift.image} alt={gift.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-ink/20" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-ivory">
                  <p className="font-display text-2xl">{gift.name}</p>
                  <p className="mt-1 font-sans text-[0.7rem] font-light text-ivory/80">{gift.blurb}</p>
                  <p className="mt-3 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-champagne">{gift.price}</p>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
