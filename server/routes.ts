import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import { storage } from "./storage";
import { insertContactSchema, insertPropertyInquirySchema, insertPropertySchema } from "@shared/schema";

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = file.mimetype.startsWith('video/') ? 'uploads/videos' : 'uploads/images';
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

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

  // Admin property upload route
  app.post("/api/admin/properties", upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 5 }
  ]), async (req, res) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      // Process uploaded files
      const imageUrls = files.images ? files.images.map(file => `/uploads/images/${file.filename}`) : [];
      const videoUrls = files.videos ? files.videos.map(file => `/uploads/videos/${file.filename}`) : [];
      
      const propertyData = {
        ...req.body,
        price: parseFloat(req.body.price),
        size: req.body.size ? parseFloat(req.body.size) : null,
        bedrooms: req.body.bedrooms ? parseInt(req.body.bedrooms) : null,
        bathrooms: req.body.bathrooms ? parseInt(req.body.bathrooms) : null,
        images: imageUrls,
        videos: videoUrls,
        features: req.body.features ? req.body.features.split(',').map((f: string) => f.trim()) : [],
        featured: false
      };

      const validatedData = insertPropertySchema.parse(propertyData);
      const property = await storage.createProperty(validatedData);
      
      res.status(201).json(property);
    } catch (error) {
      console.error('Property upload error:', error);
      res.status(400).json({ message: "Invalid property data", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
