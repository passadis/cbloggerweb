
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="mt-1">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Azure">Azure</SelectItem>
        <SelectItem value="Microsoft 365">Microsoft 365</SelectItem>
        <SelectItem value="DevOps">DevOps</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
