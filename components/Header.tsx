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
      <header className="sticky top-0 z-50 border-b border-strong bg-background/90 backdrop-blur-md">
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
              Bernardo
              <br />
              Bechtold
            </span>
          </NavLink>
          <div className="min-w-0">
            <ul className="flex shrink-0 list-none items-stretch gap-1 p-0 type-label [&>li]:flex [&>li]:items-stretch [&>li>a]:flex [&>li>a]:min-h-10 [&>li>a]:items-center [&>li>a]:px-3 [&>li>button]:flex [&>li>button]:min-h-10 [&>li>button]:items-center [&>li>button]:px-3">
              <li className="relative pressable-button">
                <NavLink
                  href="/projects"
                  match="prefix"
                  activeClassName="bg-surface-hover font-bold text-foreground"
                  className="group transition group-hover:bg-inverse hover:text-on-inverse group-aria-[current=page]:bg-inverse group-aria-[current=page]:text-on-inverse"
                >
                  Work
                  <span
                    className="absolute top-0 left-0 block h-full w-[102%] origin-bottom scale-y-0 bg-inverse mix-blend-difference transition group-hover:scale-y-100 group-aria-[current=page]:scale-y-100"
                    aria-hidden
                  />
                </NavLink>
              </li>
              <li className="relative pressable-button">
                <button
                  type="button"
                  onClick={handleSayHello}
                  className="group cursor-pointer border border-strong bg-inverse font-mono font-bold text-on-inverse transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
                >
                  Let&apos;s talk{" "}
                  <span className="ml-2" aria-hidden="true">
                    ↓
                  </span>
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
