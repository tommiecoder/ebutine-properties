
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
          {videos.map((videoUrl, index) => (
            <div key={index} className="w-full">
              <video 
                controls 
                className="w-full h-auto max-h-96 rounded-lg"
                preload="metadata"
                playsInline
                muted
                poster=""
                style={{ backgroundColor: '#f3f4f6' }}
              >
                <source src={videoUrl} type="video/mp4" />
                <source src={videoUrl} type="video/webm" />
                <source src={videoUrl} type="video/ogg" />
                Your browser does not support the video tag.
              </video>
              {videos.length > 1 && (
                <p className="text-sm text-gray-600 mt-2">
                  Video {index + 1} of {videos.length}
                </p>
              )}
              <div className="text-xs text-gray-500 mt-1">
                Loading optimized for your connection...
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
