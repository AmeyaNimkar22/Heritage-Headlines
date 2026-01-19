export default function AIRankedList({ stories }) {
  return (
    <div className="space-y-4">
      {stories.map((story, index) => (
        <div
          key={story._id}
          className="border rounded-lg p-4 flex gap-4 items-start"
        >
          <div className="text-xl font-bold text-gray-700">
            #{index + 1}
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold">
              {story.title}
            </h3>

            <p className="text-gray-600 text-sm mt-1">
              {story.description}
            </p>

            <div className="flex gap-4 mt-3 text-sm">
              <span
                className={`font-medium ${
                  story.sentiment_label === "positive"
                    ? "text-green-600"
                    : story.sentiment_label === "negative"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {story.sentiment_label.toUpperCase()}
              </span>

              <span className="text-gray-700">
                Score: {story.final_score}
              </span>

              <span className="text-gray-500">
                Source: {story.source}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
