
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HeroSection() {
  const [searchFilters, setSearchFilters] = useState({
    propertyType: "",
    location: "",
    budget: "",
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
      title: "Luxury Living Redefined",
      subtitle: "Discover premium residential properties in Lagos's most prestigious neighborhoods",
      highlight: "Luxury Homes"
    },
    {
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
      title: "Your Dream Home Awaits",
      subtitle: "Beautiful residential lands with verified documentation and clear titles",
      highlight: "Residential Land"
    },
    {
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
      title: "Investment Opportunities",
      subtitle: "Strategic commercial properties in high-growth areas across Lagos",
      highlight: "Commercial Land"
    },
    {
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
      title: "Verified Properties Only",
      subtitle: "Every property undergoes rigorous verification for your peace of mind",
      highlight: "100% Verified"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchFilters.propertyType) params.set("type", searchFilters.propertyType);
    if (searchFilters.location) params.set("location", searchFilters.location);
    if (searchFilters.budget) params.set("budget", searchFilters.budget);
    
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-110'
            }`}
          >
            <div
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed"
              }}
              className="absolute inset-0"
            ></div>
            <div className="absolute inset-0 bg-gradient-to-br from-ebutine-dark/80 via-ebutine-blue/70 to-ebutine-dark/90"></div>
          </div>
        ))}
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 opacity-20 animate-float-slow">
          <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm transform rotate-12">
            <div className="w-16 h-16 bg-ebutine-orange rounded-2xl flex items-center justify-center shadow-xl">
              <i className="fas fa-home text-white text-2xl"></i>
            </div>
          </div>
        </div>
        
        <div className="absolute top-1/3 right-16 opacity-20 animate-float" style={{animationDelay: '2s'}}>
          <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm transform -rotate-12">
            <div className="w-16 h-16 bg-ebutine-blue rounded-2xl flex items-center justify-center shadow-xl">
              <i className="fas fa-building text-white text-2xl"></i>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-32 left-1/4 opacity-15 animate-float-delayed">
          <div className="bg-gradient-to-br from-ebutine-orange/30 to-ebutine-blue/30 w-32 h-32 rounded-full backdrop-blur-sm"></div>
        </div>

        <div className="absolute top-1/2 left-10 opacity-10 animate-float-slow" style={{animationDelay: '3s'}}>
          <div className="bg-gradient-to-br from-white/20 to-ebutine-orange/20 w-24 h-24 rounded-full backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-ebutine-orange scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Dynamic Content */}
          <div className="mb-12">
            <div className="inline-block bg-ebutine-orange/20 backdrop-blur-sm px-6 py-2 rounded-full border border-ebutine-orange/30 mb-6">
              <span className="text-ebutine-orange font-semibold text-lg">
                {slides[currentSlide].highlight}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="glass rounded-3xl p-8 shadow-2xl border border-white/30 backdrop-blur-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Property Type</label>
                  <Select value={searchFilters.propertyType} onValueChange={(value) => setSearchFilters(prev => ({...prev, propertyType: value}))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white backdrop-blur-sm">
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
                  <label className="block text-sm font-semibold text-white mb-3">Location</label>
                  <Select value={searchFilters.location} onValueChange={(value) => setSearchFilters(prev => ({...prev, location: value}))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white backdrop-blur-sm">
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
                  <label className="block text-sm font-semibold text-white mb-3">Budget Range</label>
                  <Select value={searchFilters.budget} onValueChange={(value) => setSearchFilters(prev => ({...prev, budget: value}))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white backdrop-blur-sm">
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
                    className="btn-primary w-full bg-ebutine-orange hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    Search Properties
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8">
            <Link href="/contact">
              <Button className="bg-ebutine-orange hover:bg-orange-600 text-white font-bold py-4 px-10 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-ebutine-orange">
                Book Free Consultation
              </Button>
            </Link>
            
            <a 
              href="https://wa.me/2349061461411" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-ebutine-dark font-bold py-4 px-10 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                <i className="fab fa-whatsapp mr-3 text-xl"></i>
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
