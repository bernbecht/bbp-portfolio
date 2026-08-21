"use client";

import Logo from "@assets/logo.svg";
import { useState } from "react";

async function copyToClipboardSync(text: string) {
  if (!navigator.clipboard || !window.isSecureContext) {
    throw new Error("Clipboard unavailable");
  }

  await navigator.clipboard.writeText(text);
}

const emailAddress = "bernbechtold@gmail.com";

export function Footer() {
  const [copied, setCopied] = useState(false);

  async function handleCopy(email: string) {
    await copyToClipboardSync(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <footer id="footer" className="text-white">
      <div className="footer-dither h-16" aria-hidden="true" />

      <div className="relative bg-black">
        <div className="content-container py-12 md:py-24">
          <p className="mb-5 font-mono text-sm uppercase tracking-wider text-neutral-400">
            / Let&apos;s make something
          </p>

          <h2 className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl">
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
            className="group mt-10 flex w-full flex-col items-start justify-between gap-3 border border-neutral-500 px-5 py-5 text-left transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:flex-row sm:items-center"
          >
            <span className="font-serif text-xl sm:text-2xl md:text-3xl">
              {emailAddress}
            </span>
            <span className="shrink-0 font-mono text-xs uppercase tracking-wider">
              {copied ? "Copied — talk soon ✓" : "Copy email ↗"}
            </span>
          </button>

          <span id="copy-email-feedback" aria-live="polite" className="sr-only">
            {copied ? "Email copied to clipboard" : ""}
          </span>

          <nav
            aria-label="Social links"
            className="border-b border-neutral-700"
          >
            <a
              href="https://br.linkedin.com/in/bbechtold"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-14 items-center justify-between py-5 font-mono text-sm uppercase tracking-wide transition-colors hover:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>LinkedIn</span>
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </a>
          </nav>

          <div className="flex flex-col gap-6 pt-6 font-mono text-xs uppercase text-neutral-400 sm:flex-row sm:items-center">
            <div className="w-fit shrink-0 bg-white p-1">
              <Logo aria-label="Bernardo Bechtold" className="size-8" />
            </div>

            <div className="flex-1">
              <p className="text-white">
                <span className="mr-2 text-green-400" aria-hidden="true">
                  ●
                </span>
                Available for select work
              </p>
              <p className="mt-1">São Paulo · © 2026</p>
            </div>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-fit cursor-pointer py-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Back to top <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
