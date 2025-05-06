
import { Label } from "@/components/ui/label";

interface PostStatusToggleProps {
  isPublished: boolean;
  onChange: (isPublished: boolean) => void;
}

const PostStatusToggle = ({ isPublished, onChange }: PostStatusToggleProps) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="status"
        checked={isPublished}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <Label htmlFor="status" className="ml-2">
        Publish immediately
      </Label>
    </div>
  );
};

export default PostStatusToggle;
