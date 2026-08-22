"use client";

import { NavLink } from "@/components/NavLink";
import Logo from "@assets/logo.svg";
import { useCallback } from "react";
import { useWebHaptics } from "web-haptics/react";

function scrollToFooter() {
  document.getElementById("footer")?.scrollIntoView();
}

export default function Header() {
  const { trigger } = useWebHaptics();

  const handleSayHello = useCallback(() => {
    scrollToFooter();
    trigger("success");
  }, [trigger]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black bg-white/90 backdrop-blur-md">
        <nav
          aria-label="Main navigation"
          className="content-container flex items-center justify-between gap-4 py-3"
        >
          <NavLink
            href="/"
            aria-label="Home"
            className="inline-flex shrink-0 items-center gap-3 pressable-button"
          >
            <Logo className="size-9" />
            <span className="hidden font-mono text-[11px] uppercase leading-tight tracking-wider sm:block">
              Bernardo<br />Bechtold
            </span>
          </NavLink>
          <div className="min-w-0">
            <ul
              className="flex shrink-0 list-none items-stretch gap-1 p-0 font-mono text-xs uppercase tracking-wider [&>li]:flex [&>li]:items-stretch [&>li>a]:flex [&>li>a]:min-h-10 [&>li>a]:items-center [&>li>a]:px-3 [&>li>button]:flex [&>li>button]:min-h-10 [&>li>button]:items-center [&>li>button]:px-3"
            >
              <li className="relative pressable-button">
                <NavLink
                  href="/projects"
                  match="prefix"
                  activeClassName="bg-neutral-100 font-bold text-black"
                  className="group transition group-hover:bg-black hover:text-white group-aria-[current=page]:bg-black group-aria-[current=page]:text-white"
                >
                  Work
                  <span
                    className="absolute top-0 left-0 block h-full w-[102%] origin-bottom scale-y-0 bg-black mix-blend-difference transition group-hover:scale-y-100 group-aria-[current=page]:scale-y-100"
                    aria-hidden
                  />
                </NavLink>
              </li>
              <li className="relative pressable-button">
                <button
                  type="button"
                  onClick={handleSayHello}
                  className="group cursor-pointer border border-black bg-black font-mono font-bold text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                >
                  Let&apos;s talk <span className="ml-2" aria-hidden="true">↘</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {/* <div className="dither h-2" aria-hidden /> */}
    </>
  );
}
