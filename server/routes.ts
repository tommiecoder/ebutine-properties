import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertPropertyInquirySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Properties routes
  app.get("/api/properties", async (req, res) => {
    try {
      const { type, location, minPrice, maxPrice, featured } = req.query;
      const filters = {
        type: type as string,
        location: location as string,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
        featured: featured === "true" ? true : undefined,
      };
      
      const properties = await storage.getProperties(filters);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  // Contacts routes
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.status(201).json(contact);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data", error });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Property inquiries routes
  app.post("/api/property-inquiries", async (req, res) => {
    try {
      const inquiryData = insertPropertyInquirySchema.parse(req.body);
      const inquiry = await storage.createPropertyInquiry(inquiryData);
      res.status(201).json(inquiry);
    } catch (error) {
      res.status(400).json({ message: "Invalid inquiry data", error });
    }
  });

  app.get("/api/property-inquiries", async (req, res) => {
    try {
      const { propertyId } = req.query;
      const inquiries = await storage.getPropertyInquiries(propertyId as string);
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
