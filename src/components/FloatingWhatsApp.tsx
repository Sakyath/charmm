import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { GENERAL_WHATSAPP_LINK } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={GENERAL_WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.6} />
      <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em]">Chat</span>
    </a>
  );
}
