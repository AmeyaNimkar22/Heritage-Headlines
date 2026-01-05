import Header from "./components/Header";
import Hero from "./components/Hero";
import NewsFeed from "./components/NewsFeed";
import RegionsMap from "./components/RegionsMap";


export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <Hero />
      <NewsFeed />
      <RegionsMap />
    </div>
  );
}
