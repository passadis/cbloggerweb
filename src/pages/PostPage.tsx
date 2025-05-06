
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthorCard from "@/components/AuthorCard";
import { postService } from "@/services/post";
import PostHeader from "@/components/post/PostHeader";
import PostContent from "@/components/post/PostContent";
import RelatedPosts from "@/components/post/RelatedPosts";
import PostLoadingSkeleton from "@/components/post/PostLoadingSkeleton";
import PostNotFound from "@/components/post/PostNotFound";

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Fetch the current post
  const { 
    data: post,
    isLoading: postLoading,
    error: postError 
  } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => {
      if (!slug) return null;
      return postService.getPostBySlug(slug);
    },
    enabled: !!slug
  });
  
  // Fetch related posts (currently just getting all posts)
  const { 
    data: allPosts = [],
    isLoading: relatedLoading
  } = useQuery({
    queryKey: ['posts'],
    queryFn: postService.getAllPosts,
  });
  
  // Get related posts based on category
  const relatedPosts = allPosts
    .filter(p => p.id !== post?.id && p.category === post?.category)
    .slice(0, 2);

  // Mocked author data since we don't have author info in database yet
  const author = {
    name: "Konstantinos",
    bio: "Microsoft MVP with more than 20 years of working experience in IT. Tech enthusiast passionate about Azure, Microsoft 365, and DevOps solutions.",
    avatar: "",
  };

  if (postLoading) {
    return <PostLoadingSkeleton />;
  }

  if (postError || !post) {
    return <PostNotFound />;
  }

  return (
    <>
      <Navbar />
      <main>
        <article className="py-8">
          <div className="container max-w-4xl">
            <PostHeader post={post} />
            <PostContent post={post} />
            <div className="mb-12">
              <AuthorCard
                name={author.name}
                bio={author.bio}
                avatar={author.avatar}
              />
            </div>
          </div>
        </article>
        <RelatedPosts posts={relatedPosts} isLoading={relatedLoading} />
      </main>
      <Footer />
    </>
  );
};

export default PostPage;
