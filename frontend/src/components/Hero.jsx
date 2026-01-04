import React from "react";

export default function Hero() {
  return (
    <section
  className="relative text-white py-24 px-6 text-center bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1703381132774-caeab4f6a9db?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative max-w-4xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Preserving the Past. Informing the Present.
    </h2>
    <p className="text-lg md:text-xl text-gray-200">
      Daily AI-curated stories on global heritage preservation, restoration,
      and cultural conservation efforts.
    </p>
  </div>
</section>

  );
}
