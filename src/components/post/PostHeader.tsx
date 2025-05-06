
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/services/post";

interface PostHeaderProps {
  post: Post;
}

const PostHeader = ({ post }: PostHeaderProps) => {
  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
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

  return (
    <header className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <Badge variant="outline" className={getCategoryColor(post.category)}>
          {post.category}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
    </header>
  );
};

export default PostHeader;
