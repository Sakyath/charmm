import { Reveal } from "@/components/Reveal";

export function EmotionalSection() {
  return (
    <section className="grain relative bg-blush px-5 py-24 text-center md:py-32">
      <Reveal className="mx-auto max-w-2xl">
        <p className="script text-3xl text-wood md:text-4xl">It's not just jewellery.</p>
        <h2 className="display-lg mt-6 text-espresso">IT'S THE STORY YOU CARRY.</h2>
        <div className="rule-gold mx-auto my-8 w-16" />
        <p className="body-lg text-espresso/70">
          A charm for the city you left. A heart for the one who stayed. An initial for the person you became. Wear your memories where the world can see them.
        </p>
      </Reveal>
    </section>
  );
}
