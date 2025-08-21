import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import { storage } from "./storage";
import { insertContactSchema, insertPropertyInquirySchema, insertPropertySchema } from "@shared/schema";

// AI generation helper functions
async function generatePropertyDescription(propertyData: any): Promise<string> {
  const { title, type, location, price, size, bedrooms, bathrooms } = propertyData;
  
  // This is a simple template-based generator
  // In production, you could integrate with OpenAI, Claude, or other AI services
  const priceFormatted = price ? `₦${parseFloat(price).toLocaleString()}` : "";
  
  let description = `Discover this exceptional ${title.toLowerCase()} located in the prestigious ${location}. `;
  
  if (type === "luxury_home") {
    description += `This stunning luxury property offers unparalleled comfort and elegance, perfect for discerning buyers seeking the finest in modern living. `;
  } else if (type === "residential_land") {
    description += `This prime residential land presents an excellent opportunity for development in one of Lagos's most sought-after locations. `;
  } else if (type === "commercial_land") {
    description += `Strategic commercial property offering exceptional investment potential in a high-growth area with excellent infrastructure. `;
  }
  
  if (bedrooms && bathrooms) {
    description += `Featuring ${bedrooms} spacious bedrooms and ${bathrooms} well-appointed bathrooms, `;
  }
  
  if (size) {
    description += `spanning ${size} of thoughtfully designed space. `;
  }
  
  description += `Located in ${location}, this property provides easy access to major amenities, schools, shopping centers, and transportation links. `;
  
  if (priceFormatted) {
    description += `Competitively priced at ${priceFormatted}, this represents exceptional value in today's market. `;
  }
  
  description += `Don't miss this rare opportunity to own a piece of prime real estate in one of Lagos's most desirable neighborhoods. Contact us today to schedule a viewing and make this dream property yours.`;
  
  return description;
}

async function generatePropertyFeatures(type: string, bedrooms?: string, bathrooms?: string): Promise<string[]> {
  const baseFeatures = [
    "24/7 Security",
    "Tarred Roads",
    "Electricity Supply",
    "Water Supply",
    "Gated Community"
  ];
  
  const luxuryFeatures = [
    "Modern Kitchen",
    "Fitted Wardrobes",
    "Spacious Living Areas",
    "Private Parking",
    "Beautiful Landscaping",
    "High-Quality Finishes",
    "Air Conditioning Ready"
  ];
  
  const landFeatures = [
    "C of O Available",
    "Surveyed and Documented",
    "Ready for Development",
    "Strategic Location",
    "High ROI Potential",
    "All Utilities Available"
  ];
  
  if (type === "luxury_home") {
    return [...baseFeatures, ...luxuryFeatures].slice(0, 8);
  } else if (type === "residential_land" || type === "commercial_land") {
    return [...baseFeatures, ...landFeatures].slice(0, 6);
  }
  
  return baseFeatures.slice(0, 5);
}

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
        price: req.body.price.toString(),
        size: req.body.size || null,
        bedrooms: req.body.bedrooms || null,
        bathrooms: req.body.bathrooms || null,
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

  // AI description generation endpoint
  app.post("/api/admin/generate-description", async (req, res) => {
    try {
      const { title, type, location, price, size, bedrooms, bathrooms } = req.body;
      
      // Generate AI description based on property details
      const description = await generatePropertyDescription({
        title,
        type,
        location,
        price,
        size,
        bedrooms,
        bathrooms
      });
      
      const features = await generatePropertyFeatures(type, bedrooms, bathrooms);
      
      res.json({ description, features });
    } catch (error) {
      console.error('AI generation error:', error);
      res.status(500).json({ message: "Failed to generate description" });
    }
  });

  // Delete property endpoint
  app.delete("/api/admin/properties/:id", async (req, res) => {
    try {
      const success = await storage.deleteProperty(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json({ message: "Property deleted successfully" });
    } catch (error) {
      console.error('Delete property error:', error);
      res.status(500).json({ message: "Failed to delete property" });
    }
  });

  // Update property endpoint
  app.put("/api/admin/properties/:id", upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 5 }
  ]), async (req, res) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      // Get existing property to preserve current media if no new files uploaded
      const existingProperty = await storage.getProperty(req.params.id);
      if (!existingProperty) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      // Process uploaded files or keep existing ones
      const imageUrls = files.images 
        ? files.images.map(file => `/uploads/images/${file.filename}`) 
        : existingProperty.images;
      const videoUrls = files.videos 
        ? files.videos.map(file => `/uploads/videos/${file.filename}`) 
        : existingProperty.videos;
      
      const propertyData = {
        ...req.body,
        price: req.body.price.toString(),
        size: req.body.size || null,
        bedrooms: req.body.bedrooms || null,
        bathrooms: req.body.bathrooms || null,
        images: imageUrls,
        videos: videoUrls,
        features: req.body.features ? req.body.features.split(',').map((f: string) => f.trim()) : [],
      };

      const property = await storage.updateProperty(req.params.id, propertyData);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      console.error('Property update error:', error);
      res.status(400).json({ message: "Invalid property data", error });
    }
  });

  // Mark property as sold endpoint
  app.patch("/api/admin/properties/:id/sold", async (req, res) => {
    try {
      const property = await storage.updateProperty(req.params.id, { status: "sold" });
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      console.error('Update property error:', error);
      res.status(500).json({ message: "Failed to update property" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
