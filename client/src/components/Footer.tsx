import { Link } from "wouter";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-ebutine-dark via-gray-900 to-ebutine-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Logo textColor="text-white" />
            <p className="text-gray-300 mb-4 mt-4">
              Nigeria's trusted real estate partner for diaspora and local investors. 
              Verified properties, transparent dealings, exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-ebutine-orange transition-colors" data-testid="facebook-link">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-ebutine-orange transition-colors" data-testid="instagram-link">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-ebutine-orange transition-colors" data-testid="linkedin-link">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-ebutine-orange transition-colors" data-testid="youtube-link">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-ebutine-orange transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-ebutine-orange transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-ebutine-orange transition-colors">Services</Link></li>
              <li><Link href="/properties" className="text-gray-300 hover:text-ebutine-orange transition-colors">Properties</Link></li>
              <li><Link href="/why-choose-us" className="text-gray-300 hover:text-ebutine-orange transition-colors">Why Choose Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-ebutine-orange transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-ebutine-orange transition-colors">Residential Land</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ebutine-orange transition-colors">Commercial Land</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ebutine-orange transition-colors">Luxury Homes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ebutine-orange transition-colors">Property Management</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ebutine-orange transition-colors">Property Development</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ebutine-orange transition-colors">Investment Advisory</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-ebutine-orange mt-1 mr-3" />
                <div className="text-gray-300">
                  <p>House No 2, Road 4,</p>
                  <p>Greenland Estate, Olokonla</p>
                  <p>Sangotedo Ajah, Lagos</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-ebutine-orange mr-3" />
                <a 
                  href="tel:+2349061461411" 
                  className="text-gray-300 hover:text-ebutine-orange transition-colors"
                  data-testid="footer-phone-link"
                >
                  +234 906 146 1411
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-ebutine-orange mr-3" />
                <a 
                  href="mailto:ebutineproperties@gmail.com" 
                  className="text-gray-300 hover:text-ebutine-orange transition-colors"
                  data-testid="footer-email-link"
                >
                  ebutineproperties@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <i className="fab fa-whatsapp text-green-500 mr-3 text-lg animate-pulse"></i>
                <a 
                  href="https://wa.me/2349061461411" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors font-semibold"
                  data-testid="footer-whatsapp-link"
                >
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0">
              © 2024 Ebutine Properties. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-ebutine-orange transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-ebutine-orange transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-ebutine-orange transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
