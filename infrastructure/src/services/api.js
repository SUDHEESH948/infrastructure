// Base API URL:
// In dev with Vite proxy, "/api" proxies to "http://localhost:5000/api"
// If VITE_API_URL is configured, it uses that instead.
const API_BASE = import.meta.env.VITE_API_URL || "/api";

export const fetchProjectsFromAPI = async (category = "All") => {
  try {
    const url =
      category && category !== "All"
        ? `${API_BASE}/projects?category=${encodeURIComponent(category)}`
        : `${API_BASE}/projects`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.warn("Could not fetch projects from backend API, using local fallback:", error.message);
    return null;
  }
};

export const fetchServicesFromAPI = async (category = "All") => {
  try {
    const url =
      category && category !== "All"
        ? `${API_BASE}/services?category=${encodeURIComponent(category)}`
        : `${API_BASE}/services`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.warn("Could not fetch services from backend API:", error.message);
    return null;
  }
};
