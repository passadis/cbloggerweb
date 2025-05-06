
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { postService } from "@/services/post";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  const [categories, setCategories] = useState<string[]>(["Azure", "Microsoft 365", "DevOps"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await postService.getPostCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCategories();
  }, []);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full mt-1">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {loading ? (
          <SelectItem value="loading" disabled>Loading categories...</SelectItem>
        ) : (
          categories.map(category => (
            <SelectItem key={category} value={category}>{category}</SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
