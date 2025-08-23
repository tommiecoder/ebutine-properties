
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PropertyVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: string[];
  propertyTitle: string;
}

export default function PropertyVideoModal({ 
  isOpen, 
  onClose, 
  videos, 
  propertyTitle 
}: PropertyVideoModalProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{propertyTitle} - Property Videos</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          {videos.map((videoUrl, index) => {
            // Ensure proper video URL format
            const fullVideoUrl = videoUrl.startsWith('http') ? videoUrl : `${window.location.origin}${videoUrl}`;
            
            return (
              <div key={index} className="w-full">
                <video 
                  controls 
                  className="w-full h-auto max-h-96 rounded-lg"
                  preload="none"
                  playsInline
                  muted
                  controlsList="nodownload"
                  style={{ backgroundColor: '#f3f4f6' }}
                  onLoadStart={() => console.log('Video loading started:', fullVideoUrl)}
                  onCanPlay={() => console.log('Video can play:', fullVideoUrl)}
                  onError={(e) => console.error('Video error:', e, fullVideoUrl)}
                >
                  <source src={fullVideoUrl} type="video/mp4" />
                  <source src={fullVideoUrl.replace('.mp4', '.webm')} type="video/webm" />
                  <p className="p-4 text-center text-gray-500">
                    Your browser does not support the video tag. 
                    <a href={fullVideoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline ml-1">
                      Download video instead
                    </a>
                  </p>
                </video>
                {videos.length > 1 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Video {index + 1} of {videos.length}
                  </p>
                )}
                <div className="text-xs text-gray-500 mt-1 flex items-center justify-between">
                  <span>Optimized for fast loading</span>
                  <a 
                    href={fullVideoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    Open in new tab
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
