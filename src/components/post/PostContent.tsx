
import { Link } from "react-router-dom";
import type { Post } from "@/services/post";

interface PostContentProps {
  post: Post;
}

const PostContent = ({ post }: PostContentProps) => {
  return (
    <>
      {/* Featured Image */}
      <div className="mb-8 rounded-lg overflow-hidden">
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Post Content */}
      <div 
        className="prose prose-blue max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      <div className="mb-12">
        <h3 className="text-sm font-medium mb-3">Related Topics</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link 
              key={tag} 
              to={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-secondary hover:bg-secondary/80 px-3 py-1 rounded-full text-xs font-medium transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostContent;
