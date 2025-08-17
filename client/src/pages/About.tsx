import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Handshake, Shield, DollarSign, Headphones, Users, Award, Globe, Target } from "lucide-react";

export default function About() {
  return (
    <div>
      <Helmet>
        <title>About Ebutine Properties - Nigeria's Trusted Real Estate Partner</title>
        <meta name="description" content="Learn about Ebutine Properties, Nigeria's trusted real estate company serving diaspora and local clients. Our story, values, and commitment to verified properties." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-ebutine-dark to-ebutine-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Ebutine Properties</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Bridging the gap between diaspora investors and premium Nigerian real estate since 2016
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-ebutine-dark mb-6">Our Story</h2>
              <p className="text-lg text-ebutine-blue mb-6">
                Founded in 2016 with a vision to bridge the gap between diaspora investors and premium Nigerian real estate, 
                Ebutine Properties has grown from a small Lagos-based firm to Nigeria's most trusted real estate company 
                for international clients.
              </p>
              <p className="text-lg text-ebutine-blue mb-6">
                Our founder, recognizing the challenges faced by Nigerians living abroad who wanted to invest in 
                their homeland, established Ebutine Properties to provide transparent, reliable, and professional 
                real estate services that span continents.
              </p>
              <p className="text-lg text-ebutine-blue mb-8">
                Today, we have successfully facilitated over 5,000 property transactions, serving clients across 
                15 countries while maintaining our core values of integrity, transparency, and excellence.
              </p>
              
              <Link href="/contact">
                <Button className="bg-ebutine-orange hover:bg-orange-600 text-white font-semibold py-4 px-8 text-lg">
                  Start Your Journey
                </Button>
              </Link>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Ebutine Properties founding story" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-ebutine-orange text-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold">8+</h3>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-ebutine-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ebutine-dark mb-4">Our Core Values</h2>
            <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
              The principles that guide everything we do at Ebutine Properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Handshake,
                title: "Integrity",
                description: "We believe in transparent dealings and honest communication. Every transaction is conducted with the highest ethical standards."
              },
              {
                icon: Shield,
                title: "Verification",
                description: "All our properties undergo rigorous verification processes. We check titles, documentation, and legal compliance before listing."
              },
              {
                icon: DollarSign,
                title: "Affordability",
                description: "We work directly with developers and landowners to offer competitive pricing and flexible payment plans for our clients."
              },
              {
                icon: Headphones,
                title: "Support",
                description: "Our 24/7 support team ensures clients across different time zones receive assistance whenever they need it."
              }
            ].map((value, index) => (
              <Card key={index} className="hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center group border-2 border-transparent hover:border-ebutine-orange/20">
                <CardContent className="p-8">
                  <value.icon className="h-12 w-12 text-ebutine-orange mb-4 mx-auto group-hover:scale-110 group-hover:text-orange-600 transition-all duration-300" />
                  <h3 className="text-xl font-semibold text-ebutine-dark mb-4 group-hover:text-ebutine-orange transition-colors duration-300">{value.title}</h3>
                  <p className="text-ebutine-blue">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-ebutine-dark text-white">
              <CardContent className="p-12 text-center">
                <Target className="h-16 w-16 text-ebutine-orange mb-6 mx-auto" />
                <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                <p className="text-lg text-gray-300">
                  To democratize real estate investment in Nigeria by providing diaspora and local investors 
                  with access to verified, premium properties backed by transparent processes and exceptional service.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-ebutine-orange text-white">
              <CardContent className="p-12 text-center">
                <Globe className="h-16 w-16 text-white mb-6 mx-auto" />
                <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
                <p className="text-lg">
                  To become the leading bridge connecting global Nigerian diaspora with premium real estate 
                  opportunities in Nigeria, fostering economic growth and homecoming investments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-ebutine-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ebutine-dark mb-4">Our Achievements</h2>
            <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and client satisfaction
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5000+", label: "Properties Sold" },
              { number: "3500+", label: "Happy Clients" },
              { number: "15+", label: "Countries Served" },
              { number: "99%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-4xl font-bold text-ebutine-orange mb-2">{stat.number}</div>
                <div className="text-ebutine-blue font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-ebutine-dark mb-6">Why Clients Choose Us</h2>
          <p className="text-xl text-ebutine-blue mb-12 max-w-2xl mx-auto">
            Discover what makes Ebutine Properties the preferred choice for real estate investment in Nigeria
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Users,
                title: "Diaspora Focused",
                description: "Specialized services designed for overseas investors with remote transaction capabilities."
              },
              {
                icon: Award,
                title: "100% Verified",
                description: "Every property undergoes thorough verification including title checks and legal compliance."
              },
              {
                icon: Globe,
                title: "Global Support",
                description: "24/7 customer support across multiple time zones with WhatsApp, email, and phone assistance."
              }
            ].map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <benefit.icon className="h-12 w-12 text-ebutine-orange mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-ebutine-dark mb-4">{benefit.title}</h3>
                  <p className="text-ebutine-blue">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Link href="/why-choose-us">
            <Button className="bg-ebutine-blue hover:bg-gray-600 text-white font-semibold py-4 px-8 text-lg">
              Learn More About Us
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-ebutine-orange to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who have trusted Ebutine Properties with their real estate investments
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/contact">
              <Button size="lg" className="bg-ebutine-orange hover:bg-orange-600 text-white font-semibold py-4 px-8 text-lg">
                Get Started Today
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
