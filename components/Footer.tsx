"use client";

import { faCircleCheck } from "@fortawesome/free-regular-svg-icons/faCircleCheck";
import { faCopy } from "@fortawesome/free-regular-svg-icons/faCopy";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function copyToClipboardSync(text: string) {
  if (!navigator.clipboard || !window.isSecureContext) {
    throw new Error("Clipboard unavailable");
  }

  navigator.clipboard.writeText(text);
}

export function Footer() {
  const [copiedText, setCopiedText] = useState<boolean>(false);

  function handleCopy(text: string) {
    copyToClipboardSync(text);

    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 1500);
  }

  return (
    <footer
      id="footer"
      aria-labelledby="footer-heading"
      className="relative pt-24 pb-8"
    >
      <div className="absolute inset-0 z-0 opacity-20 dither" aria-hidden />

      <div className="relative z-10 content-container text-xs xs:text-sm sm:text-base lg:text-lg">
        <address>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-[1.8em]">Email</span>

              <div className="flex-grow border-t border-black" />

              <button
                type="button"
                onClick={() => handleCopy("bernbechtold@gmail.com")}
                aria-describedby="copy-email-feedback"
                aria-label="Copy email address"
                className="flex gap-2 items-baseline hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span className="text-[1.8em] font-serif" aria-hidden="true">
                  bernbechtold@gmail.com
                </span>

                <FontAwesomeIcon
                  icon={copiedText ? faCircleCheck : faCopy}
                  aria-hidden="true"
                  size="lg"
                />
              </button>

              <span
                id="copy-email-feedback"
                aria-live="polite"
                className="sr-only"
              >
                {copiedText && "Email copied to clipboard"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://br.linkedin.com/in/bbechtold"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile, opens in new tab"
                className="flex items-baseline gap-2 hover:text-blue-600 transition-colors"
              >
                <span className="font-medium text-[1.8em]">LinkedIn</span>

                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  aria-hidden="true"
                  size="lg"
                />
              </a>

              <div className="flex-grow border-t border-black" />
            </div>
          </div>

          <div className="text-center mt-24">
            <p className="text-[1.8em] font-medium border-b border-black pt-4 pb-4 font-serif">
              Thank you and have a nice day!
            </p>
          </div>
        </address>
        <div className="flex justify-between items-center mt-4 gap-16">
          <a href="/" className="font-bold tracking-tight text-[1.8em] logo">
            BBP
          </a>
          <span className="text-[0.9em]">© 2026 Bernardo Bechtold</span>
        </div>
      </div>
    </footer>
  );
}
