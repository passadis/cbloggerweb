
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PostStatusToggleProps {
  isPublished: boolean;
  onChange: (isPublished: boolean) => void;
}

const PostStatusToggle = ({ isPublished, onChange }: PostStatusToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="status"
        checked={isPublished}
        onCheckedChange={onChange}
      />
      <Label htmlFor="status">
        {isPublished ? 'Publish immediately' : 'Save as draft'}
      </Label>
    </div>
  );
};

export default PostStatusToggle;
