
import { Button } from "@/components/ui/button";

interface FormActionButtonsProps {
  isPublished: boolean;
}

const FormActionButtons = ({ isPublished }: FormActionButtonsProps) => {
  return (
    <div className="flex justify-end gap-4 pt-4 border-t">
      <Button type="button" variant="outline">
        Save as Draft
      </Button>
      <Button type="submit">
        {isPublished ? "Publish" : "Save"}
      </Button>
    </div>
  );
};

export default FormActionButtons;
