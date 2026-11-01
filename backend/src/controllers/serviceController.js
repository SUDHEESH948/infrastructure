import mongoose from "mongoose";
import Service from "../models/Service.js";
import { initialServices } from "../data/servicesData.js";

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res) => {
  const { category } = req.query;
  const filteredFallback = category && category !== "All"
    ? initialServices.filter((s) => s.category === category)
    : initialServices;

  if (mongoose.connection.readyState !== 1) {
    return res.status(200).json({
      success: true,
      count: filteredFallback.length,
      source: "fallback_offline",
      data: filteredFallback,
    });
  }

  try {
    const filter = category && category !== "All" ? { category } : {};
    const services = await Service.find(filter).sort({ number: 1 });

    if (!services || services.length === 0) {
      return res.status(200).json({
        success: true,
        count: filteredFallback.length,
        source: "fallback_empty",
        data: filteredFallback,
      });
    }

    res.status(200).json({
      success: true,
      count: services.length,
      source: "database",
      data: services,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      count: filteredFallback.length,
      source: "fallback_on_error",
      warning: error.message,
      data: filteredFallback,
    });
  }
};
