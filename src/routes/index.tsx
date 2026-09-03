import { createFileRoute } from "@tanstack/react-router";
import { HeroScroll } from "@/components/sections/HeroScroll";
import { HeroTransition, BrandStory } from "@/components/sections/BrandStory";
import { CharmShowcase } from "@/components/sections/CharmShowcase";
import { WearingSection } from "@/components/sections/WearingSection";
import { CustomizationBuilder } from "@/components/sections/CustomizationBuilder";
import { EmotionalSection } from "@/components/sections/EmotionalSection";
import { GiftSection } from "@/components/sections/GiftSection";
import { InstagramGallery } from "@/components/sections/InstagramGallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { AboutSection } from "@/components/sections/AboutSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ChooseYourStory } from "@/components/sections/ChooseYourStory";

export const Route = createFileRoute("/")({
  head: () => ({
    title: "Charmelle — Handmade Charm Jewellery | Little Charms, Big Memories",
    meta: [
      { name: "description", content: "Handmade charm jewellery made by hand and ordered on WhatsApp. Build your own charm bracelet and wear your memories." },
      { property: "og:title", content: "Charmelle — Handmade Charm Jewellery" },
      { property: "og:description", content: "Little charms. Big memories. Handmade charm jewellery for the moments you don't want to forget." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <>
      <HeroScroll />
      <HeroTransition />
      <BrandStory />
      <CharmShowcase />
      <ChooseYourStory />
      <WearingSection />
      <CustomizationBuilder />
      <EmotionalSection />
      <GiftSection />
      <InstagramGallery />
      <Testimonials />
      <AboutSection />
      <FinalCTA />
    </>
  );
}
