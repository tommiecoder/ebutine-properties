import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@shared/schema";

export default function PropertyListings() {
  const [filters, setFilters] = useState({
    propertyType: "all",
    location: "all",
    priceRange: "all",
    bedrooms: "all",
    purpose: "all",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;

  // Parse URL params on component mount
  const [isInitialized, setIsInitialized] = useState(false);
  
  useState(() => {
    if (!isInitialized) {
      const urlParams = new URLSearchParams(window.location.search);
      const initialFilters = {
        propertyType: urlParams.get("type") || "all",
        location: urlParams.get("location") || "all",
        priceRange: urlParams.get("budget") || "all",
        bedrooms: "all",
        purpose: "all",
      };
      setFilters(initialFilters);
      setIsInitialized(true);
    }
  });

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.propertyType && filters.propertyType !== "all") {
        params.set("type", filters.propertyType);
      }
      if (filters.location && filters.location !== "all") {
        params.set("location", filters.location);
      }
      
      const response = await fetch(`/api/properties?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch properties");
      return response.json();
    },
  });

  // Filter properties client-side for additional filters not handled by API
  const filteredProperties = properties.filter(property => {
    if (filters.priceRange && filters.priceRange !== "all") {
      const price = parseFloat(property.price);
      const [min, max] = filters.priceRange.includes("+") 
        ? [parseFloat(filters.priceRange.replace(/[^\d]/g, "")), Infinity]
        : filters.priceRange.split("-").map(p => parseFloat(p.replace(/[^\d]/g, "")) * 1000000);
      
      if (price < min || price > max) return false;
    }

    if (filters.bedrooms && filters.bedrooms !== "all" && property.bedrooms) {
      const bedCount = parseInt(property.bedrooms);
      if (filters.bedrooms === "1-2" && (bedCount < 1 || bedCount > 2)) return false;
      if (filters.bedrooms === "3-4" && (bedCount < 3 || bedCount > 4)) return false;
      if (filters.bedrooms === "5+" && bedCount < 5) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleViewDetails = (id: string) => {
    // Navigate to property details - for now show in new tab
    window.open(`/properties/${id}`, '_blank');
  };

  const handleInquire = (id: string) => {
    const property = properties.find(p => p.id === id);
    const message = `Hi, I'm interested in ${property?.title} (${property?.location}) priced at ${property?.price}. Can you provide more details?`;
    window.open(`https://wa.me/2349061461411?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div>
      <Helmet>
        <title>Property Listings - Buy Land & Luxury Homes in Lagos | Ebutine Properties</title>
        <meta name="description" content="Browse verified property listings in Lagos, Nigeria. Residential land, commercial properties, luxury homes with clear titles. Trusted by diaspora clients." />
        <meta name="keywords" content="buy land Lagos, residential land Nigeria, commercial property Lagos, luxury homes Lagos, verified properties Nigeria" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-ebutine-dark to-ebutine-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Property Listings</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Browse our extensive collection of verified properties across Lagos
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-ebutine-dark flex items-center">
                  <SlidersHorizontal className="mr-3 h-6 w-6" />
                  Filter Properties
                </h2>
                <div className="text-sm text-ebutine-blue">
                  {filteredProperties.length} properties found
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ebutine-dark mb-2">Property Type</label>
                  <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange("propertyType", value)}>
                    <SelectTrigger data-testid="filter-property-type">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="residential_land">Residential Land</SelectItem>
                      <SelectItem value="commercial_land">Commercial Land</SelectItem>
                      <SelectItem value="luxury_home">Luxury Homes</SelectItem>
                      <SelectItem value="apartment">Apartments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ebutine-dark mb-2">Location</label>
                  <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                    <SelectTrigger data-testid="filter-location">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Ajah">Ajah</SelectItem>
                      <SelectItem value="Sangotedo">Sangotedo</SelectItem>
                      <SelectItem value="Ibeju-Lekki">Ibeju-Lekki</SelectItem>
                      <SelectItem value="Victoria Island">Victoria Island</SelectItem>
                      <SelectItem value="Lekki">Lekki</SelectItem>
                      <SelectItem value="Ikeja">Ikeja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ebutine-dark mb-2">Price Range</label>
                  <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange("priceRange", value)}>
                    <SelectTrigger data-testid="filter-price-range">
                      <SelectValue placeholder="Any Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Price</SelectItem>
                      <SelectItem value="5-15">₦5M - ₦15M</SelectItem>
                      <SelectItem value="15-30">₦15M - ₦30M</SelectItem>
                      <SelectItem value="30-50">₦30M - ₦50M</SelectItem>
                      <SelectItem value="50-100">₦50M - ₦100M</SelectItem>
                      <SelectItem value="100+">₦100M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ebutine-dark mb-2">Bedrooms</label>
                  <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange("bedrooms", value)}>
                    <SelectTrigger data-testid="filter-bedrooms">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="1-2">1-2 Bedrooms</SelectItem>
                      <SelectItem value="3-4">3-4 Bedrooms</SelectItem>
                      <SelectItem value="5+">5+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ebutine-dark mb-2">Purpose</label>
                  <Select value={filters.purpose} onValueChange={(value) => handleFilterChange("purpose", value)}>
                    <SelectTrigger data-testid="filter-purpose">
                      <SelectValue placeholder="Any Purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Purpose</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="personal">Personal Use</SelectItem>
                      <SelectItem value="rental">Rental Income</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    className="w-full bg-ebutine-orange hover:bg-orange-600 text-white font-semibold"
                    onClick={() => {
                      // Filters are applied automatically via state changes
                      console.log("Filters applied:", filters);
                    }}
                    data-testid="apply-filters-button"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20 bg-ebutine-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-ebutine-dark mb-4">No Properties Found</h3>
              <p className="text-ebutine-blue mb-8">
                No properties match your current search criteria. Try adjusting your filters or browse all properties.
              </p>
              <Button 
                onClick={() => {
                  setFilters({
                    propertyType: "all",
                    location: "all",
                    priceRange: "all",
                    bedrooms: "all",
                    purpose: "all",
                  });
                  setCurrentPage(1);
                }}
                className="bg-ebutine-orange hover:bg-orange-600 text-white"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" data-testid="properties-grid">
                {paginatedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={handleViewDetails}
                    onInquire={handleInquire}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4" data-testid="pagination">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    data-testid="previous-page-button"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div className="flex space-x-2">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          className={currentPage === pageNum ? "bg-ebutine-orange hover:bg-orange-600" : ""}
                          onClick={() => setCurrentPage(pageNum)}
                          data-testid={`page-button-${pageNum}`}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    data-testid="next-page-button"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ebutine-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Didn't Find What You're Looking For?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our experts for personalized property recommendations based on your specific requirements
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" className="bg-ebutine-orange hover:bg-orange-600 text-white font-semibold py-4 px-8 text-lg">
              <a href="/contact">Request Custom Search</a>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-ebutine-dark font-semibold py-4 px-8 text-lg">
              <a href="https://wa.me/2349061461411" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp mr-2"></i>Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
