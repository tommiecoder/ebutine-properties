import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { users, properties, contacts, propertyInquiries } from '../shared/schema.js';

let db: any;
let isDbConnected = false;

try {
  if (process.env.DATABASE_URL) {
    // For deployment, use pooling connection
    const connectionString = process.env.NODE_ENV === 'production' 
      ? process.env.DATABASE_URL.replace('.us-east-2', '-pooler.us-east-2')
      : process.env.DATABASE_URL;
      
    const pool = new Pool({ 
      connectionString,
      max: 10,
      connectionTimeoutMillis: 5000,
    });
    
    db = drizzle(pool, { 
      schema: { users, properties, contacts, propertyInquiries } 
    });
    isDbConnected = true;
    console.log('✅ Database connected successfully');
  } else {
    console.log('⚠️ DATABASE_URL not found, using memory storage');
    isDbConnected = false;
  }
} catch (error) {
  console.error('❌ Database connection failed:', error);
  isDbConnected = false;
}

export { db, isDbConnected };