import { Reveal } from "@/components/Reveal";
import { galleryImages, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/data/products";

export function InstagramGallery() {
  return (
    <section className="bg-cream px-5 py-24 md:px-10 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-gold">From the gallery</p>
        <h2 className="display-lg mt-6 text-espresso">@charmelle</h2>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-[1400px] grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {galleryImages.map((img, i) => (
          <Reveal key={img.src} delay={(i % 3) * 100}>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="group block overflow-hidden">
              <img src={img.src} alt={img.alt} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]" />
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hairline-link font-sans text-[0.62rem] uppercase tracking-[0.3em] text-espresso">
          Follow {INSTAGRAM_HANDLE}
        </a>
      </div>
    </section>
  );
}
