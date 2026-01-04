const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/news');
require('dotenv').config();

const app = express();
app.use(cors());
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
