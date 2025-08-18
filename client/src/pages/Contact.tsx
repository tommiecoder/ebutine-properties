import { Helmet } from "react-helmet";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <div>
      <Helmet>
        <title>Contact Ebutine Properties - Real Estate Experts in Lagos, Nigeria</title>
        <meta name="description" content="Contact Ebutine Properties for verified real estate in Lagos. Office in Greenland Estate, Sangotedo. Call +234 906 146 1411 or WhatsApp for instant response." />
        <meta name="keywords" content="contact Ebutine Properties, real estate Lagos contact, property agents Nigeria, Greenland Estate Sangotedo" />
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent", 
            "name": "Ebutine Properties",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "House No 2, Road 4, Greenland Estate, Olokonla",
              "addressLocality": "Sangotedo Ajah",
              "addressRegion": "Lagos",
              "addressCountry": "Nigeria"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "6.4474",
              "longitude": "3.5074"
            },
            "telephone": "+2349061461411",
            "email": "ebutineproperties@gmail.com",
            "openingHours": ["Mo-Fr 08:00-18:00", "Sa 09:00-16:00"],
            "areaServed": "Lagos, Nigeria"
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-ebutine-dark to-ebutine-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Ready to invest in Nigerian real estate? Get in touch with our experts today
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-ebutine-dark mb-8">Get In Touch</h2>
              
              {/* Contact Methods */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-ebutine-orange bg-opacity-10 p-3 rounded-lg mr-4">
                    <i className="fas fa-building text-2xl text-ebutine-orange"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-ebutine-dark mb-1">Office Address</h4>
                    <p className="text-ebutine-blue">
                      House No 2, Road 4,<br />
                      Greenland Estate, Olokonla<br />
                      Sangotedo Ajah, Lagos, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-ebutine-orange bg-opacity-10 p-3 rounded-lg mr-4">
                    <i className="fas fa-phone text-2xl text-ebutine-orange"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-ebutine-dark mb-1">Phone</h4>
                    <p className="text-ebutine-blue">
                      <a 
                        href="tel:+2349061461411" 
                        className="hover:text-ebutine-orange transition-colors"
                        data-testid="contact-phone-link"
                      >
                        +234 906 146 1411
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-ebutine-orange bg-opacity-10 p-3 rounded-lg mr-4">
                    <i className="fas fa-envelope text-2xl text-ebutine-orange"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-ebutine-dark mb-1">Email</h4>
                    <p className="text-ebutine-blue">
                      <a 
                        href="mailto:ebutineproperties@gmail.com" 
                        className="hover:text-ebutine-orange transition-colors"
                        data-testid="contact-email-link"
                      >
                        ebutineproperties@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-500 bg-opacity-10 p-3 rounded-lg mr-4">
                    <i className="fab fa-whatsapp text-green-500 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-ebutine-dark mb-1">WhatsApp</h4>
                    <p className="text-ebutine-blue">
                      <a 
                        href="https://wa.me/2349061461411" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-green-500 transition-colors"
                        data-testid="contact-whatsapp-link"
                      >
                        Chat with us instantly
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="space-y-4 mb-8">
                <a 
                  href="https://wa.me/2349061461411" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full"
                  data-testid="contact-whatsapp-button"
                >
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6">
                    <i className="fab fa-whatsapp mr-2"></i>Start WhatsApp Chat
                  </Button>
                </a>
                <a href="tel:+2349061461411" className="block w-full" data-testid="contact-call-button">
                  <Button variant="outline" className="w-full border-2 border-ebutine-orange text-ebutine-orange hover:bg-ebutine-orange hover:text-white font-semibold py-4 px-6">
                    <Phone className="mr-2 h-4 w-4" />Call Now
                  </Button>
                </a>
              </div>

              {/* Office Hours */}
              <Card className="bg-ebutine-light">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-ebutine-dark mb-4 flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Office Hours
                  </h4>
                  <div className="space-y-2 text-sm text-ebutine-blue">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                    <p className="text-xs text-ebutine-blue mt-3 italic">
                      *WhatsApp support available 24/7 for diaspora clients across all time zones
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-ebutine-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ebutine-dark mb-4">Visit Our Office</h2>
            <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
              Located in the heart of Greenland Estate, Sangotedo Ajah, Lagos
            </p>
          </div>
          
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5947829345567!2d3.5074!3d6.4474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf730a3e9e4e3%3A0x6c8c8c8c8c8c8c8c!2sGreenland%20Estate%2C%20Sangotedo%20Ajah%2C%20Lagos!5e0!3m2!1sen!2sng!4v1"
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="Ebutine Properties Office Location - Greenland Estate, Sangotedo Ajah, Lagos"
              data-testid="office-map"
            />
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-ebutine-blue mb-4">
              Can't make it to our office? No problem! We offer virtual consultations for all our diaspora clients.
            </p>
            <Button className="bg-ebutine-orange hover:bg-orange-600 text-white">
              <a href="https://wa.me/2349061461411?text=Hi, I'd like to schedule a virtual consultation" target="_blank" rel="noopener noreferrer">
                Schedule Virtual Meeting
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-ebutine-dark mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
              Quick answers to common questions from our clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How quickly can you respond to inquiries?",
                answer: "We typically respond to WhatsApp messages within 15 minutes during business hours and within 2 hours outside business hours. Email inquiries are answered within 4 hours."
              },
              {
                question: "Do you assist diaspora clients with remote transactions?",
                answer: "Yes! We specialize in helping diaspora clients complete property transactions remotely. We handle all documentation, verification, and legal processes on your behalf."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept bank transfers (both local and international), Western Union, MoneyGram, and cryptocurrency payments. Flexible payment plans are available."
              },
              {
                question: "Do you provide property management services?",
                answer: "Yes, we offer comprehensive property management services including tenant screening, rent collection, maintenance, and regular property reports for diaspora investors."
              }
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow" data-testid={`faq-${index}`}>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-ebutine-dark mb-3">{faq.question}</h4>
                  <p className="text-ebutine-blue">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-gradient-to-br from-ebutine-orange to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Immediate Assistance?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            For urgent property matters or emergency support, contact us immediately
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="tel:+2349061461411" data-testid="emergency-call-button">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 text-lg">
                <Phone className="mr-2 h-5 w-5" />Emergency Call
              </Button>
            </a>
            <a 
              href="https://wa.me/2349061461411?text=URGENT: I need immediate assistance with my property matter" 
              target="_blank" 
              rel="noopener noreferrer"
              data-testid="emergency-whatsapp-button"
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 text-lg">
                <i className="fab fa-whatsapp mr-2"></i>Emergency WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
