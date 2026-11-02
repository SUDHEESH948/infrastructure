import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Lock,
  User,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  FolderPlus,
  CheckCircle2,
  AlertCircle,
  LogOut,
  RefreshCw,
  ExternalLink,
  Layers,
  MapPin,
  Sparkles,
  Eye,
  X,
  ArrowLeft,
  Search,
  UploadCloud,
  Check,
  Tag,
} from "lucide-react";
import {
  fetchProjectsFromAPI,
  createProjectAPI,
  updateProjectAPI,
  deleteProjectAPI,
  fetchGalleryFromAPI,
  createGalleryItemAPI,
  deleteGalleryItemAPI,
  loginAdminAPI,
  uploadImageAPI,
  uploadMultipleImagesAPI,
} from "../services/api";

const PROJECT_CATEGORIES = [
  "All",
  "Infrastructure",
  "Construction",
  "Surveying",
  "Project Management",
  "Consultancy",
  "Interiors",
];

const GALLERY_CATEGORIES = [
  "All",
  "Infrastructure",
  "Construction",
  "Surveying",
  "Project Management",
];

export default function Admin() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Tab: "projects" | "gallery"
  const [activeTab, setActiveTab] = useState("projects");
  const [projectFilterCategory, setProjectFilterCategory] = useState("All");
  const [galleryFilterCategory, setGalleryFilterCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Data States
  const [projects, setProjects] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // Custom Confirm Dialog State (Replaces native browser window.confirm)
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Delete",
    isDanger: true,
    onConfirm: null,
  });

  // Project Modal State (Add or Edit)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    projectId: "",
    title: "",
    category: "Infrastructure",
    description: "",
    details: "",
    location: "Kerala",
    image: "/projects/building-construction.jpg",
    iconName: "Building2",
    deliverables: "",
    status: "Completed",
  });

  // Gallery Modal State
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "Infrastructure",
    image: "",
  });
  const [galleryUploadedImages, setGalleryUploadedImages] = useState([]);

  // Default Category Definitions
  const DEFAULT_GALLERY_CATS = [
    "Infrastructure",
    "Construction",
    "Surveying",
    "Project Management",
  ];

  const DEFAULT_PROJECT_CATS = [
    "Infrastructure",
    "Construction",
    "Surveying",
    "Project Management",
    "Consultancy",
    "Interiors",
  ];

  // Removed Categories tracking (Persisted so removed categories never resurrect)
  const [removedGalleryCats, setRemovedGalleryCats] = useState(() => {
    try {
      const saved = localStorage.getItem("onset_removed_gallery_cats");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [removedProjectCats, setRemovedProjectCats] = useState(() => {
    try {
      const saved = localStorage.getItem("onset_removed_project_cats");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Category Lists (Persisted in localStorage)
  const [galleryCategoriesList, setGalleryCategoriesList] = useState(() => {
    try {
      const saved = localStorage.getItem("onset_gallery_categories_list");
      if (saved) return JSON.parse(saved);
      const oldCustom = localStorage.getItem("onset_custom_gallery_categories");
      const extras = oldCustom ? JSON.parse(oldCustom) : [];
      return Array.from(new Set([...DEFAULT_GALLERY_CATS, ...extras]));
    } catch {
      return DEFAULT_GALLERY_CATS;
    }
  });

  const [projectCategoriesList, setProjectCategoriesList] = useState(() => {
    try {
      const saved = localStorage.getItem("onset_project_categories_list");
      if (saved) return JSON.parse(saved);
      const oldCustom = localStorage.getItem("onset_custom_project_categories");
      const extras = oldCustom ? JSON.parse(oldCustom) : [];
      return Array.from(new Set([...DEFAULT_PROJECT_CATS, ...extras]));
    } catch {
      return DEFAULT_PROJECT_CATS;
    }
  });

  const [isAddingNewGalleryCat, setIsAddingNewGalleryCat] = useState(false);
  const [newGalleryCatInput, setNewGalleryCatInput] = useState("");

  const [isAddingNewProjectCat, setIsAddingNewProjectCat] = useState(false);
  const [newProjectCatInput, setNewProjectCatInput] = useState("");

  // Dynamically compute all categories, excluding any removed ones
  const allGalleryCategories = Array.from(
    new Set([
      ...galleryCategoriesList,
      ...galleryItems.map((item) => item.category).filter(Boolean),
    ])
  ).filter((cat) => !removedGalleryCats.includes(cat));

  const allProjectCategories = Array.from(
    new Set([
      ...projectCategoriesList,
      ...projects.map((p) => p.category).filter(Boolean),
    ])
  ).filter((cat) => !removedProjectCats.includes(cat));

  const handleAddGalleryCategory = (e) => {
    if (e) e.preventDefault();
    const trimmed = newGalleryCatInput.trim();
    if (!trimmed) return;

    const formatted = trimmed
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const updated = Array.from(new Set([...galleryCategoriesList, formatted]));
    setGalleryCategoriesList(updated);

    const updatedRemoved = removedGalleryCats.filter((c) => c !== formatted);
    setRemovedGalleryCats(updatedRemoved);

    try {
      localStorage.setItem("onset_gallery_categories_list", JSON.stringify(updated));
      localStorage.setItem("onset_removed_gallery_cats", JSON.stringify(updatedRemoved));
    } catch (err) {
      console.warn("localStorage write failed:", err);
    }

    setGalleryForm((prev) => ({ ...prev, category: formatted }));
    setNewGalleryCatInput("");
    setIsAddingNewGalleryCat(false);
    showNotification(`Category "${formatted}" added and selected!`);
  };

  const handleRemoveGalleryCategory = (catToRemove) => {
    if (allGalleryCategories.length <= 1) {
      showNotification("At least one category must remain", "error");
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: "Remove Category",
      message: `Are you sure you want to remove the category "${catToRemove}"?`,
      confirmText: "Remove Category",
      isDanger: true,
      onConfirm: () => {
        const updated = galleryCategoriesList.filter((c) => c !== catToRemove);
        setGalleryCategoriesList(updated);

        const newRemoved = Array.from(new Set([...removedGalleryCats, catToRemove]));
        setRemovedGalleryCats(newRemoved);

        try {
          localStorage.setItem("onset_gallery_categories_list", JSON.stringify(updated));
          localStorage.setItem("onset_removed_gallery_cats", JSON.stringify(newRemoved));
          localStorage.removeItem("onset_custom_gallery_categories");
        } catch (err) {
          console.warn("localStorage write failed:", err);
        }

        if (galleryForm.category === catToRemove) {
          const remaining = allGalleryCategories.filter((c) => c !== catToRemove);
          setGalleryForm((prev) => ({
            ...prev,
            category: remaining[0] || "Infrastructure",
          }));
        }

        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        showNotification(`Category "${catToRemove}" removed!`);
      },
    });
  };

  const handleAddProjectCategory = (e) => {
    if (e) e.preventDefault();
    const trimmed = newProjectCatInput.trim();
    if (!trimmed) return;

    const formatted = trimmed
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const updated = Array.from(new Set([...projectCategoriesList, formatted]));
    setProjectCategoriesList(updated);

    const updatedRemoved = removedProjectCats.filter((c) => c !== formatted);
    setRemovedProjectCats(updatedRemoved);

    try {
      localStorage.setItem("onset_project_categories_list", JSON.stringify(updated));
      localStorage.setItem("onset_removed_project_cats", JSON.stringify(updatedRemoved));
    } catch (err) {
      console.warn("localStorage write failed:", err);
    }

    setProjectForm((prev) => ({ ...prev, category: formatted }));
    setNewProjectCatInput("");
    setIsAddingNewProjectCat(false);
    showNotification(`Category "${formatted}" added and selected!`);
  };

  const handleRemoveProjectCategory = (catToRemove) => {
    if (allProjectCategories.length <= 1) {
      showNotification("At least one category must remain", "error");
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: "Remove Category",
      message: `Are you sure you want to remove the category "${catToRemove}"?`,
      confirmText: "Remove Category",
      isDanger: true,
      onConfirm: () => {
        const updated = projectCategoriesList.filter((c) => c !== catToRemove);
        setProjectCategoriesList(updated);

        const newRemoved = Array.from(new Set([...removedProjectCats, catToRemove]));
        setRemovedProjectCats(newRemoved);

        try {
          localStorage.setItem("onset_project_categories_list", JSON.stringify(updated));
          localStorage.setItem("onset_removed_project_cats", JSON.stringify(newRemoved));
          localStorage.removeItem("onset_custom_project_categories");
        } catch (err) {
          console.warn("localStorage write failed:", err);
        }

        if (projectForm.category === catToRemove) {
          const remaining = allProjectCategories.filter((c) => c !== catToRemove);
          setProjectForm((prev) => ({
            ...prev,
            category: remaining[0] || "Infrastructure",
          }));
        }

        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        showNotification(`Category "${catToRemove}" removed!`);
      },
    });
  };

  // Upload States
  const [projectUploading, setProjectUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);

  // Upload Handlers (Save images directly to backend/uploads folder)
  const handleProjectImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProjectUploading(true);
    try {
      const res = await uploadImageAPI(file, "projects");
      if (res?.url) {
        setProjectForm((prev) => ({ ...prev, image: res.url }));
        showNotification("Project image stored in folder: " + res.url);
      }
    } catch (err) {
      showNotification(err.message || "Failed to upload image", "error");
    } finally {
      setProjectUploading(false);
    }
  };

  const handleGalleryImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setGalleryUploading(true);
    try {
      if (files.length === 1) {
        const res = await uploadImageAPI(files[0], "gallery");
        if (res?.url) {
          const defaultTitle = files[0].name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
          const newImg = { url: res.url, filename: res.filename, title: defaultTitle };
          setGalleryUploadedImages((prev) => [...prev, newImg]);
          setGalleryForm((prev) => ({
            ...prev,
            image: res.url,
            title: prev.title || defaultTitle,
          }));
          showNotification("Gallery image uploaded!");
        }
      } else {
        const res = await uploadMultipleImagesAPI(files, "gallery");
        if (res?.files && res.files.length > 0) {
          const formatted = res.files.map((f) => {
            const cleanTitle = (f.originalName || f.filename)
              .replace(/\.[^/.]+$/, "")
              .replace(/[-_]/g, " ");
            return {
              url: f.url || f.filePath,
              filename: f.filename,
              title: cleanTitle,
            };
          });
          setGalleryUploadedImages((prev) => [...prev, ...formatted]);
          setGalleryForm((prev) => ({
            ...prev,
            image: formatted[0].url,
            title: prev.title || `Gallery Upload (${formatted.length} Photos)`,
          }));
          showNotification(`${formatted.length} gallery images uploaded!`);
        }
      }
    } catch (err) {
      showNotification(err.message || "Failed to upload image(s)", "error");
    } finally {
      setGalleryUploading(false);
      e.target.value = "";
    }
  };

  // Check saved login on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("onset_admin_token");
    const savedUser = localStorage.getItem("onset_admin_user");
    if (savedToken && savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("onset_admin_token");
        localStorage.removeItem("onset_admin_user");
      }
    }
  }, []);

  const loadAllData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
      const [projData, galData] = await Promise.all([
        fetchProjectsFromAPI(),
        fetchGalleryFromAPI(),
      ]);
      if (projData) setProjects(projData);
      if (galData) setGalleryItems(galData);
    } catch {
      if (!isSilent) {
        showNotification("Could not load latest data from API", "error");
      }
    } finally {
      if (!isSilent) setLoading(false);
    }
  };

  // Fetch data and auto-refresh on any changes, window focus, and background interval
  useEffect(() => {
    if (!isAuthenticated) return;

    // Initial load
    loadAllData(false);

    // Auto-refresh when tab gains focus
    const onFocus = () => {
      loadAllData(true);
    };
    window.addEventListener("focus", onFocus);

    // Background auto-refresh polling every 5 seconds
    const interval = setInterval(() => {
      loadAllData(true);
    }, 5000);

    return () => {
      window.removeEventListener("focus", onFocus);
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  // Default Login Handler
  const handleLogin = async (e) => {
    e?.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await loginAdminAPI(loginEmail, loginPassword);
      if (res?.success) {
        localStorage.setItem("onset_admin_token", res.token || "admin_session");
        localStorage.setItem("onset_admin_user", JSON.stringify(res.user));
        setCurrentUser(res.user);
        setIsAuthenticated(true);
        showNotification("Welcome back, Administrator!");
      }
    } catch (err) {
      setLoginError(err.message || "Invalid credentials");
    } finally {
      setLoginLoading(false);
    }
  };

  const fillDefaultCredentials = () => {
    setLoginEmail("admin@onsetinfra.com");
    setLoginPassword("admin123");
    setLoginError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("onset_admin_token");
    localStorage.removeItem("onset_admin_user");
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  // Open Project Modal
  const openAddProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      projectId: String(projects.length + 1).padStart(2, "0"),
      title: "",
      category: "Infrastructure",
      description: "",
      details: "",
      location: "Kerala",
      image: "/projects/building-construction.jpg",
      iconName: "Building2",
      deliverables: "",
      status: "Completed",
    });
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj) => {
    setEditingProject(proj);
    setProjectForm({
      projectId: proj.projectId || proj.id || "",
      title: proj.title || "",
      category: proj.category || "Infrastructure",
      description: proj.description || "",
      details: proj.details || "",
      location: proj.location || "Kerala",
      image: proj.image || "/projects/building-construction.jpg",
      iconName: proj.iconName || "Building2",
      deliverables: Array.isArray(proj.deliverables)
        ? proj.deliverables.join("\n")
        : proj.deliverables || "",
      status: proj.status || "Completed",
    });
    setIsProjectModalOpen(true);
  };

  // Save Project (Create / Update)
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title.trim() || !projectForm.description.trim()) {
      showNotification("Title and description are required", "error");
      return;
    }

    try {
      const payload = {
        ...projectForm,
        deliverables: projectForm.deliverables
          ? projectForm.deliverables.split("\n").map((d) => d.trim()).filter(Boolean)
          : [],
      };

      if (editingProject) {
        const idToUpdate = editingProject.projectId || editingProject.id || editingProject._id;
        await updateProjectAPI(idToUpdate, payload);
        showNotification(`Project "${projectForm.title}" updated successfully!`);
      } else {
        await createProjectAPI(payload);
        showNotification(`Project "${projectForm.title}" created successfully!`);
      }

      setIsProjectModalOpen(false);
      loadAllData();
    } catch (err) {
      showNotification(err.message || "Failed to save project", "error");
    }
  };

  // Delete Project with Custom Confirmation Dialog
  const handleDeleteProject = (proj) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Project",
      message: `Are you sure you want to delete "${proj.title}"? This will permanently remove the project and its stored image file from the server.`,
      confirmText: "Delete Project",
      isDanger: true,
      onConfirm: async () => {
        try {
          const idToDelete = proj.projectId || proj.id || proj._id;
          await deleteProjectAPI(idToDelete);
          showNotification(`Project "${proj.title}" removed successfully!`);
          loadAllData();
        } catch (err) {
          showNotification(err.message || "Failed to delete project", "error");
        } finally {
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  // Save Gallery Image (Supports single or batch multiple images)
  const handleSaveGallery = async (e) => {
    e.preventDefault();

    if (galleryUploadedImages.length === 0 && !galleryForm.image.trim()) {
      showNotification("Please upload at least one image", "error");
      return;
    }

    try {
      if (galleryUploadedImages.length > 1) {
        const itemsToCreate = galleryUploadedImages.map((img, idx) => ({
          title:
            galleryForm.title.trim() && galleryUploadedImages.length > 1
              ? `${galleryForm.title.trim()} (${idx + 1})`
              : img.title || `Gallery Image ${idx + 1}`,
          category: galleryForm.category || "Infrastructure",
          image: img.url,
        }));

        await createGalleryItemAPI({ items: itemsToCreate });
        showNotification(`${itemsToCreate.length} gallery images added successfully!`);
      } else {
        const imageToSave = galleryUploadedImages[0]?.url || galleryForm.image;
        if (!galleryForm.title.trim() || !imageToSave) {
          showNotification("Title and image are required", "error");
          return;
        }

        await createGalleryItemAPI({
          title: galleryForm.title.trim(),
          category: galleryForm.category || "Infrastructure",
          image: imageToSave,
        });
        showNotification(`Gallery image "${galleryForm.title}" added successfully!`);
      }

      setIsGalleryModalOpen(false);
      setGalleryForm({ title: "", category: "Infrastructure", image: "" });
      setGalleryUploadedImages([]);
      loadAllData();
    } catch (err) {
      showNotification(err.message || "Failed to add gallery image(s)", "error");
    }
  };

  // Delete Gallery Image with Custom Confirmation Dialog
  const handleDeleteGallery = (item) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Gallery Image",
      message: `Are you sure you want to delete "${item.title}"? This will permanently remove the photo and its image file from uploads.`,
      confirmText: "Delete Image",
      isDanger: true,
      onConfirm: async () => {
        try {
          const idToDelete = item.galleryId || item.id || item._id;
          await deleteGalleryItemAPI(idToDelete);
          showNotification(`Gallery image "${item.title}" removed successfully!`);
          loadAllData();
        } catch (err) {
          showNotification(err.message || "Failed to delete gallery item", "error");
        } finally {
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  // Filtered Projects
  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      projectFilterCategory === "All" || p.category === projectFilterCategory;
    const matchesSearch =
      !searchQuery ||
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filtered Gallery Items
  const filteredGallery = galleryItems.filter((g) => {
    const matchesCategory =
      galleryFilterCategory === "All" || g.category === galleryFilterCategory;
    const matchesSearch =
      !searchQuery || g.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  /* =========================================================
     LOGIN SCREEN (Default Admin Page)
  ========================================================= */
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#071b2d] via-[#092942] to-[#0066B4] p-4 text-[#17221D]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:p-9"
        >
          {/* LOGO & TITLE */}
          <div className="text-center">
            <div className="mx-auto flex h-13 w-13 items-center justify-center rounded-2xl bg-[#0066B4] text-white shadow-lg shadow-[#0066B4]/30 sm:h-14 sm:w-14">
              <Lock size={24} className="sm:size-7" />
            </div>
            <h1 className="mt-4 font-serif text-2xl font-light text-[#071b2d] sm:text-3xl">
              Onset Infra Admin
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Administrative portal to manage projects & gallery
            </p>
          </div>

          {/* ERROR ALERT */}
          {loginError && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-200">
              <AlertCircle size={16} className="shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="mt-5 space-y-3.5 sm:space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Email / Username
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="admin@onsetinfra.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs sm:text-sm text-slate-900 outline-none transition-all focus:border-[#0066B4] focus:bg-white focus:ring-4 focus:ring-[#0066B4]/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs sm:text-sm text-slate-900 outline-none transition-all focus:border-[#0066B4] focus:bg-white focus:ring-4 focus:ring-[#0066B4]/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0066B4] py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-[#0066B4]/25 transition-all hover:bg-[#00528F] active:scale-[0.99] disabled:opacity-50"
            >
              {loginLoading ? (
                <>
                  <RefreshCw size={15} className="animate-spin" />
                  Verifying...
                </>
              ) : (
                "Log In to Dashboard"
              )}
            </button>
          </form>

          {/* DEFAULT CREDENTIALS HELPER */}
          <div className="mt-5 rounded-2xl border border-[#0066B4]/15 bg-[#EDF5FA] p-3.5 sm:p-4 text-xs text-slate-700">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0066B4] uppercase tracking-wider text-[10px] sm:text-[11px]">
                Default Admin Credentials
              </span>
              <button
                type="button"
                onClick={fillDefaultCredentials}
                className="text-[11px] font-bold text-[#0066B4] underline hover:text-[#004f8c]"
              >
                Auto Fill
              </button>
            </div>
            <div className="mt-2 space-y-1 font-mono text-[11px] text-slate-600">
              <p>Email: <strong className="text-slate-800">admin@onsetinfra.com</strong></p>
              <p>Password: <strong className="text-slate-800">admin123</strong></p>
            </div>
          </div>

          <div className="mt-5 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition hover:text-[#0066B4]"
            >
              <ArrowLeft size={14} />
              Back to Public Website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  /* =========================================================
     AUTHENTICATED ADMIN DASHBOARD (Fully Responsive)
  ========================================================= */
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#17221D]">
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            className={`fixed right-3 sm:right-6 top-5 z-[999999] flex max-w-md items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl text-xs sm:text-sm font-medium text-white backdrop-blur-md ${
              notification.type === "error"
                ? "bg-red-600/95 border border-red-500 shadow-red-600/30"
                : notification.type === "warning"
                ? "bg-amber-600/95 border border-amber-500 shadow-amber-600/30"
                : "bg-[#0066B4]/95 border border-[#00528F] shadow-[#0066B4]/30"
            }`}
          >
            {notification.type === "error" ? (
              <AlertCircle size={18} className="shrink-0 text-red-200" />
            ) : notification.type === "warning" ? (
              <AlertCircle size={18} className="shrink-0 text-amber-200" />
            ) : (
              <CheckCircle2 size={18} className="shrink-0 text-emerald-300" />
            )}
            <span className="flex-1 leading-snug">{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-2 rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white transition"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CUSTOM CONFIRMATION MODAL (Replaces native browser window.confirm popup) */}
      <AnimatePresence>
        {confirmDialog.isOpen && (
          <div className="fixed inset-0 z-[999998] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl border border-slate-100"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    confirmDialog.isDanger
                      ? "bg-red-50 text-red-600 ring-8 ring-red-50/50"
                      : "bg-[#EDF5FA] text-[#0066B4] ring-8 ring-[#EDF5FA]/50"
                  }`}
                >
                  <Trash2 size={22} />
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-semibold text-slate-900">
                    {confirmDialog.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500">
                    {confirmDialog.message}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse justify-end gap-2.5 sm:flex-row sm:gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (confirmDialog.onConfirm) {
                      await confirmDialog.onConfirm();
                    }
                  }}
                  className={`rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition ${
                    confirmDialog.isDanger
                      ? "bg-red-600 hover:bg-red-700 shadow-red-600/25"
                      : "bg-[#0066B4] hover:bg-[#00528F] shadow-[#0066B4]/25"
                  }`}
                >
                  {confirmDialog.confirmText || "Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DEDICATED ADMIN HEADER (Replaces standard public Navigation) */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 sm:py-3.5">
          {/* BRAND */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0066B4] font-bold text-white shadow-sm sm:h-10 sm:w-10">
              OI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-wider text-slate-900 sm:text-base">
                  ONSET INFRA
                </span>
                <span className="rounded-full bg-[#0066B4]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0066B4]">
                  Admin
                </span>
              </div>
              <p className="hidden text-[10px] uppercase tracking-widest text-slate-400 xs:block">
                Engineers & Interior Designers
              </p>
            </div>
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 active:scale-95"
              title="Log out from dashboard"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="mx-auto max-w-7xl px-3.5 py-4 xs:px-5 xs:py-6 sm:px-6 sm:py-8">
        {/* WELCOME / SUMMARY BANNER */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#0066B4]">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Administrative Workspace
              </div>
              <h1 className="mt-1 font-serif text-2xl font-light text-slate-900 xs:text-3xl sm:text-4xl">
                Website Content Manager
              </h1>
              <p className="mt-0.5 text-xs text-slate-500">
                Logged in as <strong className="text-slate-700">{currentUser?.email}</strong>
              </p>
            </div>

            {/* QUICK ACTION BUTTON */}
            <div className="flex items-center gap-2">
              {activeTab === "projects" ? (
                <button
                  onClick={openAddProjectModal}
                  className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-[#0066B4] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-[#0066B4]/20 transition hover:bg-[#00528F] sm:w-auto"
                >
                  <Plus size={16} />
                  Add Project
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsGalleryModalOpen(true);
                    setGalleryUploadedImages([]);
                    setGalleryForm({ title: "", category: "Infrastructure", image: "" });
                  }}
                  className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-[#0066B4] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-[#0066B4]/20 transition hover:bg-[#00528F] sm:w-auto"
                >
                  <Plus size={16} />
                  Add Gallery Image
                </button>
              )}
            </div>
          </div>

          {/* STATS TILES */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-3.5 sm:p-4">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                  Projects
                </span>
                <Layers size={16} className="text-[#0066B4]" />
              </div>
              <p className="mt-1 font-serif text-2xl font-light text-slate-900 sm:text-3xl">
                {projects.length}
              </p>
              <span className="text-[10px] text-slate-400">Live on /projects</span>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-3.5 sm:p-4">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                  Gallery
                </span>
                <ImageIcon size={16} className="text-[#0066B4]" />
              </div>
              <p className="mt-1 font-serif text-2xl font-light text-slate-900 sm:text-3xl">
                {galleryItems.length}
              </p>
              <span className="text-[10px] text-slate-400">Home visual archive</span>
            </div>
          </div>
        </div>

        {/* TABS & SEARCH BAR */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* TAB BUTTONS */}
          <div className="flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => {
                setActiveTab("projects");
                setSearchQuery("");
              }}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === "projects"
                  ? "bg-[#0066B4] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FolderPlus size={15} />
              Projects ({projects.length})
            </button>

            <button
              onClick={() => {
                setActiveTab("gallery");
                setSearchQuery("");
              }}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === "gallery"
                  ? "bg-[#0066B4] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ImageIcon size={15} />
              Gallery ({galleryItems.length})
            </button>
          </div>

          {/* SEARCH INPUT */}
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 outline-none transition focus:border-[#0066B4] focus:ring-2 focus:ring-[#0066B4]/10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY FILTER CHIPS */}
        <div className="mt-4 flex max-w-full gap-1.5 overflow-x-auto pb-1">
          {activeTab === "projects"
            ? ["All", ...allProjectCategories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilterCategory(cat)}
                  className={`whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                    projectFilterCategory === cat
                      ? "border-[#0066B4] bg-[#0066B4] text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))
            : ["All", ...allGalleryCategories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilterCategory(cat)}
                  className={`whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                    galleryFilterCategory === cat
                      ? "border-[#0066B4] bg-[#0066B4] text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
        </div>

        {/* =====================================================
            TAB 1: PROJECTS LIST VIEW
        ===================================================== */}
        {activeTab === "projects" && (
          <div className="mt-5">
            {filteredProjects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <FolderPlus size={32} className="mx-auto text-slate-300" />
                <p className="mt-2 text-sm font-medium text-slate-600">No projects found</p>
                <p className="text-xs text-slate-400">Try changing your search or category filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.projectId || proj.id || proj._id}
                    className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div>
                      {/* CARD IMAGE */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                        <img
                          src={proj.image || "/projects/building-construction.jpg"}
                          alt={proj.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src = "/projects/building-construction.jpg";
                          }}
                        />
                        <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-0.5 font-mono text-[10px] font-bold text-[#0066B4] shadow-sm backdrop-blur-sm">
                          {proj.projectId || proj.id}
                        </span>
                        <span className="absolute right-3 top-3 rounded-full bg-[#071b2d]/85 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                          {proj.category}
                        </span>
                      </div>

                      {/* CARD CONTENT */}
                      <div className="p-4 sm:p-5">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                          <MapPin size={13} className="text-[#0066B4]" />
                          <span>{proj.location || "Kerala"}</span>
                        </div>

                        <h3 className="mt-1 font-serif text-base font-normal leading-snug text-slate-900 sm:text-lg">
                          {proj.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">
                          {proj.description}
                        </p>

                        {proj.deliverables && proj.deliverables.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {proj.deliverables.slice(0, 2).map((d, i) => (
                              <span
                                key={i}
                                className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                              >
                                ✓ {d}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ACTIONS ROW */}
                    <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 p-3.5 sm:p-4">
                      <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">
                        <MapPin size={11} className="text-[#0066B4]" />
                        <span>{proj.location || "Kerala"}</span>
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditProjectModal(proj)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-[#0066B4] hover:text-[#0066B4]"
                          title="Edit project"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-red-500 transition hover:border-red-500 hover:bg-red-50"
                          title="Delete project"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =====================================================
            TAB 2: GALLERY LIST VIEW
        ===================================================== */}
        {activeTab === "gallery" && (
          <div className="mt-5">
            {filteredGallery.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <ImageIcon size={32} className="mx-auto text-slate-300" />
                <p className="mt-2 text-sm font-medium text-slate-600">No gallery images found</p>
                <p className="text-xs text-slate-400">Click &ldquo;Add Gallery Image&rdquo; to add photography</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {filteredGallery.map((item) => (
                  <div
                    key={item.galleryId || item.id || item._id}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-[#7fc1f2]">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-medium leading-tight line-clamp-1">
                          {item.title}
                        </h4>
                      </div>

                      {/* DELETE BUTTON (Always visible for touch responsiveness) */}
                      <button
                        onClick={() => handleDeleteGallery(item)}
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600/90 text-white shadow-md backdrop-blur-sm transition hover:bg-red-700"
                        title="Delete gallery image"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* =====================================================
          MODAL: ADD / EDIT PROJECT (Fully Mobile Responsive)
      ===================================================== */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-3 sm:p-6 backdrop-blur-sm overflow-y-auto">
          <div className="relative my-auto w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 sm:right-6 sm:top-6"
            >
              <X size={18} />
            </button>

            <h2 className="font-serif text-xl font-light text-slate-900 sm:text-2xl">
              {editingProject ? "Edit Project Details" : "Add New Project"}
            </h2>
            <p className="text-xs text-slate-500">
              Synced directly to the website and MongoDB database.
            </p>

            <form onSubmit={handleSaveProject} className="mt-5 space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="e.g. Kannur Multi-Speciality Complex"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#0066B4]"
                  />
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                      <Tag size={12} className="text-[#0066B4]" />
                      <span>Category *</span>
                    </label>
                    {!isAddingNewProjectCat && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingNewProjectCat(true);
                          setNewProjectCatInput("");
                        }}
                        className="flex items-center gap-1 rounded-lg border border-[#0066B4]/30 bg-[#EDF5FA] px-2 py-0.5 text-[10px] font-semibold text-[#0066B4] transition hover:bg-[#0066B4] hover:text-white"
                      >
                        <Plus size={11} />
                        <span>Add New</span>
                      </button>
                    )}
                  </div>

                  {/* Inline New Category Creation Input */}
                  {isAddingNewProjectCat && (
                    <div className="mb-2 flex items-center gap-1.5 rounded-xl border border-[#0066B4]/40 bg-[#EDF5FA]/80 p-1.5 shadow-sm">
                      <input
                        type="text"
                        autoFocus
                        value={newProjectCatInput}
                        onChange={(e) => setNewProjectCatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddProjectCategory();
                          } else if (e.key === "Escape") {
                            setIsAddingNewProjectCat(false);
                          }
                        }}
                        placeholder="New category..."
                        className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-900 outline-none focus:border-[#0066B4]"
                      />
                      <button
                        type="button"
                        onClick={handleAddProjectCategory}
                        disabled={!newProjectCatInput.trim()}
                        className="flex items-center gap-1 rounded-lg bg-[#0066B4] px-2.5 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-[#00528F] disabled:opacity-50"
                      >
                        <Check size={11} />
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingNewProjectCat(false)}
                        className="rounded-lg border border-slate-200 bg-white p-1 text-slate-500 hover:bg-slate-50"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}

                  {/* Modern Pill Chips Selector with Remove Category Option */}
                  <div className="flex max-h-28 flex-wrap gap-1.5 overflow-y-auto rounded-xl border border-slate-200/80 bg-slate-50/60 p-2">
                    {allProjectCategories.map((cat) => {
                      const isSelected = projectForm.category === cat;
                      return (
                        <div
                          key={cat}
                          className={`group flex items-center rounded-lg transition ${
                            isSelected
                              ? "bg-[#0066B4] text-white shadow-sm shadow-[#0066B4]/25 ring-2 ring-[#0066B4]/20"
                              : "border border-slate-200 bg-white text-slate-700 hover:border-[#0066B4]/40 hover:bg-white"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setProjectForm((prev) => ({ ...prev, category: cat }))}
                            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium"
                          >
                            {isSelected && <Check size={11} className="stroke-[2.5]" />}
                            <span>{cat}</span>
                          </button>

                          {allProjectCategories.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveProjectCategory(cat);
                              }}
                              title={`Remove category "${cat}"`}
                              className={`mr-1 flex h-3.5 w-3.5 items-center justify-center rounded-full transition ${
                                isSelected
                                  ? "text-white/70 hover:bg-white/20 hover:text-white"
                                  : "text-slate-400 hover:bg-red-50 hover:text-red-500"
                              }`}
                            >
                              <X size={10} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Location
                  </label>
                  <input
                    type="text"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    placeholder="e.g. Kannur / Kerala"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#0066B4]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Icon Theme
                  </label>
                  <select
                    value={projectForm.iconName}
                    onChange={(e) => setProjectForm({ ...projectForm, iconName: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#0066B4]"
                  >
                    <option value="Building2">Building</option>
                    <option value="Route">Highway / Road</option>
                    <option value="Map">Surveying / Map</option>
                    <option value="HardHat">Management / Safety</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Project Image
                </label>

                <div className="mt-1 flex flex-col gap-2 rounded-2xl border border-dashed border-[#0066B4]/30 bg-[#EDF5FA]/60 p-3.5 transition hover:border-[#0066B4]">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0066B4] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#00528F]">
                      <UploadCloud size={15} />
                      <span>{projectUploading ? "Uploading..." : "Upload Image to Folder"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={projectUploading}
                        onChange={handleProjectImageUpload}
                        className="hidden"
                      />
                    </label>

                    {projectForm.image && (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                        <CheckCircle2 size={14} />
                        Image ready
                      </span>
                    )}
                  </div>

                  {projectForm.image && (
                    <div className="flex items-center gap-3 pt-1">
                      <img
                        src={projectForm.image}
                        alt="Project preview"
                        className="h-14 w-20 rounded-lg border border-slate-200 object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <span className="max-w-xs truncate text-[11px] text-slate-600">
                        {projectForm.image}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Short Card Summary *
                </label>
                <textarea
                  rows="2"
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Concise overview shown on project directory cards..."
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#0066B4]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Detailed Scope & Specifications
                </label>
                <textarea
                  rows="3"
                  value={projectForm.details}
                  onChange={(e) => setProjectForm({ ...projectForm, details: e.target.value })}
                  placeholder="Detailed breakdown shown inside the project popup modal..."
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#0066B4]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Key Deliverables (one per line)
                </label>
                <textarea
                  rows="2"
                  value={projectForm.deliverables}
                  onChange={(e) => setProjectForm({ ...projectForm, deliverables: e.target.value })}
                  placeholder="Turnkey civil contracting&#10;Structural safety compliance&#10;Stormwater drainage"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#0066B4]"
                />
              </div>

              <div className="flex flex-col-reverse justify-end gap-2 pt-2 sm:flex-row sm:gap-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#0066B4] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-[#00528F]"
                >
                  {editingProject ? "Update Project" : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL: ADD GALLERY IMAGE (Fully Mobile Responsive)
      ===================================================== */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-3 sm:p-6 backdrop-blur-sm overflow-y-auto">
          <div className="relative my-auto w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
            <button
              onClick={() => setIsGalleryModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 sm:right-6 sm:top-6"
            >
              <X size={18} />
            </button>

            <h2 className="font-serif text-xl font-light text-slate-900 sm:text-2xl">
              Add Gallery Image
            </h2>
            <p className="text-xs text-slate-500">
              Publish photography to the home visual gallery archive.
            </p>

            <form onSubmit={handleSaveGallery} className="mt-5 space-y-3.5 sm:space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Image Title *
                </label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="e.g. Modern Expressway Tarring"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#0066B4]"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <Tag size={13} className="text-[#0066B4]" />
                    <span>Category *</span>
                  </label>
                  {!isAddingNewGalleryCat && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNewGalleryCat(true);
                        setNewGalleryCatInput("");
                      }}
                      className="flex items-center gap-1 rounded-lg border border-[#0066B4]/30 bg-[#EDF5FA] px-2.5 py-1 text-[11px] font-semibold text-[#0066B4] shadow-sm transition hover:bg-[#0066B4] hover:text-white"
                    >
                      <Plus size={12} />
                      <span>Add New Category</span>
                    </button>
                  )}
                </div>

                {/* Inline New Category Creation Input */}
                {isAddingNewGalleryCat && (
                  <div className="mb-3 flex items-center gap-2 rounded-xl border border-[#0066B4]/40 bg-[#EDF5FA]/90 p-2 shadow-sm">
                    <input
                      type="text"
                      autoFocus
                      value={newGalleryCatInput}
                      onChange={(e) => setNewGalleryCatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddGalleryCategory();
                        } else if (e.key === "Escape") {
                          setIsAddingNewGalleryCat(false);
                        }
                      }}
                      placeholder="e.g. Architecture, Renovation, Highways..."
                      className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-[#0066B4]"
                    />
                    <button
                      type="button"
                      onClick={handleAddGalleryCategory}
                      disabled={!newGalleryCatInput.trim()}
                      className="flex items-center gap-1 rounded-lg bg-[#0066B4] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#00528F] disabled:opacity-50"
                    >
                      <Check size={12} />
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingNewGalleryCat(false)}
                      className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 hover:bg-slate-50"
                    >
                      <X size={13} />
                    </button>
                  </div>
                )}

                {/* Modern Pill Chips Selector with Remove Category Option */}
                <div className="flex flex-wrap gap-1.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-2.5">
                  {allGalleryCategories.map((cat) => {
                    const isSelected = galleryForm.category === cat;
                    return (
                      <div
                        key={cat}
                        className={`group flex items-center rounded-xl transition ${
                          isSelected
                            ? "bg-[#0066B4] text-white shadow-sm shadow-[#0066B4]/25 ring-2 ring-[#0066B4]/20"
                            : "border border-slate-200 bg-white text-slate-700 hover:border-[#0066B4]/40 hover:bg-white"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setGalleryForm((prev) => ({ ...prev, category: cat }))}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium"
                        >
                          {isSelected && <Check size={12} className="stroke-[2.5]" />}
                          <span>{cat}</span>
                        </button>

                        {allGalleryCategories.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveGalleryCategory(cat);
                            }}
                            title={`Remove category "${cat}"`}
                            className={`mr-1.5 flex h-4 w-4 items-center justify-center rounded-full transition ${
                              isSelected
                                ? "text-white/70 hover:bg-white/20 hover:text-white"
                                : "text-slate-400 hover:bg-red-50 hover:text-red-500"
                            }`}
                          >
                            <X size={11} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    Gallery Images *
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Select single or multiple photos
                  </span>
                </div>

                <div className="rounded-2xl border border-dashed border-[#0066B4]/30 bg-[#EDF5FA]/60 p-3.5 transition hover:border-[#0066B4]">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0066B4] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#00528F]">
                      <UploadCloud size={16} />
                      <span>
                        {galleryUploading
                          ? "Uploading Images..."
                          : "Upload Image(s) to Folder"}
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        disabled={galleryUploading}
                        onChange={handleGalleryImageUpload}
                        className="hidden"
                      />
                    </label>

                    {galleryUploadedImages.length > 0 ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                        <CheckCircle2 size={14} />
                        {galleryUploadedImages.length === 1
                          ? "1 image ready"
                          : `${galleryUploadedImages.length} images ready`}
                      </span>
                    ) : galleryForm.image ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                        <CheckCircle2 size={14} />
                        Image ready
                      </span>
                    ) : null}
                  </div>

                  {/* Previews Grid for Multiple or Single Images */}
                  {galleryUploadedImages.length > 0 && (
                    <div className="mt-3 border-t border-slate-200/60 pt-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          Selected Photos ({galleryUploadedImages.length})
                        </span>
                        {galleryUploadedImages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setGalleryUploadedImages([]);
                              setGalleryForm((prev) => ({ ...prev, image: "" }));
                            }}
                            className="text-[11px] font-medium text-red-500 hover:underline"
                          >
                            Clear all
                          </button>
                        )}
                      </div>

                      <div className="grid max-h-52 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4 md:grid-cols-5">
                        {galleryUploadedImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                          >
                            <img
                              src={img.url}
                              alt={`Upload ${idx + 1}`}
                              className="h-full w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setGalleryUploadedImages((prev) => {
                                  const next = prev.filter((_, i) => i !== idx);
                                  if (next.length > 0) {
                                    setGalleryForm((f) => ({ ...f, image: next[0].url }));
                                  } else {
                                    setGalleryForm((f) => ({ ...f, image: "" }));
                                  }
                                  return next;
                                });
                              }}
                              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600/90 text-white shadow-sm transition hover:bg-red-700"
                              title="Remove photo"
                            >
                              <X size={10} />
                            </button>
                            <div className="absolute inset-x-0 bottom-0 bg-black/60 px-1 py-0.5 text-center text-[9px] text-white truncate">
                              {img.filename}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col-reverse justify-end gap-2 pt-2 sm:flex-row sm:gap-3">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#0066B4] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-[#00528F]"
                >
                  {galleryUploadedImages.length > 1
                    ? `Add ${galleryUploadedImages.length} Images to Gallery`
                    : "Add to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
