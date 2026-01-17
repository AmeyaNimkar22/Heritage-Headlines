import mongoose from "mongoose";

const connectDB = async (app) => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB Atlas Connected:", conn.connection.name);

  // IMPORTANT
  app.locals.db = conn.connection.db;
};

export default connectDB;
