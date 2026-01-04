import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <div>
          <h1 className="text-lg md:text-xl font-semibold tracking-tight text-gray-900">
            Heritage Headlines
          </h1>
          <span className="hidden sm:block text-xs text-gray-500">
            AI-curated global heritage news
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600 ">
          <a href="#news" className="hover:text-gray-900 transition">News</a>
          <a href="#regions" className="hover:text-gray-900 transition">Regions</a>
          <a href="#about" className="hover:text-gray-900 transition">About</a>
          <button className="ml-4 px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition">
            Subscribe
          </button>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4 text-gray-700">
          <a href="#news" className="block">News</a>
          <a href="#regions" className="block">Regions</a>
          <a href="#about" className="block">About</a>
          <button className="w-full mt-2 px-4 py-2 rounded-full bg-gray-900 text-white">
            Subscribe
          </button>
        </div>
      )}
    </header>
  );
}
