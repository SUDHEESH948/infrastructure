import mongoose from "mongoose";
import Gallery from "../models/Gallery.js";
import { initialGalleryItems } from "../data/galleryData.js";
import { removeUploadedFile } from "../utils/fileRemover.js";

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

// @desc    Create a new gallery item or multiple gallery items
// @route   POST /api/gallery
// @access  Admin
export const createGalleryItem = async (req, res) => {
  try {
    // Check if multiple items are passed (batch upload)
    const rawItems = Array.isArray(req.body)
      ? req.body
      : Array.isArray(req.body.items)
      ? req.body.items
      : null;

    if (rawItems && rawItems.length > 0) {
      const validItems = rawItems.filter((it) => it && it.image);
      if (validItems.length === 0) {
        return res.status(400).json({ success: false, message: "No valid image items provided" });
      }

      const timestamp = Date.now();
      const isVideoUrl = (url) => /\.(mp4|webm|mov|mkv|ogg|avi)(\?.*)?$/i.test(url);
      const formattedItems = validItems.map((it, idx) => {
        const isYT = it.mediaType === "youtube" || !!it.youtubeUrl || /youtube\.com|youtu\.be/i.test(it.image || "");
        const isVid = !isYT && (it.mediaType === "video" || isVideoUrl(it.image));
        return {
          galleryId: it.galleryId || `gal_${timestamp}_${idx}`,
          title: it.title || req.body.title || `Gallery Item ${idx + 1}`,
          category: it.category || req.body.category || "Infrastructure",
          image: it.image,
          mediaType: isYT ? "youtube" : isVid ? "video" : "image",
          youtubeUrl: it.youtubeUrl || "",
        };
      });

      if (mongoose.connection.readyState === 1) {
        const created = await Gallery.insertMany(formattedItems);
        formattedItems.forEach((it) => inMemoryGallery.unshift(it));
        return res.status(201).json({
          success: true,
          count: created.length,
          source: "database",
          data: created,
        });
      }

      formattedItems.forEach((it) => inMemoryGallery.unshift(it));
      return res.status(201).json({
        success: true,
        count: formattedItems.length,
        source: "in_memory",
        data: formattedItems,
      });
    }

    const { title, category, image, youtubeUrl } = req.body;

    if (!title || !image) {
      return res.status(400).json({
        success: false,
        message: "Title and Image URL are required",
      });
    }

    const galleryId = req.body.galleryId || `gal_${Date.now()}`;
    const isVideoUrl = (url) => /\.(mp4|webm|mov|mkv|ogg|avi)(\?.*)?$/i.test(url);
    const isYT = req.body.mediaType === "youtube" || !!youtubeUrl || /youtube\.com|youtu\.be/i.test(image || "");
    const mediaType = isYT ? "youtube" : req.body.mediaType || (isVideoUrl(image) ? "video" : "image");

    if (mongoose.connection.readyState === 1) {
      const item = await Gallery.create({
        galleryId,
        title,
        category: category || "Infrastructure",
        image,
        mediaType,
        youtubeUrl: youtubeUrl || "",
      });
      // Also update in-memory cache
      inMemoryGallery.unshift({
        galleryId: item.galleryId,
        title: item.title,
        category: item.category,
        image: item.image,
        mediaType,
        youtubeUrl: item.youtubeUrl || "",
      });
      return res.status(201).json({ success: true, source: "database", data: item });
    }

    // In-memory fallback
    const newItem = {
      galleryId,
      title,
      category: category || "Infrastructure",
      image,
      mediaType,
      youtubeUrl: youtubeUrl || "",
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
      const query = mongoose.isValidObjectId(id)
        ? { $or: [{ galleryId: id }, { _id: id }] }
        : { galleryId: id };

      const item = await Gallery.findOneAndDelete(query);
      inMemoryGallery = inMemoryGallery.filter(
        (i) => i.galleryId !== id && i._id?.toString() !== id
      );
      if (!item) {
        return res.status(404).json({ success: false, message: "Gallery item not found" });
      }

      // Automatically delete the uploaded file from storage
      if (item.image) {
        await removeUploadedFile(item.image);
      }

      return res.status(200).json({ success: true, message: "Gallery item deleted successfully" });
    }

    // In-memory fallback
    const targetItem = inMemoryGallery.find(
      (i) => i.galleryId === id || i._id?.toString() === id
    );
    if (!targetItem) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    if (targetItem.image) {
      await removeUploadedFile(targetItem.image);
    }

    inMemoryGallery = inMemoryGallery.filter((i) => i.galleryId !== id && i._id !== id);

    res.status(200).json({
      success: true,
      message: "Gallery item and image file deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

