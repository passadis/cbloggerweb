
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface CategorySectionProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  color: string;
}

const CategorySection = ({ title, description, image, slug, color }: CategorySectionProps) => {
  return (
    <Card className="overflow-hidden border card-hover">
      <div className="grid md:grid-cols-5">
        <div className="md:col-span-2 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover aspect-video md:aspect-auto"
          />
        </div>
        <CardContent className="p-6 md:col-span-3 flex flex-col justify-between">
          <div>
            <h3 className={`text-2xl font-semibold mb-2 text-${color}`}>
              {title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {description}
            </p>
          </div>
          <Link
            to={`/category/${slug}`}
            className={`inline-flex w-fit items-center justify-center rounded-md bg-${color} px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-${color}/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-${color}`}
          >
            Read More
          </Link>
        </CardContent>
      </div>
    </Card>
  );
};

export default CategorySection;
