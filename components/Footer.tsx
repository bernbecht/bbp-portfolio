"use client";

import Logo from "@assets/logo.svg";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons/faCircleCheck";
import { faCopy } from "@fortawesome/free-regular-svg-icons/faCopy";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

async function copyToClipboardSync(text: string) {
  if (!navigator.clipboard || !window.isSecureContext) {
    throw new Error("Clipboard unavailable");
  }

  navigator.clipboard.writeText(text);
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
    <footer className="relative pt-12 md:pt-24 pb-8">
      <div className="absolute inset-0 z-0 opacity-20 dither" aria-hidden />

      <div className="relative z-10 content-container text-xs xs:text-sm sm:text-base lg:text-lg">
        <address>
          <div className="flex flex-col gap-4">
            {/* EMAIL */}
            <div>
              <button
                type="button"
                onClick={() => {
                  handleCopy(emailAddress);
                }}
                aria-describedby="copy-email-feedback"
                aria-label={copied ? "Email copied" : "Copy email address"}
                className="relative flex items-center gap-2 w-full text-left cursor-pointer hover:text-blue-600 transition-colors"
              >
                {/* normal */}
                <div
                  className={`flex items-center gap-2 w-full transition-opacity duration-150 ${
                    copied ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="font-medium text-[1.8em]">Email</span>

                  <div className="flex-grow border-t border-black" />

                  <span className="text-[1.8em] font-serif">
                    {emailAddress}
                  </span>

                  <FontAwesomeIcon icon={faCopy} size="lg" />
                </div>

                {/* copied */}
                <div
                  className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-150 ${
                    copied ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-[1.8em] font-serif font-medium tracking-wide">
                    Email copied!
                  </span>

                  <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                </div>
              </button>

              <span
                id="copy-email-feedback"
                aria-live="polite"
                className="sr-only"
              >
                {copied && "Email copied to clipboard"}
              </span>
            </div>

            {/* LINKEDIN */}
            <div className="flex items-center gap-2">
              <a
                href="https://br.linkedin.com/in/bbechtold"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-600 transition-colors w-full"
              >
                <span className="font-medium text-[1.8em]">LinkedIn</span>

                <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="lg" />

                <div className="flex-grow border-t border-black" />
              </a>
            </div>
          </div>
        </address>

        <div className="text-center mt-12 md:mt-24">
          <p className="text-[1.8em] font-medium border-b border-black pt-4 pb-4 font-serif">
            Thank you and have a nice day!
          </p>
        </div>

        <div className="flex justify-between items-center mt-4 gap-16">
          <Logo className="w-12 h-12" />
          <span className="text-sm">© 2026 Bernardo Bechtold</span>
        </div>
      </div>
    </footer>
  );
}
