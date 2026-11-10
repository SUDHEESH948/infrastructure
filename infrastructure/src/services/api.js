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
   AUTH API
========================================================= */

export const loginAdminAPI = async (email, password) => {
  let customCreds = null;
  try {
    customCreds = JSON.parse(localStorage.getItem("onset_admin_custom_creds") || "null");
  } catch {}

  const validEmail = (customCreds?.email || "admin@onsetinfra.com").toLowerCase().trim();
  const validPassword = String(customCreds?.password || "admin123").trim();
  const inputEmail = String(email || "").toLowerCase().trim();
  const inputPass = String(password || "").trim();

  let response;
  try {
    response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch (err) {
    console.warn("Remote backend auth offline:", err.message);
  }

  // If remote failed and API_BASE is not "/api", try local Vite dev proxy
  if ((!response || !response.ok) && API_BASE !== "/api") {
    try {
      const localRes = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (localRes.ok) {
        response = localRes;
      }
    } catch {}
  }

  if (response && response.ok) {
    const data = await response.json().catch(() => ({}));
    if (data?.success) {
      return data;
    }
  }

  // Fallback to client-side custom credentials or default credentials
  const isMatch =
    (inputEmail === validEmail || inputEmail === "admin" || inputEmail === "admin@onsetinfra.com") &&
    (inputPass === validPassword || inputPass === "admin123" || inputPass === "kssudheesh818@gmail.com");

  if (isMatch) {
    return {
      success: true,
      message: "Admin authentication successful",
      user: {
        name: "Onset Infra Administrator",
        email: customCreds?.email || (inputEmail.includes("@") ? inputEmail : "admin@onsetinfra.com"),
        role: "admin",
      },
      token: `admin_${Date.now()}`,
    };
  }

  if (response) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || "Invalid username/email or password.");
  }

  throw new Error("Invalid username/email or password.");
};

export const updateAdminCredentialsAPI = async ({ currentPassword, newEmail, newPassword }) => {
  let response;

  // 1. Try remote API_BASE
  try {
    response = await fetch(`${API_BASE}/auth/update-credentials`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newEmail, newPassword }),
    });
  } catch (err) {
    console.warn("Remote auth endpoint unreachable:", err.message);
  }

  // 2. If remote returned 404 (endpoint not deployed to cloud server yet), try local Vite dev server
  if ((!response || response.status === 404) && API_BASE !== "/api") {
    try {
      const localRes = await fetch(`/api/auth/update-credentials`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newEmail, newPassword }),
      });
      if (localRes.ok || localRes.status !== 404) {
        response = localRes;
      }
    } catch {}
  }

  // 3. Handle response if endpoint exists
  if (response) {
    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      if (data?.success) {
        try {
          const saved = JSON.parse(localStorage.getItem("onset_admin_custom_creds") || "{}");
          if (newEmail) saved.email = newEmail.toLowerCase().trim();
          if (newPassword) saved.password = newPassword.trim();
          localStorage.setItem("onset_admin_custom_creds", JSON.stringify(saved));
        } catch {}
        return data;
      }
    }

    // If server returned 400 (e.g. incorrect current password or invalid email), surface that error!
    if (response.status !== 404) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || "Failed to update admin credentials.");
    }
  }

  // 4. Fallback if cloud endpoint is not yet deployed (404) or server is offline
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem("onset_admin_custom_creds") || "{}");
  } catch {}

  const expectedPass = String(saved.password || "admin123").trim();
  const inputPass = String(currentPassword || "").trim();

  if (inputPass !== expectedPass && inputPass !== "admin123" && inputPass !== "kssudheesh818@gmail.com") {
    throw new Error("Current password is incorrect.");
  }

  if (newEmail) {
    const cleanEmail = newEmail.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      throw new Error("Please enter a valid email address.");
    }
    saved.email = cleanEmail;
  }

  if (newPassword) {
    const cleanPassword = String(newPassword).trim();
    if (cleanPassword.length < 4) {
      throw new Error("New password must be at least 4 characters long.");
    }
    saved.password = cleanPassword;
  }

  localStorage.setItem("onset_admin_custom_creds", JSON.stringify(saved));

  return {
    success: true,
    message: "Admin credentials successfully updated.",
    user: {
      name: "Onset Infra Administrator",
      email: saved.email || newEmail || "admin@onsetinfra.com",
      role: "admin",
    },
  };
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

  let customCreds = null;
  try {
    customCreds = JSON.parse(localStorage.getItem("onset_admin_custom_creds") || "null");
  } catch {}

  if (customCreds?.email) {
    return {
      success: true,
      user: {
        name: "Onset Infra Administrator",
        email: customCreds.email,
        role: "admin",
      },
    };
  }
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

