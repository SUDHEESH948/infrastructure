import mongoose from "mongoose";
import Project from "../models/Project.js";
import { initialProjects } from "../data/projectsData.js";

// In-memory store for fallback mode
let inMemoryProjects = [...initialProjects];

// @desc    Get all projects (with optional category filter)
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  const { category } = req.query;
  const filteredMemory =
    category && category !== "All"
      ? inMemoryProjects.filter((p) => p.category === category)
      : inMemoryProjects;

  // If MongoDB is not connected, respond instantly with fallback data
  if (mongoose.connection.readyState !== 1) {
    return res.status(200).json({
      success: true,
      count: filteredMemory.length,
      source: "fallback_offline",
      data: filteredMemory,
    });
  }

  try {
    const filter = category && category !== "All" ? { category } : {};
    const projects = await Project.find(filter).sort({ projectId: 1, createdAt: -1 });

    // Fallback to in-memory seeds if collection is currently empty
    if (!projects || projects.length === 0) {
      return res.status(200).json({
        success: true,
        count: filteredMemory.length,
        source: "fallback_empty",
        data: filteredMemory,
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
      count: filteredMemory.length,
      source: "fallback_on_error",
      warning: error.message,
      data: filteredMemory,
    });
  }
};

// @desc    Get single project by ID (MongoDB _id or projectId)
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      let project = await Project.findOne({ projectId: id });
      if (!project && id.match(/^[0-9a-fA-F]{24}$/)) {
        project = await Project.findById(id);
      }
      if (project) {
        return res.status(200).json({ success: true, data: project });
      }
    }

    const fallback = inMemoryProjects.find(
      (p) => p.projectId === id || p._id === id
    );
    if (fallback) {
      return res.status(200).json({ success: true, data: fallback });
    }

    return res.status(404).json({ success: false, message: "Project not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Admin
export const createProject = async (req, res) => {
  try {
    const {
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

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    // Auto-generate next project ID if not provided
    const projectId =
      req.body.projectId ||
      String(inMemoryProjects.length + 1).padStart(2, "0");

    const newProjectData = {
      projectId,
      title,
      category: category || "Infrastructure",
      description,
      details: details || "",
      location: location || "Kerala",
      image: image || "/projects/building-construction.jpg",
      iconName: iconName || "Building2",
      deliverables: Array.isArray(deliverables)
        ? deliverables
        : typeof deliverables === "string"
        ? deliverables.split("\n").filter(Boolean)
        : [],
      featured: Boolean(featured),
      status: status || "Completed",
      createdAt: new Date().toISOString(),
    };

    if (mongoose.connection.readyState === 1) {
      const existing = await Project.findOne({ projectId });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `Project with ID ${projectId} already exists`,
        });
      }

      const project = await Project.create(newProjectData);
      inMemoryProjects.unshift(project.toObject());
      return res.status(201).json({ success: true, source: "database", data: project });
    }

    // In-memory fallback
    inMemoryProjects.unshift(newProjectData);
    res.status(201).json({
      success: true,
      source: "in_memory",
      message: "Project added to in-memory store (connect MongoDB Atlas for persistent storage)",
      data: newProjectData,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Admin
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      let project = await Project.findOneAndUpdate(
        { $or: [{ projectId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
        req.body,
        { new: true, runValidators: true }
      );

      if (project) {
        const index = inMemoryProjects.findIndex((p) => p.projectId === id || p._id === id);
        if (index !== -1) inMemoryProjects[index] = project.toObject();
        return res.status(200).json({ success: true, source: "database", data: project });
      }
    }

    // In-memory fallback
    const index = inMemoryProjects.findIndex((p) => p.projectId === id || p._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    inMemoryProjects[index] = {
      ...inMemoryProjects[index],
      ...req.body,
      deliverables: Array.isArray(req.body.deliverables)
        ? req.body.deliverables
        : typeof req.body.deliverables === "string"
        ? req.body.deliverables.split("\n").filter(Boolean)
        : inMemoryProjects[index].deliverables,
    };

    res.status(200).json({
      success: true,
      source: "in_memory",
      data: inMemoryProjects[index],
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Admin
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const project = await Project.findOneAndDelete({
        $or: [{ projectId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
      inMemoryProjects = inMemoryProjects.filter(
        (p) => p.projectId !== id && p._id?.toString() !== id
      );
      if (!project) {
        return res.status(404).json({ success: false, message: "Project not found" });
      }
      return res.status(200).json({ success: true, message: "Project deleted successfully" });
    }

    // In-memory fallback
    const initLen = inMemoryProjects.length;
    inMemoryProjects = inMemoryProjects.filter((p) => p.projectId !== id && p._id !== id);
    if (inMemoryProjects.length === initLen) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted from in-memory store",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
