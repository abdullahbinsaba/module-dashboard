# Environment Setup Guide

## Quick Fix for 500 Internal Server Error

The most common cause of 500 errors during registration/login is missing JWT secrets in the `.env` file.

## Steps to Fix:

### 1. Create `.env` file in the `backend` directory

```bash
cd backend
```

### 2. Copy the example file (if it exists) or create a new `.env` file:

```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

### 3. Edit the `.env` file and set these values:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=dashboard_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this_in_production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

### 4. Important: Set Strong JWT Secrets

Generate random strings for JWT_SECRET and JWT_REFRESH_SECRET. You can use:

**Option 1: Use Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Option 2: Use Online Generator**
- Visit: https://randomkeygen.com/
- Use a "CodeIgniter Encryption Keys" (256-bit)

**Option 3: Manual (for development only)**
```env
JWT_SECRET=my_super_secret_jwt_key_for_development_only_12345
JWT_REFRESH_SECRET=my_super_secret_refresh_key_for_development_only_12345
```

### 5. Restart the backend server

```bash
npm start
```

## Verify Setup

When you start the server, you should see:
```
✅ All required environment variables are set
✅ Database 'dashboard_db' ready
✅ Users table ready
✅ Tasks table ready
✅ Database initialization complete
✅ Database connection pool ready
🚀 Server running on http://localhost:5000
```

If you see an error about missing environment variables, check your `.env` file again.

## Common Issues

### Issue: "Missing required environment variables"
**Solution**: Make sure your `.env` file is in the `backend` directory and contains all required variables.

### Issue: "Database connection error"
**Solution**: Check your MySQL credentials in `.env` file (DB_HOST, DB_USER, DB_PASSWORD).

### Issue: Still getting 500 errors
**Solution**: 
1. Check the backend console for detailed error messages
2. Make sure MySQL is running
3. Verify database credentials are correct
4. Check that the database was created successfully

