import mongoose from "mongoose";
import Gallery from "../models/Gallery.js";
import { initialGalleryItems } from "../data/galleryData.js";

// In-memory store for fallback mode when MongoDB Atlas is offline/unconfigured
let inMemoryGallery = [...initialGalleryItems];

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
export const getGalleryItems = async (req, res) => {
  const { category } = req.query;
  const filteredMemory =
    category && category !== "All"
      ? inMemoryGallery.filter((item) => item.category === category)
      : inMemoryGallery;

  if (mongoose.connection.readyState !== 1) {
    return res.status(200).json({
      success: true,
      count: filteredMemory.length,
      source: "in_memory_fallback",
      data: filteredMemory,
    });
  }

  try {
    const filter = category && category !== "All" ? { category } : {};
    const items = await Gallery.find(filter).sort({ createdAt: -1 });

    if (!items || items.length === 0) {
      return res.status(200).json({
        success: true,
        count: filteredMemory.length,
        source: "fallback_empty",
        data: filteredMemory,
      });
    }

    res.status(200).json({
      success: true,
      count: items.length,
      source: "database",
      data: items,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      count: filteredMemory.length,
      source: "fallback_on_error",
      warning: error.message,
      data: filteredMemory,
    });
  }
};

// @desc    Create a new gallery item
// @route   POST /api/gallery
// @access  Admin
export const createGalleryItem = async (req, res) => {
  try {
    const { title, category, image } = req.body;

    if (!title || !image) {
      return res.status(400).json({
        success: false,
        message: "Title and Image URL are required",
      });
    }

    const galleryId = req.body.galleryId || `gal_${Date.now()}`;

    if (mongoose.connection.readyState === 1) {
      const item = await Gallery.create({
        galleryId,
        title,
        category: category || "Infrastructure",
        image,
      });
      // Also update in-memory cache
      inMemoryGallery.unshift({
        galleryId: item.galleryId,
        title: item.title,
        category: item.category,
        image: item.image,
      });
      return res.status(201).json({ success: true, source: "database", data: item });
    }

    // In-memory fallback
    const newItem = {
      galleryId,
      title,
      category: category || "Infrastructure",
      image,
      createdAt: new Date().toISOString(),
    };
    inMemoryGallery.unshift(newItem);

    res.status(201).json({
      success: true,
      source: "in_memory",
      message: "Added to in-memory gallery (connect MongoDB Atlas for persistent storage)",
      data: newItem,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Admin
export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const item = await Gallery.findOneAndDelete({
        $or: [{ galleryId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
      inMemoryGallery = inMemoryGallery.filter(
        (i) => i.galleryId !== id && i._id?.toString() !== id
      );
      if (!item) {
        return res.status(404).json({ success: false, message: "Gallery item not found" });
      }
      return res.status(200).json({ success: true, message: "Gallery item deleted" });
    }

    // In-memory fallback
    const initialLen = inMemoryGallery.length;
    inMemoryGallery = inMemoryGallery.filter((i) => i.galleryId !== id);
    if (inMemoryGallery.length === initialLen) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Gallery item deleted from in-memory store",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

