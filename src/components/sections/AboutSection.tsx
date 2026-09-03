import { Reveal } from "@/components/Reveal";

export function AboutSection() {
  return (
    <section className="bg-cream px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 md:grid-cols-2 md:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow text-gold">Our story</p>
            <h2 className="display-lg mt-6 text-espresso">BORN FROM A SMALL IDEA.</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="body-lg mt-8 max-w-md text-wood">
              Charmelle began at a kitchen table with a single charm and a lot of patience. We believe jewellery should feel like a memory you can hold — not just something you wear.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="body-lg mt-6 max-w-md text-wood">
              Each piece is assembled by hand, finished by hand, and wrapped by hand. Slow, deliberate, and made to be kept.
            </p>
          </Reveal>
        </div>
        <Reveal parallax={30}>
          <img src="/images/about-01.jpg" alt="Hands assembling a charm bracelet at a workbench" loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </Reveal>
      </div>
    </section>
  );
}
