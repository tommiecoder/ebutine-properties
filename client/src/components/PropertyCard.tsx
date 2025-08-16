import { Heart, Bed, Bath, Car, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
  onViewDetails?: (id: string) => void;
  onInquire?: (id: string) => void;
}

export default function PropertyCard({ property, onViewDetails, onInquire }: PropertyCardProps) {
  const formatPrice = (price: string) => {
    const num = parseFloat(price);
    if (num >= 1000000) {
      return `₦${(num / 1000000).toFixed(1)}M`;
    }
    return `₦${num.toLocaleString()}`;
  };

  const getStatusBadge = (status: string, featured: boolean) => {
    if (featured) return <Badge className="bg-ebutine-orange text-white">Featured</Badge>;
    if (status === "available") return <Badge className="bg-green-500 text-white">Available</Badge>;
    if (status === "sold") return <Badge className="bg-red-500 text-white">Sold</Badge>;
    return <Badge className="bg-blue-500 text-white">New</Badge>;
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300" data-testid={`property-card-${property.id}`}>
      <div className="relative">
        <img 
          src={property.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"} 
          alt={property.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4">
          {getStatusBadge(property.status, property.featured || false)}
        </div>
        <div className="absolute top-4 right-4">
          <button 
            className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
            data-testid={`favorite-button-${property.id}`}
          >
            <Heart className="h-4 w-4 text-ebutine-orange" />
          </button>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-ebutine-dark mb-2" data-testid={`property-title-${property.id}`}>
          {property.title}
        </h3>
        <p className="text-ebutine-blue mb-3 flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          {property.location}
        </p>
        <p className="text-2xl font-bold text-ebutine-dark mb-4" data-testid={`property-price-${property.id}`}>
          {formatPrice(property.price)}
        </p>

        {/* Property Details */}
        <div className="grid grid-cols-3 gap-4 text-sm text-ebutine-blue mb-4">
          {property.bedrooms && (
            <span className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.bedrooms} Beds
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.bathrooms} Baths
            </span>
          )}
          {property.parking && (
            <span className="flex items-center">
              <Car className="h-4 w-4 mr-1" />
              {property.parking} Parking
            </span>
          )}
          {property.size && !property.bedrooms && (
            <span className="flex items-center col-span-2">
              <i className="fas fa-ruler-combined mr-1"></i>
              {property.size}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            className="flex-1 bg-ebutine-orange hover:bg-orange-600 text-white font-semibold"
            onClick={() => onViewDetails?.(property.id)}
            data-testid={`view-details-button-${property.id}`}
          >
            View Details
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="border-ebutine-orange text-ebutine-orange hover:bg-ebutine-orange hover:text-white"
            onClick={() => onInquire?.(property.id)}
            data-testid={`inquire-button-${property.id}`}
          >
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}