const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=heritage%20preservation&apiKey=${process.env.NEWSAPI_KEY}`
    );
    res.json(response.data.articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch news" });
  }
});

module.exports = router;
