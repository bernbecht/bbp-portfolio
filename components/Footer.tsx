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
    <footer id="footer">
      <div>
        <p>/ Let&apos;s make something</p>
        <h2>Have a complex idea?</h2>
        <p>
          I work where product, design, and engineering meet. Tell me what
          you&apos;re trying to untangle.
        </p>

        <button
          type="button"
          onClick={() => handleCopy(emailAddress)}
          aria-describedby="copy-email-feedback"
        >
          <span>{emailAddress}</span>
          <span>{copied ? "Copied — talk soon ✓" : "Copy email ↗"}</span>
        </button>

        <span id="copy-email-feedback" aria-live="polite" className="sr-only">
          {copied ? "Email copied to clipboard" : ""}
        </span>

        <nav aria-label="Social links">
          <a>
            <span>LinkedIn</span>
            <span aria-hidden="true">↗</span>{" "}
          </a>
        </nav>

        <div>
          <div>
            <Logo aria-label="Bernardo Bechtold" />

            <div>
              <p>Available for select work</p>
              <p>São Paulo · © 2026</p>
            </div>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to top <span aria-hidden="true">↑</span>
            </button>
          </div>{" "}
        </div>
      </div>
    </footer>
  );
}
