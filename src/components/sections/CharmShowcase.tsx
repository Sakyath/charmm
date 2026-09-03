import { ScrollCanvas } from "@/components/ScrollCanvas";
import type { ReactNode } from "react";

const labels = [
  { start: 0.1, end: 0.25, text: "Butterfly", sub: "for change" },
  { start: 0.3, end: 0.45, text: "Heart", sub: "for love" },
  { start: 0.5, end: 0.65, text: "Key", sub: "for beginnings" },
  { start: 0.7, end: 0.85, text: "Initial", sub: "for you" },
];

export function CharmShowcase() {
  return (
    <ScrollCanvas
      frameDir="/videos/video-02"
      frameCount={300}
      scrollHeight="440vh"
      objectFit="cover"
      objectPosition="center"
      alt="Macro detail of individual handmade charms"
      className="relative"
      overlay={(progress) => (
        <>
          <div className="absolute inset-0 bg-ink/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
            <div style={{ opacity: progress < 0.1 || progress > 0.9 ? 1 : 0, transition: "opacity 0.6s" }}>
              <p className="eyebrow text-gold">The charms</p>
              <h2 className="display-lg mt-6 text-ivory">EVERY DETAIL.</h2>
              <p className="body-lg mt-4 text-ivory/60">A charm for every meaning.</p>
            </div>
            {labels.map((label) => {
              const visible = progress >= label.start && progress <= label.end;
              return (
                <div key={label.text} style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s", position: "absolute" }}>
                  <p className="eyebrow text-gold">{label.sub}</p>
                  <p className="display-lg mt-4 text-ivory">{label.text}</p>
                </div>
              );
            })}
          </div>
        </>
      ) as ReactNode}
    />
  );
}
