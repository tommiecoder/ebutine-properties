import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // 'residential_land', 'commercial_land', 'luxury_home', 'apartment'
  price: decimal("price", { precision: 15, scale: 2 }).notNull(),
  location: text("location").notNull(),
  address: text("address"),
  size: text("size"), // e.g., "650 sqm", "4 bedrooms"
  bedrooms: text("bedrooms"),
  bathrooms: text("bathrooms"),
  parking: text("parking"),
  features: jsonb("features").$type<string[]>(), // Array of features
  images: jsonb("images").$type<string[]>(), // Array of image URLs
  videos: jsonb("videos").$type<string[]>(), // Array of video URLs
  status: text("status").notNull().default("available"), // 'available', 'sold', 'reserved'
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  location: text("location"),
  propertyType: text("property_type"),
  budget: text("budget"),
  purpose: text("purpose"),
  message: text("message"),
  contactMethod: text("contact_method"), // 'email', 'phone', 'whatsapp'
  status: text("status").default("new"), // 'new', 'contacted', 'qualified', 'converted'
  createdAt: timestamp("created_at").defaultNow(),
});

export const propertyInquiries = pgTable("property_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  propertyId: varchar("property_id").references(() => properties.id),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPropertySchema = createInsertSchema(properties).extend({
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  // Support for external media URLs
  externalImages: z.array(z.string().url()).optional(),
  externalVideos: z.array(z.object({
    url: z.string().url(),
    platform: z.enum(['youtube', 'instagram', 'vimeo', 'facebook', 'tiktok', 'other']),
    title: z.string().optional(),
    thumbnail: z.string().url().optional()
  })).optional(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertPropertyInquirySchema = createInsertSchema(propertyInquiries).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type PropertyInquiry = typeof propertyInquiries.$inferSelect;
export type InsertPropertyInquiry = z.infer<typeof insertPropertyInquirySchema>;