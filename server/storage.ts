
import { type User, type InsertUser, type Property, type InsertProperty, type Contact, type InsertContact, type PropertyInquiry, type InsertPropertyInquiry } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { users, properties, contacts, propertyInquiries } from "@shared/schema";
import { eq, and, gte, lte, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Properties
  getProperties(filters?: {
    type?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
  }): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: string): Promise<boolean>;

  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;

  // Property Inquiries
  getPropertyInquiries(propertyId?: string): Promise<PropertyInquiry[]>;
  createPropertyInquiry(inquiry: InsertPropertyInquiry): Promise<PropertyInquiry>;
}

export class DatabaseStorage implements IStorage {
  private fallbackToMemory = false;
  private memoryProperties = new Map<string, Property>();
  private memoryContacts = new Map<string, Contact>();
  private memoryInquiries = new Map<string, PropertyInquiry>();

  constructor() {
    this.seedData();
  }

  private async seedData() {
    try {
      // Check if properties already exist
      const existingProperties = await db.select().from(properties).limit(1);
      if (existingProperties.length > 0) return;

      // Seed sample properties
      const sampleProperties = [
        {
          id: randomUUID(),
          title: "Luxury 4BR Duplex",
          description: "Elegant 4-bedroom duplex in gated estate with modern amenities",
          type: "luxury_home",
          price: "85000000",
          location: "Sangotedo, Ajah Lagos",
          address: "Greenland Estate, Sangotedo",
          size: "4 bedrooms",
          bedrooms: "4",
          bathrooms: "5",
          parking: "2",
          features: ["Modern Kitchen", "Swimming Pool", "24/7 Security", "Fitted Wardrobes"],
          images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3"],
          videos: ["https://example.com/property1-tour.mp4"],
          status: "available",
          featured: true,
        },
        {
          id: randomUUID(),
          title: "Commercial Land",
          description: "Strategic commercial property in high-traffic area",
          type: "commercial_land",
          price: "35000000",
          location: "Ibeju-Lekki, Lagos",
          address: "Ibeju-Lekki Free Trade Zone",
          size: "2,000 sqm",
          bedrooms: null,
          bathrooms: null,
          parking: null,
          features: ["C of O", "Tarred Road", "High ROI Potential"],
          images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3"],
          videos: ["https://example.com/commercial-land-overview.mp4"],
          status: "available",
          featured: true,
        },
        {
          id: randomUUID(),
          title: "Residential Land",
          description: "Prime residential land with infrastructure",
          type: "residential_land",
          price: "12500000",
          location: "Greenland Estate, Sangotedo",
          address: "Greenland Estate, Road 4",
          size: "650 sqm",
          bedrooms: null,
          bathrooms: null,
          parking: null,
          features: ["Verified Title", "All Utilities", "Gated Estate"],
          images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"],
          videos: null,
          status: "available",
          featured: false,
        }
      ];

      await db.insert(properties).values(sampleProperties);
    } catch (error) {
      console.log("Database seeding skipped (tables may not exist yet)");
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    await db.insert(users).values(user);
    return user;
  }

  async getProperties(filters?: {
    type?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
  }): Promise<Property[]> {
    try {
      if (db && !this.fallbackToMemory) {
        let query = db.select().from(properties);
        
        const conditions = [];
        
        if (filters) {
          if (filters.type && filters.type !== "All Types") {
            conditions.push(eq(properties.type, filters.type));
          }
          if (filters.location && filters.location !== "All Locations") {
            conditions.push(sql`${properties.location} ILIKE ${`%${filters.location}%`}`);
          }
          if (filters.featured !== undefined) {
            conditions.push(eq(properties.featured, filters.featured));
          }
          if (filters.minPrice) {
            conditions.push(gte(sql`CAST(${properties.price} AS DECIMAL)`, filters.minPrice));
          }
          if (filters.maxPrice) {
            conditions.push(lte(sql`CAST(${properties.price} AS DECIMAL)`, filters.maxPrice));
          }
        }

        if (conditions.length > 0) {
          query = query.where(and(...conditions));
        }

        const result = await query.orderBy(sql`${properties.createdAt} DESC`);
        return result;
      } else {
        // Fallback to memory storage
        let result = Array.from(this.memoryProperties.values());
        
        if (filters) {
          result = result.filter(property => {
            if (filters.type && filters.type !== "All Types" && property.type !== filters.type) return false;
            if (filters.location && filters.location !== "All Locations" && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
            if (filters.featured !== undefined && property.featured !== filters.featured) return false;
            if (filters.minPrice && parseFloat(property.price) < filters.minPrice) return false;
            if (filters.maxPrice && parseFloat(property.price) > filters.maxPrice) return false;
            return true;
          });
        }
        
        return result.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
      }
    } catch (error) {
      this.fallbackToMemory = true;
      return Array.from(this.memoryProperties.values());
    }
  }

  async getProperty(id: string): Promise<Property | undefined> {
    try {
      if (db && !this.fallbackToMemory) {
        const result = await db.select().from(properties).where(eq(properties.id, id)).limit(1);
        return result[0];
      } else {
        return this.memoryProperties.get(id);
      }
    } catch (error) {
      this.fallbackToMemory = true;
      return this.memoryProperties.get(id);
    }
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const newProperty = {
      ...property,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    try {
      if (db) {
        await db.insert(properties).values(newProperty);
      } else {
        this.fallbackToMemory = true;
        this.memoryProperties.set(id, newProperty as Property);
      }
      return newProperty as Property;
    } catch (error) {
      console.log("Database insert failed, using memory storage");
      this.fallbackToMemory = true;
      this.memoryProperties.set(id, newProperty as Property);
      return newProperty as Property;
    }
  }

  async updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const updateData = {
      ...property,
      updatedAt: new Date(),
    };
    
    try {
      if (db && !this.fallbackToMemory) {
        await db.update(properties).set(updateData).where(eq(properties.id, id));
        return this.getProperty(id);
      } else {
        // Fallback to memory storage
        const existing = this.memoryProperties.get(id);
        if (existing) {
          const updated = { ...existing, ...updateData };
          this.memoryProperties.set(id, updated);
          return updated;
        }
        return undefined;
      }
    } catch (error) {
      console.log("Database update failed, using memory storage");
      this.fallbackToMemory = true;
      const existing = this.memoryProperties.get(id);
      if (existing) {
        const updated = { ...existing, ...updateData };
        this.memoryProperties.set(id, updated);
        return updated;
      }
      return undefined;
    }
  }

  async deleteProperty(id: string): Promise<boolean> {
    const result = await db.delete(properties).where(eq(properties.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async getContacts(): Promise<Contact[]> {
    const result = await db.select().from(contacts).orderBy(sql`${contacts.createdAt} DESC`);
    return result;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const newContact = {
      ...contact,
      id,
      status: "new" as const,
      createdAt: new Date(),
    };
    
    await db.insert(contacts).values(newContact);
    return newContact as Contact;
  }

  async getPropertyInquiries(propertyId?: string): Promise<PropertyInquiry[]> {
    let query = db.select().from(propertyInquiries);
    
    if (propertyId) {
      query = query.where(eq(propertyInquiries.propertyId, propertyId));
    }
    
    const result = await query.orderBy(sql`${propertyInquiries.createdAt} DESC`);
    return result;
  }

  async createPropertyInquiry(inquiry: InsertPropertyInquiry): Promise<PropertyInquiry> {
    const id = randomUUID();
    const newInquiry = {
      ...inquiry,
      id,
      createdAt: new Date(),
    };
    
    await db.insert(propertyInquiries).values(newInquiry);
    return newInquiry as PropertyInquiry;
  }
}

export const storage = new DatabaseStorage();
