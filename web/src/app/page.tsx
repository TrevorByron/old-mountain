"use client";

import { useEffect, useState } from "react";
import { LeadForm } from "@/components/lead-form";
import { Cormorant_Garamond, Roboto, Space_Mono } from "next/font/google";

const heroGrainUrl = "https://www.figma.com/api/mcp/asset/8d95a7f3-1281-44bc-ae9f-89579143f820";
const heroDatesMarkUrl = "https://www.figma.com/api/mcp/asset/6ffc6e22-e566-4337-afdd-9f1b3e9967a9";
const roboto = Roboto({ subsets: ["latin"], weight: ["600"] });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], style: ["normal", "italic"], weight: ["400", "500", "600"] });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const HERO_BG_IMAGES = [
  "/hero/waterfall.webp",
  "/hero/defender-bw.webp",
  "/hero/giraffes-kid.webp",
  "/hero/campfire-night.webp",
  "/hero/elephants-trail.webp",
  "/hero/zebras-field.webp",
  "/hero/lion-resting.webp",
  "/hero/motos.webp"
];
const HERO_CYCLE_MS = 6000;
const HERO_FADE_MS = 900;

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [incomingBgIndex, setIncomingBgIndex] = useState<number | null>(null);
  const [incomingVisible, setIncomingVisible] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY || 0);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let fadeTimeoutId: number | undefined;
    const intervalId = window.setInterval(() => {
      const nextIndex = (currentBgIndex + 1) % HERO_BG_IMAGES.length;
      setIncomingBgIndex(nextIndex);
      setIncomingVisible(false);
      window.requestAnimationFrame(() => setIncomingVisible(true));
      fadeTimeoutId = window.setTimeout(() => {
        setCurrentBgIndex(nextIndex);
        setIncomingVisible(false);
        setIncomingBgIndex(null);
      }, HERO_FADE_MS);
    }, HERO_CYCLE_MS);

    return () => {
      window.clearInterval(intervalId);
      if (fadeTimeoutId) window.clearTimeout(fadeTimeoutId);
    };
  }, [currentBgIndex]);

  useEffect(() => {
    // Preload to reduce first-paint flashes during transitions.
    HERO_BG_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!isWaitlistModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsWaitlistModalOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isWaitlistModalOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".wb-reveal"));
    if (mediaQuery.matches) {
      revealElements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    revealElements.forEach((el) => el.classList.add("wb-reveal-ready"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.style.transitionDelay = target.dataset.delay ?? "0ms";
          target.classList.add("is-visible");
          observer.unobserve(target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const heroParallax = Math.min(scrollY * 0.2, 180);

  return (
    <div>
      <section
        className="relative isolate flex h-screen items-center justify-center overflow-hidden p-4"
        aria-label="Old Mountain safari hero"
      >
        <div
          className="absolute -inset-y-[12%] inset-x-0 -z-30 bg-cover will-change-transform"
          style={{
            backgroundImage: `url(${HERO_BG_IMAGES[currentBgIndex]})`,
            backgroundPosition: "center bottom",
            transform: `translate3d(0, ${heroParallax}px, 0)`
          }}
          aria-hidden="true"
        />
        {incomingBgIndex !== null ? (
          <div
            className={`absolute -inset-y-[12%] inset-x-0 -z-30 bg-cover will-change-transform transition-opacity duration-[900ms] ${
              incomingVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${HERO_BG_IMAGES[incomingBgIndex]})`,
              backgroundPosition: "center bottom",
              transform: `translate3d(0, ${heroParallax}px, 0)`
            }}
            aria-hidden="true"
          />
        ) : null}
        <div className="absolute inset-0 -z-20 bg-[rgba(61,32,16,0.4)]" aria-hidden="true" />
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroGrainUrl})` }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-[2px] border-[20px] border-[var(--dust)]"
          aria-hidden="true"
        />

        <div className="relative z-20 mx-auto flex w-full max-w-[980px] flex-col items-center gap-14 px-9 text-center text-[var(--dust)]">
          <div className="flex flex-col items-center text-center">
            <p className="font-display text-[clamp(3rem,10.3vw,10.42rem)] leading-[0.92] tracking-[0.01em]">
              OLD MOUNTAIN
            </p>
            <p className="font-script -mt-2 text-[clamp(1.25rem,3.2vw,2.87rem)] leading-[0.96]">
              Tours and Explorations
            </p>
          </div>

          <div className="relative mx-auto w-[200px] max-w-[344px] md:w-full">
            <div className="mx-auto h-[85px] w-[200px] md:h-[138px] md:w-[326px]">
              <img
                src={heroDatesMarkUrl}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="font-stamp absolute left-[5px] top-[22px] whitespace-nowrap text-center text-[15px] leading-[1.02] tracking-[0.02em] md:left-[8px] md:top-[36px] md:text-[24px]">
              NOV
              <br />
              2026
            </p>
            <p className="font-stamp absolute right-[5px] top-[22px] whitespace-nowrap text-center text-[15px] leading-[1.02] tracking-[0.02em] md:right-[8px] md:top-[36px] md:text-[24px]">
              FEB
              <br />
              2027
            </p>
          </div>

          <p
            className={`${roboto.className} max-w-[532px] text-[clamp(0.98rem,1.25vw,1.125rem)] uppercase leading-[1.78] tracking-[0.04em]`}
          >
            A 10-day adventure in Tanzania, organized by two brothers from the Kenya-Tanzania
            border.
          </p>

          <button
            type="button"
            onClick={() => setIsWaitlistModalOpen(true)}
            className="btn-primary hero-cta h-[50px] w-[244px] min-h-0 whitespace-nowrap px-[30px] py-4 tracking-[0.08em] md:w-auto"
          >
            JOIN THE WAITLIST
          </button>
        </div>
      </section>

      {isWaitlistModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setIsWaitlistModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Join the waitlist"
            className="relative w-full max-w-3xl border border-[var(--dirt)] bg-[var(--dust)] p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsWaitlistModalOpen(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-[var(--ink)] transition hover:bg-[var(--dust)]/20"
              aria-label="Close waitlist modal"
            >
              ×
            </button>

            <iframe
              className="airtable-embed mt-8 w-full"
              src="https://airtable.com/embed/appHOiCPSEwIBMWFE/pag47ooCaqpTGfS2Y/form"
              frameBorder="0"
              width="100%"
              height="533"
              style={{ background: "transparent", border: "1px solid #ccc" }}
              title="Airtable waitlist form"
            />
          </div>
        </div>
      ) : null}

    </div>
  );
}
