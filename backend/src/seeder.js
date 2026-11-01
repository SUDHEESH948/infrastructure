import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Project from "./models/Project.js";
import Service from "./models/Service.js";
import { initialProjects } from "./data/projectsData.js";
import { initialServices } from "./data/servicesData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const importData = async () => {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      console.error("❌ Seeding cancelled: Unable to connect to MongoDB.");
      process.exit(1);
    }

    // Clear existing data
    await Project.deleteMany();
    await Service.deleteMany();

    // Insert seeds
    await Project.insertMany(initialProjects);
    await Service.insertMany(initialServices);

    console.log("✅ Seed Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      console.error("❌ Destruction cancelled: Unable to connect to MongoDB.");
      process.exit(1);
    }

    await Project.deleteMany();
    await Service.deleteMany();

    console.log("🗑️ Seed Data Destroyed Successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Destruction failed: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
