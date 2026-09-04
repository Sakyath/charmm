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
  const staticRef = useRef<HTMLImageElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const [reduce, setReduce] = useState(false);

  // detect reduced motion + viewport
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // progressive load — coarse pass first, then fill in.
  // On small screens we only ever load every 2nd frame to save data.
  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const stride = typeof window !== "undefined" && window.innerWidth < 640 ? 2 : 1;
    const passes = [10, 5, 1].map((s) => Math.max(stride, s));
    const runPass = (passIdx: number) => {
      if (cancelled || passIdx >= passes.length) return;
      const step = passes[passIdx]!;
      let pending = 0;
      let started = false;
      const done = () => {
        pending -= 1;
        if (started && pending === 0) runPass(passIdx + 1);
      };
      for (let i = 0; i < frameCount; i += step) {
        if (imagesRef.current[i]) continue;
        pending += 1;
        const idx = i;
        const img = new Image();
        img.decoding = "async";
        img.src = `${frameDir}/frame-${pad(idx)}.jpg`;
        img.onload = () => {
          imagesRef.current[idx] = img;
          requestAnimationFrame(() => {
            if (cancelled) return;
            const element = wrapRef.current;
            if (!element) return;
            const total = element.getBoundingClientRect().height - window.innerHeight;
            const currentProgress = total > 0
              ? Math.max(0, Math.min(1, -element.getBoundingClientRect().top / total))
              : 0;
            draw(currentProgress);
          });
          done();
        };
        img.onerror = done;
      }
      started = true;
      if (pending === 0) runPass(passIdx + 1);
    };
    runPass(0);
    return () => {
      cancelled = true;
    };
  }, [frameDir, frameCount, reduce]);


  // intersection activation
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setActive(e.isIntersecting)),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

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
      setProgress(p);
      draw(p);
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
  }, []);

  // draw
  const draw = (p: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const idx = Math.min(frameCount - 1, Math.floor(p * (frameCount - 1)));
    // fall back to the nearest already-loaded frame so scrolling never stalls
    let img = imagesRef.current[idx];
    if (!img?.complete) {
      for (let d = 1; d < frameCount; d++) {
        const a = imagesRef.current[idx - d];
        if (a?.complete) {
          img = a;
          break;
        }
        const b = imagesRef.current[idx + d];
        if (b?.complete) {
          img = b;
          break;
        }
      }
    }
    if (!img?.complete) return;

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
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ objectFit, objectPosition }}
        />
        <img
          ref={staticRef}
          src={`${frameDir}/frame-${pad(0)}.jpg`}
          alt={alt}
          loading="eager"
          className="absolute inset-0 h-full w-full opacity-0"
          aria-hidden
        />
        {overlay?.(progress)}
      </div>
    </div>
  );
}
