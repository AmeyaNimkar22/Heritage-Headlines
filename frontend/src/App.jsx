import Header from "./components/Header";
import Hero from "./components/Hero";
import NewsFeed from "./components/NewsFeed";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <main className="bg-white">
        <NewsFeed />
      </main>
    </>
  );
}

