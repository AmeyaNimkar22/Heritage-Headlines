import React from "react";

export default function Hero() {
  return (
    <section
      className="relative text-white py-20 px-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504639650150-bf773680d8c3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-left " style={{ fontFamily: "Elsie, serif" }}>
  <h2 className="text-3xl md:text-4xl font-semibold leading-snug mb-4">
    Preserving the Past.
    <br />
    Informing the Present.
  </h2>
  

  <p className="max-w-2xl text-gray-200 text-base md:text-lg " style={{ fontFamily: "Baskerville, serif" }}>
    AI-curated journalism highlighting global heritage preservation,
    restoration efforts, and cultural conservation.
  </p>
</div>


      {/* Fade into content */}
      <div className="absolute bottom-0 left-0 w-full h-6 bg-white"></div>

    </section>
  );
}
