import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn("⚠️ MONGODB_URI is not set in backend/.env file.");
    return false;
  }

  if (uri.includes("<password>") || uri.includes("<cluster-address>")) {
    console.warn(
      "⚠️ MONGODB_URI contains placeholder values (<password> or <cluster-address>).\n" +
      "👉 Please update backend/.env with your real MongoDB Atlas password and cluster domain from cloud.mongodb.com."
    );
    return false;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    return false;
  }
};

