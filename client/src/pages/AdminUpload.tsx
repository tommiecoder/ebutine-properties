
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Trash2, Edit, Sparkles } from "lucide-react";
import type { Property } from "@shared/schema";

export default function AdminUpload() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    features: "",
    images: [] as File[],
    videos: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  
  // Fetch existing properties for management
  const { data: properties = [], refetch } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    queryFn: async () => {
      const response = await fetch("/api/properties");
      if (!response.ok) throw new Error("Failed to fetch properties");
      return response.json();
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: 'images' | 'videos', files: FileList | null) => {
    if (files) {
      setFormData(prev => ({ ...prev, [field]: Array.from(files) }));
    }
  };

  const generateAIDescription = async () => {
    if (!formData.title || (!formData.images.length && !formData.videos.length)) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and at least one image or video for AI generation.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingAI(true);
    try {
      const response = await fetch('/api/admin/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          type: formData.type,
          location: formData.location,
          price: formData.price,
          size: formData.size,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate description');
      
      const { description, features } = await response.json();
      
      setFormData(prev => ({
        ...prev,
        description,
        features: features.join(', ')
      }));

      toast({
        title: "AI Generated!",
        description: "Description and features have been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Could not generate AI description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const deleteProperty = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    
    try {
      const response = await fetch(`/api/admin/properties/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete property');

      toast({
        title: "Success",
        description: "Property deleted successfully!",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete property. Please try again.",
        variant: "destructive",
      });
    }
  };

  const markAsSold = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/properties/${id}/sold`, {
        method: 'PATCH',
      });

      if (!response.ok) throw new Error('Failed to mark as sold');

      toast({
        title: "Success",
        description: "Property marked as sold!",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update property status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Add text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'images' && key !== 'videos') {
          formDataToSend.append(key, value as string);
        }
      });

      // Add files
      formData.images.forEach(file => {
        formDataToSend.append('images', file);
      });
      
      formData.videos.forEach(file => {
        formDataToSend.append('videos', file);
      });

      const response = await fetch('/api/admin/properties', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to upload property');
      }

      toast({
        title: "Success",
        description: "Property uploaded successfully!",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        type: "",
        size: "",
        bedrooms: "",
        bathrooms: "",
        features: "",
        images: [],
        videos: []
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Property</TabsTrigger>
          <TabsTrigger value="manage">Manage Properties</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Property</CardTitle>
            </CardHeader>
            <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="flex items-center justify-between">
                Description
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateAIDescription}
                  disabled={isGeneratingAI}
                  className="ml-2"
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  {isGeneratingAI ? "Generating..." : "AI Generate"}
                </Button>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                required
                placeholder="Describe the property or use AI to generate a description..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (₦)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Property Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="size">Size (sqm)</Label>
                <Input
                  id="size"
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="features">Features (comma separated)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => handleInputChange('features', e.target.value)}
                placeholder="e.g., Swimming pool, Garage, Security, etc."
              />
            </div>

            <div>
              <Label htmlFor="images">Property Images</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileChange('images', e.target.files)}
              />
            </div>

            <div>
              <Label htmlFor="videos">Property Videos</Label>
              <Input
                id="videos"
                type="file"
                multiple
                accept="video/*"
                onChange={(e) => handleFileChange('videos', e.target.files)}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Uploading..." : "Upload Property"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
    
    <TabsContent value="manage">
      <Card>
        <CardHeader>
          <CardTitle>Manage Properties ({properties.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {properties.map((property) => (
              <div key={property.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{property.title}</h3>
                      <Badge variant={property.status === 'sold' ? 'destructive' : 'default'}>
                        {property.status}
                      </Badge>
                      {property.featured && <Badge variant="secondary">Featured</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                    <p className="text-lg font-bold text-green-600">₦{parseFloat(property.price).toLocaleString()}</p>
                    <div className="flex gap-2 mt-2">
                      {property.bedrooms && <span className="text-xs bg-gray-100 px-2 py-1 rounded">{property.bedrooms} beds</span>}
                      {property.bathrooms && <span className="text-xs bg-gray-100 px-2 py-1 rounded">{property.bathrooms} baths</span>}
                      {property.size && <span className="text-xs bg-gray-100 px-2 py-1 rounded">{property.size}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {property.status !== 'sold' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsSold(property.id)}
                      >
                        Mark as Sold
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProperty(property.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {properties.length === 0 && (
              <p className="text-center text-gray-500 py-8">No properties found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
    </div>
  );
}
