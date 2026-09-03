import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";

const posts = [
  { title: "How to choose charms that tell your story", excerpt: "A gentle guide to building a bracelet that means something.", date: "Coming soon" },
  { title: "Behind the bench: a day in the studio", excerpt: "From sketch to finished piece — how a charm is made.", date: "Coming soon" },
  { title: "Gifting a charm: what to engrave", excerpt: "Ideas for the moments worth marking.", date: "Coming soon" },
  { title: "Caring for your gold-tone jewellery", excerpt: "Keep your charms glowing for years.", date: "Coming soon" },
];

export const Route = createFileRoute("/journal")({
  head: () => ({
    title: "Journal — Charmelle",
    meta: [
      { name: "description", content: "Stories, guides and notes from the Charmelle studio." },
      { property: "og:title", content: "Journal — Charmelle" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: JournalComponent,
});

function JournalComponent() {
  return (
    <>
      <section className="bg-ivory px-5 py-16 md:px-10 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold">Journal</p>
          <h1 className="display-lg mt-6 text-espresso">STORIES & NOTES.</h1>
          <p className="body-lg mt-6 text-stone">Letters from the bench. Coming soon.</p>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-[1400px] gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={(i % 2) * 120}>
              <div className="border border-espresso/10 bg-cream p-8">
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-gold">{post.date}</p>
                <h2 className="mt-4 font-display text-2xl text-espresso">{post.title}</h2>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-wood">{post.excerpt}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link to="/shop" className="hairline-link font-sans text-[0.62rem] uppercase tracking-[0.3em] text-espresso">
            Browse the collection
          </Link>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
