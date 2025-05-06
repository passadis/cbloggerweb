import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import AuthorCard from "@/components/AuthorCard";
import PostCard from "@/components/PostCard";
import { postService, type Post } from "@/services/post";

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

  if (postLoading) {
    return (
      <>
        <Navbar />
        <main className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-96 bg-muted rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (postError || !post) {
    return (
      <>
        <Navbar />
        <main className="container py-16">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h1 className="text-3xl font-bold">Post Not Found</h1>
            <p className="text-muted-foreground">
              Sorry, the post you're looking for doesn't seem to exist.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center text-primary hover:underline"
            >
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <article className="py-8">
          <div className="container max-w-4xl">
            {/* Post Header */}
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

            {/* Author Card */}
            <div className="mb-12">
              <AuthorCard
                name={author.name}
                bio={author.bio}
                avatar={author.avatar}
              />
            </div>
          </div>
        </article>

        {/* Related Posts Section */}
        <section className="py-10 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
            {relatedPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((post) => (
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
      </main>
      <Footer />
    </>
  );
};

export default PostPage;
