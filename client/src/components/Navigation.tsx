import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/properties", label: "Properties" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-ebutine sticky top-0 z-50 border-b border-ebutine-light-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" onClick={scrollToTop} className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={scrollToTop}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all-smooth ${
                    isActive(link.href)
                      ? "text-white bg-gradient-ebutine-orange shadow-lg"
                      : "text-ebutine-blue hover:text-ebutine-orange hover:bg-ebutine-light/50"
                  }`}
                  data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+2349061461411"
              className="text-ebutine-blue hover:text-ebutine-orange transition-colors"
              data-testid="phone-link"
            >
              <Phone className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/2349061461411"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all-smooth transform hover:scale-105 shadow-lg hover:shadow-xl"
              data-testid="whatsapp-link"
            >
              <i className="fab fa-whatsapp mr-2"></i>WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-ebutine-blue hover:text-ebutine-orange"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToTop();
                }}
                className={`block px-3 py-2 text-base font-medium ${
                  isActive(link.href)
                    ? "text-ebutine-dark"
                    : "text-ebutine-blue hover:text-ebutine-orange"
                }`}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex space-x-4 px-3 py-2">
              <a
                href="tel:+2349061461411"
                className="text-ebutine-blue hover:text-ebutine-orange"
                data-testid="mobile-phone-link"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/2349061461411"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
                data-testid="mobile-whatsapp-link"
              >
                <i className="fab fa-whatsapp mr-2"></i>WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}