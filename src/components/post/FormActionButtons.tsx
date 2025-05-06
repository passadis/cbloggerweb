
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FormActionButtonsProps {
  isPublished: boolean;
  showCancel?: boolean;
}

const FormActionButtons = ({ isPublished, showCancel = true }: FormActionButtonsProps) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-end gap-4 pt-4 border-t">
      {showCancel && (
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      )}
      <Button type="submit" className="px-6">
        {isPublished ? "Publish" : "Save as Draft"}
      </Button>
    </div>
  );
};

export default FormActionButtons;
