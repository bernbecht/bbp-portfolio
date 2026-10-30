"use client";

import { NavLink } from "@/components/NavLink";
import ThemeToggle from "@/components/ThemeToggle";
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
          className="content-container flex flex-wrap items-center justify-between gap-2 py-3"
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
            <ul className="flex shrink-0 flex-wrap justify-end list-none items-stretch gap-1 p-0 type-label [&>li]:flex [&>li]:items-stretch [&>li>a]:flex [&>li>a]:min-h-11 [&>li>a]:items-center [&>li>a]:px-3 [&>li>button]:flex [&>li>button]:min-h-11 [&>li>button]:items-center [&>li>button]:px-2 sm:[&>li>button]:px-3">
              <li><ThemeToggle /></li>
              <li className="relative pressable-button">
                <NavLink
                  href="/projects"
                  match="prefix"
                  activeClassName="bg-surface-hover font-bold text-foreground"
                  className="transition-colors hover:bg-inverse hover:text-on-inverse"
                >
                  Work
                </NavLink>
              </li>
              <li className="relative pressable-button">
                <button
                  type="button"
                  onClick={handleSayHello}
                  className="group cursor-pointer border border-strong bg-inverse font-mono font-bold text-on-inverse transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
