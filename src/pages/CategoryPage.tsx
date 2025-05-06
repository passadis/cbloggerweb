
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { supabase } from "@/integrations/supabase/client";
import { transformDatabasePost } from "@/services/post/transformers";
import type { Post } from "@/services/post/types";

const CategoryPage = () => {
  const { slug } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  
  // Set category information based on the slug
  useEffect(() => {
    switch (slug?.toLowerCase()) {
      case "azure":
        setCategoryName("Microsoft Azure");
        setCategoryDescription("Labs, Guides and Designs for Azure cloud solutions and services.");
        break;
      case "microsoft-365":
        setCategoryName("Microsoft 365");
        setCategoryDescription("Hints and Tips for the Best 365 Experience!");
        break;
      case "devops":
        setCategoryName("DevOps");
        setCategoryDescription("Collection of Ideas and Developments for DevOps practices and tools.");
        break;
      default:
        setCategoryName("");
        setCategoryDescription("");
    }
  }, [slug]);

  // Validate if this is one of our supported categories
  const isValidCategory = ["azure", "microsoft-365", "devops"].includes(slug?.toLowerCase() || "");

  // Fetch posts from the database filtered by category
  const { 
    data: posts = [], 
    isLoading,
    error 
  } = useQuery({
    queryKey: ['posts', 'category', slug],
    queryFn: async () => {
      try {
        if (!slug) return [];
        
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('category', getCategoryFromSlug(slug))
          .order('date', { ascending: false });
          
        if (error) {
          console.error("Error fetching posts:", error);
          return [];
        }
        
        return data.map(transformDatabasePost);
      } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
      }
    },
    enabled: isValidCategory
  });

  // Helper function to convert slug to proper category name
  const getCategoryFromSlug = (slug: string): string => {
    switch (slug.toLowerCase()) {
      case "azure":
        return "Azure";
      case "microsoft-365":
        return "Microsoft 365";
      case "devops":
        return "DevOps";
      default:
        return "";
    }
  };

  // If not a valid category, redirect to 404
  if (!isValidCategory) {
    return <Navigate to="/not-found" />;
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg overflow-hidden border">
                  <div className="h-48 bg-muted"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
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
        {/* Category Header */}
        <section className="py-10 bg-gradient-to-b from-white to-blue-50/50">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{categoryName}</h1>
            <p className="text-muted-foreground text-lg">{categoryDescription}</p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-10">
          <div className="container">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No posts found</h3>
                <p className="text-muted-foreground">
                  There are no posts in this category yet.
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

export default CategoryPage;
