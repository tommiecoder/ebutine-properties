import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { Send } from "lucide-react";

export default function ContactForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      propertyType: "",
      budget: "",
      purpose: "",
      message: "",
      contactMethod: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your inquiry. We will contact you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error) => {
      toast({
        title: "Error Sending Message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const onSubmit = (data: InsertContact) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-ebutine-dark mb-8">Send us a Message</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} data-testid="input-full-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} data-testid="input-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+234 xxx xxx xxxx" {...field} data-testid="input-phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                    <FormControl>
                      <SelectTrigger data-testid="select-location">
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Nigeria">Nigeria</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Investment Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type Interest</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                    <FormControl>
                      <SelectTrigger data-testid="select-property-type">
                        <SelectValue placeholder="Select Property Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="residential_land">Residential Land</SelectItem>
                      <SelectItem value="commercial_land">Commercial Land</SelectItem>
                      <SelectItem value="luxury_home">Luxury Homes</SelectItem>
                      <SelectItem value="mixed">Mixed Portfolio</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Range</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                    <FormControl>
                      <SelectTrigger data-testid="select-budget">
                        <SelectValue placeholder="Select Budget Range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="5-15">₦5M - ₦15M</SelectItem>
                      <SelectItem value="15-30">₦15M - ₦30M</SelectItem>
                      <SelectItem value="30-50">₦30M - ₦50M</SelectItem>
                      <SelectItem value="50-100">₦50M - ₦100M</SelectItem>
                      <SelectItem value="100+">₦100M+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investment Purpose</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                  <FormControl>
                    <SelectTrigger data-testid="select-purpose">
                      <SelectValue placeholder="Select Purpose" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="personal">Personal Use / Relocation</SelectItem>
                    <SelectItem value="investment">Investment / Capital Appreciation</SelectItem>
                    <SelectItem value="rental">Rental Income Generation</SelectItem>
                    <SelectItem value="development">Property Development</SelectItem>
                    <SelectItem value="portfolio">Portfolio Diversification</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your property requirements, questions, or how we can help you..."
                    rows={5}
                    {...field}
                    value={field.value || ""}
                    data-testid="textarea-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Preferred Contact Method */}
          <FormField
            control={form.control}
            name="contactMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Contact Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value || ""}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    data-testid="radio-contact-method"
                  >
                    <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg">
                      <RadioGroupItem value="email" id="email" />
                      <label htmlFor="email" className="text-ebutine-blue cursor-pointer">Email</label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg">
                      <RadioGroupItem value="phone" id="phone" />
                      <label htmlFor="phone" className="text-ebutine-blue cursor-pointer">Phone Call</label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg">
                      <RadioGroupItem value="whatsapp" id="whatsapp" />
                      <label htmlFor="whatsapp" className="text-ebutine-blue cursor-pointer">WhatsApp</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-ebutine-orange hover:bg-orange-600 text-white font-semibold py-4 px-6"
            disabled={mutation.isPending}
            data-testid="submit-contact-form"
          >
            {mutation.isPending ? (
              "Sending..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>

          <p className="text-xs text-ebutine-blue text-center">
            By submitting this form, you agree to our privacy policy and consent to be contacted by Ebutine Properties.
          </p>
        </form>
      </Form>
    </div>
  );
}
