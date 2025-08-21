
# Database Setup Instructions

## Step 1: Create PostgreSQL Database in Replit

1. **Open a new tab in Replit** and search for "Database"
2. **Click "Create a database"** - this will create a PostgreSQL database
3. **Wait for setup to complete** - Replit will automatically set the `DATABASE_URL` environment variable

## Step 2: Run Database Migration

After the database is created, run:

```bash
npm run db:migrate
```

## Step 3: Verify Connection

Your app will automatically detect the database connection. Look for these messages in the console:

- ✅ **Database connected successfully** - Database is working
- ⚠️ **Using memory storage** - Database not available (properties won't persist)

## Current Status

- **Database**: Not connected (using memory storage)
- **Data Persistence**: ❌ Properties are lost on restart
- **Admin Uploads**: ✅ Working but temporary

## After Database Setup

- **Database**: ✅ Connected to PostgreSQL
- **Data Persistence**: ✅ Properties saved permanently 
- **Admin Uploads**: ✅ Working with permanent storage

All property uploads through the admin interface will be **permanently stored** once the database is set up.
