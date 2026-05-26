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
      <header className="backdrop-blur">
        <nav
          aria-label="Main navigation"
          className="content-container flex flex-wrap items-center justify-between gap-4 py-4"
        >
          <NavLink
            href="/"
            aria-label="Home"
            className="inline-flex shrink-0 pressable-button"
          >
            <Logo />
          </NavLink>
          <div className="min-w-0 border border-black px-3">
            <ul className="flex shrink-0 list-none items-stretch gap-4 p-0 font-mono text-sm [&>li]:flex [&>li]:items-stretch [&>li:not(:last-child)]:border-r [&>li:not(:last-child)]:border-black [&>li>a]:flex [&>li>a]:h-full [&>li>a]:min-h-11 [&>li>a]:items-center [&>li>a]:px-0.5 [&>li>a]:py-3 [&>li:not(:last-child)>a]:pr-4 [&>li>button]:flex [&>li>button]:h-full [&>li>button]:min-h-11 [&>li>button]:w-full [&>li>button]:items-center [&>li>button]:py-3">
              <li className="relative">
                <NavLink
                  href="/projects"
                  className=" 
                  group pressable-button group-hover:bg-black hover:text-white transition"
                >
                  Projects
                  <span
                    className="origin-bottom transition absolute top-0 left-0 w-[102%] h-full bg-black block mix-blend-difference scale-y-0 group-hover:scale-y-100
                  "
                  ></span>
                </NavLink>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleSayHello}
                  className="pressable-button cursor-pointer font-mono font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                >
                  Say Hello
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
