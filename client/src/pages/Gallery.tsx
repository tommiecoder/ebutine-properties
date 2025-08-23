import { Helmet } from "react-helmet";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const galleryImages = [
    {
      id: 1,
      src: "/gallery/modern-duplex-1.webp",
      title: "Modern Executive Duplex",
      category: "luxury",
      location: "Lekki, Lagos",
    },
    {
      id: 2,
      src: "/gallery/luxury-villa-2.webp",
      title: "Contemporary Luxury Villa",
      category: "luxury",
      location: "Victoria Island, Lagos",
    },
    {
      id: 3,
      src: "/gallery/terrace-homes-3.jpg",
      title: "Modern Terrace Houses",
      category: "residential",
      location: "Sangotedo, Lagos",
    },
  ];

  const categories = [
    { key: "all", label: "All Properties" },
    { key: "luxury", label: "Luxury Homes" },
    { key: "residential", label: "Residential" },
    { key: "commercial", label: "Commercial" },
  ];

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div>
      <Helmet>
        <title>Property Gallery - Ebutine Properties | Lagos Nigeria</title>
        <meta
          name="description"
          content="Browse our stunning gallery of premium properties in Lagos, Nigeria. Luxury homes, residential estates, and commercial properties."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-ebutine-dark to-ebutine-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Property Gallery
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Explore our collection of premium properties across Lagos
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.key
                    ? "bg-ebutine-orange text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-ebutine-dark hover:bg-gray-200"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image) => (
              <Card
                key={image.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {image.title}
                    </h3>
                    <p className="text-gray-200 text-sm">{image.location}</p>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-ebutine-orange text-white capitalize">
                    {image.category}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No properties found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 ready-to-invest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Invest?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            See a property you like? Get in touch with our experts today
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="https://wa.me/2349061461411"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-ebutine-orange hover:bg-orange-600 text-white font-semibold py-4 px-8 text-lg"
              >
                <i className="fab fa-whatsapp mr-2"></i>WhatsApp Us
              </Button>
            </a>
            <a href="tel:+2349061461411">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-ebutine-dark text-ebutine-dark hover:bg-ebutine-dark hover:text-white font-semibold py-4 px-8 text-lg"
              >
                Call Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
