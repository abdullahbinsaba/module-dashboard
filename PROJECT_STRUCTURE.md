# Project Structure

```
modular-dashboard/
│
├── README.md                    # Main documentation
├── QUICK_START.md               # Quick setup guide
├── .gitignore                   # Git ignore file
├── package.json                 # Root package.json with helper scripts
│
├── backend/                     # Node.js + Express + MySQL Backend
│   ├── package.json
│   ├── server.js                # Express server entry point
│   ├── .env.example            # Environment variables template
│   │
│   ├── config/
│   │   ├── database.js         # MySQL connection pool
│   │   └── db-init.sql         # Database initialization script
│   │
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── taskController.js   # Task CRUD operations
│   │   └── analyticsController.js # Analytics data
│   │
│   ├── models/
│   │   ├── User.js             # User model
│   │   └── Task.js             # Task model
│   │
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   ├── taskRoutes.js       # Task endpoints
│   │   └── analyticsRoutes.js  # Analytics endpoints
│   │
│   └── middlewares/
│       └── auth.js             # JWT authentication middleware
│
├── shell-app/                   # React Host Application (Port 3000)
│   ├── package.json
│   ├── webpack.config.js       # Module Federation host config
│   │
│   ├── public/
│   │   └── index.html
│   │
│   └── src/
│       ├── index.jsx           # Entry point
│       ├── index.css           # Global styles
│       ├── App.jsx             # Main app component
│       ├── App.css
│       │
│       ├── contexts/
│       │   └── AuthContext.jsx # Authentication context
│       │
│       └── components/
│           ├── Navbar.jsx      # Top navigation
│           ├── Navbar.css
│           ├── Sidebar.jsx     # Side navigation
│           └── Sidebar.css
│
├── auth-app/                    # Auth Micro-Frontend (Port 3001)
│   ├── package.json
│   ├── webpack.config.js       # Module Federation remote config
│   │
│   ├── public/
│   │   └── index.html
│   │
│   └── src/
│       ├── index.jsx
│       ├── App.jsx             # Login/Register component
│       └── App.css
│
├── dashboard-app/               # Dashboard Micro-Frontend (Port 3002)
│   ├── package.json
│   ├── webpack.config.js
│   │
│   ├── public/
│   │   └── index.html
│   │
│   └── src/
│       ├── index.jsx
│       ├── App.jsx             # Dashboard with user info & stats
│       └── App.css
│
├── tasks-app/                   # Tasks Micro-Frontend (Port 3003)
│   ├── package.json
│   ├── webpack.config.js
│   │
│   ├── public/
│   │   └── index.html
│   │
│   └── src/
│       ├── index.jsx
│       ├── App.jsx             # Task CRUD interface
│       └── App.css
│
└── analytics-app/               # Analytics Micro-Frontend (Port 3004)
    ├── package.json
    ├── webpack.config.js
    │
    ├── public/
    │   └── index.html
    │
    └── src/
        ├── index.jsx
        ├── App.jsx             # Charts and analytics
        └── App.css
```

## Key Files Summary

### Backend
- **server.js**: Express server setup and route mounting
- **config/database.js**: MySQL connection pool configuration
- **models/**: Database models (User, Task)
- **controllers/**: Request handlers for each resource
- **routes/**: API route definitions
- **middlewares/auth.js**: JWT authentication middleware

### Frontend Apps
- **webpack.config.js**: Module Federation configuration
- **src/App.jsx**: Main component for each micro-frontend
- **src/index.jsx**: React entry point

### Shell App (Host)
- **webpack.config.js**: Configures remotes (other micro-frontends)
- **src/App.jsx**: Main routing and layout
- **src/contexts/AuthContext.jsx**: Shared authentication state
- **src/components/**: Navbar and Sidebar components

## Port Allocation
- **3000**: Shell App (Host)
- **3001**: Auth App
- **3002**: Dashboard App
- **3003**: Tasks App
- **3004**: Analytics App
- **5000**: Backend API

## Module Federation Setup
- **Shell App**: Host that loads all remotes
- **Micro-Frontends**: Exposed as remotes via ModuleFederationPlugin
- **Shared Dependencies**: React, React-DOM shared as singletons

