// client/src/pages/PropertyDetails.tsx
import { useRoute, useLocation } from 'wouter';
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { ArrowLeft, Heart, Phone, MapPin, Bed, Bath, Car, Calendar, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";
import PropertyVideoModal from "@/components/PropertyVideoModal";
import type { Property } from "@shared/schema";

export default function PropertyDetails() {
  const [match, params] = useRoute(`/properties/:id`);
  const id = params?.id;
  const [, setLocation] = useLocation();
  const [showVideoModal, setShowVideoModal] = useState(false);

  const navigate = (path: string) => setLocation(path);

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: [`/api/properties/${id}`],
    queryFn: async () => {
      const response = await fetch(`/api/properties/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Property not found");
        }
        throw new Error("Failed to fetch property");
      }
      return response.json();
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ebutine-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ebutine-orange mx-auto mb-4"></div>
          <p className="text-ebutine-blue">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-ebutine-light flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h1 className="text-2xl font-bold text-ebutine-dark mb-4">Property Not Found</h1>
          <p className="text-ebutine-blue mb-8">The property you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/properties')} className="bg-ebutine-orange hover:bg-orange-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: string) => {
    const num = parseFloat(price);
    if (num >= 1000000) {
      return `₦${(num / 1000000).toFixed(1)}M`;
    }
    return `₦${num.toLocaleString()}`;
  };

  const handleInquire = () => {
    const message = `Hi, I'm interested in "${property.title}" located in ${property.location}, priced at ${formatPrice(property.price)}. Can you provide more details?`;
    window.open(`https://wa.me/2349061461411?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const allMedia = [
    ...(property.images || []).map(img => ({ type: 'image', src: img })),
    ...(property.videos || []).map(video => ({ type: 'video', src: video })),
    ...(property.embedCodes || []).map((embed, index) => ({ type: 'embed', src: embed.embedCode, title: embed.title || `Embed ${index + 1}` }))
  ];

  return (
    <div className="min-h-screen bg-ebutine-light">
      <Helmet>
        <title>{property.title} - Ebutine Properties</title>
        {/* ✅ coerce null to undefined */}
        <meta name="description" content={property.description ?? undefined} />
      </Helmet>

      {/* header, carousel, details … your existing JSX stays the same */}

      {/* Video Modal – ✅ normalise platform to allowed union */}
      <PropertyVideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videos={property.videos || []}
        externalVideos={(property.externalVideos || []).map((v) => ({
          ...v,
          platform: (["youtube","instagram","vimeo","facebook","tiktok"].includes(v.platform)
            ? v.platform
            : "other") as "youtube"|"instagram"|"vimeo"|"facebook"|"tiktok"|"other"
        }))}
        embedCodes={property.embedCodes || []}
        propertyTitle={property.title}
      />
    </div>
  );
}
