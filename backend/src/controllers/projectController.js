import mongoose from "mongoose";
import Project from "../models/Project.js";
import { initialProjects } from "../data/projectsData.js";

// @desc    Get all projects (with optional category filter)
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  const { category } = req.query;
  const filteredFallback = category && category !== "All"
    ? initialProjects.filter((p) => p.category === category)
    : initialProjects;

  // If MongoDB is not connected, respond instantly with fallback data
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
    const projects = await Project.find(filter).sort({ projectId: 1, createdAt: -1 });

    // Fallback to initial seeds if collection is currently empty
    if (!projects || projects.length === 0) {
      return res.status(200).json({
        success: true,
        count: filteredFallback.length,
        source: "fallback_empty",
        data: filteredFallback,
      });
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      source: "database",
      data: projects,
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

// @desc    Get single project by ID (MongoDB _id or projectId)
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    let project = await Project.findOne({ projectId: id });
    if (!project && id.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(id);
    }

    if (!project) {
      // Check fallback initial projects
      const fallback = initialProjects.find((p) => p.projectId === id);
      if (fallback) {
        return res.status(200).json({ success: true, data: fallback });
      }
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Public (or protected when auth is added)
export const createProject = async (req, res) => {
  try {
    const {
      projectId,
      title,
      category,
      description,
      details,
      location,
      image,
      iconName,
      deliverables,
      featured,
      status,
    } = req.body;

    const existing = await Project.findOne({ projectId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Project with ID ${projectId} already exists`,
      });
    }

    const project = await Project.create({
      projectId,
      title,
      category,
      description,
      details,
      location,
      image,
      iconName,
      deliverables,
      featured,
      status,
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Public
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    let project = await Project.findOneAndUpdate(
      { $or: [{ projectId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Public
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findOneAndDelete({
      $or: [{ projectId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
    });

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
