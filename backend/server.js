import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import newsRoutes from "./routes/news.js";
import connectDB from "./config/db.js";
import heritageRoutes from "./routes/heritageRoutes.js";




dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// ⛓️ CONNECT TO MONGODB FIRST
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // ✅ REGISTER ROUTES ONLY AFTER DB CONNECTS
    app.use("/api/news", newsRoutes);
    connectDB(app);

// Routes
app.use("/api/heritage", heritageRoutes);
app.use("/api/news", newsRoutes);


    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Backend running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
