import Logo from '@assets/logo.svg';
import { NavLink } from '@/components/NavLink';
import { StatusBar } from '@/components/StatusBar';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="content-container flex flex-wrap items-center justify-between gap-4 py-4"
      >
        <NavLink
          href="/"
          aria-label="Home"
          className="inline-flex shrink-0"
        >
          <Logo />
        </NavLink>
        <div className="flex min-w-0 flex-wrap items-center justify-end gap-6 xs:gap-8">
          <ul className="flex shrink-0 list-none items-center gap-4 p-0 font-mono text-sm">
            <li>
              <NavLink href="/projects" className="inline-block px-0.5 py-0.5">
                Projects
              </NavLink>
            </li>
          </ul>
          <StatusBar />
        </div>
      </nav>
    </header>
  );
}
