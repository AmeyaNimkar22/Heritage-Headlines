import Header from "./components/Header";
import Hero from "./components/Hero";
import NewsFeed from "./components/NewsFeed";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header/>
      <Hero />
      <ErrorBoundary>
        <NewsFeed />
      </ErrorBoundary>
      <Footer/>
    </>
  );
}

export default App;
