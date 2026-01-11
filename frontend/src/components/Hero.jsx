import React from "react";

export default function Hero() {
  return (
    <section
      className="relative text-white py-20 px-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1703381132774-caeab4f6a9db?q=80&w=1400&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-left">
        <h2 className="text-3xl md:text-4xl font-semibold leading-snug mb-4">
          Preserving the Past.
          <br />
          Informing the Present.
        </h2>

        <p className="max-w-2xl text-gray-200 text-base md:text-lg">
          AI-curated journalism highlighting global heritage preservation,
          restoration efforts, and cultural conservation.
        </p>
      </div>

      {/* Fade into content */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
