// Base API URL:
// In dev or with Vercel rewrites, "/api" proxies directly to Render.
// When VITE_API_URL is defined, trailing slashes are trimmed for clean route concatenation.
const rawApiBase = import.meta.env.VITE_API_URL || "/api";
const API_BASE = rawApiBase.replace(/\/+$/, "");

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
   AUTH API (Direct MongoDB Atlas Verification)
========================================================= */

export const loginAdminAPI = async (email, password) => {
  let response;

  // 1. Send authentication request to backend connected to MongoDB Atlas
  try {
    response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch (err) {
    console.warn("Primary API URL unreachable, checking local proxy:", err.message);
  }

  // 2. If primary API failed to connect and API_BASE is not "/api", try local Vite dev proxy
  if (!response && API_BASE !== "/api") {
    try {
      response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    } catch (err) {
      console.warn("Local API proxy unreachable:", err.message);
    }
  }

  // 3. Strictly enforce database response
  if (response) {
    const data = await response.json().catch(() => ({}));
    if (response.ok && data?.success) {
      return data;
    }
    // Directly surface the MongoDB database verification error
    throw new Error(data?.message || "Invalid email/username or password.");
  }

  throw new Error("Unable to connect to database server. Please check your internet connection.");
};

export const updateAdminCredentialsAPI = async ({ currentPassword, newEmail, newPassword }) => {
  let response;

  // 1. Send update request to MongoDB Atlas
  try {
    response = await fetch(`${API_BASE}/auth/update-credentials`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newEmail, newPassword }),
    });
  } catch (err) {
    console.warn("Primary API URL unreachable, checking local proxy:", err.message);
  }

  // 2. Fallback to local dev proxy if primary network failed
  if (!response && API_BASE !== "/api") {
    try {
      response = await fetch(`/api/auth/update-credentials`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newEmail, newPassword }),
      });
    } catch {}
  }

  // 3. Strictly enforce database update response
  if (response) {
    const data = await response.json().catch(() => ({}));
    if (response.ok && data?.success) {
      return data;
    }
    throw new Error(data?.message || "Failed to update admin credentials in database.");
  }

  throw new Error("Unable to connect to database server. Please check your internet connection.");
};

export const fetchAdminProfileAPI = async () => {
  try {
    const response = await fetch(`${API_BASE}/auth/me`);
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {}

  try {
    if (API_BASE !== "/api") {
      const localRes = await fetch(`/api/auth/me`);
      if (localRes.ok) return await localRes.json();
    }
  } catch {}

  return null;
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

/* =========================================================
   CATEGORIES API (Stored Permanently in MongoDB Atlas)
========================================================= */

export const fetchAllCategoriesAPI = async () => {
  try {
    const response = await fetch(`${API_BASE}/categories`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const res = await response.json();
    return res?.data || null;
  } catch (error) {
    console.warn("Categories API offline:", error.message);
    return null;
  }
};

export const fetchCategoriesByTypeAPI = async (type) => {
  try {
    const response = await fetch(`${API_BASE}/categories/${type}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const res = await response.json();
    return res?.data || null;
  } catch (error) {
    console.warn(`Category API for ${type} offline:`, error.message);
    return null;
  }
};

export const updateCategoriesAPI = async (type, categories, removedCategories = []) => {
  const response = await fetch(`${API_BASE}/categories/${type}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ categories, removedCategories }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to update categories in MongoDB");
  }
  return response.json();
};

export const resetCategoriesAPI = async (type) => {
  const response = await fetch(`${API_BASE}/categories/${type}/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to reset categories in MongoDB");
  }
  return response.json();
};

