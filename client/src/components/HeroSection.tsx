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
    <section className="relative bg-gradient-to-br from-ebutine-dark via-ebutine-blue to-ebutine-dark py-20 md:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "slowZoom 20s ease-in-out infinite alternate, slowPan 30s ease-in-out infinite"
          }}
          className="absolute inset-0 scale-110"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-ebutine-dark/75 via-ebutine-blue/60 to-ebutine-dark/75"></div>
        
        {/* Animated Property Images */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating Property Icons */}
          <div className="absolute top-16 left-10 opacity-20 animate-float-slow">
            <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="w-12 h-12 bg-ebutine-orange rounded-lg flex items-center justify-center">
                <i className="fas fa-home text-white text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="absolute top-32 right-16 opacity-20 animate-float" style={{animationDelay: '2s'}}>
            <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="w-12 h-12 bg-ebutine-blue rounded-lg flex items-center justify-center">
                <i className="fas fa-building text-white text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-24 left-20 opacity-20 animate-float-delayed">
            <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="w-12 h-12 bg-ebutine-orange rounded-lg flex items-center justify-center">
                <i className="fas fa-key text-white text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-40 right-24 opacity-20 animate-float" style={{animationDelay: '1.5s'}}>
            <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="w-12 h-12 bg-ebutine-blue rounded-lg flex items-center justify-center">
                <i className="fas fa-city text-white text-xl"></i>
              </div>
            </div>
          </div>
          
          {/* Floating Property Images */}
          <div className="absolute top-20 right-32 opacity-15 animate-float-slow" style={{animationDelay: '3s'}}>
            <img 
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&w=150&h=150&fit=crop" 
              alt="Modern House" 
              className="w-20 h-20 object-cover rounded-2xl shadow-lg"
            />
          </div>
          
          <div className="absolute top-1/2 left-16 opacity-15 animate-float-delayed" style={{animationDelay: '4s'}}>
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&w=150&h=150&fit=crop" 
              alt="Luxury Property" 
              className="w-24 h-24 object-cover rounded-2xl shadow-lg"
            />
          </div>
          
          <div className="absolute bottom-32 right-1/3 opacity-15 animate-float" style={{animationDelay: '2.5s'}}>
            <img 
              src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&w=150&h=150&fit=crop" 
              alt="Commercial Building" 
              className="w-16 h-16 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-ebutine-orange/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-ebutine-blue/10 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-ebutine-orange/15 rounded-full animate-float"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
          Diaspora's First Choice for<br />
          <span className="text-ebutine-orange animate-pulse">Verified Properties</span> in Nigeria
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          Discover premium residential and commercial lands, luxury homes with verified documentation. 
          Trusted by thousands of diaspora clients worldwide.
        </p>

        {/* Property Search Bar */}
        <div className="max-w-4xl mx-auto glass rounded-3xl p-8 shadow-ebutine mb-8 animate-fade-in-up border border-white/20" style={{animationDelay: '0.4s'}}>
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
                className="btn-primary w-full"
                data-testid="search-properties-button"
              >
                <Search className="mr-2 h-4 w-4" />
                Search Properties
              </Button>
            </div>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <Link href="/contact">
            <Button 
              className="btn-primary text-lg px-10 py-4"
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
              className="glass border-2 border-white/50 text-white hover:bg-white/20 hover:border-white font-semibold py-4 px-10 text-lg rounded-xl transition-all-smooth transform hover:scale-105"
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
