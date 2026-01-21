import { faSquareLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Literata } from "next/font/google";

const literata = Literata({
  subsets: ["latin"],
});

export function Footer() {
  return (
    <footer className="relative pt-24 pb-8 px-6 md:px-12 lg:px-20">
      {/* Dotted Background */}
      <div className="absolute inset-0 z-0 opacity-30 dither"></div>

      <div className="relative z-10 content-container">
        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="flex gap-2 items-center">
              <span className="font-medium text-3xl">Email</span>
              <FontAwesomeIcon icon={faCopy} size="lg" />
            </span>
            <div className="flex-grow border-t border-black"></div>
            <a
              href="mailto:bernbechtold@gmail.com"
              className={`text-3xl hover:text-blue-600 transition-colors ${literata.className}`}
            >
              bernbechtold@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex gap-2 items-center">
              <span className="font-medium text-3xl">LinkedIn</span>
              <a href="https://br.linkedin.com/in/bbechtold">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            </span>
            <div className="flex-grow border-t border-black"></div>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center mt-24">
          <p
            className={`text-3xl font-medium border-b border-black pt-4 pb-4 ${literata.className}`}
          >
            A life without fun is not a good one
          </p>
        </div>

        <div className="flex justify-between items-center mt-8">
          {/* logo */}
          <a href="/" className="font-bold tracking-tight text-3xl">
            BBP
          </a>
          {/* rights */}
          <span>
            designed and created by Bernardo Bechtold - All rights reserved
          </span>
          {/* linkedin logo */}

          <a href="https://br.linkedin.com/in/bbechtold">
            <FontAwesomeIcon icon={faSquareLinkedin} size="2x" />
          </a>
        </div>
      </div>
    </footer>
  );
}
