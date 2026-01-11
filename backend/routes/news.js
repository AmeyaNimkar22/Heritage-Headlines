const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      'https://newsapi.org/v2/everything',
      {
        params: {
          q: 'heritage OR monument OR archaeological OR UNESCO OR restoration',
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: 20,
          apiKey: process.env.NEWSAPI_KEY
        }
      }
    );

    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch news' });
  }
});
