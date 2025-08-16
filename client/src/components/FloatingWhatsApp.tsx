import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingWhatsApp() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Expanded Chat Options */}
      {isExpanded && (
        <div className="glass rounded-2xl p-4 shadow-ebutine max-w-sm transform animate-fade-in-up">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-ebutine-dark">Chat with us!</h4>
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-ebutine-blue hover:text-ebutine-orange transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-ebutine-blue mb-4">
            Get instant responses to your property inquiries. We're available 24/7!
          </p>
          <div className="space-y-2">
            <a 
              href="https://wa.me/2349061461411?text=Hi! I'm interested in your properties" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white text-sm">
                <i className="fab fa-whatsapp mr-2"></i>General Inquiry
              </Button>
            </a>
            <a 
              href="https://wa.me/2349061461411?text=Hi! I need urgent assistance with my property matter" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white text-sm">
                <i className="fab fa-whatsapp mr-2"></i>Urgent Support
              </Button>
            </a>
            <a 
              href="https://wa.me/2349061461411?text=Hi! I'd like to schedule a consultation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button className="w-full bg-ebutine-blue hover:bg-ebutine-blue-dark text-white text-sm">
                <i className="fab fa-whatsapp mr-2"></i>Book Consultation
              </Button>
            </a>
          </div>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <div className="relative group">
        {/* Pulse Animation Ring */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75 group-hover:opacity-0 transition-opacity"></div>
        
        {/* Main Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all-smooth transform hover:scale-110 flex items-center justify-center group"
          data-testid="floating-whatsapp-button"
        >
          <i className="fab fa-whatsapp text-2xl"></i>
          
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce">
            !
          </div>
        </button>

        {/* Tooltip */}
        {!isExpanded && (
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-ebutine-dark text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
              Chat with us on WhatsApp
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-ebutine-dark"></div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Chat Messages */}
      <div className="absolute right-20 bottom-0 space-y-2 pointer-events-none">
        <div className="bg-white rounded-lg px-3 py-2 shadow-lg animate-bounce opacity-80 text-sm" style={{animationDelay: '2s', animationDuration: '2s'}}>
          💬 Need help? Chat with us!
        </div>
      </div>
    </div>
  );
}