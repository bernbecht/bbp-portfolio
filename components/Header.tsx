// import MyIcon from "../public/logo.svg"; // The file path can be outside the public folder
import Logo from "@assets/logo.svg";
import { StatusBar } from "./StatusBar";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="content-container py-4 flex items-center justify-between"
      >
        <Logo />
        <StatusBar />
      </nav>
    </header>
  );
}
