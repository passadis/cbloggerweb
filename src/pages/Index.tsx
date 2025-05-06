import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import CategorySection from "@/components/CategorySection";
import { Link } from "react-router-dom";
import AuthorCard from "@/components/AuthorCard";
import { postService, type Post } from "@/services/post";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  // Fetch posts from the database
  const { 
    data: posts = [], 
    isLoading,
    error 
  } = useQuery({
    queryKey: ['posts'],
    queryFn: postService.getAllPosts,
  });

  const featuredPost = posts[0];
  const latestPosts = posts.slice(1, 4);

  // Categories data - we'll keep this static for now
  const categories = [
    {
      title: "Microsoft Azure",
      description: "Labs, Guides and Designs for Azure cloud solutions. Learn about the latest Azure services and how to implement them effectively.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
      slug: "azure",
      color: "azure",
    },
    {
      title: "Microsoft 365",
      description: "Hints and Tips for the Best 365 Experience! Maximize your productivity with Microsoft's comprehensive suite of cloud-based tools.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
      slug: "microsoft-365",
      color: "m365",
    },
    {
      title: "DevOps",
      description: "Collection of Ideas and Developments! Best practices, tools, and methodologies for implementing DevOps in your organization.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop",
      slug: "devops",
      color: "devops",
    },
  ];

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main>
          <section className="py-12 md:py-16 bg-gradient-to-b from-white to-blue-50/50">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Welcome to <span className="text-gradient">CloudBlogger</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Your daily companion for Azure Solutions, Microsoft 365 tips, and DevOps best practices
                </p>
              </div>
            </div>
          </section>
          <div className="container py-12">
            <div className="flex flex-col gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full h-48 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    console.error("Error loading posts:", error);
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-white to-blue-50/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Welcome to <span className="text-gradient">CloudBlogger</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Your daily companion for Azure Solutions, Microsoft 365 tips, and DevOps best practices
              </p>
            </div>
          </div>
        </section>

        {/* Category Blocks - Now above featured post and in 3-column grid */}
        <section className="py-10 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-semibold mb-6">Main Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategorySection
                  key={category.slug}
                  title={category.title}
                  description={category.description}
                  image={category.image}
                  slug={category.slug}
                  color={category.color}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post Section */}
        <section className="py-10">
          <div className="container">
            <h2 className="text-2xl font-semibold mb-6">Featured Post</h2>
            {featuredPost ? (
              <PostCard post={featuredPost} featured={true} />
            ) : (
              <div className="p-8 border rounded-lg text-center">
                <h3 className="text-xl font-medium text-muted-foreground">No featured posts yet</h3>
                <p className="mt-2">Check back later for featured content</p>
              </div>
            )}
          </div>
        </section>

        {/* Latest Posts Section */}
        <section className="py-10">
          <div className="container">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Latest Posts</h2>
              <Link to="/blog" className="text-sm font-medium text-primary hover:underline">
                View All
              </Link>
            </div>
            {latestPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="p-8 border rounded-lg text-center">
                <h3 className="text-xl font-medium text-muted-foreground">No posts yet</h3>
                <p className="mt-2">Check back later for latest content</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-primary">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h2 className="text-2xl font-semibold text-white">Subscribe to Our Newsletter</h2>
              <p className="text-primary-foreground/90">
                Get the latest Azure, Microsoft 365, and DevOps updates delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mt-6 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md flex-1"
                />
                <button className="bg-white text-primary font-medium px-4 py-2 rounded-md hover:bg-white/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
