import { ScrollCanvas } from "@/components/ScrollCanvas";
import type { ReactNode } from "react";

export function WearingSection() {
  return (
    <ScrollCanvas
      frameDir="/videos/video-03"
      frameCount={300}
      scrollHeight="400vh"
      objectFit="cover"
      objectPosition="center"
      alt="Wearing handmade charm jewellery"
      className="relative"
      overlay={(progress) => {
        const phase1 = progress < 0.33 ? 1 : 0;
        const phase2 = progress >= 0.33 && progress < 0.66 ? 1 : 0;
        const phase3 = progress >= 0.66 ? 1 : 0;
        return (
          <>
            <div className="absolute inset-0 bg-ink/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
              <div style={{ opacity: phase1, transition: "opacity 0.5s", position: "absolute" }}>
                <p className="eyebrow text-gold">Wear it</p>
                <h2 className="display-lg mt-6 text-ivory">WORN YOUR WAY.</h2>
              </div>
              <div style={{ opacity: phase2, transition: "opacity 0.5s", position: "absolute" }}>
                <p className="display-md text-ivory">Small details.</p>
                <p className="display-md italic text-gold">Personal stories.</p>
              </div>
              <div style={{ opacity: phase3, transition: "opacity 0.5s", position: "absolute" }}>
                <p className="script text-4xl text-gold md:text-6xl">Little charms,</p>
                <p className="script text-4xl text-gold md:text-6xl">big memories.</p>
              </div>
            </div>
          </>
        ) as ReactNode;
      }}
    />
  );
}
