import { type User, type InsertUser, type Property, type InsertProperty, type Contact, type InsertContact, type PropertyInquiry, type InsertPropertyInquiry } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { users, properties, contacts, propertyInquiries } from "@shared/schema";
import { eq, and, gte, lte, sql } from "drizzle-orm";

// Add database connection check function
function isDbConnected(): boolean {
  try {
    return !!db;
  } catch {
    return false;
  }
}

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
    this.initializeData();
  }

  private async initializeData() {
    // Add sample properties to memory
    const sampleProperties = [
      {
        id: randomUUID(),
        title: "Premium Investment Opportunity - Don't Miss Chevron Again!",
        description: "If you missed the opportunity of investing in Chevron, Lekki, Lagos, don't worry - this is another exceptional opportunity to own prime land in this prestigious location!",
        type: "residential_land",
        price: "170000000",
        location: "Chevron, Lekki, Lagos",
        address: "Chevron Estate, Lekki, Lagos",
        size: "650sqm",
        bedrooms: null,
        bathrooms: null,
        parking: null,
        features: ["Governors Consent", "Fenced and Gated", "Dryland", "Strategic Location"],
        images: [],
        videos: ["/uploads/videos/get.mp4"],
        status: "available",
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
        images: [],
        videos: [],
        status: "available",
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    sampleProperties.forEach(property => {
      this.memoryProperties.set(property.id, property as Property);
    });

    console.log('✅ Sample properties loaded to memory storage');
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return result[0];
      }
      return undefined;
    } catch (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
        return result[0];
      }
      return undefined;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    
    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        await db.insert(users).values(user);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
    
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
      if (isDbConnected() && !this.fallbackToMemory) {
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
      console.error('❌ Error fetching properties, falling back to memory storage:', error);
      return Array.from(this.memoryProperties.values());
    }
  }

  async getProperty(id: string): Promise<Property | undefined> {
    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        const result = await db.select().from(properties).where(eq(properties.id, id)).limit(1);
        return result[0];
      } else {
        return this.memoryProperties.get(id);
      }
    } catch (error) {
      this.fallbackToMemory = true;
      console.error('❌ Error fetching property, falling back to memory storage:', error);
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
      if (isDbConnected() && !this.fallbackToMemory) {
        await db.insert(properties).values(newProperty);
        console.log('✅ Property saved to database:', newProperty.title);
      } else {
        this.fallbackToMemory = true;
        this.memoryProperties.set(id, newProperty as Property);
        console.log('✅ Property saved to memory storage:', newProperty.title);
      }
      return newProperty as Property;
    } catch (error) {
      console.error('❌ Database error, falling back to memory storage:', error);
      this.fallbackToMemory = true;
      this.memoryProperties.set(id, newProperty as Property);
      console.log('✅ Property saved to memory storage:', newProperty.title);
      return newProperty as Property;
    }
  }

  async updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const updateData = {
      ...property,
      updatedAt: new Date(),
    };

    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        await db.update(properties).set(updateData).where(eq(properties.id, id));
        console.log('✅ Property updated in database:', id);
        return this.getProperty(id);
      } else {
        const existing = this.memoryProperties.get(id);
        if (existing) {
          const updated = { ...existing, ...updateData };
          this.memoryProperties.set(id, updated);
          console.log('✅ Property updated in memory storage:', id);
          return updated;
        }
        return undefined;
      }
    } catch (error) {
      console.error('❌ Database error, falling back to memory storage:', error);
      this.fallbackToMemory = true;
      const existing = this.memoryProperties.get(id);
      if (existing) {
        const updated = { ...existing, ...updateData };
        this.memoryProperties.set(id, updated);
        console.log('✅ Property updated in memory storage:', id);
        return updated;
      }
      return undefined;
    }
  }

  async deleteProperty(id: string): Promise<boolean> {
    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        const result = await db.delete(properties).where(eq(properties.id, id));
        console.log('✅ Property deleted from database:', id);
        return result.rowCount !== null && result.rowCount > 0;
      } else {
        const deleted = this.memoryProperties.delete(id);
        if (deleted) {
          console.log('✅ Property deleted from memory storage:', id);
        }
        return deleted;
      }
    } catch (error) {
      console.error('❌ Database error, falling back to memory storage:', error);
      this.fallbackToMemory = true;
      const deleted = this.memoryProperties.delete(id);
      if (deleted) {
        console.log('✅ Property deleted from memory storage:', id);
      }
      return deleted;
    }
  }

  async getContacts(): Promise<Contact[]> {
    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        const result = await db.select().from(contacts).orderBy(sql`${contacts.createdAt} DESC`);
        return result;
      } else {
        return Array.from(this.memoryContacts.values());
      }
    } catch (error) {
      console.error('❌ Error fetching contacts, falling back to memory storage:', error);
      this.fallbackToMemory = true;
      return Array.from(this.memoryContacts.values());
    }
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const newContact = {
      ...contact,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        await db.insert(contacts).values(newContact);
        console.log('✅ Contact saved to database');
      } else {
        this.fallbackToMemory = true;
        this.memoryContacts.set(id, newContact as Contact);
        console.log('✅ Contact saved to memory storage');
      }
      return newContact as Contact;
    } catch (error) {
      console.error('❌ Database error, falling back to memory storage:', error);
      this.fallbackToMemory = true;
      this.memoryContacts.set(id, newContact as Contact);
      console.log('✅ Contact saved to memory storage');
      return newContact as Contact;
    }
  }

  async getPropertyInquiries(propertyId?: string): Promise<PropertyInquiry[]> {
    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        let query = db.select().from(propertyInquiries);
        
        if (propertyId) {
          query = query.where(eq(propertyInquiries.propertyId, propertyId));
        }
        
        const result = await query.orderBy(sql`${propertyInquiries.createdAt} DESC`);
        return result;
      } else {
        let result = Array.from(this.memoryInquiries.values());
        if (propertyId) {
          result = result.filter(inquiry => inquiry.propertyId === propertyId);
        }
        return result.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
      }
    } catch (error) {
      console.error('❌ Error fetching inquiries, falling back to memory storage:', error);
      this.fallbackToMemory = true;
      let result = Array.from(this.memoryInquiries.values());
      if (propertyId) {
        result = result.filter(inquiry => inquiry.propertyId === propertyId);
      }
      return result.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    }
  }

  async createPropertyInquiry(inquiry: InsertPropertyInquiry): Promise<PropertyInquiry> {
    const id = randomUUID();
    const newInquiry = {
      ...inquiry,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        await db.insert(propertyInquiries).values(newInquiry);
        console.log('✅ Property inquiry saved to database');
      } else {
        this.fallbackToMemory = true;
        this.memoryInquiries.set(id, newInquiry as PropertyInquiry);
        console.log('✅ Property inquiry saved to memory storage');
      }
      return newInquiry as PropertyInquiry;
    } catch (error) {
      console.error('❌ Database error, falling back to memory storage:', error);
      this.fallbackToMemory = true;
      this.memoryInquiries.set(id, newInquiry as PropertyInquiry);
      console.log('✅ Property inquiry saved to memory storage');
      return newInquiry as PropertyInquiry;
    }
  }

  // Add saveProperty method for compatibility with routes
  async saveProperty(propertyData: any): Promise<Property> {
    const insertProperty: InsertProperty = {
      title: propertyData.title,
      description: propertyData.description,
      type: propertyData.type,
      price: propertyData.price.toString(),
      location: propertyData.location,
      address: propertyData.address || null,
      size: propertyData.size || null,
      bedrooms: propertyData.bedrooms || null,
      bathrooms: propertyData.bathrooms || null,
      parking: propertyData.parking || null,
      features: propertyData.features || [],
      images: propertyData.images || [],
      videos: propertyData.videos || [],
      status: "available",
      featured: propertyData.featured || false,
    };

    return this.createProperty(insertProperty);
  }
}

export const storage = new DatabaseStorage();