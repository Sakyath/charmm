import { Link } from "@tanstack/react-router";
import { WHATSAPP_DISPLAY, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/data/products";

export function Footer() {
  return (
    <footer className="grain relative bg-ink px-5 py-16 text-ivory md:px-10 md:py-24">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 md:grid-cols-4 md:gap-8">
          <div>
            <span className="font-display text-2xl tracking-[0.15em]">Charmelle</span>
            <p className="script mt-3 text-2xl text-gold">Little charms, big memories.</p>
          </div>

          <div>
            <p className="eyebrow text-gold">Shop</p>
            <ul className="mt-5 space-y-3 font-sans text-[0.7rem] font-light text-ivory/70">
              <li><Link to="/shop" className="hover:text-ivory">All pieces</Link></li>
              <li><Link to="/customise" className="hover:text-ivory">Customise</Link></li>
              <li><Link to="/collections" search={{ c: "gifts" }} className="hover:text-ivory">Gifts</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-gold">Brand</p>
            <ul className="mt-5 space-y-3 font-sans text-[0.7rem] font-light text-ivory/70">
              <li><Link to="/our-story" className="hover:text-ivory">Our story</Link></li>
              <li><Link to="/journal" className="hover:text-ivory">Journal</Link></li>
              <li><Link to="/wishlist" className="hover:text-ivory">Wishlist</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-gold">Contact</p>
            <ul className="mt-5 space-y-3 font-sans text-[0.7rem] font-light text-ivory/70">
              <li>WhatsApp: {WHATSAPP_DISPLAY}</li>
              <li><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-ivory">{INSTAGRAM_HANDLE}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 md:flex-row">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-ivory/40">
            © {new Date().getFullYear()} Charmelle
          </p>
          <p className="script text-xl text-gold/70">Made with love.</p>
        </div>
      </div>
    </footer>
  );
}
