import { useCallback, useEffect, useState } from "react";

const KEY = "charmelle:wishlist";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setItems(read());
    };
    const onSync = () => setItems(read());
    window.addEventListener("storage", onStorage);
    window.addEventListener("charmelle:wishlist-sync", onSync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("charmelle:wishlist-sync", onSync);
    };
  }, []);

  const persist = useCallback((next: string[]) => {
    setItems(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("charmelle:wishlist-sync"));
    }
  }, []);

  const toggle = useCallback((slug: string) => {
    const cur = read();
    persist(cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]);
  }, [persist]);

  const has = useCallback((slug: string) => items.includes(slug), [items]);

  return { items, toggle, has, count: items.length };
}
