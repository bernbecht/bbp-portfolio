import { Literata } from "next/font/google";

const literata = Literata({
  subsets: ["latin"],
});

export function Footer() {
  return (
    <footer className="relative pt-24 pb-8 px-6 md:px-12 lg:px-20 bg-white">
      {/* Dotted Background */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%23000'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="font-medium text-3xl">Email</span>
            <div className="flex-grow border-t border-black"></div>
            <a
              href="mailto:bernbechtold@gmail.com"
              className={`text-3xl hover:text-blue-600 transition-colors ${literata.className}`}
            >
              bernbechtold@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-3xl">LinkedIn</span>
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

        <div className="flex justify-between mt-8">
          {/* logo */}
          <a href="/" className="font-bold tracking-tight text-3xl">
            BBP
          </a>
          {/* rights */}
          <span>
            designed and created by Bernardo Bechtold - All rights reserved
          </span>
          {/* linkedin logo */}
          <span>Linekding logo</span>
        </div>
      </div>
    </footer>
  );
}
