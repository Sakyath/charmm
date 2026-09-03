import { useState } from "react";
import { customCharms, BRACELET_BASE_PRICE, formatPrice } from "@/data/products";
import { createWhatsAppCustomLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/Reveal";

export function CustomizationBuilder() {
  const [selected, setSelected] = useState<string[]>(["butterfly", "heart"]);
  const [initial, setInitial] = useState("");

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : prev.length < 5 ? [...prev, id] : prev));
  };

  const estimate =
    BRACELET_BASE_PRICE +
    selected.reduce((sum, id) => {
      const charm = customCharms.find((c) => c.id === id);
      return sum + (charm?.price ?? 0);
    }, 0);

  return (
    <section className="grain relative bg-ink px-5 py-24 text-ivory md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-gold">Customise</p>
            <h2 className="display-lg mt-6 text-ivory">BUILD YOUR OWN.</h2>
            <p className="body-lg mt-6 text-ivory/60">Choose up to 5 charms. Add an initial. We'll make it by hand.</p>

            <div className="mt-10 overflow-hidden bg-charcoal/40">
              <img src="/images/product-06.jpg" alt="Custom charm bracelet preview" className="aspect-[4/3] w-full object-cover" />
            </div>

            <div className="mt-8 border border-champagne/20 p-6">
              <p className="eyebrow text-gold">Your selection</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selected.length === 0 ? (
                  <span className="font-sans text-sm font-light text-ivory/40">No charms selected</span>
                ) : (
                  selected.map((id) => {
                    const charm = customCharms.find((c) => c.id === id);
                    return (
                      <span key={id} className="bg-champagne/15 px-3 py-1 font-sans text-[0.65rem] text-champagne">
                        {charm?.name}
                      </span>
                    );
                  })
                )}
              </div>
              {initial && (
                <p className="mt-3 font-sans text-sm text-ivory/70">
                  Initial: <span className="script text-2xl text-gold">{initial.toUpperCase()}</span>
                </p>
              )}
              <div className="rule-gold my-5 w-12" />
              <p className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-ivory/50">Estimated price</p>
              <p className="font-display text-3xl text-ivory">{formatPrice(estimate)}</p>
              <a
                href={createWhatsAppCustomLink(selected, estimate, initial || undefined)}
                target="_blank"
                rel="noreferrer"
                className="mt-6 block bg-ivory py-4 text-center font-sans text-[0.65rem] uppercase tracking-[0.3em] text-espresso transition-colors hover:bg-champagne"
              >
                Order on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow text-gold">Choose your charms</p>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {customCharms.map((charm) => {
                const isSel = selected.includes(charm.id);
                return (
                  <button
                    key={charm.id}
                    type="button"
                    onClick={() => toggle(charm.id)}
                    aria-pressed={isSel}
                    className={`border p-4 text-left transition-all ${isSel ? "border-gold bg-gold/10" : "border-champagne/15 hover:border-champagne/40"}`}
                  >
                    <p className="font-display text-xl text-ivory">{charm.name}</p>
                    <p className="mt-1 font-sans text-[0.65rem] text-ivory/50">{charm.meaning}</p>
                    <p className="mt-2 font-sans text-[0.7rem] text-champagne">{formatPrice(charm.price)}</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-8">
              <label className="eyebrow text-gold" htmlFor="initial-input">Add an initial (optional)</label>
              <input
                id="initial-input"
                type="text"
                maxLength={1}
                value={initial}
                onChange={(e) => setInitial(e.target.value)}
                placeholder="A"
                className="mt-4 w-20 border border-champagne/25 bg-transparent px-4 py-3 text-center font-display text-2xl text-ivory placeholder:text-ivory/20 focus:outline-none"
              />
            </div>
            <p className="mt-6 font-sans text-[0.7rem] font-light text-ivory/40">{selected.length}/5 charms selected</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
