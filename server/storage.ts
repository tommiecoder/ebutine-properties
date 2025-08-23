import { type User, type InsertUser, type Property, type InsertProperty, type Contact, type InsertContact, type PropertyInquiry, type InsertPropertyInquiry } from "@shared/schema";
import { randomUUID } from "crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), 'data');
const PROPERTIES_FILE = join(DATA_DIR, 'properties.json');
const CONTACTS_FILE = join(DATA_DIR, 'contacts.json');
const INQUIRIES_FILE = join(DATA_DIR, 'inquiries.json');
const USERS_FILE = join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
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

export class FileStorage implements IStorage {
  constructor() {
    this.seedData();
  }

  private readFile<T>(filePath: string, defaultData: T[] = []): T[] {
    try {
      if (existsSync(filePath)) {
        const data = readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
      }
      return defaultData;
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
      return defaultData;
    }
  }

  private writeFile<T>(filePath: string, data: T[]): void {
    try {
      writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Error writing ${filePath}:`, error);
    }
  }

  private seedData() {
    const properties = this.readFile<Property>(PROPERTIES_FILE);

    if (properties.length === 0) {
      const sampleProperties: Property[] = [
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
          createdAt: new Date(),
          updatedAt: new Date(),
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
          createdAt: new Date(),
          updatedAt: new Date(),
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
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ];

      this.writeFile(PROPERTIES_FILE, sampleProperties);
      console.log('✅ Sample properties seeded to file storage');
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    const users = this.readFile<User>(USERS_FILE);
    return users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = this.readFile<User>(USERS_FILE);
    return users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const users = this.readFile<User>(USERS_FILE);
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    users.push(user);
    this.writeFile(USERS_FILE, users);
    return user;
  }

  async getProperties(filters?: {
    type?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
  }): Promise<Property[]> {
    let properties = this.readFile<Property>(PROPERTIES_FILE);

    if (filters) {
      properties = properties.filter(property => {
        if (filters.type && filters.type !== "All Types" && property.type !== filters.type) return false;
        if (filters.location && filters.location !== "All Locations" && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
        if (filters.featured !== undefined && property.featured !== filters.featured) return false;
        if (filters.minPrice && parseFloat(property.price) < filters.minPrice) return false;
        if (filters.maxPrice && parseFloat(property.price) > filters.maxPrice) return false;
        return true;
      });
    }

    return properties.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getProperty(id: string): Promise<Property | undefined> {
    const properties = this.readFile<Property>(PROPERTIES_FILE);
    return properties.find(property => property.id === id);
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const properties = this.readFile<Property>(PROPERTIES_FILE);
    const id = randomUUID();
    const newProperty: Property = {
      ...property,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    properties.push(newProperty);
    this.writeFile(PROPERTIES_FILE, properties);
    console.log('✅ Property saved to file storage:', newProperty.title);
    return newProperty;
  }

  // Alias method for backward compatibility
  async saveProperty(property: any): Promise<Property> {
    return this.createProperty(property);
  }

  async updateProperty(id: string, propertyUpdate: Partial<InsertProperty>): Promise<Property | undefined> {
    const properties = this.readFile<Property>(PROPERTIES_FILE);
    const index = properties.findIndex(property => property.id === id);

    if (index === -1) return undefined;

    const updateData = {
      ...propertyUpdate,
      updatedAt: new Date(),
    };

    properties[index] = { ...properties[index], ...updateData };
    this.writeFile(PROPERTIES_FILE, properties);
    console.log('✅ Property updated in file storage:', id);
    return properties[index];
  }

  async deleteProperty(id: string): Promise<boolean> {
    const properties = this.readFile<Property>(PROPERTIES_FILE);
    const index = properties.findIndex(property => property.id === id);

    if (index === -1) return false;

    properties.splice(index, 1);
    this.writeFile(PROPERTIES_FILE, properties);
    console.log('✅ Property deleted from file storage:', id);
    return true;
  }

  async getContacts(): Promise<Contact[]> {
    const contacts = this.readFile<Contact>(CONTACTS_FILE);
    return contacts.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const contacts = this.readFile<Contact>(CONTACTS_FILE);
    const id = randomUUID();
    const newContact: Contact = {
      ...contact,
      id,
      status: "new" as const,
      createdAt: new Date(),
    };

    contacts.push(newContact);
    this.writeFile(CONTACTS_FILE, contacts);
    console.log('✅ Contact saved to file storage:', newContact.fullName);
    return newContact;
  }

  async getPropertyInquiries(propertyId?: string): Promise<PropertyInquiry[]> {
    let inquiries = this.readFile<PropertyInquiry>(INQUIRIES_FILE);

    if (propertyId) {
      inquiries = inquiries.filter(inquiry => inquiry.propertyId === propertyId);
    }

    return inquiries.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createPropertyInquiry(inquiry: InsertPropertyInquiry): Promise<PropertyInquiry> {
    const inquiries = this.readFile<PropertyInquiry>(INQUIRIES_FILE);
    const id = randomUUID();
    const newInquiry: PropertyInquiry = {
      ...inquiry,
      id,
      createdAt: new Date(),
    };

    inquiries.push(newInquiry);
    this.writeFile(INQUIRIES_FILE, inquiries);
    console.log('✅ Property inquiry saved to file storage:', id);
    return newInquiry;
  }
}

export const storage = new FileStorage();