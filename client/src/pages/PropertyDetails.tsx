import { useRoute } from 'wouter';
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
  const { id } = useRoute<{ id: string }>(`/properties/:id`)[1];
  const navigate = (path: string) => navigate(path);
  const [showVideoModal, setShowVideoModal] = useState(false);

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
    ...(property.videos || []).map(video => ({ type: 'video', src: video }))
  ];

  return (
    <div className="min-h-screen bg-ebutine-light">
      <Helmet>
        <title>{property.title} - Ebutine Properties</title>
        <meta name="description" content={property.description} />
      </Helmet>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/properties')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Property Images/Videos Carousel */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {allMedia.length > 0 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {allMedia.map((media, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
                      {media.type === 'image' ? (
                        <img
                          src={media.src}
                          alt={`${property.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={media.src}
                          className="w-full h-full object-cover"
                          controls
                          preload="metadata"
                        />
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <div className="h-96 md:h-[500px] rounded-2xl bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>
      </div>

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={
                    property.status === "available" ? "bg-green-500" :
                    property.status === "sold" ? "bg-red-500" : "bg-blue-500"
                  }>
                    {property.status}
                  </Badge>
                  {property.featured && (
                    <Badge className="bg-ebutine-orange">Featured</Badge>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-ebutine-dark mb-4">{property.title}</h1>

                <div className="flex items-center text-ebutine-blue mb-6">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{property.location}</span>
                </div>

                <div className="mb-6">
                  <p className="text-4xl font-bold text-gradient mb-2">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-ebutine-blue-light">Starting price</p>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {property.bedrooms && (
                    <div className="text-center p-4 bg-ebutine-light rounded-lg">
                      <Bed className="h-6 w-6 mx-auto mb-2 text-ebutine-orange" />
                      <p className="font-semibold">{property.bedrooms}</p>
                      <p className="text-sm text-ebutine-blue">Bedrooms</p>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="text-center p-4 bg-ebutine-light rounded-lg">
                      <Bath className="h-6 w-6 mx-auto mb-2 text-ebutine-orange" />
                      <p className="font-semibold">{property.bathrooms}</p>
                      <p className="text-sm text-ebutine-blue">Bathrooms</p>
                    </div>
                  )}
                  {property.parking && (
                    <div className="text-center p-4 bg-ebutine-light rounded-lg">
                      <Car className="h-6 w-6 mx-auto mb-2 text-ebutine-orange" />
                      <p className="font-semibold">{property.parking}</p>
                      <p className="text-sm text-ebutine-blue">Parking</p>
                    </div>
                  )}
                  {property.size && (
                    <div className="text-center p-4 bg-ebutine-light rounded-lg">
                      <Eye className="h-6 w-6 mx-auto mb-2 text-ebutine-orange" />
                      <p className="font-semibold">{property.size}</p>
                      <p className="text-sm text-ebutine-blue">Size</p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-xl font-bold text-ebutine-dark mb-4">Description</h2>
                  <p className="text-ebutine-blue leading-relaxed">{property.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-ebutine-dark mb-4">Features & Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-2 w-2 bg-ebutine-orange rounded-full mr-3"></div>
                        <span className="text-ebutine-blue">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-ebutine-dark mb-4">Interested in this property?</h3>

                <div className="space-y-4">
                  <Button 
                    className="w-full bg-ebutine-orange hover:bg-orange-600"
                    onClick={handleInquire}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Agent
                  </Button>

                  {property.videos && property.videos.length > 0 && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setShowVideoModal(true)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Watch Property Tour ({property.videos.length} video{property.videos.length > 1 ? 's' : ''})
                    </Button>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="text-center">
                    <p className="text-sm text-ebutine-blue mb-2">Need financing assistance?</p>
                    <Button variant="outline" size="sm">
                      Get Pre-approved
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <PropertyVideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videos={property.videos || []}
        propertyTitle={property.title}
      />
    </div>
  );
}