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
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [thumbnail, setThumbnail] = useState<string>('');

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

  const handleFileChange = async (field: 'images' | 'videos', files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      if (field === 'images') {
        const compressedImages = await Promise.all(
          fileArray.map(file => compressImage(file))
        );
        setFormData(prev => ({ ...prev, [field]: compressedImages }));
        if (compressedImages.length > 0 && !thumbnail) {
          const thumb = await generateThumbnail(compressedImages[0]);
          setThumbnail(thumb);
        }
      } else if (field === 'videos') {
        const compressedVideos = await Promise.all(
          fileArray.map(file => compressVideo(file))
        );
        setFormData(prev => ({ ...prev, [field]: compressedVideos }));
        if (compressedVideos.length > 0 && !thumbnail) {
          const thumb = await generateThumbnail(compressedVideos[0]);
          setThumbnail(thumb);
        }
      }
    }
  };

  const compressImage = (file: File, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 800;

        let { width, height } = img;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = (height * MAX_WIDTH) / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = (width * MAX_HEIGHT) / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          }
        }, 'image/jpeg', quality);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const compressVideo = (file: File): Promise<File> => {
    // For video compression, we'll reduce the file size by limiting resolution
    // In a real implementation, you might use ffmpeg.wasm or similar
    return Promise.resolve(file); // Placeholder - actual video compression would need additional libraries
  };

  const generateThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        video.onloadedmetadata = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          video.currentTime = 1; // Get frame at 1 second
        };

        video.onseeked = () => {
          if (ctx) {
            ctx.drawImage(video, 0, 0);
            resolve(canvas.toDataURL());
          } else {
            resolve(''); // Return empty string if canvas context is not available
          }
        };

        video.src = URL.createObjectURL(file);
      } else {
        resolve(''); // Return empty string for unsupported file types
      }
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, images: files })); // Directly set new files

      if (files.length > 0 && !thumbnail) { // Only generate if no thumbnail exists yet
        const thumb = await generateThumbnail(files[0]);
        setThumbnail(thumb);
      }
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, videos: files })); // Directly set new files

      if (files.length > 0 && !thumbnail) { // Only generate if no thumbnail exists yet
        const thumb = await generateThumbnail(files[0]);
        setThumbnail(thumb);
      }
    }
  };

  const startEdit = (property: Property) => {
    setEditingProperty(property);
    setIsEditing(true);
    setFormData({
      title: property.title,
      description: property.description || "",
      price: property.price,
      location: property.location,
      type: property.type,
      size: property.size || "",
      bedrooms: property.bedrooms || "",
      bathrooms: property.bathrooms || "",
      features: property.features ? property.features.join(', ') : "",
      images: [], // Reset images on edit start
      videos: []  // Reset videos on edit start
    });
    // Assuming thumbnail is stored with the property or needs to be fetched/generated again
    // For simplicity, we'll clear it here if editing, and it can be regenerated if new files are uploaded.
    setThumbnail('');
  };

  const cancelEdit = () => {
    setEditingProperty(null);
    setIsEditing(false);
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
    setThumbnail('');
  };

  const generateAIDescription = async () => {
    if (!formData.title && !formData.description && !formData.images.length && !formData.videos.length) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a title or description, or upload images/videos for AI analysis.",
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

  const generateSmartProperty = async () => {
    if (!formData.images.length && !formData.videos.length && !formData.title) {
      toast({
        title: "Missing Information",
        description: "Please upload images/videos or provide a basic title for smart AI generation.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingAI(true);
    try {
      const response = await fetch('/api/admin/generate-property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          hasImages: formData.images.length > 0,
          hasVideos: formData.videos.length > 0,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate property details');

      const propertyData = await response.json();

      setFormData(prev => ({
        ...prev,
        title: propertyData.title,
        description: propertyData.description,
        type: propertyData.type,
        location: propertyData.location,
        size: propertyData.size,
        bedrooms: propertyData.bedrooms || "",
        bathrooms: propertyData.bathrooms || "",
        price: propertyData.price,
        features: propertyData.features.join(', ')
      }));

      toast({
        title: "Smart AI Complete!",
        description: "All property details have been intelligently generated from your media and input.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Could not generate smart property details. Please try again.",
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

      // Add files only if new files are selected
      if (formData.images.length > 0) {
        formData.images.forEach(file => {
          formDataToSend.append('images', file);
        });
      }

      if (formData.videos.length > 0) {
        formData.videos.forEach(file => {
          formDataToSend.append('videos', file);
        });
      }

      // Append thumbnail if it exists
      if (thumbnail) {
        // Convert data URL to File object to append
        const blob = await fetch(thumbnail).then(res => res.blob());
        const thumbnailFile = new File([blob], 'thumbnail.jpeg', { type: 'image/jpeg' });
        formDataToSend.append('thumbnail', thumbnailFile);
      }


      const url = isEditing && editingProperty
        ? `/api/admin/properties/${editingProperty.id}`
        : '/api/admin/properties';

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try to get more error details
        throw new Error(`Failed to ${isEditing ? 'update' : 'upload'} property: ${errorData.message || response.statusText}`);
      }

      toast({
        title: "Success",
        description: `Property ${isEditing ? 'updated' : 'uploaded'} successfully!`,
      });

      // Reset form
      cancelEdit();
      refetch();

    } catch (error: any) { // Explicitly type error as any or unknown
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'upload'} property. ${error.message}`,
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
              <CardTitle>
                {isEditing ? `Edit Property: ${editingProperty?.title}` : 'Upload New Property'}
              </CardTitle>
              {isEditing && (
                <Button variant="outline" onClick={cancelEdit} className="w-fit">
                  Cancel Edit
                </Button>
              )}
            </CardHeader>
            <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter a basic title or leave empty for AI to generate"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Tip: Upload images/videos and click "Smart AI" to automatically generate all property details!
              </p>
            </div>

            <div>
              <Label htmlFor="description" className="flex items-center justify-between">
                Description
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateSmartProperty}
                    disabled={isGeneratingAI}
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    {isGeneratingAI ? "Analyzing..." : "Smart AI"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateAIDescription}
                    disabled={isGeneratingAI}
                    className="ml-2"
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    {isGeneratingAI ? "Generating..." : "AI Enhance"}
                  </Button>
                </div>
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
              <Label htmlFor="images">Property Images {isEditing && "(Leave empty to keep existing images)"}</Label>
              <p className="text-sm text-gray-600 mb-2">Images will be automatically compressed for faster loading</p>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
              {thumbnail && !isEditing && ( // Display thumbnail only when not editing and thumbnail is available
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">Generated Thumbnail:</p>
                  <img src={thumbnail} alt="Generated Thumbnail" className="w-32 h-32 object-cover rounded" />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="videos">Property Videos {isEditing && "(Leave empty to keep existing videos)"}</Label>
              <p className="text-sm text-gray-600 mb-2">First frame will be used as thumbnail</p>
              <Input
                id="videos"
                type="file"
                multiple
                accept="video/*"
                onChange={handleVideoUpload}
              />
              {thumbnail && !isEditing && ( // Display thumbnail only when not editing and thumbnail is available
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">Generated Thumbnail:</p>
                  <img src={thumbnail} alt="Generated Thumbnail" className="w-32 h-32 object-cover rounded" />
                </div>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (isEditing ? "Updating..." : "Uploading...") : (isEditing ? "Update Property" : "Upload Property")}
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(property)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
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