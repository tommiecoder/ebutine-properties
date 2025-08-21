import { type User, type InsertUser, type Property, type InsertProperty, type Contact, type InsertContact, type PropertyInquiry, type InsertPropertyInquiry } from "@shared/schema";
import { randomUUID } from "crypto";

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

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private properties: Map<string, Property>;
  private contacts: Map<string, Contact>;
  private propertyInquiries: Map<string, PropertyInquiry>;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.contacts = new Map();
    this.propertyInquiries = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed sample properties
    const sampleProperties: Property[] = [
      {
        id: "1",
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
        id: "2",
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
        id: "3",
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

    sampleProperties.forEach(property => {
      this.properties.set(property.id, property);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProperties(filters?: {
    type?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
  }): Promise<Property[]> {
    let properties = Array.from(this.properties.values());

    if (filters) {
      if (filters.type && filters.type !== "All Types") {
        properties = properties.filter(p => p.type === filters.type);
      }
      if (filters.location && filters.location !== "All Locations") {
        properties = properties.filter(p => p.location.includes(filters.location!));
      }
      if (filters.featured !== undefined) {
        properties = properties.filter(p => p.featured === filters.featured);
      }
      if (filters.minPrice) {
        properties = properties.filter(p => parseFloat(p.price) >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        properties = properties.filter(p => parseFloat(p.price) <= filters.maxPrice!);
      }
    }

    return properties.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const newProperty: Property = {
      ...property,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      address: property.address || null,
      description: property.description || null,
      size: property.size || null,
      bedrooms: property.bedrooms || null,
      bathrooms: property.bathrooms || null,
      parking: property.parking || null,
      features: (property.features as string[]) || null,
      images: (property.images as string[]) || null,
      videos: (property.videos as string[]) || null,
    };
    this.properties.set(id, newProperty);
    return newProperty;
  }

  async updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const existing = this.properties.get(id);
    if (!existing) return undefined;

    const updated: Property = {
      ...existing,
      ...property,
      updatedAt: new Date(),
      address: property.address !== undefined ? property.address : existing.address,
      description: property.description !== undefined ? property.description : existing.description,
      size: property.size !== undefined ? property.size : existing.size,
      bedrooms: property.bedrooms !== undefined ? property.bedrooms : existing.bedrooms,
      bathrooms: property.bathrooms !== undefined ? property.bathrooms : existing.bathrooms,
      parking: property.parking !== undefined ? property.parking : existing.parking,
      features: property.features !== undefined ? (property.features as string[]) : existing.features,
      images: property.images !== undefined ? (property.images as string[]) : existing.images,
      videos: property.videos !== undefined ? (property.videos as string[]) : existing.videos,
    };
    this.properties.set(id, updated);
    return updated;
  }

  async deleteProperty(id: string): Promise<boolean> {
    return this.properties.delete(id);
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values())
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const newContact: Contact = {
      ...contact,
      id,
      status: "new",
      createdAt: new Date(),
      location: contact.location || null,
      propertyType: contact.propertyType || null,
      budget: contact.budget || null,
      purpose: contact.purpose || null,
      message: contact.message || null,
      contactMethod: contact.contactMethod || null,
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async getPropertyInquiries(propertyId?: string): Promise<PropertyInquiry[]> {
    let inquiries = Array.from(this.propertyInquiries.values());
    if (propertyId) {
      inquiries = inquiries.filter(i => i.propertyId === propertyId);
    }
    return inquiries.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async createPropertyInquiry(inquiry: InsertPropertyInquiry): Promise<PropertyInquiry> {
    const id = randomUUID();
    const newInquiry: PropertyInquiry = {
      ...inquiry,
      id,
      createdAt: new Date(),
      message: inquiry.message || null,
      propertyId: inquiry.propertyId || null,
    };
    this.propertyInquiries.set(id, newInquiry);
    return newInquiry;
  }
}

export const storage = new MemStorage();