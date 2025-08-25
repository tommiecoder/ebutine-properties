import {
  type User,
  type InsertUser,
  type Property,
  type InsertProperty,
  type Contact,
  type InsertContact,
  type PropertyInquiry,
  type InsertPropertyInquiry,
} from "../shared/schema.js";
import { randomUUID } from "crypto";
import { db } from "./db.js";
import {
  users,
  properties,
  contacts,
  propertyInquiries,
} from "../shared/schema.js";
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
  updateProperty(
    id: string,
    property: Partial<InsertProperty>,
  ): Promise<Property | undefined>;
  deleteProperty(id: string): Promise<boolean>;

  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;

  // Property Inquiries
  getPropertyInquiries(propertyId?: string): Promise<PropertyInquiry[]>;
  createPropertyInquiry(
    inquiry: InsertPropertyInquiry,
  ): Promise<PropertyInquiry>;
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
        description:
          "If you missed the opportunity of investing in Chevron, Lekki, Lagos, don't worry - this is another exceptional opportunity to own prime land in this prestigious location!",
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
        ],
        images: [],
        videos: [],
        embedCodes: [
          {
            embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
            title: "Property Virtual Tour",
            platform: "YouTube"
          },
          {
            embedCode: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DNOvEZvsqYv/" data-instgrm-version="14">
              <div style="padding: 16px;">
                <a href="https://www.instagram.com/reel/DNOvEZvsqYv/" style="background: #FFFFFF; line-height: 0; padding: 0 0; text-align: center; text-decoration: none; width: 100%;" target="_blank">
                  <div style="display: flex; flex-direction: row; align-items: center;">
                    <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div>
                    <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;">
                      <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div>
                      <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div>
                    </div>
                  </div>
                  <div style="padding: 19% 0;"></div>
                  <div style="display: block; height: 50px; margin: 0 auto 12px; width: 50px;">
                    <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                          <g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g>
                      </g>
                    </svg>
                  </div>
                  <div style="padding-top: 8px;">
                    <div style="color: #3897f0; font-family: Arial,sans-serif; font-size: 14px; font-style: normal; font-weight: 550; line-height: 18px;">View this post on Instagram</div>
                  </div>
                  <div style="padding: 12.5% 0;"></div>
                  <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;">
                    <div>
                      <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div>
                      <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div>
                      <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div>
                    </div>
                    <div style="margin-left: 8px;">
                      <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div>
                      <div style="width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div>
                    </div>
                    <div style="margin-left: auto;">
                      <div style="width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div>
                      <div style="background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div>
                      <div style="width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div>
                    </div>
                  </div>
                  <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;">
                    <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div>
                    <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div>
                  </div>
                </a>
              </div>
            </blockquote>
            <script async src="//www.instagram.com/embed.js"></script>`,
            title: "Premium Investment in Lekki",
            platform: "Instagram"
          }
        ],
        status: "available",
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "QUICK SALE‼️ 1000sqm Cornerpiece Land - Atlantic View Estate",
        description:
          "QUICK SALE ALERT! This exceptional 1000sqm cornerpiece land is currently selling in the prestigious Atlantic View Estate, New Road, Chevron, Lekki, Lagos. This is a rare opportunity that won't stay in the market for long! Located in one of Chevron's most sought-after developments, this cornerpiece plot offers maximum privacy and development potential. The property comes with Global Certificate of Occupancy (CofO) providing absolute security of ownership and investment protection. Atlantic View Estate is renowned for its excellent infrastructure, strategic location, and high-end residential developments. With easy access to major business districts, shopping centers, international schools, and recreational facilities, this property represents an outstanding investment opportunity. The estate features tarred roads, reliable power supply, water infrastructure, and 24/7 security. Don't miss this chance to secure a premium cornerpiece land in Chevron at an attractive price point. Properties of this caliber and location are extremely rare and highly sought after by discerning investors and homeowners alike.",
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
          "Chevron, Lekki",
        ],
        images: [],
        videos: [],
        embedCodes: [
          {
            embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/examplevideo1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
            title: "Atlantic View Estate Overview",
            platform: "YouTube"
          }
        ],
        status: "available",
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "DISTRESS SALE 📌 2 Plots of Dryland - Alashela Estate",
        description:
          "URGENT DISTRESS SALE OPPORTUNITY! Two exceptional plots of dryland measuring 1244sqm in total are now available in the prestigious Alashela Estate, Ogombo, Ajah. This is a rare chance to acquire prime real estate at an incredible value due to urgent sale circumstances. Located in one of Ajah's most sought-after residential developments, Alashela Estate offers excellent infrastructure, peaceful environment, and strong investment potential. Each plot is being offered at an unbeatable price of ₦35M net per plot, making this an outstanding opportunity for savvy investors. The property comes with Certificate of Occupancy (CofO), ensuring complete legal documentation and peace of mind for buyers. Alashela Estate is known for its well-planned layout, good road network, and proximity to major landmarks including shopping centers, schools, and business districts. The estate features reliable utilities, security provisions, and a growing community of residents. Don't miss this limited-time opportunity to secure premium land in Ogombo at distress sale prices. Properties like these are extremely rare and won't last long in the market. Perfect for residential development or long-term investment with excellent appreciation potential.",
        type: "residential_land",
        price: "35000000",
        location: "Alashela Estate, Ogombo, Ajah",
        address: "Alashela Estate, Ogombo, Ajah, Lagos",
        size: "1244sqm (2 plots)",
        bedrooms: null,
        bathrooms: null,
        parking: null,
        features: [
          "Certificate of Occupancy (CofO)",
          "Dryland",
          "2 Plots Available",
          "1244sqm Total",
          "Distress Sale Price",
          "Alashela Estate",
          "Prime Location",
          "Good Road Network",
          "Reliable Utilities",
          "Investment Opportunity",
          "Legal Documentation",
          "Ogombo, Ajah",
        ],
        images: [],
        videos: [],
        embedCodes: [],
        status: "available",
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "LAND FOR SALE📌 660sqm Prime Land - Ogombo, Ajah",
        description:
          "EXCEPTIONAL LAND OPPORTUNITY! Prime 660sqm land now available for sale in the highly sought-after Ogombo area of Ajah, Lagos. This strategically located property offers excellent investment potential and is perfect for residential development. Priced at an attractive ₦55M, this land comes with Governors Consent, providing complete legal security and peace of mind for buyers. Ogombo, Ajah is one of Lagos's fastest-growing residential areas, known for its excellent infrastructure development and proximity to major business districts. The location offers easy access to Lekki-Epe Expressway, shopping centers, schools, and recreational facilities. With its prime location and verified documentation, this property represents an outstanding opportunity for both end-users looking to build their dream home and investors seeking high-return real estate assets. The area has seen significant appreciation in property values over recent years, making it an ideal choice for long-term investment. Don't miss this chance to secure prime land in one of Lagos's most promising residential corridors at this competitive price point.",
        type: "residential_land",
        price: "55000000",
        location: "Ogombo, Ajah",
        address: "Ogombo, Ajah, Lagos",
        size: "660sqm",
        bedrooms: null,
        bathrooms: null,
        parking: null,
        features: [
          "Governors Consent",
          "660sqm",
          "Prime Location",
          "Ogombo, Ajah",
          "Residential Development",
          "Investment Opportunity",
          "Legal Documentation",
          "Strategic Location",
          "High Growth Area",
          "Easy Access to Lekki-Epe Expressway",
          "Proximity to Amenities",
          "Competitive Price",
        ],
        images: [],
        videos: [
          "/uploads/videos/LAND FOR SALE📌SIZE- 660sqm LOCATION- Ogombo, Ajah Price-N55MTitle-Governors consentFOR ENQUIRIE.mp4",
        ],
        embedCodes: [
          {
            embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/another_example" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
            title: "Ogombo Prime Land",
            platform: "YouTube"
          }
        ],
        status: "available",
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "URGENT SALE‼️ 660sqm Land - Greenland Estate, Ogombo, Ajah",
        description:
          "URGENT SALE OPPORTUNITY! Prime 660sqm land is now available for immediate sale in the prestigious Greenland Estate, Ogombo, Ajah, Lagos. This urgent sale presents an exceptional opportunity to acquire prime real estate at a competitive price point due to the seller's urgent circumstances. Located in one of Ajah's most sought-after gated communities, Greenland Estate offers excellent infrastructure, peaceful residential environment, and strong investment potential. The property comes with Governor's Consent, providing complete legal documentation and absolute security of ownership. Greenland Estate is renowned for its well-planned layout, excellent road network, reliable utilities, and 24/7 security services. The estate's strategic location provides easy access to major business districts, shopping centers, schools, and recreational facilities along the Lekki-Epe corridor. With its proximity to key landmarks and ongoing infrastructure development in the area, this property offers excellent potential for both residential development and long-term investment appreciation. Don't miss this time-sensitive opportunity to secure premium land in one of Lagos's fastest-growing residential corridors at an urgent sale price.",
        type: "residential_land",
        price: "55000000",
        location: "Greenland Estate, Ogombo, Ajah",
        address: "Greenland Estate, Ogombo, Ajah, Lagos",
        size: "660sqm",
        bedrooms: null,
        bathrooms: null,
        parking: null,
        features: [
          "Governor's Consent",
          "660sqm",
          "Urgent Sale",
          "Greenland Estate",
          "Gated Community",
          "Prime Location",
          "Ogombo, Ajah",
          "Investment Opportunity",
          "Legal Documentation",
          "24/7 Security",
          "Good Road Network",
          "Reliable Utilities",
          "Strategic Location",
          "Competitive Price",
        ],
        images: [],
        videos: [],
        embedCodes: [],
        status: "available",
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleProperties.forEach((property) => {
      this.memoryProperties.set(property.id, property as Property);
    });

    console.log("✅ Sample properties loaded to memory storage");
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        const result = await db
          .select()
          .from(users)
          .where(eq(users.id, id))
          .limit(1);
        return result[0];
      }
      return undefined;
    } catch (error) {
      console.error("Error fetching user:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        const result = await db
          .select()
          .from(users)
          .where(eq(users.username, username))
          .limit(1);
        return result[0];
      }
      return undefined;
    } catch (error) {
      console.error("Error fetching user by username:", error);
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
      console.error("Error creating user:", error);
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
            conditions.push(
              sql`${properties.location} ILIKE ${`%${filters.location}%`}`,
            );
          }
          if (filters.featured !== undefined) {
            conditions.push(eq(properties.featured, filters.featured));
          }
          if (filters.minPrice) {
            conditions.push(
              gte(sql`CAST(${properties.price} AS DECIMAL)`, filters.minPrice),
            );
          }
          if (filters.maxPrice) {
            conditions.push(
              lte(sql`CAST(${properties.price} AS DECIMAL)`, filters.maxPrice),
            );
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
          result = result.filter((property) => {
            if (
              filters.type &&
              filters.type !== "All Types" &&
              property.type !== filters.type
            )
              return false;
            if (
              filters.location &&
              filters.location !== "All Locations" &&
              !property.location
                .toLowerCase()
                .includes(filters.location.toLowerCase())
            )
              return false;
            if (
              filters.featured !== undefined &&
              property.featured !== filters.featured
            )
              return false;
            if (
              filters.minPrice &&
              parseFloat(property.price) < filters.minPrice
            )
              return false;
            if (
              filters.maxPrice &&
              parseFloat(property.price) > filters.maxPrice
            )
              return false;
            return true;
          });
        }

        return result.sort(
          (a, b) =>
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime(),
        );
      }
    } catch (error) {
      this.fallbackToMemory = true;
      console.error(
        "❌ Error fetching properties, falling back to memory storage:",
        error,
      );
      return Array.from(this.memoryProperties.values());
    }
  }

  async getProperty(id: string): Promise<Property | undefined> {
    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        const result = await db
          .select()
          .from(properties)
          .where(eq(properties.id, id))
          .limit(1);
        return result[0];
      } else {
        return this.memoryProperties.get(id);
      }
    } catch (error) {
      this.fallbackToMemory = true;
      console.error(
        "❌ Error fetching property, falling back to memory storage:",
        error,
      );
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
        console.log("✅ Property saved to database:", newProperty.title);
      } else {
        this.fallbackToMemory = true;
        this.memoryProperties.set(id, newProperty as Property);
        console.log("✅ Property saved to memory storage:", newProperty.title);
      }
      return newProperty as Property;
    } catch (error) {
      console.error(
        "❌ Database error, falling back to memory storage:",
        error,
      );
      this.fallbackToMemory = true;
      this.memoryProperties.set(id, newProperty as Property);
      console.log("✅ Property saved to memory storage:", newProperty.title);
      return newProperty as Property;
    }
  }

  async updateProperty(
    id: string,
    property: Partial<InsertProperty>,
  ): Promise<Property | undefined> {
    // Create properly typed update data with explicit type handling
    const updateData: Partial<Property> & { updatedAt: Date } = {
      updatedAt: new Date(),
    };

    // Copy all primitive properties
    Object.keys(property).forEach((key) => {
      if (key !== "features" && key !== "images" && key !== "videos") {
        (updateData as any)[key] = (property as any)[key];
      }
    });

    // Handle array properties with explicit typing
    if (property.features !== undefined) {
      updateData.features = Array.isArray(property.features)
        ? property.features.map(String)
        : [];
    }
    if (property.images !== undefined) {
      updateData.images = Array.isArray(property.images)
        ? property.images.map(String)
        : [];
    }
    if (property.videos !== undefined) {
      updateData.videos = Array.isArray(property.videos)
        ? property.videos.map(String)
        : [];
    }

    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        await db
          .update(properties)
          .set(updateData)
          .where(eq(properties.id, id));
        console.log("✅ Property updated in database:", id);
        return this.getProperty(id);
      } else {
        const existing = this.memoryProperties.get(id);
        if (existing) {
          const updated = { ...existing, ...updateData };
          this.memoryProperties.set(id, updated);
          console.log("✅ Property updated in memory storage:", id);
          return updated;
        }
        return undefined;
      }
    } catch (error) {
      console.error(
        "❌ Database error, falling back to memory storage:",
        error,
      );
      this.fallbackToMemory = true;
      const existing = this.memoryProperties.get(id);
      if (existing) {
        const updated = { ...existing, ...updateData };
        this.memoryProperties.set(id, updated);
        console.log("✅ Property updated in memory storage:", id);
        return updated;
      }
      return undefined;
    }
  }

  async deleteProperty(id: string): Promise<boolean> {
    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        const result = await db.delete(properties).where(eq(properties.id, id));
        console.log("✅ Property deleted from database:", id);
        return result.rowCount !== null && result.rowCount > 0;
      } else {
        const deleted = this.memoryProperties.delete(id);
        if (deleted) {
          console.log("✅ Property deleted from memory storage:", id);
        }
        return deleted;
      }
    } catch (error) {
      console.error(
        "❌ Database error, falling back to memory storage:",
        error,
      );
      this.fallbackToMemory = true;
      const deleted = this.memoryProperties.delete(id);
      if (deleted) {
        console.log("✅ Property deleted from memory storage:", id);
      }
      return deleted;
    }
  }

  async getContacts(): Promise<Contact[]> {
    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        const result = await db
          .select()
          .from(contacts)
          .orderBy(sql`${contacts.createdAt} DESC`);
        return result;
      } else {
        return Array.from(this.memoryContacts.values());
      }
    } catch (error) {
      console.error(
        "❌ Error fetching contacts, falling back to memory storage:",
        error,
      );
      this.fallbackToMemory = true;
      return Array.from(this.memoryContacts.values());
    }
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const newContact = {
      ...contact,
      id,
      status: "new",
      createdAt: new Date(),
    };

    try {
      if (isDbConnected() && !this.fallbackToMemory) {
        await db.insert(contacts).values(newContact);
        console.log("✅ Contact saved to database");
      } else {
        this.fallbackToMemory = true;
        this.memoryContacts.set(id, newContact as Contact);
        console.log("✅ Contact saved to memory storage");
      }
      return newContact as Contact;
    } catch (error) {
      console.error(
        "❌ Database error, falling back to memory storage:",
        error,
      );
      this.fallbackToMemory = true;
      this.memoryContacts.set(id, newContact as Contact);
      console.log("✅ Contact saved to memory storage");
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

        const result = await query.orderBy(
          sql`${propertyInquiries.createdAt} DESC`,
        );
        return result;
      } else {
        let result = Array.from(this.memoryInquiries.values());
        if (propertyId) {
          result = result.filter(
            (inquiry) => inquiry.propertyId === propertyId,
          );
        }
        return result.sort(
          (a, b) =>
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime(),
        );
      }
    } catch (error) {
      console.error(
        "❌ Error fetching inquiries, falling back to memory storage:",
        error,
      );
      this.fallbackToMemory = true;
      let result = Array.from(this.memoryInquiries.values());
      if (propertyId) {
        result = result.filter((inquiry) => inquiry.propertyId === propertyId);
      }
      return result.sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime(),
      );
    }
  }

  async createPropertyInquiry(
    inquiry: InsertPropertyInquiry,
  ): Promise<PropertyInquiry> {
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
        console.log("✅ Property inquiry saved to database");
      } else {
        this.fallbackToMemory = true;
        this.memoryInquiries.set(id, newInquiry as PropertyInquiry);
        console.log("✅ Property inquiry saved to memory storage");
      }
      return newInquiry as PropertyInquiry;
    } catch (error) {
      console.error(
        "❌ Database error, falling back to memory storage:",
        error,
      );
      this.fallbackToMemory = true;
      this.memoryInquiries.set(id, newInquiry as PropertyInquiry);
      console.log("✅ Property inquiry saved to memory storage");
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
      features: Array.isArray(propertyData.features)
        ? (propertyData.features as string[])
        : [],
      images: Array.isArray(propertyData.images)
        ? (propertyData.images as string[])
        : [],
      videos: Array.isArray(propertyData.videos)
        ? (propertyData.videos as string[])
        : [],
      status: "available",
      featured: propertyData.featured || false,
    };

    return this.createProperty(insertProperty);
  }
}

export const storage = new DatabaseStorage();