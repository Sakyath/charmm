import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/sections/AboutSection";
import { EmotionalSection } from "@/components/sections/EmotionalSection";
import { BrandStory } from "@/components/sections/BrandStory";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    title: "Our Story — Charmelle Handmade Charm Jewellery",
    meta: [
      { name: "description", content: "Charmelle began at a kitchen table with a single charm. Every piece is assembled, finished and wrapped by hand." },
      { property: "og:title", content: "Our Story — Charmelle" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: OurStoryComponent,
});

function OurStoryComponent() {
  return (
    <>
      <section className="bg-ivory px-5 pt-16 text-center md:px-10 md:pt-24">
        <Reveal className="mx-auto max-w-2xl">
          <p className="eyebrow text-gold">Our story</p>
          <h1 className="display-lg mt-6 text-espresso">MADE BY HAND.</h1>
          <p className="body-lg mt-6 text-stone">Slow, deliberate, and made to be kept.</p>
        </Reveal>
      </section>
      <BrandStory />
      <EmotionalSection />
      <AboutSection />
      <FinalCTA />
    </>
  );
}
