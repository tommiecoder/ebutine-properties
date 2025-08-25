import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { storage } from "./storage.js";
import { insertContactSchema, insertPropertyInquirySchema, insertPropertySchema } from "../shared/schema.js";
import express from 'express';
import fs from "fs";

// Get the current directory (ES module equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure uploads directories exist
const uploadsDir = path.join(process.cwd(), 'uploads');
const imagesDir = path.join(uploadsDir, 'images');
const videosDir = path.join(uploadsDir, 'videos');

[uploadsDir, imagesDir, videosDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Enhanced AI generation helper functions
async function analyzeMediaAndGenerateProperty(mediaInfo: any): Promise<{
  title: string;
  description: string;
  type: string;
  location: string;
  size: string;
  bedrooms: string | null;
  bathrooms: string | null;
  features: string[];
  price: string;
}> {
  // This is an enhanced AI analyzer that would in production use computer vision
  // and location detection APIs. For now, we'll use intelligent pattern matching

  const { hasImages, hasVideos, userInput } = mediaInfo;

  // Analyze user input for clues
  const inputLower = (userInput.title + " " + (userInput.description || "")).toLowerCase();

  // Detect property type from input
  let type = "house";
  if (inputLower.includes("land") || inputLower.includes("plot")) {
    type = inputLower.includes("commercial") ? "commercial" : "land";
  } else if (inputLower.includes("apartment") || inputLower.includes("flat")) {
    type = "apartment";
  } else if (inputLower.includes("luxury") || inputLower.includes("duplex") || inputLower.includes("mansion")) {
    type = "house";
  } else if (inputLower.includes("office") || inputLower.includes("shop") || inputLower.includes("store")) {
    type = "commercial";
  }

  // Generate intelligent location suggestions based on popular Lagos areas
  const lagosAreas = [
    "Lekki", "Victoria Island", "Ikoyi", "Ajah", "Sangotedo", "Chevron", "Ibeju-Lekki",
    "Banana Island", "Parkview Estate", "Ikeja", "Maryland", "Gbagada", "Surulere",
    "Yaba", "Lagos Island", "Festac", "Magodo", "Ojota", "Ketu", "Mile 2"
  ];

  let detectedLocation = "Lagos";
  for (const area of lagosAreas) {
    if (inputLower.includes(area.toLowerCase())) {
      detectedLocation = area + ", Lagos";
      break;
    }
  }

  // If no location detected in input, suggest based on property type
  if (detectedLocation === "Lagos") {
    if (type === "land" || type === "commercial") {
      detectedLocation = "Ibeju-Lekki, Lagos";
    } else if (type === "house") {
      detectedLocation = "Lekki, Lagos";
    } else {
      detectedLocation = "Ajah, Lagos";
    }
  }

  // Generate bedrooms/bathrooms based on property type and media presence
  let bedrooms = null;
  let bathrooms = null;
  let size = "";

  if (type === "house" || type === "apartment") {
    // Analyze for room indicators
    if (inputLower.includes("studio")) {
      bedrooms = "1";
      bathrooms = "1";
    } else if (inputLower.includes("2") || inputLower.includes("two")) {
      bedrooms = "2";
      bathrooms = "2";
    } else if (inputLower.includes("3") || inputLower.includes("three")) {
      bedrooms = "3";
      bathrooms = "3";
    } else if (inputLower.includes("4") || inputLower.includes("four")) {
      bedrooms = "4";
      bathrooms = "4";
    } else if (inputLower.includes("5") || inputLower.includes("five")) {
      bedrooms = "5";
      bathrooms = "5";
    } else {
      // Default based on property type
      if (type === "house") {
        bedrooms = "3";
        bathrooms = "3";
      } else {
        bedrooms = "2";
        bathrooms = "2";
      }
    }

    size = bedrooms + " bedrooms";
  } else if (type === "land" || type === "commercial") {
    // Generate size for land
    const sizesOptions = ["500 sqm", "650 sqm", "1000 sqm", "1200 sqm", "2000 sqm", "3000 sqm"];
    size = sizesOptions[Math.floor(Math.random() * sizesOptions.length)];
  }

  // Generate intelligent title
  let title = "";
  if (type === "house") {
    const houseTypes = ["Modern", "Luxury", "Elegant", "Spacious", "Beautiful"];
    const houseStyle = houseTypes[Math.floor(Math.random() * houseTypes.length)];
    title = `${houseStyle} ${bedrooms}BR ${type === "house" ? "House" : "Apartment"}`;
  } else if (type === "land") {
    title = `Prime Residential Land - ${size}`;
  } else if (type === "commercial") {
    title = `Commercial Property - ${size}`;
  } else {
    title = userInput.title || "Premium Property";
  }

  // Generate price based on type and location
  let price = "0";
  const locationMultiplier = detectedLocation.includes("Victoria Island") || detectedLocation.includes("Ikoyi") ? 1.8 :
                           detectedLocation.includes("Lekki") ? 1.4 :
                           detectedLocation.includes("Ajah") ? 1.1 : 1.0;

  if (type === "house") {
    const basePrice = parseInt(bedrooms || "3") * 15000000; // 15M per bedroom
    price = (basePrice * locationMultiplier).toString();
  } else if (type === "apartment") {
    const basePrice = parseInt(bedrooms || "2") * 8000000; // 8M per bedroom
    price = (basePrice * locationMultiplier).toString();
  } else if (type === "land") {
    const sqm = parseInt(size.replace(/[^\d]/g, "")) || 650;
    const pricePerSqm = 25000; // 25k per sqm
    price = (sqm * pricePerSqm * locationMultiplier).toString();
  } else if (type === "commercial") {
    price = (50000000 * locationMultiplier).toString(); // Base 50M for commercial
  }

  // Generate comprehensive description
  const description = await generateEnhancedDescription({
    title, type, location: detectedLocation, price, size, bedrooms, bathrooms
  });

  // Generate intelligent features
  const features = await generateIntelligentFeatures(type, detectedLocation, bedrooms || undefined, bathrooms || undefined);

  return {
    title,
    description,
    type,
    location: detectedLocation,
    size,
    bedrooms,
    bathrooms,
    features,
    price
  };
}

async function generateEnhancedDescription(propertyData: any): Promise<string> {
  const { title, type, location, price, size, bedrooms, bathrooms } = propertyData;

  const priceFormatted = price ? `₦${parseFloat(price).toLocaleString()}` : "";

  let description = `Discover this exceptional ${title.toLowerCase()} strategically located in the heart of ${location}. `;

  if (type === "house") {
    description += `This stunning residential property combines modern architecture with premium finishes, offering the perfect blend of luxury and comfort. `;
    if (bedrooms && bathrooms) {
      description += `Featuring ${bedrooms} spacious bedrooms with en-suite bathrooms and ${bathrooms} well-appointed bathrooms, `;
    }
    description += `this home boasts an open-plan living area, modern kitchen with high-end appliances, and beautifully landscaped compound. `;
  } else if (type === "apartment") {
    description += `This contemporary apartment offers modern urban living at its finest. `;
    if (bedrooms && bathrooms) {
      description += `With ${bedrooms} comfortable bedrooms and ${bathrooms} modern bathrooms, `;
    }
    description += `the unit features premium finishes, ample natural light, and access to excellent building amenities. `;
  } else if (type === "land") {
    description += `This prime residential land presents an exceptional opportunity for development in one of Lagos's most sought-after neighborhoods. `;
    if (size) {
      description += `Spanning ${size} of well-documented land, `;
    }
    description += `the plot comes with verified title documents and access to essential infrastructure including electricity, water, and tarred roads. `;
  } else if (type === "commercial") {
    description += `This strategic commercial property offers outstanding investment potential in a high-traffic business district. `;
    description += `Perfect for retail, office space, or mixed-use development, the property benefits from excellent visibility and accessibility. `;
  }

  description += `Located in ${location}, residents and visitors enjoy easy access to major expressways, shopping malls, schools, hospitals, and recreational facilities. `;
  description += `The area is known for its excellent infrastructure, reliable power supply, and 24/7 security. `;

  if (priceFormatted) {
    description += `Competitively priced at ${priceFormatted}, this property represents exceptional value and strong investment potential in today's dynamic real estate market. `;
  }

  description += `Don't miss this rare opportunity to own a piece of premium real estate in Lagos. Contact our experienced team today to schedule an exclusive viewing and secure this outstanding property.`;

  return description;
}

async function generateIntelligentFeatures(type: string, location: string, bedrooms?: string, bathrooms?: string): Promise<string[]> {
  const baseFeatures = [
    "24/7 Security",
    "Gated Community",
    "Tarred Roads",
    "Reliable Electricity",
    "Borehole Water Supply"
  ];

  const houseFeatures = [
    "Modern Kitchen",
    "Fitted Wardrobes",
    "Spacious Living Areas",
    "Private Parking",
    "Beautiful Landscaping",
    "Premium Finishes",
    "Air Conditioning Ready",
    "Balconies",
    "Family Lounge",
    "Dining Area"
  ];

  const apartmentFeatures = [
    "Modern Kitchen",
    "Built-in Wardrobes",
    "Elevator Access",
    "Gymnasium",
    "Swimming Pool",
    "Parking Space",
    "CCTV Surveillance",
    "Generator Backup",
    "Intercom System"
  ];

  const landFeatures = [
    "Certificate of Occupancy Available",
    "Surveyed and Documented",
    "Ready for Development",
    "Strategic Location",
    "High ROI Potential",
    "All Utilities Available",
    "Drainage System",
    "Estate Development"
  ];

  const commercialFeatures = [
    "High Visibility Location",
    "Ample Parking",
    "Modern Infrastructure",
    "Public Transportation Access",
    "High Foot Traffic",
    "Investment Grade",
    "Flexible Space Design",
    "Prime Business District"
  ];

  // Add location-specific features
  const locationFeatures = [];
  if (location.includes("Lekki") || location.includes("Victoria Island") || location.includes("Ikoyi")) {
    locationFeatures.push("Premium Neighborhood", "Close to Business District", "Waterfront Access");
  }
  if (location.includes("Ibeju-Lekki")) {
    locationFeatures.push("Free Trade Zone Proximity", "Airport Access", "Future Growth Area");
  }

  let features = [...baseFeatures];

  if (type === "house") {
    features = [...features, ...houseFeatures].slice(0, 10);
  } else if (type === "apartment") {
    features = [...features, ...apartmentFeatures].slice(0, 8);
  } else if (type === "land") {
    features = [...features, ...landFeatures].slice(0, 8);
  } else if (type === "commercial") {
    features = [...features, ...commercialFeatures].slice(0, 8);
  }

  // Add location features
  features = [...features, ...locationFeatures].slice(0, 12);

  return features;
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

      // Parse external videos if provided
      let externalVideos = [];
      if (req.body.externalVideos) {
        const lines = req.body.externalVideos.split('\n').filter((line: string) => line.trim());
        externalVideos = lines.map((line: string) => {
          const [url, platform = 'other', title = ''] = line.split('|');
          return { url: url.trim(), platform: platform.trim(), title: title.trim() };
        });
      }

      // Parse embed codes if provided
      let embedCodes = [];
      if (req.body.embedCodes) {
        const lines = req.body.embedCodes.split('\n').filter((line: string) => line.trim());
        embedCodes = lines.map((line: string) => {
          const [embedCode, title = '', platform = ''] = line.split('|');
          return { embedCode: embedCode.trim(), title: title.trim(), platform: platform.trim() };
        });
      }

      // This block is updated to include better error handling and logging
      try {
        console.log('📝 Creating property with data:', {
          title: req.body.title,
          images: imageUrls.length,
          videos: videoUrls.length,
          externalVideos: externalVideos.length,
          embedCodes: embedCodes.length
        });

        const property = await storage.saveProperty({
          title: req.body.title,
          description: req.body.description,
          price: parseFloat(req.body.price),
          location: req.body.location,
          type: req.body.type as 'residential' | 'commercial' | 'land',
          size: req.body.size,
          features: req.body.features ? req.body.features.split(',').map((f: string) => f.trim()) : [],
          images: imageUrls,
          videos: videoUrls,
          externalVideos: externalVideos,
          embedCodes: embedCodes, // Include embedCodes here
          thumbnail: imageUrls[0] || videoUrls[0] || '',
          featured: req.body.featured === 'true',
          createdAt: new Date()
        });

        console.log('✅ Property created successfully:', property.id);
        res.json({ success: true, property });
      } catch (error) {
        console.error('❌ Error creating property:', error);
        res.status(500).json({
          success: false,
          error: 'Failed to create property',
          details: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    } catch (error) {
      console.error('Multer upload error:', error);
      res.status(400).json({ message: "File upload failed", error });
    }
  });

  // Enhanced AI property generation endpoint
  app.post("/api/admin/generate-property", async (req, res) => {
    try {
      const { title, description, hasImages, hasVideos } = req.body;

      // Analyze media and user input to generate comprehensive property details
      const propertyData = await analyzeMediaAndGenerateProperty({
        hasImages: hasImages || false,
        hasVideos: hasVideos || false,
        userInput: { title: title || "", description: description || "" }
      });

      res.json(propertyData);
    } catch (error) {
      console.error('AI generation error:', error);
      res.status(500).json({ message: "Failed to generate property details" });
    }
  });

  // Legacy AI description generation endpoint (kept for backward compatibility)
  app.post("/api/admin/generate-description", async (req, res) => {
    try {
      const { title, type, location, price, size, bedrooms, bathrooms } = req.body;

      // Generate AI description based on property details
      const description = await generateEnhancedDescription({
        title,
        type,
        location,
        price,
        size,
        bedrooms,
        bathrooms
      });

      const features = await generateIntelligentFeatures(type, location, bedrooms, bathrooms);

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

      // Parse embed codes if provided for update
      let embedCodes = existingProperty.embedCodes || [];
      if (req.body.embedCodes) {
        const lines = req.body.embedCodes.split('\n').filter((line: string) => line.trim());
        embedCodes = lines.map((line: string) => {
          const [embedCode, title = '', platform = ''] = line.split('|');
          return { embedCode: embedCode.trim(), title: title.trim(), platform: platform.trim() };
        });
      }

      const propertyData = {
        ...req.body,
        price: req.body.price.toString(),
        size: req.body.size || null,
        bedrooms: req.body.bedrooms || null,
        bathrooms: req.body.bathrooms || null,
        images: imageUrls,
        videos: videoUrls,
        externalVideos: existingProperty.externalVideos, // Assuming externalVideos are handled separately or not updated here
        embedCodes: embedCodes, // Include updated embedCodes
        features: Array.isArray(req.body.features) ? req.body.features :
                  (req.body.features ? req.body.features.split(',').map((f: string) => f.trim()) : []),
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

  // Serve uploaded files with proper headers
  app.use("/uploads", (req, res, next) => {
    // Set proper headers for video files
    if (req.path.match(/\.(mp4|webm|ogg|avi|mov)$/i)) {
      const ext = path.extname(req.path).toLowerCase();
      let contentType = 'video/mp4';

      switch (ext) {
        case '.webm':
          contentType = 'video/webm';
          break;
        case '.ogg':
          contentType = 'video/ogg';
          break;
        case '.avi':
          contentType = 'video/x-msvideo';
          break;
        case '.mov':
          contentType = 'video/quicktime';
          break;
        default:
          contentType = 'video/mp4';
      }

      res.set({
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=86400', // Reduced cache time
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Range',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Cross-Origin-Embedder-Policy': 'unsafe-none'
      });
    } else if (req.path.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
      res.set({
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*'
      });
    }
    next();
  }, express.static(path.join(__dirname, "../uploads")));

  const httpServer = createServer(app);
  return httpServer;
}