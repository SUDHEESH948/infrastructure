import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "../services/api";

const PROJECT_CATEGORIES = [
  "Infrastructure",
  "Construction",
  "Surveying",
  "Project Management",
  "Consultancy",
  "Interiors",
];

const GALLERY_CATEGORIES = [
  "Infrastructure",
  "Construction",
  "Surveying",
  "Project Management",
];

const STOCK_GALLERY_PRESETS = [
  {
    title: "Highway Asphalt & Road Paving",
    url: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1000&q=80",
    category: "Infrastructure",
  },
  {
    title: "Civil RCC Structural Engineering",
    url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    category: "Construction",
  },
  {
    title: "DGPS Land Surveying & Topography",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
    category: "Surveying",
  },
  {
    title: "Site Supervision & Coordination",
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
    category: "Project Management",
  },
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

  // Data States
  const [projects, setProjects] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

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

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [projData, galData] = await Promise.all([
        fetchProjectsFromAPI(),
        fetchGalleryFromAPI(),
      ]);
      if (projData) setProjects(projData);
      if (galData) setGalleryItems(galData);
    } catch (err) {
      showNotification("Could not load latest data from API", "error");
    } finally {
      setLoading(false);
    }
  };

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

  // Delete Project
  const handleDeleteProject = async (proj) => {
    const idToDelete = proj.projectId || proj.id || proj._id;
    if (!window.confirm(`Are you sure you want to delete project: "${proj.title}"?`)) {
      return;
    }

    try {
      await deleteProjectAPI(idToDelete);
      showNotification(`Project "${proj.title}" removed!`);
      loadAllData();
    } catch (err) {
      showNotification(err.message || "Failed to delete project", "error");
    }
  };

  // Save Gallery Image
  const handleSaveGallery = async (e) => {
    e.preventDefault();
    if (!galleryForm.title.trim() || !galleryForm.image.trim()) {
      showNotification("Title and image URL are required", "error");
      return;
    }

    try {
      await createGalleryItemAPI(galleryForm);
      showNotification(`Gallery image "${galleryForm.title}" added successfully!`);
      setIsGalleryModalOpen(false);
      setGalleryForm({ title: "", category: "Infrastructure", image: "" });
      loadAllData();
    } catch (err) {
      showNotification(err.message || "Failed to add gallery item", "error");
    }
  };

  // Delete Gallery Image
  const handleDeleteGallery = async (item) => {
    const idToDelete = item.galleryId || item.id || item._id;
    if (!window.confirm(`Delete gallery image "${item.title}"?`)) {
      return;
    }

    try {
      await deleteGalleryItemAPI(idToDelete);
      showNotification(`Gallery image "${item.title}" removed!`);
      loadAllData();
    } catch (err) {
      showNotification(err.message || "Failed to delete gallery item", "error");
    }
  };

  /* =========================================================
     RENDER: LOGIN VIEW (Default Admin Screen)
  ========================================================= */
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#071b2d] via-[#092942] to-[#0066B4] px-4 py-16 text-[#17221D]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md overflow-hidden rounded-[28px] border border-white/15 bg-white/95 p-8 shadow-2xl backdrop-blur-xl sm:p-10"
        >
          {/* LOGO & TITLE */}
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0066B4] text-white shadow-lg shadow-[#0066B4]/30">
              <Lock size={26} />
            </div>
            <h1 className="mt-4 font-serif text-2xl font-light text-[#071b2d] sm:text-3xl">
              Onset Infra Admin
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Manage projects, gallery imagery, and website content
            </p>
          </div>

          {/* ERROR ALERT */}
          {loginError && (
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-200">
              <AlertCircle size={16} className="shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Admin Email or Username
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="admin@onsetinfra.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-[#0066B4] focus:bg-white focus:ring-4 focus:ring-[#0066B4]/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-[#0066B4] focus:bg-white focus:ring-4 focus:ring-[#0066B4]/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0066B4] py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-[#0066B4]/25 transition-all hover:bg-[#00528F] active:scale-[0.99] disabled:opacity-50"
            >
              {loginLoading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Verifying...
                </>
              ) : (
                "Log In to Dashboard"
              )}
            </button>
          </form>

          {/* DEFAULT CREDENTIALS HELPER */}
          <div className="mt-6 rounded-2xl border border-[#0066B4]/15 bg-[#EDF5FA] p-4 text-xs text-slate-700">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0066B4] uppercase tracking-wider text-[11px]">
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
        </motion.div>
      </div>
    );
  }

  /* =========================================================
     RENDER: AUTHENTICATED ADMIN DASHBOARD
  ========================================================= */
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-24 text-[#17221D] sm:pt-28 md:pt-32">
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed right-5 top-20 z-[999999] flex items-center gap-2.5 rounded-2xl px-5 py-3.5 shadow-xl text-xs font-medium text-white ${
              notification.type === "error" ? "bg-red-600" : "bg-[#0066B4]"
            }`}
          >
            {notification.type === "error" ? (
              <AlertCircle size={17} />
            ) : (
              <CheckCircle2 size={17} />
            )}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER BAR */}
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0066B4]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Administrative Control Panel
            </div>
            <h1 className="mt-1 font-serif text-2xl font-light text-slate-900 sm:text-3xl">
              Website Content Manager
            </h1>
            <p className="text-xs text-slate-500">
              Signed in as <span className="font-semibold text-slate-700">{currentUser?.email}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={loadAllData}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            <a
              href="/projects"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <Eye size={14} />
              View Site
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>

        {/* METRICS / STATS BAR */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Projects</span>
              <Layers size={18} className="text-[#0066B4]" />
            </div>
            <p className="mt-2 font-serif text-3xl font-light text-slate-900">{projects.length}</p>
            <span className="text-[11px] text-slate-400">Live on /projects</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Gallery Images</span>
              <ImageIcon size={18} className="text-[#0066B4]" />
            </div>
            <p className="mt-2 font-serif text-3xl font-light text-slate-900">{galleryItems.length}</p>
            <span className="text-[11px] text-slate-400">Displayed in Home Gallery</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Database Status</span>
              <Sparkles size={18} className="text-emerald-500" />
            </div>
            <p className="mt-2 text-sm font-semibold text-emerald-600">Active & Operational</p>
            <span className="text-[11px] text-slate-400">MongoDB Atlas & API synced</span>
          </div>
        </div>

        {/* TAB NAVIGATION & ACTION BAR */}
        <div className="mt-8 flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === "projects"
                  ? "bg-[#0066B4] text-white shadow-md shadow-[#0066B4]/20"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              <FolderPlus size={16} />
              Projects ({projects.length})
            </button>

            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === "gallery"
                  ? "bg-[#0066B4] text-white shadow-md shadow-[#0066B4]/20"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              <ImageIcon size={16} />
              Gallery Images ({galleryItems.length})
            </button>
          </div>

          <div>
            {activeTab === "projects" ? (
              <button
                onClick={openAddProjectModal}
                className="flex items-center gap-2 rounded-xl bg-[#0066B4] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-[#0066B4]/25 transition hover:bg-[#00528F]"
              >
                <Plus size={16} />
                Add New Project
              </button>
            ) : (
              <button
                onClick={() => setIsGalleryModalOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-[#0066B4] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-[#0066B4]/25 transition hover:bg-[#00528F]"
              >
                <Plus size={16} />
                Add Gallery Image
              </button>
            )}
          </div>
        </div>

        {/* =====================================================
            TAB 1: PROJECTS LIST
        ===================================================== */}
        {activeTab === "projects" && (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((proj) => (
              <div
                key={proj.projectId || proj.id || proj._id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={proj.image || "/projects/building-construction.jpg"}
                      alt={proj.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = "/projects/building-construction.jpg";
                      }}
                    />
                    <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#0066B4] backdrop-blur-sm">
                      {proj.projectId || proj.id}
                    </span>
                    <span className="absolute right-3 top-3 rounded-full bg-[#071b2d]/80 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                      {proj.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                      <MapPin size={13} className="text-[#0066B4]" />
                      <span>{proj.location || "Kerala"}</span>
                    </div>

                    <h3 className="mt-1 font-serif text-lg font-medium text-slate-900">
                      {proj.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500 line-clamp-2">
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

                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 p-4">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                    {proj.status || "Completed"}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditProjectModal(proj)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-[#0066B4] hover:text-[#0066B4]"
                      title="Edit project"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-red-500 transition hover:border-red-500 hover:bg-red-50"
                      title="Delete project"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =====================================================
            TAB 2: GALLERY LIST
        ===================================================== */}
        {activeTab === "gallery" && (
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {galleryItems.map((item) => (
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7fc1f2]">
                        {item.category}
                      </span>
                      <h4 className="mt-0.5 text-xs font-semibold leading-tight line-clamp-1">
                        {item.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => handleDeleteGallery(item)}
                      className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-red-600/90 text-white shadow-md backdrop-blur-sm transition hover:bg-red-700"
                      title="Delete gallery image"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =====================================================
          MODAL: ADD / EDIT PROJECT
      ===================================================== */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative my-8 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-700"
            >
              <X size={20} />
            </button>

            <h2 className="font-serif text-2xl font-light text-slate-900">
              {editingProject ? "Edit Project Details" : "Add New Project"}
            </h2>
            <p className="text-xs text-slate-500">
              Changes will update live across the website and in MongoDB.
            </p>

            <form onSubmit={handleSaveProject} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0066B4] focus:ring-2 focus:ring-[#0066B4]/10"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Category *
                  </label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0066B4]"
                  >
                    {PROJECT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Location
                  </label>
                  <input
                    type="text"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    placeholder="e.g. Kannur / Kerala"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0066B4]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Status
                  </label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0066B4]"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Icon Theme
                  </label>
                  <select
                    value={projectForm.iconName}
                    onChange={(e) => setProjectForm({ ...projectForm, iconName: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0066B4]"
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
                  Image Path / URL
                </label>
                <input
                  type="text"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  placeholder="/projects/building-construction.jpg or https://..."
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0066B4]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Short Summary *
                </label>
                <textarea
                  rows="2"
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="A concise overview of the project shown on cards..."
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0066B4]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Detailed Scope & Engineering Specifications
                </label>
                <textarea
                  rows="3"
                  value={projectForm.details}
                  onChange={(e) => setProjectForm({ ...projectForm, details: e.target.value })}
                  placeholder="Detailed breakdown shown inside the project popup modal..."
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0066B4]"
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
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0066B4]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
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
          MODAL: ADD GALLERY IMAGE
      ===================================================== */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative my-8 w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              onClick={() => setIsGalleryModalOpen(false)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-700"
            >
              <X size={20} />
            </button>

            <h2 className="font-serif text-2xl font-light text-slate-900">
              Add Gallery Image
            </h2>
            <p className="text-xs text-slate-500">
              Add new photography directly to the Home Visual Gallery.
            </p>

            <form onSubmit={handleSaveGallery} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Image Title *
                </label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="e.g. Modern Bridge Foundation Paving"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0066B4]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Category *
                </label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0066B4]"
                >
                  {GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={galleryForm.image}
                  onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0066B4]"
                />
              </div>

              {/* QUICK PRESETS */}
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Quick Image Presets
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {STOCK_GALLERY_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setGalleryForm({
                          title: preset.title,
                          category: preset.category,
                          image: preset.url,
                        })
                      }
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-600 hover:border-[#0066B4] hover:text-[#0066B4]"
                    >
                      {preset.category}: {preset.title.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* PREVIEW */}
              {galleryForm.image && (
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <div className="relative aspect-[16/9] w-full bg-slate-100">
                    <img
                      src={galleryForm.image}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3">
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
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
