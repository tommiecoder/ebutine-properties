import { useQuery } from "@tanstack/react-query";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Property } from "@shared/schema";

export default function FeaturedProperties() {
  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    queryFn: async () => {
      const response = await fetch("/api/properties?featured=true");
      if (!response.ok) throw new Error("Failed to fetch properties");
      return response.json();
    },
  });

  const handleViewDetails = (id: string) => {
    // Navigate to property details page
    window.location.href = `/properties/${id}`;
  };

  const handleInquire = (id: string) => {
    // Open WhatsApp with property inquiry
    const message = `Hi, I'm interested in the property with ID: ${id}. Can you provide more details?`;
    window.open(`https://wa.me/2349061461411?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ebutine-dark mb-4">Featured Properties</h2>
            <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
              Handpicked premium properties with verified documentation and clear titles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-ebutine-dark mb-4">Featured Properties</h2>
          <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
            Handpicked premium properties with verified documentation and clear titles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="featured-properties-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={handleViewDetails}
              onInquire={handleInquire}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/properties">
            <Button 
              className="bg-ebutine-blue hover:bg-gray-600 text-white font-semibold py-4 px-8 text-lg"
              data-testid="view-all-properties-button"
            >
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
