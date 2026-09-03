import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { createWhatsAppOrderLink } from "@/lib/whatsapp";

type Props = {
  product: Product | null;
  onClose: () => void;
};

export function QuickView({ product, onClose }: Props) {
  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [product, onClose]);

  if (!product) return null;
  const img = product.images[0] ?? "";

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative grid max-h-[90vh] w-full max-w-3xl grid-cols-1 overflow-hidden bg-ivory md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} quick view`}
      >
        <button type="button" onClick={onClose} aria-label="Close quick view" className="absolute right-3 top-3 z-10 rounded-full bg-ivory/80 p-2 backdrop-blur-sm">
          <X className="h-4 w-4 text-espresso" strokeWidth={1.2} />
        </button>

        <div className="aspect-square overflow-hidden bg-cream md:aspect-auto">
          <img src={img} alt={product.alt} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col justify-center p-6 md:p-8">
          <h2 className="font-display text-2xl text-espresso md:text-3xl">{product.name}</h2>
          <p className="mt-2 font-sans text-lg font-light text-wood">{formatPrice(product.price)}</p>
          <p className="mt-4 font-sans text-sm font-light leading-relaxed text-stone">{product.description}</p>
          <div className="mt-6 flex flex-col gap-3">
            <a href={createWhatsAppOrderLink(product)} target="_blank" rel="noreferrer" className="bg-espresso py-3.5 text-center font-sans text-[0.65rem] uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-charcoal">
              Order Now
            </a>
            <Link to="/product/$slug" params={{ slug: product.slug }} onClick={onClose} className="border border-espresso/20 py-3.5 text-center font-sans text-[0.65rem] uppercase tracking-[0.3em] text-espresso transition-colors hover:bg-cream">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
