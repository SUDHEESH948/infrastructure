# Onset Infra - Backend API

Express & MongoDB Atlas backend for Onset Infra projects and services.

## Architecture & Structures

```text
backend/
├── .env                  # Environment variables (Mongo URI, Port, Client URL)
├── .env.example          # Example environment configuration
├── server.js             # Express app entry point
├── package.json          # Dependencies & scripts
└── src/
    ├── config/
    │   └── db.js         # Mongoose connection to MongoDB Atlas
    ├── controllers/
    │   ├── projectController.js  # CRUD operations for Projects
    │   └── serviceController.js  # Operations for Services
    ├── data/
    │   ├── projectsData.js       # Seed dataset for Projects
    │   └── servicesData.js       # Seed dataset for Services
    ├── middleware/
    │   └── errorMiddleware.js    # 404 & error handlers
    ├── models/
    │   ├── Project.js            # Mongoose Schema for Projects
    │   └── Service.js            # Mongoose Schema for Services
    ├── routes/
    │   ├── projectRoutes.js      # /api/projects routes
    │   └── serviceRoutes.js      # /api/services routes
    └── seeder.js                 # Database seeding script
```

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure MongoDB Atlas (.env)
Open `backend/.env` and update `MONGODB_URI` with your MongoDB Atlas details:
```env
MONGODB_URI=mongodb+srv://kssudheesh818_db_user:<password>@<cluster-address>.mongodb.net/infrastructure?retryWrites=true&w=majority
```
> **Steps to get your URI from cloud.mongodb.com:**
> 1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
> 2. Go to **Database Access** and verify user `kssudheesh818_db_user` has read/write privileges.
> 3. Go to **Network Access** and add your IP address (or `0.0.0.0/0` for development).
> 4. Go to **Database** -> click **Connect** on your cluster -> select **Drivers (Node.js)**.
> 5. Copy the connection string and paste your database password in place of `<password>`.

### 3. Seed Database
Once your MongoDB Atlas URI is set:
```bash
npm run seed
```

### 4. Start Development Server
```bash
npm run dev
```
Server runs at `http://localhost:5000` with CORS configured for `http://localhost:5173`.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check endpoint |
| GET | `/api/projects` | Fetch all projects (supports `?category=...`) |
| GET | `/api/projects/:id` | Fetch single project by ID or projectId |
| POST | `/api/projects` | Create a new project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| GET | `/api/services` | Fetch all services |

