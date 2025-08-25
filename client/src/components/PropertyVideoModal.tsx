
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ExternalLink } from "lucide-react";

interface ExternalVideo {
  url: string;
  platform: 'youtube' | 'instagram' | 'vimeo' | 'facebook' | 'tiktok' | 'other';
  title?: string;
  thumbnail?: string;
}

interface EmbedCode {
  embedCode: string;
  title?: string;
  platform?: string;
}

interface PropertyVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: string[];
  externalVideos?: ExternalVideo[];
  embedCodes?: EmbedCode[];
  propertyTitle: string;
}

export default function PropertyVideoModal({ 
  isOpen, 
  onClose, 
  videos, 
  externalVideos = [],
  embedCodes = [],
  propertyTitle 
}: PropertyVideoModalProps) {
  if (!videos?.length && !externalVideos?.length && !embedCodes?.length) return null;

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}` : null;
  };

  const getVimeoEmbedUrl = (url: string) => {
    const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
    return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1` : null;
  };

  const renderEmbedCode = (embed: EmbedCode, index: number) => {
    return (
      <div key={`embed-${index}`} className="w-full">
        <h4 className="font-medium mb-2">
          {embed.title || `${embed.platform || 'Video'} ${index + 1}`}
        </h4>
        <div 
          className="w-full rounded-lg overflow-hidden"
          dangerouslySetInnerHTML={{ __html: embed.embedCode }}
        />
      </div>
    );
  };

  const renderExternalVideo = (video: ExternalVideo, index: number) => {
    switch (video.platform) {
      case 'youtube':
        const youtubeEmbedUrl = getYouTubeEmbedUrl(video.url);
        if (youtubeEmbedUrl) {
          return (
            <div key={`external-${index}`} className="w-full">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{video.title || 'YouTube Video'}</h4>
                <a 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <iframe
                src={youtubeEmbedUrl}
                className="w-full h-64 md:h-80 rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          );
        }
        break;

      case 'vimeo':
        const vimeoEmbedUrl = getVimeoEmbedUrl(video.url);
        if (vimeoEmbedUrl) {
          return (
            <div key={`external-${index}`} className="w-full">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{video.title || 'Vimeo Video'}</h4>
                <a 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <iframe
                src={vimeoEmbedUrl}
                className="w-full h-64 md:h-80 rounded-lg"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          );
        }
        break;

      case 'instagram':
        return (
          <div key={`external-${index}`} className="w-full">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{video.title || 'Instagram Video'}</h4>
              <a 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            {/* Check if we have embed code in the URL field or render the embed */}
            {video.url.includes('blockquote') ? (
              <div 
                className="instagram-embed-container"
                dangerouslySetInnerHTML={{ __html: video.url }}
              />
            ) : (
              <>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <p className="text-gray-600 mb-4">Click to view Instagram content</p>
                  <Button 
                    onClick={() => window.open(video.url, '_blank')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    View on Instagram
                  </Button>
                </div>
                {/* Try to render as embedded iframe for regular Instagram URLs */}
                <div className="mt-4">
                  <iframe
                    src={`${video.url}embed/`}
                    className="w-full h-96 rounded-lg border-0"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                  />
                </div>
              </>
            )}
          </div>
        );

      default:
        return (
          <div key={`external-${index}`} className="w-full">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{video.title || 'External Video'}</h4>
              <a 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-gray-600 mb-4">External video content</p>
              <Button 
                onClick={() => window.open(video.url, '_blank')}
                variant="outline"
              >
                View External Content
              </Button>
            </div>
          </div>
        );
    }
  };

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
        
        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Embed Codes */}
          {embedCodes.map((embed, index) => renderEmbedCode(embed, index))}
          
          {/* External Videos */}
          {externalVideos.map((video, index) => renderExternalVideo(video, index))}
          
          {/* Local Videos */}
          {videos.map((videoUrl, index) => {
            const fullVideoUrl = videoUrl.startsWith('http') ? videoUrl : `${window.location.origin}${videoUrl}`;
            
            return (
              <div key={`local-${index}`} className="w-full">
                <h4 className="font-medium mb-2">Local Video {index + 1}</h4>
                <video 
                  controls 
                  autoPlay
                  className="w-full h-auto max-h-96 rounded-lg"
                  preload="metadata"
                  playsInline
                  muted
                  loop
                  controlsList="nodownload"
                  style={{ backgroundColor: '#f3f4f6' }}
                  onError={(e) => {
                    console.error('Video error:', e);
                    e.currentTarget.style.display = 'none';
                  }}
                >
                  <source src={fullVideoUrl} />
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
