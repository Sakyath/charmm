import { createFileRoute } from "@tanstack/react-router";
import { CustomizationBuilder } from "@/components/sections/CustomizationBuilder";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/customise")({
  head: () => ({
    title: "Customise Your Charm Bracelet — Charmelle",
    meta: [
      { name: "description", content: "Build your own handmade charm bracelet. Choose up to 5 charms, add an initial, and order on WhatsApp." },
      { property: "og:title", content: "Customise — Charmelle" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CustomiseComponent,
});

function CustomiseComponent() {
  return (
    <>
      <section className="bg-ivory px-5 pt-16 text-center md:px-10 md:pt-24">
        <Reveal className="mx-auto max-w-2xl">
          <p className="eyebrow text-gold">Make it yours</p>
          <h1 className="display-lg mt-6 text-espresso">CUSTOMISE.</h1>
          <p className="body-lg mt-6 text-stone">No two stories are the same. Neither are our bracelets.</p>
        </Reveal>
      </section>
      <CustomizationBuilder />
      <FinalCTA />
    </>
  );
}
