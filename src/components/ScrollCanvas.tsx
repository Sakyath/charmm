import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  frameDir: string;
  frameCount: number;
  scrollHeight: string;
  objectFit: "cover" | "contain";
  objectPosition?: string;
  alt: string;
  className?: string;
  overlay?: (progress: number) => ReactNode;
};

function pad(n: number): string {
  return String(n).padStart(3, "0");
}

export function ScrollCanvas({
  frameDir,
  frameCount,
  scrollHeight,
  objectFit,
  objectPosition = "center",
  alt,
  className = "",
  overlay,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadingRef = useRef(new Set<number>());
  const queuedRef = useRef(new Set<number>());
  const queueRef = useRef<number[]>([]);
  const activeRef = useRef(false);
  const activatedRef = useRef(false);
  const progressiveIndexRef = useRef(0);
  const currentIndexRef = useRef(0);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [reduce, setReduce] = useState(false);

  // detect reduced motion + viewport
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const pump = () => {
    while (activeRef.current && loadingRef.current.size < 3 && queueRef.current.length > 0) {
      const index = queueRef.current.shift();
      if (index === undefined) return;
      queuedRef.current.delete(index);
      if (imagesRef.current[index] || loadingRef.current.has(index)) continue;

      loadingRef.current.add(index);
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        loadingRef.current.delete(index);
        imagesRef.current[index] = img;
        setIsLoading(false);
        draw(index / Math.max(1, frameCount - 1));
        if (activeRef.current && progressiveIndexRef.current < frameCount) {
          enqueue(progressiveIndexRef.current);
          progressiveIndexRef.current += 1;
        }
        pump();
      };
      img.onerror = () => {
        loadingRef.current.delete(index);
        pump();
      };
      img.src = `${frameDir}/frame-${pad(index)}.jpg`;
    }
  };

  const enqueue = (index: number) => {
    if (
      index < 0 ||
      index >= frameCount ||
      imagesRef.current[index] ||
      loadingRef.current.has(index) ||
      queuedRef.current.has(index)
    ) {
      return;
    }
    queuedRef.current.add(index);
    queueRef.current.push(index);
  };

  const prioritize = (index: number) => {
    Array.from({ length: 17 }, (_, offset) => index - 8 + offset)
      .sort((a, b) => Math.abs(a - index) - Math.abs(b - index))
      .forEach(enqueue);
    pump();
  };

  // Each section owns a small queue. Only an approaching section is allowed to add work.
  useEffect(() => {
    if (reduce) return;
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        activeRef.current = rect.top < window.innerHeight && rect.bottom > 0;

        if (entry.isIntersecting) {
          if (!activatedRef.current) {
            activatedRef.current = true;
            for (let index = 0; index < Math.min(12, frameCount); index += 1) enqueue(index);
            progressiveIndexRef.current = Math.min(12, frameCount);
          }
          prioritize(currentIndexRef.current);
          pump();
        }
      },
      { rootMargin: "150% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      activeRef.current = false;
      queueRef.current.length = 0;
      queuedRef.current.clear();
    };
  }, [frameCount, reduce]);

  // scroll progress
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      activeRef.current = rect.top < vh && rect.bottom > 0;
      currentIndexRef.current = Math.floor(p * (frameCount - 1));
      draw(p);
      if (Math.abs(p - progressRef.current) > 0.01 || p === 0 || p === 1) {
        progressRef.current = p;
        setProgress(p);
      }
      if (activeRef.current) prioritize(currentIndexRef.current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [frameCount]);

  // draw
  const draw = (p: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const idx = Math.min(frameCount - 1, Math.floor(p * (frameCount - 1)));
    currentIndexRef.current = idx;
    let img = imagesRef.current[idx];
    if (!img) {
      const loadedIndices = imagesRef.current
        .map((loaded, index) => (loaded ? index : -1))
        .filter((index) => index >= 0);
      const nearest = loadedIndices.reduce(
        (best, index) => (Math.abs(index - idx) < Math.abs(best - idx) ? index : best),
        -1,
      );
      img = nearest >= 0 ? imagesRef.current[nearest] : undefined;
      if (activeRef.current) prioritize(idx);
    }
    if (!img || !img.complete) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const ir = img.width / img.height;
    const cr = w / h;
    let dw = w;
    let dh = h;
    if (objectFit === "cover") {
      if (ir > cr) dw = h * ir;
      else dh = w / ir;
    } else {
      if (ir > cr) dh = w / ir;
      else dw = h * ir;
    }
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  };

  if (reduce) {
    return (
      <div className={`relative h-[80vh] ${className}`}>
        <img
          src={`${frameDir}/frame-${pad(0)}.jpg`}
          alt={alt}
          className="absolute inset-0 h-full w-full"
          style={{ objectFit, objectPosition }}
        />
        {overlay?.(0)}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`} style={{ height: scrollHeight }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <img
          src={`${frameDir}/frame-${pad(0)}.jpg`}
          alt={alt}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full"
          style={{ objectFit, objectPosition }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ objectFit, objectPosition }}
        />
        {isLoading && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.55rem] uppercase tracking-[0.3em] text-champagne/70">
            Loading
          </div>
        )}
        {overlay?.(progress)}
      </div>
    </div>
  );
}
