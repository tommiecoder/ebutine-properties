import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Handshake,
  Shield,
  DollarSign,
  Headphones,
  Users,
  Award,
  Globe,
  Target,
  TrendingUp,
} from "lucide-react";

export default function About() {
  return (
    <div>
      <Helmet>
        <title>
          About Ebutine Properties - Nigeria's Trusted Real Estate Partner
        </title>
        <meta
          name="description"
          content="Learn about Ebutine Properties, Nigeria's trusted real estate company serving diaspora and local clients. Our story, values, and commitment to verified properties."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-ebutine-dark to-ebutine-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Ebutine Properties
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Empowering Nigerians worldwide with genuine, verified, and
            profitable real estate investments
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-ebutine-dark mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-ebutine-blue mb-6">
                At Ebutine Properties, we help Nigerians at home and in the
                Diaspora acquire safe, profitable and verified real estate
                investments. We specialize in both Residential and Commercial
                properties across prime locations in Nigeria.
              </p>
              <p className="text-lg text-ebutine-blue mb-6">
                We understand the challenges Nigerians abroad face when
                investing in back home. The lack of trust, transparency, and the
                fear of being defrauded of their hard earned money. To solve
                these problems, Ebutine Properties was incorporated. Our company
                is built on three core values: Trust, Integrity, and
                Professionalism. With a dedicated team and verified properties,
                we ensure that every transaction is transparent, easy, and
                rewarding.
              </p>
              <p className="text-lg text-ebutine-blue mb-6">
                Whether you're looking to build your dream home, expand your
                investment portfolio, or secure land for future growth, we're
                here to guide you all the way through - from selecting the right
                property to documentations.
              </p>
              <p className="text-lg text-ebutine-blue mb-8">
                With satisfied clients across the United Kingdom, United States,
                Canada, Australia, China and beyond, we take pride in connecting
                Nigerians worldwide to safe and profitable real estate
                investments in Nigeria.
              </p>

              <Link href="/contact">
                <Button className="bg-ebutine-orange hover:bg-orange-600 text-white font-semibold py-4 px-8 text-lg">
                  Start Your Journey
                </Button>
              </Link>
            </div>

            <div className="relative">
              <img
                src="/founder-augustine.jpg"
                alt="Mr. Augustine Akunechendo - Founder & CEO of Ebutine Properties"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="relative pb-20">
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-ebutine-dark">
                    Mr. Augustine E. Akunechendo
                  </h3>
                  <p className="text-lg text-ebutine-orange font-semibold">
                    Founder & CEO
                  </p>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-ebutine-orange text-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold">Global</h3>
                  <p className="text-sm">Reach & Trust</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-ebutine-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ebutine-dark mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
              Our company is built on three core values that guide everything we
              do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Handshake,
                title: "Trust",
                description:
                  "We build lasting relationships with our clients through transparency, honesty, and reliable service delivery at every step of the investment process.",
              },
              {
                icon: Shield,
                title: "Integrity",
                description:
                  "Every property we offer undergoes rigorous verification. We maintain the highest ethical standards in all our dealings and transactions.",
              },
              {
                icon: Award,
                title: "Professionalism",
                description:
                  "Our dedicated team provides expert guidance, comprehensive support, and professional service from property selection to documentation completion.",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center group border-2 border-transparent hover:border-ebutine-orange/20"
              >
                <CardContent className="p-8">
                  <value.icon className="h-12 w-12 text-ebutine-orange mb-4 mx-auto group-hover:scale-110 group-hover:text-orange-600 transition-all duration-300" />
                  <h3 className="text-xl font-semibold text-ebutine-dark mb-4 group-hover:text-ebutine-orange transition-colors duration-300">
                    {value.title}
                  </h3>
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
                  To empower Nigerians at home and in the Diaspora with genuine,
                  verified, and profitable real estate investment opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-ebutine-orange text-white">
              <CardContent className="p-12 text-center">
                <Globe className="h-16 w-16 text-white mb-6 mx-auto" />
                <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
                <p className="text-lg">
                  To be the most trusted and the number one real estate company
                  for Nigerians worldwide, by providing them with genuine,
                  verified, and profitable real estate investment opportunities,
                  for wealth creation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-20 bg-ebutine-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ebutine-dark mb-4">
              Global Reach
            </h2>
            <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
              With satisfied clients across multiple continents, we take pride
              in connecting Nigerians worldwide to safe and profitable real
              estate investments
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              "United Kingdom",
              "United States",
              "Canada",
              "Australia",
              "China",
              "Nigeria",
            ].map((country, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-ebutine-orange font-semibold text-lg mb-2">
                  {country}
                </div>
                <div className="text-ebutine-blue text-sm">
                  Satisfied Clients
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wealth Building Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-ebutine-dark mb-6">
            Beyond Property Sales
          </h2>
          <p className="text-xl text-ebutine-blue mb-12 max-w-3xl mx-auto">
            At Ebutine Properties, we don't just sell properties, we help you
            BUILD WEALTH, MULTIPLY WEALTH AND SUSTAIN WEALTH.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: DollarSign,
                title: "BUILD WEALTH",
                description:
                  "Start your wealth creation journey with strategic real estate investments in prime Nigerian locations.",
              },
              {
                icon: TrendingUp,
                title: "MULTIPLY WEALTH",
                description:
                  "Grow your investment portfolio through carefully selected properties with high appreciation potential.",
              },
              {
                icon: Shield,
                title: "SUSTAIN WEALTH",
                description:
                  "Maintain and protect your investments with our comprehensive property management and advisory services.",
              },
            ].map((philosophy, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow bg-gradient-to-br from-ebutine-orange/5 to-ebutine-blue/5"
              >
                <CardContent className="p-8 text-center">
                  <philosophy.icon className="h-12 w-12 text-ebutine-orange mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-ebutine-dark mb-4">
                    {philosophy.title}
                  </h3>
                  <p className="text-ebutine-blue">{philosophy.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Link href="/properties">
            <Button className="bg-ebutine-blue hover:bg-gray-600 text-white font-semibold py-4 px-8 text-lg">
              Explore Investment Opportunities
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us Preview */}
      <section className="py-20 bg-ebutine-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-ebutine-dark mb-6">
            Why Clients Choose Us
          </h2>
          <p className="text-xl text-ebutine-blue mb-12 max-w-2xl mx-auto">
            Discover what makes Ebutine Properties the preferred choice for real
            estate investment in Nigeria
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Users,
                title: "Diaspora Focused",
                description:
                  "Specialized services designed for overseas investors with remote transaction capabilities and dedicated support.",
              },
              {
                icon: Shield,
                title: "100% Verified",
                description:
                  "Every property undergoes thorough verification including title checks, documentation review, and legal compliance.",
              },
              {
                icon: Headphones,
                title: "Global Support",
                description:
                  "24/7 customer support across multiple time zones with WhatsApp, email, and phone assistance in multiple languages.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <benefit.icon className="h-12 w-12 text-ebutine-orange mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-ebutine-dark mb-4">
                    {benefit.title}
                  </h3>
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
      <section className="py-20 ready-to-invest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Wealth Building Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients worldwide who have trusted
            Ebutine Properties with their real estate investments
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-ebutine-orange hover:bg-orange-600 text-white font-semibold py-4 px-8 text-lg"
              >
                Get Started Today
              </Button>
            </Link>
            <Link href="/properties">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-ebutine-dark text-ebutine-dark hover:bg-ebutine-dark hover:text-white font-semibold py-4 px-8 text-lg"
              >
                View Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
