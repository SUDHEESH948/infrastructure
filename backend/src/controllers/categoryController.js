import mongoose from "mongoose";
import Category from "../models/Category.js";

export const DEFAULT_GALLERY_CATS = [
  "Infrastructure",
  "Construction",
  "Surveying",
  "Project Management",
];

export const DEFAULT_PROJECT_CATS = [
  "Infrastructure",
  "Construction",
  "Surveying",
  "Project Management",
  "Renovation",
];

// In-memory fallback if MongoDB connection is temporarily offline
const inMemoryCategories = {
  gallery: {
    type: "gallery",
    categories: [...DEFAULT_GALLERY_CATS],
    removedCategories: [],
  },
  project: {
    type: "project",
    categories: [...DEFAULT_PROJECT_CATS],
    removedCategories: [],
  },
};

// Helper to seed/ensure default category document exists in MongoDB
const getOrCreateCategoryDoc = async (type) => {
  const defaultList = type === "gallery" ? DEFAULT_GALLERY_CATS : DEFAULT_PROJECT_CATS;

  if (mongoose.connection.readyState !== 1) {
    return inMemoryCategories[type] || { type, categories: defaultList, removedCategories: [] };
  }

  let doc = await Category.findOne({ type });
  if (!doc) {
    doc = await Category.create({
      type,
      categories: defaultList,
      removedCategories: [],
    });
  }
  return doc;
};

// @desc    Get all categories for gallery and projects
// @route   GET /api/categories
// @access  Public
export const getAllCategories = async (req, res) => {
  try {
    const galleryDoc = await getOrCreateCategoryDoc("gallery");
    const projectDoc = await getOrCreateCategoryDoc("project");

    res.status(200).json({
      success: true,
      source: mongoose.connection.readyState === 1 ? "mongodb" : "in_memory_fallback",
      data: {
        gallery: {
          categories: galleryDoc.categories || DEFAULT_GALLERY_CATS,
          removedCategories: galleryDoc.removedCategories || [],
        },
        project: {
          categories: projectDoc.categories || DEFAULT_PROJECT_CATS,
          removedCategories: projectDoc.removedCategories || [],
        },
      },
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      source: "fallback_on_error",
      error: error.message,
      data: {
        gallery: inMemoryCategories.gallery,
        project: inMemoryCategories.project,
      },
    });
  }
};

// @desc    Get categories by type (gallery or project)
// @route   GET /api/categories/:type
// @access  Public
export const getCategoriesByType = async (req, res) => {
  const { type } = req.params;
  const normalizedType = type?.toLowerCase();

  if (normalizedType !== "gallery" && normalizedType !== "project") {
    return res.status(400).json({
      success: false,
      message: `Invalid category type "${type}". Must be 'gallery' or 'project'.`,
    });
  }

  try {
    const doc = await getOrCreateCategoryDoc(normalizedType);
    res.status(200).json({
      success: true,
      source: mongoose.connection.readyState === 1 ? "mongodb" : "in_memory_fallback",
      data: {
        type: normalizedType,
        categories: doc.categories,
        removedCategories: doc.removedCategories,
      },
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      source: "fallback_on_error",
      error: error.message,
      data: inMemoryCategories[normalizedType],
    });
  }
};

// @desc    Update categories in MongoDB
// @route   PUT /api/categories/:type
// @access  Admin
export const updateCategoriesByType = async (req, res) => {
  const { type } = req.params;
  const normalizedType = type?.toLowerCase();

  if (normalizedType !== "gallery" && normalizedType !== "project") {
    return res.status(400).json({
      success: false,
      message: `Invalid category type "${type}". Must be 'gallery' or 'project'.`,
    });
  }

  const { categories, removedCategories } = req.body;

  if (!Array.isArray(categories)) {
    return res.status(400).json({
      success: false,
      message: "Categories must be an array of strings",
    });
  }

  const cleanCategories = Array.from(
    new Set(categories.map((c) => String(c).trim()).filter(Boolean))
  );
  const cleanRemoved = Array.isArray(removedCategories)
    ? Array.from(new Set(removedCategories.map((c) => String(c).trim()).filter(Boolean)))
    : [];

  // Always update in-memory cache
  inMemoryCategories[normalizedType] = {
    type: normalizedType,
    categories: cleanCategories,
    removedCategories: cleanRemoved,
  };

  if (mongoose.connection.readyState !== 1) {
    return res.status(200).json({
      success: true,
      source: "in_memory_fallback",
      message: "Categories saved to memory (MongoDB connecting)",
      data: inMemoryCategories[normalizedType],
    });
  }

  try {
    const updated = await Category.findOneAndUpdate(
      { type: normalizedType },
      {
        categories: cleanCategories,
        removedCategories: cleanRemoved,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      source: "mongodb",
      message: "Categories updated successfully in MongoDB Atlas",
      data: {
        type: updated.type,
        categories: updated.categories,
        removedCategories: updated.removedCategories,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update categories in MongoDB",
      error: error.message,
    });
  }
};

// @desc    Reset categories to default in MongoDB
// @route   POST /api/categories/:type/reset
// @access  Admin
export const resetCategoriesByType = async (req, res) => {
  const { type } = req.params;
  const normalizedType = type?.toLowerCase();

  if (normalizedType !== "gallery" && normalizedType !== "project") {
    return res.status(400).json({
      success: false,
      message: `Invalid category type "${type}". Must be 'gallery' or 'project'.`,
    });
  }

  const defaultList = normalizedType === "gallery" ? DEFAULT_GALLERY_CATS : DEFAULT_PROJECT_CATS;

  inMemoryCategories[normalizedType] = {
    type: normalizedType,
    categories: [...defaultList],
    removedCategories: [],
  };

  if (mongoose.connection.readyState !== 1) {
    return res.status(200).json({
      success: true,
      source: "in_memory_fallback",
      message: "Categories reset to default in memory (MongoDB connecting)",
      data: inMemoryCategories[normalizedType],
    });
  }

  try {
    const updated = await Category.findOneAndUpdate(
      { type: normalizedType },
      {
        categories: defaultList,
        removedCategories: [],
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      source: "mongodb",
      message: "Categories reset to default successfully in MongoDB Atlas",
      data: {
        type: updated.type,
        categories: updated.categories,
        removedCategories: updated.removedCategories,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reset categories in MongoDB",
      error: error.message,
    });
  }
};

