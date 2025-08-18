import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Shield, 
  Globe, 
  Headphones, 
  TrendingUp, 
  Heart, 
  MapPin, 
  CheckCircle, 
  Users, 
  Award, 
  Clock,
  FileCheck,
  SearchCheck,
  Phone
} from "lucide-react";

export default function WhyChooseUs() {
  const stats = [
    { number: "5000+", label: "Properties Sold", icon: "🏠" },
    { number: "3500+", label: "Happy Clients", icon: "😊" },
    { number: "8+", label: "Years Experience", icon: "📅" },
    { number: "15+", label: "Countries Served", icon: "🌍" }
  ];

  const verificationSteps = [
    {
      icon: SearchCheck,
      title: "Title Verification",
      description: "Complete documentation and legal checks including Certificate of Occupancy verification"
    },
    {
      icon: MapPin,
      title: "Physical Inspection", 
      description: "On-ground verification and assessment by our experienced field agents"
    },
    {
      icon: FileCheck,
      title: "Legal Compliance",
      description: "Government approvals and permits verification through official channels"
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: "Diaspora Focused",
      description: "Specialized services for overseas investors with remote transaction capabilities and regular property updates via WhatsApp and email.",
      features: ["Remote transactions", "Multi-timezone support", "Regular updates", "Diaspora-friendly processes"]
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support across multiple time zones. WhatsApp, email, and phone support in English and local languages.",
      features: ["24/7 availability", "Multi-language support", "WhatsApp priority", "Dedicated account managers"]
    },
    {
      icon: TrendingUp,
      title: "Investment Guidance",
      description: "Expert advice on property investment strategies, market trends, and ROI projections to help you make informed decisions.",
      features: ["Market analysis", "ROI projections", "Investment strategies", "Trend forecasting"]
    },
    {
      icon: Heart,
      title: "After-Sales Support",
      description: "Continued support after purchase including property management, development progress updates, and resale assistance.",
      features: ["Property management", "Progress tracking", "Resale assistance", "Maintenance coordination"]
    },
    {
      icon: Shield,
      title: "Competitive Pricing",
      description: "Direct from developers and landowners, ensuring the best prices. Flexible payment plans and financing options available.",
      features: ["Direct pricing", "Flexible payments", "No hidden fees", "Volume discounts"]
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Properties in developing areas with high appreciation potential. Close to infrastructure, schools, hospitals, and commercial centers.",
      features: ["High appreciation", "Infrastructure access", "Strategic locations", "Future development"]
    }
  ];

  return (
    <div>
      <Helmet>
        <title>Why Choose Ebutine Properties - Nigeria's Most Trusted Real Estate Company</title>
        <meta name="description" content="Discover why thousands of diaspora and local clients choose Ebutine Properties. 100% verified properties, 24/7 support, and proven track record in Lagos real estate." />
        <meta name="keywords" content="trusted real estate Nigeria, verified properties Lagos, diaspora real estate, reliable property company Nigeria" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-ebutine-dark to-ebutine-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Why Choose Ebutine Properties?</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Trusted by thousands of diaspora and local clients for verified, premium properties
          </p>
        </div>
      </section>

      {/* Verification Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional Property Verification" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <Badge className="bg-ebutine-orange text-white mb-4">100% Verified</Badge>
              <h2 className="text-4xl font-bold text-ebutine-dark mb-6">100% Verified Properties</h2>
              <p className="text-lg text-ebutine-blue mb-8">
                Every property in our portfolio undergoes rigorous verification. We check titles, 
                survey plans, government approvals, and physical inspections to ensure you invest 
                in legitimate properties with clear documentation.
              </p>
              
              <div className="space-y-6">
                {verificationSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <step.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-ebutine-dark mb-2">{step.title}</h4>
                      <p className="text-ebutine-blue">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-ebutine-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ebutine-dark mb-4">What Makes Us Different</h2>
            <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
              Comprehensive advantages that set us apart in the Nigerian real estate market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full" data-testid={`benefit-card-${index}`}>
                <CardContent className="p-8">
                  <div className="bg-ebutine-orange bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <benefit.icon className="h-8 w-8 text-ebutine-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-ebutine-dark mb-4">{benefit.title}</h3>
                  <p className="text-ebutine-blue mb-6">{benefit.description}</p>
                  
                  <div className="space-y-2">
                    {benefit.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-ebutine-blue">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-ebutine-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our track record speaks for itself - thousands of successful transactions across multiple countries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-ebutine-blue bg-opacity-20 rounded-2xl p-8" data-testid={`stat-${index}`}>
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-ebutine-orange mb-2">{stat.number}</div>
                <div className="text-white">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Advantages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ebutine-dark mb-4">Our Proven Process</h2>
            <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
              A streamlined, transparent process designed for maximum client satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                icon: Users,
                title: "Free Consultation",
                description: "Initial consultation to understand your requirements, budget, and investment goals. No hidden fees or obligations."
              },
              {
                step: "02",
                icon: Award,
                title: "Curated Selection",
                description: "Handpicked property recommendations based on your criteria and our expert market analysis."
              },
              {
                step: "03",
                icon: Shield,
                title: "Complete Verification",
                description: "Thorough verification of all documentation, legal checks, and physical inspection reports."
              },
              {
                step: "04",
                icon: Clock,
                title: "Ongoing Support",
                description: "Seamless transaction process with ongoing after-sales support and property management services."
              }
            ].map((step, index) => (
              <div key={index} className="text-center" data-testid={`process-step-${index}`}>
                <div className="bg-ebutine-orange text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <step.icon className="h-8 w-8 text-ebutine-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-ebutine-dark mb-4">{step.title}</h3>
                <p className="text-ebutine-blue">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-ebutine-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ebutine-dark mb-4">Client Success Stories</h2>
            <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
              Real testimonials from satisfied clients across Nigeria and the diaspora
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Adaora Okafor",
                location: "London, UK",
                content: "Ebutine Properties made buying land in Lagos so easy from London. They provided regular updates and excellent service.",
                rating: 5
              },
              {
                name: "Chinedu Asika", 
                location: "Toronto, Canada",
                content: "Professional, transparent, and reliable. My property has already appreciated significantly since purchase.",
                rating: 5
              },
              {
                name: "Funmi Adebayo",
                location: "Lagos, Nigeria", 
                content: "As a local investor, I was impressed by their integrity. They helped me acquire excellent rental properties.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow" data-testid={`testimonial-preview-${index}`}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                  <p className="text-ebutine-blue italic mb-4">"{testimonial.content}"</p>
                  <div>
                    <h4 className="font-semibold text-ebutine-dark">{testimonial.name}</h4>
                    <p className="text-sm text-ebutine-blue">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 ready-to-invest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied clients who have trusted Ebutine Properties with their real estate investments
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <Phone className="h-12 w-12 text-ebutine-orange mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-ebutine-dark">Call Us Now</h3>
              <a href="tel:+2349061461411" className="text-ebutine-blue hover:text-ebutine-orange">+234 906 146 1411</a>
            </div>
            <div className="flex flex-col items-center">
              <i className="fab fa-whatsapp text-5xl text-green-500 mb-4"></i>
              <h3 className="text-lg font-semibold mb-2 text-ebutine-dark">WhatsApp Chat</h3>
              <a href="https://wa.me/2349061461411" target="_blank" rel="noopener noreferrer" className="text-ebutine-blue hover:text-ebutine-orange">Start Conversation</a>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-12 w-12 text-ebutine-orange mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-ebutine-dark">Visit Our Office</h3>
              <p className="text-ebutine-blue">Greenland Estate, Lagos</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/contact">
              <Button size="lg" className="bg-ebutine-orange hover:bg-orange-600 text-white font-semibold py-4 px-8 text-lg">
                Get Free Consultation
              </Button>
            </Link>
            <Link href="/properties">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-ebutine-dark font-semibold py-4 px-8 text-lg">
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
