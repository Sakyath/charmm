import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Eye } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { createWhatsAppOrderLink } from "@/lib/whatsapp";
import { useWishlist } from "@/hooks/use-wishlist";

type Props = {
  product: Product;
  onQuickView?: (product: Product) => void;
};

export function ProductCard({ product, onQuickView }: Props) {
  const [hovered, setHovered] = useState(false);
  const { has, toggle } = useWishlist();
  const wished = has(product.slug);
  const img = product.images[0] ?? "";

  return (
    <div
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden bg-cream">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <img
            src={img}
            alt={product.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
        </Link>

        <button
          type="button"
          onClick={() => toggle(product.slug)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 rounded-full bg-ivory/80 p-2 backdrop-blur-sm transition-all"
        >
          <Heart className={`h-4 w-4 transition-all ${wished ? "fill-gold text-gold" : "text-espresso"}`} strokeWidth={1.2} />
        </button>

        {onQuickView && hovered && (
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-ivory/90 px-5 py-2 font-sans text-[0.6rem] uppercase tracking-[0.25em] text-espresso backdrop-blur-sm transition-colors hover:bg-ivory"
          >
            <Eye className="mr-1.5 inline h-3 w-3" strokeWidth={1.4} />
            Quick View
          </button>
        )}

        {product.customisable && (
          <span className="absolute left-3 top-3 bg-gold/90 px-3 py-1 font-sans text-[0.55rem] uppercase tracking-[0.2em] text-ivory">
            Made to order
          </span>
        )}
      </div>

      <div className="mt-4">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <h3 className="font-display text-lg text-espresso">{product.name}</h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 font-sans text-[0.78rem] font-light leading-snug text-stone">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-sans text-sm font-light text-wood">{formatPrice(product.price)}</span>
          <a
            href={createWhatsAppOrderLink(product)}
            target="_blank"
            rel="noreferrer"
            className="hairline-link font-sans text-[0.6rem] uppercase tracking-[0.25em] text-espresso"
          >
            Order
          </a>
        </div>
      </div>
    </div>
  );
}
