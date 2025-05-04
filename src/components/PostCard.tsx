
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    featuredImage: string;
    category: string;
    date: string;
    tags: string[];
  };
  featured?: boolean;
}

const PostCard = ({ post, featured = false }: PostCardProps) => {
  const formattedDate = formatDistance(new Date(post.date), new Date(), { addSuffix: true });

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'azure':
        return 'bg-azure/10 text-azure hover:bg-azure/20';
      case 'microsoft 365':
        return 'bg-m365/10 text-m365 hover:bg-m365/20';
      case 'devops':
        return 'bg-devops/10 text-devops hover:bg-devops/20';
      default:
        return 'bg-primary/10 text-primary hover:bg-primary/20';
    }
  };

  if (featured) {
    return (
      <div className="group rounded-xl overflow-hidden border bg-card shadow-sm card-hover animate-fade-in">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="overflow-hidden h-full">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="object-cover w-full h-full aspect-video md:aspect-auto transition-transform group-hover:scale-105"
            />
          </div>
          <div className="p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="outline" className={getCategoryColor(post.category)}>
                {post.category}
              </Badge>
              <span className="text-xs text-muted-foreground">{formattedDate}</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
              <Link to={`/post/${post.slug}`}>{post.title}</Link>
            </h3>
            <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
            <Link 
              to={`/post/${post.slug}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-xl overflow-hidden border bg-card shadow-sm card-hover animate-fade-in">
      <div className="overflow-hidden aspect-video">
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="outline" className={getCategoryColor(post.category)}>
            {post.category}
          </Badge>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
        <Link 
          to={`/post/${post.slug}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
