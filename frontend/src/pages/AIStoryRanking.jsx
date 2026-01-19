import { useEffect, useState } from "react";
import axios from "axios";
import AIRankedList from "../components/AIRankedList";

export default function AIStoryRanking() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankedStories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/stories/ranked"
        );

        setStories(res.data);
      } catch (err) {
        console.error("AI ranking fetch error:", err);
        setError("Failed to load AI-ranked stories");
      } finally {
        setLoading(false);
      }
    };

    fetchRankedStories();
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Analyzing stories…</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">
        AI-Ranked Heritage Stories
      </h1>

      <p className="text-gray-600 mb-6">
        Stories ranked using heritage relevance and public sentiment analysis.
      </p>

      <AIRankedList stories={stories} />
    </div>
  );
}
