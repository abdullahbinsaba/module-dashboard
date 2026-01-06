# Micro-Frontend Dashboard Application

A simple and clean micro-frontend dashboard application built with React 18, Webpack 5 Module Federation, Node.js, Express, and MySQL.

## 🏗️ Project Structure

```
modular-dashboard/
├── shell-app/          # React Host Application (Port 3000)
├── auth-app/           # Auth Micro-Frontend (Port 3001)
├── dashboard-app/      # Dashboard Micro-Frontend (Port 3002)
├── tasks-app/          # Tasks Micro-Frontend (Port 3003)
├── analytics-app/      # Analytics Micro-Frontend (Port 3004)
└── backend/            # Node.js + Express + MySQL API (Port 5000)
```

## 🚀 Features

- **Micro-Frontend Architecture**: Using Webpack 5 Module Federation
- **JWT Authentication**: Access and refresh token support
- **Role-Based Access Control**: Different permissions for 'user' and 'admin' roles.
- **Task Management**: CRUD operations for tasks with filtering, searching, and sorting.
- **Analytics Dashboard**: Visual charts and statistics.
- **Protected Routes**: Authentication-based route protection.
- **Responsive Design**: Adapts to various screen sizes for optimal viewing.
- **Theming**: Light and Dark mode toggle for user preference.
- **Error Boundaries**: Graceful error handling for micro-frontends.
- **Custom Hooks**: `useTasks` and `useAnalytics` for reusable logic.
- **Input Validation**: Backend validation using Joi.
- **Performance Optimizations**: Implemented `React.memo`, `useCallback`, and `useMemo`.

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## 🛠️ Setup Instructions

### 1. Database Setup

1. Start your MySQL server
2. **No need to create database manually!** The backend will automatically create the database and tables if they don't exist when you start the server.
   
   However, if you want to manually set up, you can:
   ```sql
   CREATE DATABASE dashboard_db;
   ```
   Or use the SQL script: `backend/config/db-init.sql`

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **IMPORTANT: Create a `.env` file** with your configuration:
   ```bash
   # Create .env file (copy from .envcopy if it exists, or create new)
   # Windows
   copy .envcopy .env
   
   # Linux/Mac
   cp .envcopy .env
   ```

4. **CRITICAL: Update the `.env` file** with your database credentials and JWT secrets:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=dashboard_db
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d
   ```

   **⚠️ Important**: Generate strong random strings for `JWT_SECRET` and `JWT_REFRESH_SECRET`. 
   You can use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

5. Start the backend server:
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

The backend will run on `http://localhost:5000`

**Note**: If you see errors about missing environment variables, check your `.env` file. See `backend/SETUP_ENV.md` for detailed setup instructions. For troubleshooting database related issues, refer to `backend/config/TROUBLESHOOTING.md`.

### 3. Frontend Setup

You need to install dependencies and start each micro-frontend separately. Open multiple terminal windows/tabs.

#### Terminal 1 - Shell App (Host)
```bash
cd shell-app
npm install
npm start
```
Runs on `http://localhost:3000`

#### Terminal 2 - Auth App
```bash
cd auth-app
npm install
npm start
```
Runs on `http://localhost:3001`

#### Terminal 3 - Dashboard App
```bash
cd dashboard-app
npm install
npm start
```
Runs on `http://localhost:3002`

#### Terminal 4 - Tasks App
```bash
cd tasks-app
npm install
npm start
```
Runs on `http://localhost:3003`

#### Terminal 5 - Analytics App
```bash
cd analytics-app
npm install
npm start
```
Runs on `http://localhost:3004`

### 4. Access the Application

1. Open your browser and navigate to: `http://localhost:3000`
2. You'll be redirected to the login page
3. Register a new account or use existing credentials

## 📝 Default Test User

After running the database initialization script, you can create a user via the registration form. By default, new users are assigned the 'user' role. To create an 'admin' user, you would need to manually update the user's role in the database.

Example manual insertion for an admin user:

```sql
INSERT INTO users (name, email, password, role)
VALUES ('Admin User', 'admin@example.com', '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', 'admin');
```

**Note**: The password hash above is for "password123". For production, always use proper password hashing.

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

### Analytics
- `GET /api/analytics/overview` - Get analytics overview (protected)

## 🎯 Application Routes

- `/login` - Authentication page
- `/dashboard` - Main dashboard with user info and stats
- `/tasks` - Task management (CRUD operations)
- `/analytics` - Analytics dashboard with charts

## 🏛️ Architecture

### Module Federation

- **Shell App**: Host application that loads all micro-frontends
- **Micro-Frontends**: Independent React applications exposed as remotes
- **Shared Dependencies**: React and React-DOM are shared as singletons

### Backend Structure

```
backend/
├── controllers/    # Request handlers
├── routes/         # API routes
├── models/         # Database models
├── middlewares/    # Auth middleware
├── config/         # Database configuration
└── server.js       # Express server
```

## 🔒 Authentication Flow

1. User registers/logs in
2. Backend returns access token and refresh token
3. Tokens stored in localStorage
4. Access token sent with each API request
5. On token expiry, refresh token used to get new access token
6. On logout, tokens are cleared

## 🛠️ Technologies Used

- **Frontend**: React 18, React Router v6, Axios
- **Build Tool**: Webpack 5 with Module Federation
- **Backend**: Node.js, Express.js
- **Database**: MySQL with mysql2
- **Authentication**: JWT (jsonwebtoken)
- **Charts**: Recharts
- **Styling**: CSS (no heavy UI library)

## 📦 Dependencies

### Backend
- express
- mysql2
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- joi

### Frontend (all apps)
- react
- react-dom
- react-router-dom
- axios
- webpack
- babel-loader

### Analytics App (additional)
- recharts

## 🐛 Troubleshooting

### Port Conflicts
If you encounter port conflicts, update the ports in:
- `webpack.config.js` files (devServer.port)
- `backend/server.js` (PORT)
- API URLs in frontend apps

### CORS Issues
Make sure the backend CORS is configured correctly. The backend already includes CORS middleware.

### Database Connection
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists: `dashboard_db`

### Module Federation Issues
- Ensure all micro-frontends are running before accessing the shell app
- Check browser console for remote loading errors
- Verify ports match in webpack.config.js files

## 📄 License

This project is for educational purposes.

## 👨‍💻 Development Notes

- Keep code simple and readable.
- No over-engineering.
- Clear comments where needed.
- All code is production-ready and tested.

---

**Happy Coding! 🚀**

