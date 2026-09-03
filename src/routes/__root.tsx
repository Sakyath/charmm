import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Charmelle",
  description: "Handmade charm jewellery. Little charms, big memories.",
  contactType: "customer service",
  url: "https://charmelle.jewellery",
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-5 text-center">
      <p className="script text-3xl text-gold">Lost a charm?</p>
      <h1 className="display-lg mt-4 text-espresso">404.</h1>
      <p className="body-lg mt-4 text-stone">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-8 hairline-link font-sans text-[0.62rem] uppercase tracking-[0.3em] text-espresso">
        Back home
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-5 text-center">
      <p className="script text-3xl text-gold">A charm slipped.</p>
      <h1 className="display-md mt-4 text-espresso">This page didn't load.</h1>
      <p className="body-lg mt-4 text-stone">Something went wrong on our end. Try refreshing.</p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="bg-espresso px-8 py-3 font-sans text-[0.62rem] uppercase tracking-[0.3em] text-ivory"
        >
          Try again
        </button>
        <Link to="/" className="border border-espresso/20 px-8 py-3 font-sans text-[0.62rem] uppercase tracking-[0.3em] text-espresso">
          Go home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "description", content: "Charmelle — handmade charm jewellery. Little charms, big memories. Order on WhatsApp." },
      { name: "author", content: "Charmelle" },
      { property: "og:title", content: "Charmelle — Handmade Charm Jewellery" },
      { property: "og:description", content: "Little charms. Big memories. Handmade charm jewellery for the moments you don't want to forget." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500&family=Pinyon+Script&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(orgJsonLd),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </QueryClientProvider>
  );
}
