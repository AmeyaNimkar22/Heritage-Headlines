import axios from "axios";

const API_KEY = "YOUR_NEWSAPI_KEY";

export const fetchHeritageNews = async () => {
  const res = await axios.get(
    `https://newsapi.org/v2/everything?q=heritage OR culture OR monument&language=en&pageSize=100&apiKey=${API_KEY}`
  );

  return res.data.articles;
};
