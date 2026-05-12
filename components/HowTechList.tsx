"use client";

import { cn } from "@/lib/cn";
import { useCallback, useEffect, useRef, useState } from "react";

const TECH_ITEMS = [
  "React",
  "TypeScript",
  "Node",
  "Storybook",
  "Playwright",
  "Design Tokens",
  "Material UI",
  "Accessibility",
] as const;

/** Tailwind `md` breakpoint: observers only below this width. */
const MOBILE_MQ = "(max-width: 767px)";

/** Middle third of the viewport as the “active” band. */
const ROOT_MARGIN = "-33% 0px -33% 0px";

const THRESHOLDS: number[] = [0, 0.25, 0.5, 0.75, 1];

interface HowTechListProps {
  readonly className?: string;
}

export default function HowTechList({ className }: Readonly<HowTechListProps>) {
  const listRef = useRef<HTMLUListElement>(null);
  const ratiosRef = useRef<number[]>(
    Array.from({ length: TECH_ITEMS.length }, () => 0),
  );
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const syncMobile = () => setIsMobile(mq.matches);
    syncMobile();
    mq.addEventListener("change", syncMobile);
    return () => mq.removeEventListener("change", syncMobile);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(mq.matches);
    syncMotion();
    mq.addEventListener("change", syncMotion);
    return () => mq.removeEventListener("change", syncMotion);
  }, []);

  const recomputeActive = useCallback(() => {
    const ratios = ratiosRef.current;
    let bestIdx = 0;
    let bestRatio = -1;
    for (let i = 0; i < ratios.length; i++) {
      const r = ratios[i];
      if (r > bestRatio) {
        bestRatio = r;
        bestIdx = i;
      }
    }
    if (bestRatio <= 0) {
      const root = listRef.current;
      if (!root) {
        setActiveIndex(0);
        return;
      }
      const items = root.querySelectorAll("li");
      const mid = window.innerHeight / 2;
      let closestIdx = 0;
      let closestDist = Number.POSITIVE_INFINITY;
      items.forEach((node, i) => {
        const el = node as HTMLLIElement;
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - mid);
        if (d < closestDist) {
          closestDist = d;
          closestIdx = i;
        }
      });
      setActiveIndex(closestIdx);
      return;
    }
    setActiveIndex(bestIdx);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      ratiosRef.current = Array.from({ length: TECH_ITEMS.length }, () => 0);
      return;
    }

    const root = listRef.current;
    if (!root) return;

    const ratios = Array.from({ length: TECH_ITEMS.length }, () => 0);
    ratiosRef.current = ratios;

    const observers: IntersectionObserver[] = [];

    const items = root.querySelectorAll("li");
    items.forEach((node, index) => {
      const io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          ratios[index] = entry.isIntersecting ? entry.intersectionRatio : 0;
          recomputeActive();
        },
        {
          root: null,
          rootMargin: ROOT_MARGIN,
          threshold: THRESHOLDS,
        },
      );
      io.observe(node);
      observers.push(io);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      ratiosRef.current = Array.from({ length: TECH_ITEMS.length }, () => 0);
    };
  }, [isMobile, recomputeActive]);

  return (
    <ul ref={listRef} className={cn(className)}>
      {TECH_ITEMS.map((label, index) => {
        const isActive = !isMobile || activeIndex === index;
        return (
          <li
            key={label}
            className={cn(
              !reduceMotion && "transition-colors duration-200",
              isMobile && !isActive && "text-neutral-300",
              isMobile && isActive && "text-foreground",
              !isMobile && "text-foreground",
            )}
          >
            {label}
          </li>
        );
      })}
    </ul>
  );
}
