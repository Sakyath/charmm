import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export function FinalCTA() {
  return (
    <section className="grain relative bg-espresso px-5 py-24 text-center text-ivory md:py-32">
      <Reveal className="mx-auto max-w-2xl">
        <p className="script text-3xl text-gold md:text-4xl">Your story is waiting.</p>
        <h2 className="display-lg mt-6 text-ivory">FIND YOUR CHARM.</h2>
        <div className="rule-gold mx-auto my-8 w-16" />
        <p className="body-lg text-ivory/60">Made by hand. Ordered on WhatsApp. Loved for years.</p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link to="/shop" className="bg-ivory px-9 py-4 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-espresso transition-colors hover:bg-champagne">
            Shop the collection
          </Link>
          <Link to="/customise" className="border border-champagne/40 px-9 py-4 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-champagne transition-colors hover:bg-champagne/10">
            Build your own
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
