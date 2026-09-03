import { Reveal } from "@/components/Reveal";

export function HeroTransition() {
  return (
    <section className="bg-ivory px-5 py-24 text-center md:py-32">
      <Reveal className="mx-auto max-w-2xl">
        <p className="script text-3xl text-gold md:text-4xl">Some things are worn.</p>
        <p className="display-lg mt-4 text-espresso">Some things are remembered.</p>
        <div className="rule-gold mx-auto my-8 w-16" />
        <p className="body-lg text-stone">Your story deserves a charm.</p>
      </Reveal>
    </section>
  );
}

export function BrandStory() {
  return (
    <section className="bg-ivory px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 md:grid-cols-2 md:gap-24">
        <Reveal parallax={30}>
          <img src="/images/story-01.jpg" alt="A handmade charm bracelet being assembled by hand" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
        </Reveal>
        <div>
          <Reveal>
            <p className="eyebrow text-gold">The craft</p>
            <h2 className="display-lg mt-6 text-espresso">MADE WITH MEANING.</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="body-lg mt-8 max-w-md text-wood">
              Every charm is chosen, arranged and finished by hand. No two pieces are ever quite the same — because no two stories are.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="script mt-10 text-2xl text-gold">Made with love</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
