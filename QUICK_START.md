# Quick Start Guide

## Prerequisites Check
- ✅ Node.js installed (v16+)
- ✅ MySQL installed and running
- ✅ Ports 3000-3004 and 5000 available

## Step-by-Step Setup

### 1. Database Setup
**Automatic Setup**: The database and tables will be created automatically when you start the backend server!

**Manual Setup (Optional)**:
```bash
# Create database manually (if needed)
mysql -u root -p
CREATE DATABASE dashboard_db;
EXIT;
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .envcopy .env
# Edit .env with your MySQL credentials
npm start
```
Backend runs on: http://localhost:5000

### 3. Frontend Setup (Open 5 terminals)

**Terminal 1 - Shell App:**
```bash
cd shell-app
npm install
npm start
```

**Terminal 2 - Auth App:**
```bash
cd auth-app
npm install
npm start
```

**Terminal 3 - Dashboard App:**
```bash
cd dashboard-app
npm install
npm start
```

**Terminal 4 - Tasks App:**
```bash
cd tasks-app
npm install
npm start
```

**Terminal 5 - Analytics App:**
```bash
cd analytics-app
npm install
npm start
```

### 4. Access Application
Open browser: http://localhost:3000

### 5. First Login
- Click "Register" on the login page
- Create your account
- You'll be automatically logged in

## Troubleshooting

### Port Already in Use
Change ports in respective `webpack.config.js` files

### Database Connection Error
- Check MySQL is running
- Verify credentials in `backend/.env`
- Ensure database `dashboard_db` exists

### Module Federation Errors
- Ensure ALL micro-frontends are running
- Check browser console for specific errors
- Verify ports match in webpack configs

### CORS Issues
Backend already configured for CORS. If issues persist, check `backend/server.js`

## Default Ports
- Shell App: 3000
- Auth App: 3001
- Dashboard App: 3002
- Tasks App: 3003
- Analytics App: 3004
- Backend API: 5000

