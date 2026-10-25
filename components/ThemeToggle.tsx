"use client";

import { useSyncExternalStore } from "react";

const storageKey = "portfolio-theme";
const changeEvent = "portfolio-theme-change";
let sessionTheme: "light" | "dark" | null = null;

const fadeDuration = 400;
let fadeTimer: ReturnType<typeof setTimeout> | undefined;
let transitionElements: (HTMLElement | SVGElement)[] = [];

function finishThemeFade() {
  clearTimeout(fadeTimer);
  document.documentElement.removeAttribute('data-theme-transition');
  for (const element of transitionElements) {
    for (const suffix of ['', '-before', '-after']) {
      element.style.removeProperty(`--theme-existing-transition${suffix}`);
    }
  }
  transitionElements = [];
}

function prepareThemeFade() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finishThemeFade();
    return false;
  }
  clearTimeout(fadeTimer);
  const root = document.documentElement;
  if (!root.hasAttribute('data-theme-transition')) {
    transitionElements = [root, ...root.querySelectorAll('*')].filter(
      (element): element is HTMLElement | SVGElement =>
        element instanceof HTMLElement || element instanceof SVGElement,
    );
    // Read before writing so existing hover, transform and opacity transitions survive.
    const transitions = transitionElements.map((element) =>
      [null, '::before', '::after'].map((pseudo) => {
        const transition = getComputedStyle(element, pseudo).transition;
        return transition === 'none' ? 'opacity 0s' : transition;
      }),
    );
    transitionElements.forEach((element, index) => {
      ['', '-before', '-after'].forEach((suffix, pseudoIndex) => {
        element.style.setProperty(
          `--theme-existing-transition${suffix}`,
          transitions[index][pseudoIndex],
        );
      });
    });
    root.setAttribute('data-theme-transition', '');
  }
  // Establish the current colors before changing the palette. On rapid clicks,
  // CSS transitions reverse from their currently interpolated colors.
  void root.offsetWidth;
  return true;
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  function syncTheme() {
    let saved: string | null = sessionTheme;
    if (!saved) {
      try {
        saved = localStorage.getItem(storageKey);
      } catch {}
    }
    finishThemeFade();
    const root = document.documentElement;
    root.setAttribute('data-theme-immediate', '');
    void root.offsetWidth;
    root.dataset.theme =
      saved === "light" || saved === "dark"
        ? saved
        : media.matches
          ? "dark"
          : "light";
    void root.offsetWidth;
    root.removeAttribute('data-theme-immediate');
    onChange();
  }
  function syncStorage(event: StorageEvent) {
    if (event.key !== storageKey && event.key !== null) return;
    sessionTheme = null;
    syncTheme();
  }
  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", syncStorage);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  reducedMotion.addEventListener("change", finishThemeFade);
  media.addEventListener("change", syncTheme);
  // Read the theme applied before first paint, including changes before hydration.
  syncTheme();
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", syncStorage);
    media.removeEventListener("change", syncTheme);
    reducedMotion.removeEventListener("change", finishThemeFade);
    finishThemeFade();
  };
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );

  function toggleTheme() {
    const theme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    const shouldFade = prepareThemeFade();
    sessionTheme = theme;
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(storageKey, theme);
    } catch {}
    if (shouldFade) fadeTimer = setTimeout(finishThemeFade, fadeDuration);
    window.dispatchEvent(new Event(changeEvent));
  }

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className="theme-toggle inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center text-foreground hover:bg-surface-hover"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="theme-sun size-6"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="theme-moon size-6"
      >
        <path d="M20.9 13.1A9 9 0 0 1 10.9 3.1a9 9 0 1 0 10 10Z" />
      </svg>
    </button>
  );
}
