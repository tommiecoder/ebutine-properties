import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Adaora Okafor",
    location: "London, UK",
    content: "Ebutine Properties made buying land in Lagos so easy from London. They provided regular updates, verified documentation, and excellent customer service. I highly recommend them to any diaspora investor.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    rating: 5,
  },
  {
    id: 2,
    name: "Chinedu Asika",
    location: "Toronto, Canada",
    content: "I purchased a luxury home through Ebutine Properties while living in Canada. The entire process was transparent, and they handled all the paperwork. My property has already appreciated significantly.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    rating: 5,
  },
  {
    id: 3,
    name: "Funmi Adebayo",
    location: "Lagos, Nigeria",
    content: "As a local investor, I was impressed by Ebutine's professionalism and integrity. They helped me acquire three commercial properties that are now generating excellent rental income. Truly trustworthy!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-ebutine-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-ebutine-dark mb-4">What Our Clients Say</h2>
          <p className="text-xl text-ebutine-blue max-w-2xl mx-auto">
            Real testimonials from satisfied clients across Nigeria and the diaspora
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="testimonials-grid">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-2xl transition-shadow" data-testid={`testimonial-${testimonial.id}`}>
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={`${testimonial.name} testimonial`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-ebutine-dark" data-testid={`testimonial-name-${testimonial.id}`}>
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-ebutine-blue" data-testid={`testimonial-location-${testimonial.id}`}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex mb-4" data-testid={`testimonial-rating-${testimonial.id}`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-ebutine-blue italic" data-testid={`testimonial-content-${testimonial.id}`}>
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
