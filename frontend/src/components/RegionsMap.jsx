export default function RegionsMap() {
  return (
    <section id="regions" className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Global Coverage
      </h2>
      <p className="text-gray-600 mb-6">
        Heritage news coverage across regions worldwide.
      </p>

      <div className="w-full h-[400px] rounded-xl overflow-hidden border border-gray-200">
        <iframe
          title="World Map"
          src="https://www.google.com/maps?q=World&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}

