// Base API URL:
// In dev with Vite proxy, "/api" proxies to "http://localhost:5000/api"
const API_BASE = import.meta.env.VITE_API_URL || "/api";

/* =========================================================
   IMAGE UPLOAD API (Stores images into server folder)
========================================================= */

export const uploadImageAPI = async (file, folder = "general") => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE}/upload?folder=${encodeURIComponent(folder)}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to upload image file");
  }

  return response.json();
};

export const uploadMultipleImagesAPI = async (files, folder = "general") => {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("images", file);
  });

  const response = await fetch(`${API_BASE}/upload/multiple?folder=${encodeURIComponent(folder)}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to upload image files");
  }

  return response.json();
};

/* =========================================================
   PROJECTS API
========================================================= */

export const fetchProjectsFromAPI = async (category = "All") => {
  try {
    const url =
      category && category !== "All"
        ? `${API_BASE}/projects?category=${encodeURIComponent(category)}`
        : `${API_BASE}/projects`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.warn("Projects API offline, fallback active:", error.message);
    return null;
  }
};

export const createProjectAPI = async (projectData) => {
  const response = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to create project");
  }
  return response.json();
};

export const updateProjectAPI = async (id, projectData) => {
  const response = await fetch(`${API_BASE}/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to update project");
  }
  return response.json();
};

export const deleteProjectAPI = async (id) => {
  const response = await fetch(`${API_BASE}/projects/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to delete project");
  }
  return response.json();
};

/* =========================================================
   GALLERY API
========================================================= */

export const fetchGalleryFromAPI = async (category = "All") => {
  try {
    const url =
      category && category !== "All"
        ? `${API_BASE}/gallery?category=${encodeURIComponent(category)}`
        : `${API_BASE}/gallery`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.warn("Gallery API offline, fallback active:", error.message);
    return null;
  }
};

export const createGalleryItemAPI = async (itemData) => {
  const response = await fetch(`${API_BASE}/gallery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to add gallery item");
  }
  return response.json();
};

export const deleteGalleryItemAPI = async (id) => {
  const response = await fetch(`${API_BASE}/gallery/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to delete gallery item");
  }
  return response.json();
};

/* =========================================================
   AUTH API
========================================================= */

export const loginAdminAPI = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn("Backend auth offline, checking client credentials");
  }

  // Client-side default validation fallback
  const isMatch =
    (email.toLowerCase() === "admin@onsetinfra.com" || email.toLowerCase() === "admin") &&
    password === "admin123";

  if (isMatch) {
    return {
      success: true,
      message: "Admin authentication successful (local fallback)",
      user: {
        name: "Onset Infra Administrator",
        email: "admin@onsetinfra.com",
        role: "admin",
      },
      token: "default-local-token",
    };
  }

  throw new Error("Invalid username/email or password.");
};

/* =========================================================
   SERVICES API
========================================================= */

export const fetchServicesFromAPI = async (category = "All") => {
  try {
    const url =
      category && category !== "All"
        ? `${API_BASE}/services?category=${encodeURIComponent(category)}`
        : `${API_BASE}/services`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.warn("Services API offline:", error.message);
    return null;
  }
};
