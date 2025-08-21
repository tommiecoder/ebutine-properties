import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { users, properties, contacts, propertyInquiries } from '@shared/schema';

let db: any;
let isDbConnected = false;

try {
  if (process.env.DATABASE_URL) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
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