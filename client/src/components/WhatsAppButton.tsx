export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a 
        href="https://wa.me/2349061461411" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
        data-testid="whatsapp-floating-button"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
      </a>
    </div>
  );
}
