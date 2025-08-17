import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Home, Building2, Crown, Wrench, TrendingUp, FileText, Calculator, CheckCircle } from "lucide-react";

export default function Services() {
  return (
    <div>
      <Helmet>
        <title>Real Estate Services - Ebutine Properties | Lagos Nigeria</title>
        <meta name="description" content="Comprehensive real estate services in Lagos, Nigeria. Residential land, commercial properties, luxury homes, property management and development services." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-ebutine-dark to-ebutine-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Comprehensive real estate solutions tailored for both local and diaspora clients
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ebutine-dark mb-4">Core Services</h2>
            <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
              End-to-end real estate solutions designed to meet your investment goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Service 1 - Residential Land */}
            <Card className="hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-ebutine-orange/20 group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-ebutine-orange/10 to-ebutine-orange/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Home className="h-8 w-8 text-ebutine-orange group-hover:animate-pulse" />
                </div>
                <h3 className="text-2xl font-semibold text-ebutine-dark mb-4">Residential Land</h3>
                <p className="text-ebutine-blue mb-6">
                  Premium residential plots in developed estates with full infrastructure and verified documentation. 
                  Perfect for building your dream home or long-term investment.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Complete title verification and documentation",
                    "Survey plans and government allocation papers", 
                    "Infrastructure-ready plots with utilities",
                    "Flexible payment plans available",
                    "After-sales support and development guidance"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-ebutine-blue">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-ebutine-orange hover:bg-orange-600 text-white">
                  View Residential Properties
                </Button>
              </CardContent>
            </Card>

            {/* Service 2 - Commercial Land */}
            <Card className="hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-ebutine-orange/20 group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-8 w-8 text-blue-600 group-hover:animate-pulse" />
                </div>
                <h3 className="text-2xl font-semibold text-ebutine-dark mb-4">Commercial Land</h3>
                <p className="text-ebutine-blue mb-6">
                  Strategic commercial properties in high-traffic areas perfect for business investments. 
                  Ideal for retail, office buildings, or mixed-use developments.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Prime locations with high foot traffic",
                    "Commercial permits and zoning approvals",
                    "Investment analysis and ROI projections",
                    "Business district and shopping center opportunities",
                    "Legal support for commercial transactions"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-ebutine-blue">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-ebutine-orange hover:bg-orange-600 text-white">
                  View Commercial Properties
                </Button>
              </CardContent>
            </Card>

            {/* Service 3 - Luxury Homes */}
            <Card className="hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-ebutine-orange/20 group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Crown className="h-8 w-8 text-yellow-600 group-hover:animate-pulse" />
                </div>
                <h3 className="text-2xl font-semibold text-ebutine-dark mb-4">Luxury Homes</h3>
                <p className="text-ebutine-blue mb-6">
                  Exquisite luxury homes and penthouses in exclusive neighborhoods across Lagos. 
                  Ready-to-move properties with premium finishes and world-class amenities.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Premium finishes and modern architecture",
                    "24/7 security and estate management",
                    "Swimming pools, gyms, and recreational facilities",
                    "Exclusive neighborhoods and gated communities",
                    "Turnkey properties ready for immediate occupancy"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-ebutine-blue">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-ebutine-orange hover:bg-orange-600 text-white">
                  View Luxury Homes
                </Button>
              </CardContent>
            </Card>

            {/* Service 4 - Property Management */}
            <Card className="hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-ebutine-orange/20 group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Wrench className="h-8 w-8 text-green-600 group-hover:animate-pulse" />
                </div>
                <h3 className="text-2xl font-semibold text-ebutine-dark mb-4">Property Management</h3>
                <p className="text-ebutine-blue mb-6">
                  Complete property management services for diaspora investors who need hands-off solutions. 
                  We handle everything from tenant screening to maintenance and rent collection.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Tenant screening and lease management",
                    "Monthly rent collection and remittance",
                    "Property maintenance and repairs",
                    "Regular property inspections and reports",
                    "24/7 emergency response and support"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-ebutine-blue">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-ebutine-orange hover:bg-orange-600 text-white">
                  Learn About Management
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-ebutine-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ebutine-dark mb-4">Additional Services</h2>
            <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
              Comprehensive support services to ensure your real estate success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Property Development",
                description: "Custom development projects from concept to completion. We work with experienced architects and contractors to bring your vision to life.",
                features: ["Architectural design", "Construction management", "Project timeline monitoring", "Quality assurance"],
                color: "from-purple-500/10 to-purple-600/20",
                iconColor: "text-purple-600"
              },
              {
                icon: FileText,
                title: "Legal Support",
                description: "Complete legal documentation and title processing services. Our legal team ensures all transactions are compliant and secure.",
                features: ["Title verification", "Contract preparation", "Due diligence", "Registration assistance"],
                color: "from-red-500/10 to-red-600/20",
                iconColor: "text-red-600"
              },
              {
                icon: Calculator,
                title: "Investment Advisory",
                description: "Expert guidance on real estate investment strategies and market analysis. Make informed decisions with our professional insights.",
                features: ["Market analysis", "ROI calculations", "Investment strategies", "Portfolio planning"],
                color: "from-indigo-500/10 to-indigo-600/20",
                iconColor: "text-indigo-600"
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:border-ebutine-orange/20 group">
                <CardContent className="p-8 text-center">
                  <div className={`bg-gradient-to-br ${service.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`h-8 w-8 ${service.iconColor} group-hover:animate-pulse`} />
                  </div>
                  <h3 className="text-xl font-semibold text-ebutine-dark mb-4">{service.title}</h3>
                  <p className="text-ebutine-blue mb-6">{service.description}</p>
                  <ul className="space-y-2 text-sm text-ebutine-blue text-left">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ebutine-dark mb-4">Our Service Process</h2>
            <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
              A streamlined process designed for diaspora and local clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Initial consultation to understand your requirements, budget, and investment goals."
              },
              {
                step: "02", 
                title: "Property Selection",
                description: "Curated property recommendations based on your criteria and expert market analysis."
              },
              {
                step: "03",
                title: "Verification & Due Diligence", 
                description: "Thorough verification of all documentation, legal checks, and physical inspection."
              },
              {
                step: "04",
                title: "Transaction & Support",
                description: "Seamless transaction process with ongoing after-sales support and property management."
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-ebutine-orange to-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-ebutine-dark mb-4">{step.title}</h3>
                <p className="text-ebutine-blue">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-ebutine-orange to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our experts today to discuss your real estate needs and start your investment journey
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/contact">
              <Button size="lg" className="bg-ebutine-orange hover:bg-orange-600 text-white font-semibold py-4 px-8 text-lg">
                Book Free Consultation
              </Button>
            </Link>
            <Link href="/properties">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-ebutine-dark font-semibold py-4 px-8 text-lg">
                View Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
