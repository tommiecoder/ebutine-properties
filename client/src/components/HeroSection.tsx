import { useState } from "react";
import { Link } from "wouter";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HeroSection() {
  const [searchFilters, setSearchFilters] = useState({
    propertyType: "",
    location: "",
    budget: "",
  });

  const handleSearch = () => {
    // Navigate to properties page with filters
    const params = new URLSearchParams();
    if (searchFilters.propertyType) params.set("type", searchFilters.propertyType);
    if (searchFilters.location) params.set("location", searchFilters.location);
    if (searchFilters.budget) params.set("budget", searchFilters.budget);
    
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <section className="relative bg-gradient-to-br from-ebutine-dark via-ebutine-blue to-ebutine-dark py-20 md:py-32">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        className="absolute inset-0"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-ebutine-dark/80 via-ebutine-blue/70 to-ebutine-dark/80"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Diaspora's First Choice for<br />
          <span className="text-ebutine-orange">Verified Properties</span> in Nigeria
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Discover premium residential and commercial lands, luxury homes with verified documentation. 
          Trusted by thousands of diaspora clients worldwide.
        </p>

        {/* Property Search Bar */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-ebutine-dark mb-2">Property Type</label>
              <Select value={searchFilters.propertyType} onValueChange={(value) => setSearchFilters(prev => ({...prev, propertyType: value}))}>
                <SelectTrigger data-testid="property-type-select">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential_land">Residential Land</SelectItem>
                  <SelectItem value="commercial_land">Commercial Land</SelectItem>
                  <SelectItem value="luxury_home">Luxury Homes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ebutine-dark mb-2">Location</label>
              <Select value={searchFilters.location} onValueChange={(value) => setSearchFilters(prev => ({...prev, location: value}))}>
                <SelectTrigger data-testid="location-select">
                  <SelectValue placeholder="Lagos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ajah">Ajah</SelectItem>
                  <SelectItem value="Sangotedo">Sangotedo</SelectItem>
                  <SelectItem value="Ibeju-Lekki">Ibeju-Lekki</SelectItem>
                  <SelectItem value="Victoria Island">Victoria Island</SelectItem>
                  <SelectItem value="Lekki">Lekki</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ebutine-dark mb-2">Budget Range</label>
              <Select value={searchFilters.budget} onValueChange={(value) => setSearchFilters(prev => ({...prev, budget: value}))}>
                <SelectTrigger data-testid="budget-select">
                  <SelectValue placeholder="Any Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-10">₦5M - ₦10M</SelectItem>
                  <SelectItem value="10-25">₦10M - ₦25M</SelectItem>
                  <SelectItem value="25-50">₦25M - ₦50M</SelectItem>
                  <SelectItem value="50+">₦50M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSearch}
                className="w-full bg-ebutine-orange hover:bg-orange-600 text-white font-semibold"
                data-testid="search-properties-button"
              >
                <Search className="mr-2 h-4 w-4" />
                Search Properties
              </Button>
            </div>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link href="/contact">
            <Button 
              size="lg" 
              className="bg-ebutine-orange hover:bg-orange-600 text-white font-semibold py-4 px-8 text-lg"
              data-testid="book-consultation-button"
            >
              Book Free Consultation
            </Button>
          </Link>
          <a 
            href="https://wa.me/2349061461411" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-ebutine-dark font-semibold py-4 px-8 text-lg"
              data-testid="whatsapp-hero-button"
            >
              <i className="fab fa-whatsapp mr-2"></i>WhatsApp Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
