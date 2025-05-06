
import type { Database } from "@/types/database.types";
import type { Post, CreatePostInput } from "./types";

// Transform database post object to our Post interface
export const transformDatabasePost = (dbPost: Database['public']['Tables']['posts']['Row']): Post => {
  return {
    id: dbPost.id,
    title: dbPost.title,
    content: dbPost.content,
    excerpt: dbPost.excerpt,
    slug: dbPost.slug,
    category: dbPost.category,
    date: dbPost.date,
    tags: dbPost.tags,
    featuredImage: dbPost.featured_image,
    status: dbPost.status as "published" | "draft"
  };
};

// Transform our Post interface to database format
export const transformToDbPost = (post: CreatePostInput): Database['public']['Tables']['posts']['Insert'] => {
  return {
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    slug: post.slug,
    category: post.category,
    date: post.date,
    tags: post.tags,
    featured_image: post.featuredImage,
    status: post.status
  };
};
