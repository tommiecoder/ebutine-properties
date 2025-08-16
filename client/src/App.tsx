import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import { Helmet } from "react-helmet";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import PropertyListings from "@/pages/PropertyListings";
import WhyChooseUs from "@/pages/WhyChooseUs";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Ebutine Properties - Diaspora's First Choice for Verified Properties in Nigeria</title>
        <meta name="description" content="Premium real estate company in Lagos, Nigeria. Buy land, luxury homes, commercial properties. Trusted by diaspora clients. Verified listings in developed areas." />
        <meta name="keywords" content="buy land in Lagos, luxury homes Nigeria, commercial land Lagos, diaspora real estate Nigeria, verified properties Nigeria" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ebutine Properties - Verified Real Estate in Nigeria" />
        <meta property="og:description" content="Premium properties in Lagos. Residential & commercial lands, luxury homes. Trusted by diaspora clients worldwide." />
        
        {/* Structured Data for Real Estate */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Ebutine Properties",
            "description": "Premium real estate company specializing in residential and commercial lands, luxury homes, property management and development in Lagos, Nigeria",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "House No 2, Road 4, Greenland Estate, Olokonla",
              "addressLocality": "Sangotedo Ajah",
              "addressRegion": "Lagos",
              "addressCountry": "Nigeria"
            },
            "telephone": "+2349061461411",
            "email": "ebutineproperties@gmail.com",
            "areaServed": "Lagos, Nigeria"
          })}
        </script>
      </Helmet>
      
      <Navigation />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/properties" component={PropertyListings} />
          <Route path="/why-choose-us" component={WhyChooseUs} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
