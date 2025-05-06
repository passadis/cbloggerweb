
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { postService } from "@/services/postService";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  const [categories, setCategories] = useState<string[]>([]);
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

  // Predefined common categories as fallback
  const defaultCategories = ['Azure', 'Microsoft 365', 'DevOps', 'Cloud', 'AI', 'Security'];
  
  // Combine existing categories with defaults without duplicates
  const allCategories = Array.from(new Set([...categories, ...defaultCategories])).sort();

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full mt-1">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {loading ? (
          <SelectItem value="loading" disabled>Loading categories...</SelectItem>
        ) : (
          allCategories.map(category => (
            <SelectItem key={category} value={category}>{category}</SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
