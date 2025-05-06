
import PostCard from "@/components/PostCard";
import type { Post } from "@/services/post";

interface RelatedPostsProps {
  posts: Post[];
  isLoading: boolean;
}

const RelatedPosts = ({ posts, isLoading }: RelatedPostsProps) => {
  return (
    <section className="py-10 bg-muted/30">
      <div className="container">
        <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="animate-pulse space-y-4 p-6 border rounded-lg bg-card">
              <div className="h-40 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
            </div>
            <div className="animate-pulse space-y-4 p-6 border rounded-lg bg-card">
              <div className="h-40 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
            </div>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="p-8 border rounded-lg text-center bg-card">
            <h3 className="text-xl font-medium">No related posts found</h3>
            <p className="mt-2 text-muted-foreground">
              Check back later for more content in this category
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedPosts;
