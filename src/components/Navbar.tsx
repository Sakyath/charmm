import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { Menu, Search, Heart, X, ChevronRight } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import { GENERAL_WHATSAPP_LINK } from "@/lib/whatsapp";
import { WHATSAPP_DISPLAY } from "@/data/products";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/customise", label: "Customise" },
  { to: "/our-story", label: "Our Story" },
  { to: "/journal", label: "Journal" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const { count } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open || search ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, search]);

  return (
    <header className="ios-surface sticky top-0 z-50 rounded-none border-b border-espresso/10">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 md:px-10">
        {/* Left: mobile menu */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-espresso" strokeWidth={1.3} />
        </button>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.slice(0, 3).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hairline-link font-sans text-[0.62rem] uppercase tracking-[0.25em] text-espresso"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="font-display text-2xl tracking-[0.18em] text-espresso md:text-3xl">Charmelle</span>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-5">
          <nav className="hidden items-center gap-8 md:flex">
            {links.slice(3).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="hairline-link font-sans text-[0.62rem] uppercase tracking-[0.25em] text-espresso"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setSearch(true)}
            aria-label="Search"
            className="text-espresso"
          >
            <Search className="h-5 w-5" strokeWidth={1.3} />
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className="relative text-espresso">
            <Heart className="h-5 w-5" strokeWidth={1.3} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold font-sans text-[0.5rem] text-ivory">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Search overlay */}
      {mounted && search && createPortal(
        <div className="fixed inset-0 z-[60] bg-ivory/95 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="mx-auto max-w-2xl px-5 pt-24">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-gold">Search</p>
              <button onClick={() => setSearch(false)} aria-label="Close search">
                <X className="h-5 w-5 text-espresso" strokeWidth={1.3} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (q.trim()) {
                  window.location.href = `/shop?q=${encodeURIComponent(q.trim())}`;
                }
              }}
            >
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for charms, bracelets…"
                className="mt-6 w-full border-b border-espresso/20 bg-transparent py-3 font-display text-2xl text-espresso placeholder:text-stone/50 focus:outline-none"
              />
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Mobile drawer — iOS liquid-glass sheet */}
      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true">
          <div
            className="ios-scrim absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <div className="ios-sheet absolute inset-x-2 bottom-2 top-14 overflow-hidden rounded-[2.2rem] border border-ivory/40 bg-ivory/65 p-4 shadow-[0_24px_70px_-20px_rgba(16,11,6,0.45)] backdrop-blur-2xl backdrop-saturate-150">
            {/* Grabber */}
            <div className="mx-auto h-[5px] w-10 rounded-full bg-espresso/20" />

            <div className="mt-4 flex items-center justify-between px-1">
              <span className="font-display text-2xl tracking-[0.12em] text-espresso">Charmelle</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="ios-glass-control flex h-9 w-9 items-center justify-center rounded-full text-espresso transition active:scale-90"
              >
                <X className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>

            <nav className="ios-glass-control mt-6 overflow-hidden rounded-[1.4rem]">
              {links.map((l, i) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${60 + i * 45}ms` }}
                  className={`ios-row flex items-center justify-between px-5 py-4 font-sans text-[0.95rem] tracking-[0.01em] text-espresso transition active:bg-espresso/5 ${
                    i > 0 ? "border-t border-espresso/10" : ""
                  }`}
                >
                  <span>{l.label}</span>
                  <ChevronRight className="h-4 w-4 text-stone/70" strokeWidth={1.6} />
                </Link>
              ))}
            </nav>

            <a
              href={GENERAL_WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="ios-row mt-4 flex items-center justify-center gap-2 rounded-[1.4rem] bg-espresso/90 px-5 py-4 font-sans text-[0.9rem] tracking-[0.02em] text-ivory backdrop-blur-xl transition active:scale-[0.98]"
              style={{ animationDelay: "300ms" }}
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>

            <p className="mt-5 text-center font-sans text-[0.6rem] uppercase tracking-[0.3em] text-stone/70">
              Little charms. Big memories.
            </p>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
