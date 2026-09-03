import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, Heart, X } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 bg-ivory/85 backdrop-blur-md">
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
      {search && (
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
        </div>
      )}

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-ivory p-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-xl tracking-[0.15em]">Charmelle</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" strokeWidth={1.3} />
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-6">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-espresso"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <a
              href={GENERAL_WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-10 block font-sans text-[0.7rem] uppercase tracking-[0.2em] text-gold"
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
