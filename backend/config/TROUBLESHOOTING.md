# Troubleshooting Guide

## Database Issues

### "Specified key was too long" Error

If you see this error, it means the database tables were created with an old schema. 

**Solution:**
1. Drop the existing database or tables:
   ```sql
   mysql -u root -p
   DROP DATABASE dashboard_db;
   CREATE DATABASE dashboard_db;
   EXIT;
   ```

2. Restart the backend server - it will automatically create the tables with the correct schema.

### "Unknown database" Error

This is normal on first run. The database will be created automatically.

### Connection Pool Error Before Database Creation

The connection pool error appears because it tries to connect before the database is created. This is expected and will resolve once the database is initialized.

## Port Conflicts

If you get "port already in use" errors:
- Change the port in the respective `webpack.config.js` or `.env` file
- Kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :PORT
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -ti:PORT | xargs kill
  ```

## Module Federation Errors

If micro-frontends don't load:
1. Ensure ALL micro-frontends are running
2. Check browser console for specific errors
3. Verify ports match in webpack.config.js files
4. Clear browser cache

## CORS Issues

The backend is already configured for CORS. If you still see CORS errors:
- Check that backend is running on port 5000
- Verify API URLs in frontend apps point to correct backend URL

