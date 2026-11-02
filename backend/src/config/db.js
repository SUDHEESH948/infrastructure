import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Helper to sanitize MongoDB connection string (removes < > and URL-encodes special characters in passwords like @)
export const sanitizeMongoUri = (rawUri) => {
  if (!rawUri) return rawUri;
  const match = rawUri.match(/^(mongodb(?:\+srv)?:\/\/)([^:]+):(.*)@([^@/]+)(\/.*)?$/);
  if (!match) return rawUri;
  const [, protocol, user, pass, host, rest = ""] = match;
  let cleanPass = pass;
  if (cleanPass.startsWith("<") && cleanPass.endsWith(">")) {
    cleanPass = cleanPass.slice(1, -1);
  }
  return (
    protocol +
    encodeURIComponent(user) +
    ":" +
    encodeURIComponent(decodeURIComponent(cleanPass)) +
    "@" +
    host +
    rest
  );
};

export const connectDB = async () => {
  let uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn("⚠️ MONGODB_URI is not set in backend/.env file.");
    return false;
  }

  // Check for unreplaced placeholder
  if (uri.includes("<password>") || uri.includes("<cluster-address>")) {
    console.warn(
      "⚠️ MONGODB_URI contains placeholder values (<password> or <cluster-address>).\n" +
      "👉 Please update backend/.env with your real MongoDB Atlas password and cluster domain from cloud.mongodb.com."
    );
    return false;
  }

  // Auto-sanitize password with special chars or < > brackets
  uri = sanitizeMongoUri(uri);

  // Check if cluster domain is missing the Atlas unique hash (e.g. cluster0.mongodb.net)
  if (uri.includes("@cluster0.mongodb.net")) {
    console.warn(
      "⚠️ Your cluster address appears to be '@cluster0.mongodb.net'.\n" +
      "👉 In MongoDB Atlas, clusters usually have a unique 5-6 letter code, like: @cluster0.abcde.mongodb.net\n" +
      "👉 Please check your connection string in cloud.mongodb.com -> Database -> Connect -> Drivers."
    );
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    return false;
  }
};

