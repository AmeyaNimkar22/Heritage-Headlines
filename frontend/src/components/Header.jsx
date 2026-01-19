import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Heritage Headlines Logo"
            className="h-10 w-auto object-contain"
          />
          <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-900">
            Heritage Headlines
          </h2>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <Link to="/" className="hover:text-gray-900 transition">
            Daily Digest
          </Link>

          <Link to="/regions" className="hover:text-gray-900 transition">
            Map
          </Link>

          <Link to="/spotlight" className="hover:text-gray-900 transition">
            Spotlight
          </Link>

          <Link to="/ai-ranking" className="hover:text-gray-900 transition">
            AI Ranking
          </Link>

          <Link to="#about" className="hover:text-gray-900 transition">
            About
          </Link>

          <button className="ml-4 px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition">
            Subscribe
          </button>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 text-xl"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4 text-gray-700">
          <Link to="/" className="block" onClick={() => setOpen(false)}>
            Daily Digest
          </Link>

          <Link to="/regions" className="block" onClick={() => setOpen(false)}>
            Map
          </Link>

          <Link
            to="/spotlight"
            className="block"
            onClick={() => setOpen(false)}
          >
            Spotlight
          </Link>

          <Link
            to="/ai-ranking"
            className="block"
            onClick={() => setOpen(false)}
          >
            AI Ranking
          </Link>

          <Link to="#about" className="block" onClick={() => setOpen(false)}>
            About
          </Link>

          <button className="w-full mt-2 px-4 py-2 rounded-full bg-gray-900 text-white">
            Subscribe
          </button>
        </div>
      )}
    </header>
  );
}
