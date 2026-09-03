import { Reveal } from "@/components/Reveal";
import { testimonials } from "@/data/products";

export function Testimonials() {
  return (
    <section className="bg-ivory px-5 py-24 md:px-10 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-gold">Loved & worn</p>
        <h2 className="display-lg mt-6 text-espresso">KIND WORDS.</h2>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-[1400px] gap-8 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 120}>
            <blockquote className="border border-espresso/10 bg-cream p-8">
              <p className="script text-3xl text-gold">"</p>
              <p className="mt-2 font-sans text-sm font-light leading-relaxed text-wood">{t.text}</p>
              <div className="rule-gold my-5 w-10" />
              <p className="font-display text-lg text-espresso">{t.name}</p>
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-stone">{t.location}</p>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
