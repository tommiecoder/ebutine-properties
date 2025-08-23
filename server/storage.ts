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
    this.seedData();
    this.addChevronProperty();
  }

  private async addChevronProperty() {
    // Add the Chevron property to memory storage
    const chevronProperty = {
      id: randomUUID(),
      title: "Premium Investment Opportunity - Don't Miss Chevron Again!",
      description: "If you missed the opportunity of investing in Chevron, Lekki, Lagos, don't worry - this is another exceptional opportunity to own prime land in this prestigious location! This 650sqm fenced and gated dryland represents a rare chance to secure your foothold in one of Lagos's most sought-after neighborhoods. Located in the heart of Chevron, Lekki, this property offers unparalleled investment potential with Governors Consent title documentation for complete peace of mind. The strategic location provides easy access to major business districts, shopping centers, schools, and recreational facilities. With its excellent infrastructure including tarred roads, reliable electricity, and 24/7 security, this gated estate offers the perfect blend of luxury and security. The property is ideal for building your dream home or as a long-term investment with strong appreciation potential. Don't let this opportunity slip away like the previous Chevron investments - secure your piece of premium Lagos real estate today!",
      type: "residential_land",
      price: "170000000",
      location: "Chevron, Lekki, Lagos",
      address: "Chevron Estate, Lekki, Lagos",
      size: "650sqm",
      bedrooms: null,
      bathrooms: null,
      parking: null,
      features: [
        "Governors Consent",
        "Fenced and Gated",
        "Dryland",
        "Strategic Location", 
        "24/7 Security",
        "Tarred Roads",
        "Reliable Electricity",
        "High Investment Potential",
        "Premium Neighborhood",
        "Clear Title Documentation"
      ],
      images: [],
      videos: ["/uploads/videos/get.mp4"],
      status: "available",
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add the new Quick Sale Chevron property
      const quickSaleProperty = {
        id: randomUUID(),
        title: "QUICK SALE‼️ 1000sqm Cornerpiece Land - Atlantic View Estate",
        description: "QUICK SALE ALERT! This exceptional 1000sqm cornerpiece land is currently selling in the prestigious Atlantic View Estate, New Road, Chevron, Lekki, Lagos. This is a rare opportunity that won't stay in the market for long! Located in one of Chevron's most sought-after developments, this cornerpiece plot offers maximum privacy and development potential. The property comes with Global Certificate of Occupancy (CofO) providing absolute security of ownership and investment protection. Atlantic View Estate is renowned for its excellent infrastructure, strategic location, and high-end residential developments. With easy access to major business districts, shopping centers, international schools, and recreational facilities, this property represents an outstanding investment opportunity. The estate features tarred roads, reliable power supply, water infrastructure, and 24/7 security. Don't miss this chance to secure a premium cornerpiece land in Chevron at an attractive price point. Properties of this caliber and location are extremely rare and highly sought after by discerning investors and homeowners alike.",
        type: "residential_land",
        price: "280000000",
        location: "Atlantic View Estate, Chevron, Lekki, Lagos",
        address: "New Road, Atlantic View Estate, Chevron, Lekki, Lagos",
        size: "1000sqm",
        bedrooms: null,
        bathrooms: null,
        parking: null,
        features: [
          "Global Certificate of Occupancy (CofO)",
          "Cornerpiece Land",
          "1000sqm",
          "Atlantic View Estate",
          "Quick Sale",
          "Strategic Location",
          "Premium Development Area",
          "24/7 Security",
          "Tarred Roads",
          "Reliable Infrastructure",
          "High Investment Potential",
          "Chevron, Lekki"
        ],
        images: [],
        videos: ["/uploads/videos/QUICK SALE‼️1000sqm Cornerpiece Land is currently selling in Atlantic View Estate, New Road, Che.mp4"],
        status: "available",
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.memoryProperties.set(chevronProperty.id, chevronProperty as Property);
      this.memoryProperties.set(quickSaleProperty.id, quickSaleProperty as Property);
      console.log('✅ Chevron property added to memory storage:', chevronProperty.title);
      console.log('✅ Quick Sale property added to memory storage:', quickSaleProperty.title);
    }
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
      if (isDbConnected()) {
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
        // Fallback to memory storage
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
        return Array.from(this.memoryContacts.values()).sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
      }
    } catch (error) {
      this.fallbackToMemory = true;
      console.error('❌ Error fetching contacts, falling back to memory storage:', error);
      return Array.from(this.memoryContacts.values());
    }
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const newContact = {
      ...contact,
      id,
      status: "new" as const,
      createdAt: new Date(),
    };

    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        await db.insert(contacts).values(newContact);
        console.log('✅ Contact saved to database:', newContact.name);
      } else {
        this.fallbackToMemory = true;
        this.memoryContacts.set(id, newContact as Contact);
        console.log('✅ Contact saved to memory storage:', newContact.name);
      }
      return newContact as Contact;
    } catch (error) {
      console.error('❌ Database error, falling back to memory storage:', error);
      this.fallbackToMemory = true;
      this.memoryContacts.set(id, newContact as Contact);
      console.log('✅ Contact saved to memory storage:', newContact.name);
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
      this.fallbackToMemory = true;
      console.error('❌ Error fetching property inquiries, falling back to memory storage:', error);
      return Array.from(this.memoryInquiries.values());
    }
  }

  async createPropertyInquiry(inquiry: InsertPropertyInquiry): Promise<PropertyInquiry> {
    const id = randomUUID();
    const newInquiry = {
      ...inquiry,
      id,
      createdAt: new Date(),
    };

    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        await db.insert(propertyInquiries).values(newInquiry);
        console.log('✅ Property inquiry saved to database:', id);
      } else {
        this.fallbackToMemory = true;
        this.memoryInquiries.set(id, newInquiry as PropertyInquiry);
        console.log('✅ Property inquiry saved to memory storage:', id);
      }
      return newInquiry as PropertyInquiry;
    } catch (error) {
      console.error('❌ Database error, falling back to memory storage:', error);
      this.fallbackToMemory = true;
      this.memoryInquiries.set(id, newInquiry as PropertyInquiry);
      console.log('✅ Property inquiry saved to memory storage:', id);
      return newInquiry as PropertyInquiry;
    }
  }
}

export const storage = new DatabaseStorage();