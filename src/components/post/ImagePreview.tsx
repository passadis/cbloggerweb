
import { Card, CardContent } from "@/components/ui/card";

interface ImagePreviewProps {
  imageUrl: string;
}

const ImagePreview = ({ imageUrl }: ImagePreviewProps) => {
  if (!imageUrl) return null;
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="font-medium mb-2">Featured Image Preview</div>
        <div className="aspect-video rounded-md overflow-hidden bg-muted">
          <img 
            src={imageUrl} 
            alt="Featured" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/600x400?text=Image+not+found";
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagePreview;
