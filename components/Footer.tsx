"use client";

import { faSquareLinkedin } from "@fortawesome/free-brands-svg-icons/faSquareLinkedin";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons/faCircleCheck";
import { faCopy } from "@fortawesome/free-regular-svg-icons/faCopy";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Literata } from "next/font/google";
import { useState } from "react";

const literata = Literata({ subsets: ["latin"] });

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
      className="relative pt-24 pb-8 px-6 md:px-12 lg:px-20"
    >
      <div className="absolute inset-0 z-0 opacity-30 dither" aria-hidden />

      <div className="relative z-10 content-container">
        <address>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="font-medium text-3xl">Email</span>

              <div className="flex-grow border-t border-black" />

              <button
                type="button"
                onClick={() => handleCopy("bernbechtold@gmail.com")}
                aria-describedby="copy-email-feedback"
                aria-label="Copy email address"
                className="flex gap-2 items-baseline hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span
                  className={`text-3xl ${literata.className}`}
                  aria-hidden="true"
                >
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

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium text-3xl">LinkedIn</span>
                <a
                  href="https://br.linkedin.com/in/bbechtold"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile, opens in new tab"
                >
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    aria-hidden="true"
                  />
                </a>
              </div>

              <div className="flex-grow border-t border-black" />
            </div>
          </div>

          <div className="text-center mt-24">
            <p
              className={`text-3xl font-medium border-b border-black pt-4 pb-4 ${literata.className}`}
            >
              A life without fun is not a good one
            </p>
          </div>
        </address>

        <div className="flex justify-between items-center mt-8">
          <a href="/" className="font-bold tracking-tight text-3xl">
            BBP
          </a>

          <span>
            designed and created by Bernardo Bechtold - All rights reserved
          </span>

          <a
            href="https://br.linkedin.com/in/bbechtold"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile, opens in new tab"
          >
            <FontAwesomeIcon icon={faSquareLinkedin} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
