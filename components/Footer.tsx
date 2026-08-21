"use client";

import Logo from "@assets/logo.svg";
import { useEffect, useRef, useState } from "react";

type CopyStatus = "idle" | "copied" | "error";

async function copyToClipboard(text: string) {
  if (!navigator.clipboard || !window.isSecureContext) {
    throw new Error("Clipboard unavailable");
  }

  await navigator.clipboard.writeText(text);
}

function formatSaoPauloTime() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

const emailAddress = "bernbechtold@gmail.com";
const copyResetDelayMs = 1_800;
const clockRefreshIntervalMs = 30_000;

export function Footer() {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const [saoPauloTime, setSaoPauloTime] = useState("--:--");
  const copyResetTimer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    function updateTime() {
      setSaoPauloTime(formatSaoPauloTime());
    }

    updateTime();
    const clockInterval = setInterval(updateTime, clockRefreshIntervalMs);

    return () => {
      clearInterval(clockInterval);
      if (copyResetTimer.current) {
        clearTimeout(copyResetTimer.current);
        copyResetTimer.current = null;
      }
    };
  }, []);

  async function handleCopy(email: string) {
    if (copyResetTimer.current) {
      clearTimeout(copyResetTimer.current);
      copyResetTimer.current = null;
    }

    try {
      await copyToClipboard(email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }

    copyResetTimer.current = setTimeout(() => {
      setCopyStatus("idle");
      copyResetTimer.current = null;
    }, copyResetDelayMs);
  }

  function handleBackToTop() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  const copyActionLabel =
    copyStatus === "copied"
      ? "Copied — talk soon ✓"
      : copyStatus === "error"
        ? "Copy unavailable"
        : "Copy email ↗";

  return (
    <footer
      id="footer"
      aria-labelledby="footer-heading"
      className="text-white"
    >
      <div className="footer-dither" aria-hidden="true" />

      <div className="bg-black">
        <div className="content-container py-12 md:py-24">
          <p className="mb-5 font-mono text-sm uppercase tracking-wider text-neutral-400">
            / Let&apos;s make something
          </p>

          <h2
            id="footer-heading"
            className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight xs:text-6xl md:text-7xl"
          >
            Have a complex idea?
          </h2>

          <p className="section__paragraph mt-6 max-w-xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            I work where product, design, and engineering meet. Tell me what
            you&apos;re trying to untangle.
          </p>

          <button
          type="button"
          onClick={() => handleCopy(emailAddress)}
          aria-describedby="copy-email-feedback"
          aria-label={`Copy ${emailAddress}`}
            className="group mt-10 flex w-full cursor-pointer flex-col items-start justify-between gap-3 overflow-hidden border border-neutral-500 px-5 py-5 text-left transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-reduce:transition-none sm:flex-row sm:items-center"
          >
            <span className="min-w-0 break-all font-serif text-xl sm:text-2xl md:text-3xl">
              {emailAddress}
          </span>
          <span className="shrink-0 font-mono text-xs uppercase tracking-wider">
            {copyActionLabel}
          </span>
        </button>

        <span id="copy-email-feedback" aria-live="polite" className="sr-only">
          {copyStatus === "copied" ? "Email copied to clipboard" : ""}
          {copyStatus === "error"
            ? "Clipboard unavailable. The email address is visible on screen."
            : ""}
          </span>

          <nav
            aria-label="Social links"
            className="border-b border-neutral-700"
          >
            <a
              href="https://br.linkedin.com/in/bbechtold"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-14 items-center justify-between py-5 font-mono text-sm uppercase tracking-wide transition-colors hover:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
            >
              <span>LinkedIn</span>
              <span
                aria-hidden="true"
                className="transition-transform motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1 motion-reduce:transition-none"
              >
                ↗
              </span>
            </a>
          </nav>

          <div className="grid grid-cols-[auto_1fr] items-center gap-6 pt-6 font-mono text-xs uppercase text-neutral-400 sm:grid-cols-[auto_1fr_auto]">
            <div className="w-fit shrink-0 bg-white p-1">
              <Logo
                role="img"
                aria-label="Bernardo Bechtold"
                className="size-8"
              />
            </div>

            <div className="flex-1">
              <p className="text-white">
                <span className="mr-2 text-green-400" aria-hidden="true">
                  ●
                </span>
                Available for select work
              </p>
              <p className="mt-1">
                São Paulo · {saoPauloTime} · © 2026
              </p>
            </div>

            <button
              type="button"
              onClick={handleBackToTop}
              className="col-span-2 w-fit cursor-pointer justify-self-end py-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none sm:col-span-1"
            >
              Back to top <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
