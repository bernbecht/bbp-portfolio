export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur border-b">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-[var(--layout-nav)] px-4 py-4 flex items-center justify-between"
      >
        <a href="/" className="font-bold tracking-tight text-3xl">
          BBP
        </a>
        <ul className="flex items-center gap-6">
          <li>
            <a
              href="#about"
              className="text-m font-semibold text-gray-700 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#blog"
              className="text-m font-thin text-gray-700 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Blog
            </a>
          </li>
          <li>
            <a
              href="#books"
              className="text-m font-thin text-gray-700 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Books
            </a>
          </li>
        </ul>
        <div>
          <button>PT</button>/<button>EN</button>
        </div>
      </nav>
    </header>
  );
}
