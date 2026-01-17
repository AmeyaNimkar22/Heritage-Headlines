import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AILoading from "../components/AIloading";
import ReactMarkdown from "react-markdown";


const HeritageAnalysis = () => {
  const location = useLocation();
  const { heritageName, description } = location.state || {};

  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (!heritageName) return;

    axios
      .post("http://localhost:5001/api/ai-analysis", {
        heritageName,
        description
      })
      .then(res => setAnalysis(res.data.analysis)) // ✅ FIX
      .catch(console.error);
  }, [heritageName, description]);

  if (!heritageName) return <p>No heritage selected</p>;
  if (!analysis) {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <AILoading />
    </div>
  );
}

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-6">{heritageName}</h1>
      <span className="inline-block mb-4 px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
  AI Generated Heritage Analysis
</span>

      <article className="prose prose-lg dark:prose-invert max-w-none">
  <ReactMarkdown>{analysis}</ReactMarkdown>
</article>

    </div>
  );
};

export default HeritageAnalysis;
