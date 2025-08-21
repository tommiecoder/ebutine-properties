import { Heart, Bed, Bath, Car, MapPin, Phone, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import PropertyVideoModal from "./PropertyVideoModal";
import type { Property } from "@shared/schema";

function PropertyThumbnail({ property }: { property: Property }) {
  const [thumbnailSrc, setThumbnailSrc] = useState<string>("");

  useEffect(() => {
    const generateThumbnail = async () => {
      // If property has videos, extract thumbnail from first video
      if (property.videos && property.videos.length > 0) {
        try {
          const video = document.createElement('video');
          video.crossOrigin = 'anonymous';
          video.muted = true;
          
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          video.onloadeddata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            // Seek to 1 second or 10% of video duration for better thumbnail
            video.currentTime = Math.min(1, video.duration * 0.1);
          };
          
          video.onseeked = () => {
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
              setThumbnailSrc(thumbnail);
            }
          };
          
          video.onerror = () => {
            // Fallback to first image or default
            const fallback = property.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3";
            setThumbnailSrc(fallback);
          };
          
          video.src = property.videos[0];
        } catch (error) {
          // Fallback to first image or default
          const fallback = property.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3";
          setThumbnailSrc(fallback);
        }
      } else {
        // Use first image or default
        const fallback = property.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3";
        setThumbnailSrc(fallback);
      }
    };

    generateThumbnail();
  }, [property.videos, property.images]);

  return (
    <img 
      src={thumbnailSrc || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"} 
      alt={property.title}
      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
      loading="lazy"
    />
  );
}

interface PropertyCardProps {
  property: Property;
  onViewDetails?: (id: string) => void;
  onInquire?: (id: string) => void;
}

export default function PropertyCard({ property, onViewDetails, onInquire }: PropertyCardProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  
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
    <Card className="card-enhanced overflow-hidden group" data-testid={`property-card-${property.id}`}>
      <div className="relative overflow-hidden">
        <PropertyThumbnail property={property} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 left-4">
          {getStatusBadge(property.status, property.featured || false)}
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          {property.videos && property.videos.length > 0 && (
            <button 
              onClick={() => setShowVideoModal(true)}
              className="glass p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
              title="View property videos"
            >
              <Play className="h-4 w-4 text-white" />
            </button>
          )}
          <button 
            className="glass p-3 rounded-full hover:bg-white/40 transition-all-smooth transform hover:scale-110"
            data-testid={`favorite-button-${property.id}`}
          >
            <Heart className="h-4 w-4 text-ebutine-orange" />
          </button>
        </div>
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="glass px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium">View Details</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-ebutine-dark mb-3 group-hover:text-ebutine-orange transition-colors duration-300" data-testid={`property-title-${property.id}`}>
          {property.title}
        </h3>
        <p className="text-ebutine-blue-light mb-4 flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-ebutine-orange" />
          {property.location}
        </p>
        <div className="mb-4">
          <p className="text-3xl font-bold text-gradient mb-1" data-testid={`property-price-${property.id}`}>
            {formatPrice(property.price)}
          </p>
          <p className="text-sm text-ebutine-blue-light">Starting price</p>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-3 gap-4 text-sm text-ebutine-blue mb-6">
          {property.bedrooms && (
            <div className="flex items-center p-2 bg-ebutine-light rounded-lg">
              <Bed className="h-4 w-4 mr-2 text-ebutine-orange" />
              <span className="font-medium">{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center p-2 bg-ebutine-light rounded-lg">
              <Bath className="h-4 w-4 mr-2 text-ebutine-orange" />
              <span className="font-medium">{property.bathrooms} Baths</span>
            </div>
          )}
          {property.parking && (
            <div className="flex items-center p-2 bg-ebutine-light rounded-lg">
              <Car className="h-4 w-4 mr-2 text-ebutine-orange" />
              <span className="font-medium">{property.parking} Parking</span>
            </div>
          )}
          {property.size && !property.bedrooms && (
            <div className="flex items-center p-2 bg-ebutine-light rounded-lg col-span-2">
              <i className="fas fa-ruler-combined mr-2 text-ebutine-orange"></i>
              <span className="font-medium">{property.size}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button 
            className="btn-primary flex-1"
            onClick={() => onViewDetails?.(property.id)}
            data-testid={`view-details-button-${property.id}`}
          >
            View Details
          </Button>
          <Button 
            className="btn-secondary px-4"
            onClick={() => onInquire?.(property.id)}
            data-testid={`inquire-button-${property.id}`}
          >
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      
      <PropertyVideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videos={property.videos || []}
        propertyTitle={property.title}
      />
    </Card>
  );
}