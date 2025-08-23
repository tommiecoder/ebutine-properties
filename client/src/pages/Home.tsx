import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Handshake, Shield, DollarSign, Headphones, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Properties */}
      <FeaturedProperties />

      {/* About Section */}
      <section className="py-20 bg-ebutine-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-ebutine-dark mb-6">About Ebutine Properties</h2>
              <p className="text-lg text-ebutine-blue mb-6">
                Founded with a vision to bridge the gap between diaspora investors and premium Nigerian real estate, 
                Ebutine Properties has become the trusted partner for thousands of clients worldwide.
              </p>
              <p className="text-lg text-ebutine-blue mb-8">
                We specialize in verified properties with clear documentation, ensuring our clients make secure 
                investments in Nigeria's thriving real estate market. Our commitment to honesty, integrity, 
                and affordability has earned us recognition as the diaspora's first choice.
              </p>

              {/* Core Values */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardContent className="text-center p-4">
                    <Handshake className="h-8 w-8 text-ebutine-orange mb-3 mx-auto" />
                    <h3 className="font-semibold text-ebutine-dark">Integrity</h3>
                    <p className="text-sm text-ebutine-blue">Transparent dealings always</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="text-center p-4">
                    <Shield className="h-8 w-8 text-ebutine-orange mb-3 mx-auto" />
                    <h3 className="font-semibold text-ebutine-dark">Verified Properties</h3>
                    <p className="text-sm text-ebutine-blue">Thoroughly vetted listings</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="text-center p-4">
                    <DollarSign className="h-8 w-8 text-ebutine-orange mb-3 mx-auto" />
                    <h3 className="font-semibold text-ebutine-dark">Affordability</h3>
                    <p className="text-sm text-ebutine-blue">Competitive pricing</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="text-center p-4">
                    <Headphones className="h-8 w-8 text-ebutine-orange mb-3 mx-auto" />
                    <h3 className="font-semibold text-ebutine-dark">Support</h3>
                    <p className="text-sm text-ebutine-blue">24/7 client assistance</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="relative">
              <img 
                src="/founder-augustine.jpg" 
                alt="Mr. Augustine Akunechendo - Founder & CEO of Ebutine Properties" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-ebutine-dark">Mr. Augustine Akunechendo</h3>
                <p className="text-lg text-ebutine-orange font-semibold">Founder & CEO</p>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-ebutine-orange text-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold">100+</h3>
                <p className="text-sm">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ebutine-dark mb-4">Our Services</h2>
            <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
              Comprehensive real estate solutions tailored for both local and diaspora clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🏠",
                title: "Residential Land",
                description: "Premium residential plots in developed estates with full infrastructure."
              },
              {
                icon: "🏢",
                title: "Commercial Land", 
                description: "Strategic commercial properties in high-traffic areas perfect for business."
              },
              {
                icon: "👑",
                title: "Luxury Homes",
                description: "Exquisite luxury homes and penthouses in exclusive neighborhoods."
              },
              {
                icon: "🔧",
                title: "Property Management",
                description: "Complete property management services for diaspora investors."
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-2xl hover:scale-105 transition-all duration-300 group border-2 border-transparent hover:border-ebutine-orange/20">
                <CardContent className="text-center p-8">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-ebutine-dark mb-4 group-hover:text-ebutine-orange transition-colors duration-300">{service.title}</h3>
                  <p className="text-ebutine-blue text-sm group-hover:text-gray-700 transition-colors duration-300">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button className="bg-ebutine-orange hover:bg-orange-600 text-white font-semibold py-4 px-8 text-lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Quick Contact */}
      <section className="py-20 ready-to-invest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Invest?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get in touch with our experts today and start your real estate investment journey
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <Phone className="h-12 w-12 text-ebutine-orange mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-ebutine-dark">Call Us</h3>
              <a href="tel:+2349061461411" className="text-ebutine-blue hover:text-ebutine-orange">+234 906 146 1411</a>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-12 w-12 text-ebutine-orange mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-ebutine-dark">Email Us</h3>
              <a href="mailto:ebutinepropertieslimited@gmail.com" className="text-ebutine-blue hover:text-ebutine-orange">ebutinepropertieslimited@gmail.com</a>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-12 w-12 text-ebutine-orange mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-ebutine-dark">Visit Us</h3>
              <p className="text-ebutine-blue">Greenland Estate, Lagos</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/contact">
              <Button size="lg" className="bg-ebutine-orange hover:bg-orange-600 text-white font-semibold py-4 px-8 text-lg">
                Contact Us Today
              </Button>
            </Link>
            <a href="https://wa.me/2349061461411" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-ebutine-dark font-semibold py-4 px-8 text-lg">
                <i className="fab fa-whatsapp mr-2"></i>WhatsApp Chat
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
