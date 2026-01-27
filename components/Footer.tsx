"use client";

import { faSquareLinkedin } from "@fortawesome/free-brands-svg-icons/faSquareLinkedin";
import { faCopy } from "@fortawesome/free-regular-svg-icons/faCopy";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Literata } from "next/font/google";
import type { MouseEvent } from "react";

const literata = Literata({ subsets: ["latin"] });

function copyText(text: string, e: MouseEvent<HTMLButtonElement>) {
  const button = e.currentTarget;

  if (!navigator.clipboard) {
    document.execCommand("copy");
    return;
  }

  button.classList.add("animate-bounce");

  navigator.clipboard.writeText(text).catch(console.error);

  setTimeout(() => {
    button.classList.remove("animate-bounce");
  }, 600);
}

const handleCopy = (text: string) => (e: MouseEvent<HTMLButtonElement>) =>
  copyText(text, e);

export function Footer() {
  return (
    <footer className="relative pt-24 pb-8 px-6 md:px-12 lg:px-20">
      <div className="absolute inset-0 z-0 opacity-30 dither" />

      <div className="relative z-10 content-container">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2"
              role="group"
              aria-labelledby="email-label"
            >
              <span id="email-label" className="font-medium text-3xl">
                Email
              </span>
              <button
                onClick={handleCopy("bernbechtold@gmail.com")}
                aria-label="Copy email to clipboard"
                className="focus:outline-none focus-visible:ring-2 rounded cursor-pointer"
              >
                <FontAwesomeIcon icon={faCopy} size="lg" />
              </button>
            </div>

            <div className="flex-grow border-t border-black" />

            <a
              href="mailto:bernbechtold@gmail.com"
              className={`text-3xl hover:text-blue-600 transition-colors ${literata.className}`}
            >
              bernbechtold@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-3xl">LinkedIn</span>
              <a
                href="https://br.linkedin.com/in/bbechtold"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
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
          >
            <FontAwesomeIcon icon={faSquareLinkedin} size="2x" />
          </a>
        </div>
      </div>
    </footer>
  );
}
