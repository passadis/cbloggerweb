
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const TagInput = ({ tags, onAddTag, onRemoveTag }: TagInputProps) => {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      onAddTag(newTag);
      setNewTag("");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mt-2 mb-4">
        {tags.map(tag => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1 py-1 px-3">
            {tag}
            <button type="button" onClick={() => onRemoveTag(tag)} className="ml-1">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Input 
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add a tag"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTag();
            }
          }}
        />
        <Button type="button" onClick={handleAddTag} variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TagInput;
