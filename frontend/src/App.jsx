import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import NewsFeed from "./components/NewsFeed";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Regions from "./pages/Regions";
import Spotlight from "./components/Spotlight";
import HeritageDetail from "./pages/HeritageDetail";
import HeritageAnalysis from "./pages/HeritageAnalysis";

function Home() {
  return (
    <>
      <Hero />
      <ErrorBoundary>
        <NewsFeed />
      </ErrorBoundary>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<Home />} />
        <Route path="/regions" element={<Regions />} />
        <Route path="/spotlight" element={<Spotlight />} />
        <Route path="/heritage/:id" element={<HeritageDetail />} />
        <Route path="/heritage/:id/analysis" element={<HeritageAnalysis />} />


      </Routes>

      <Footer />
    </Router>
  );
}
