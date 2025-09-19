// server/db.ts
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, type PoolConfig } from "@neondatabase/serverless";
import { users, properties, contacts, propertyInquiries } from "../shared/schema.js";

let db: any;
let isDbConnected = false;

try {
  if (process.env.DATABASE_URL) {
    const isProduction = process.env.NODE_ENV === "production";

    // Use pooler URL for production with SSL
    let connectionString = process.env.DATABASE_URL;
    if (isProduction && !connectionString.includes("-pooler.")) {
      connectionString = connectionString.replace(".us-east-2", "-pooler.us-east-2");
    }

    // 👇 explicitly type as PoolConfig so ssl is allowed
    const poolConfig: PoolConfig = {
      connectionString,
      max: isProduction ? 3 : 10,
      connectionTimeoutMillis: 15000,
      idleTimeoutMillis: 30000,
      // add ssl only in production
      ssl: isProduction ? { rejectUnauthorized: false } : undefined,
    };

    const pool = new Pool(poolConfig);

    db = drizzle(pool, {
      schema: { users, properties, contacts, propertyInquiries },
    });
    isDbConnected = true;
    console.log("✅ Database connected successfully");
  } else {
    console.log("⚠️ DATABASE_URL not found, using memory storage");
    isDbConnected = false;
  }
} catch (error) {
  console.error("❌ Database connection failed:", error);
  isDbConnected = false;
}

export { db, isDbConnected };
