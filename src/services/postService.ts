
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Database, Post as PostType } from "@/types/database.types";

export type Post = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  category: string;
  date: string;
  tags: string[];
  featuredImage: string;
  status: "published" | "draft";
};

const getAllPosts = async (): Promise<Post[]> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false });
      
    if (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts");
      return [];
    }
    
    return data.map(transformDatabasePost);
  } catch (error) {
    console.error("Error fetching posts:", error);
    toast.error("Failed to fetch posts");
    return [];
  }
};

const getPostById = async (id: string): Promise<Post | null> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error(`Error fetching post with ID ${id}:`, error);
      toast.error("Failed to fetch post");
      return null;
    }
    
    return transformDatabasePost(data);
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    toast.error("Failed to fetch post");
    return null;
  }
};

const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) {
      console.error(`Error fetching post with slug ${slug}:`, error);
      toast.error("Failed to fetch post");
      return null;
    }
    
    return transformDatabasePost(data);
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    toast.error("Failed to fetch post");
    return null;
  }
};

// Transform database post object to our Post interface
// This handles any field name differences between DB and frontend
const transformDatabasePost = (dbPost: PostType): Post => {
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
const transformToDbPost = (post: Omit<Post, "id">): Database['public']['Tables']['posts']['Insert'] => {
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

const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  try {
    const dbPost = transformToDbPost(post);
    const { data, error } = await supabase
      .from('posts')
      .insert(dbPost)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
      throw error;
    }
    
    toast.success("Post created successfully");
    return transformDatabasePost(data);
  } catch (error) {
    console.error("Error creating post:", error);
    toast.error("Failed to create post");
    throw error;
  }
};

const updatePost = async (id: string, updatedPost: Omit<Post, "id">): Promise<Post> => {
  try {
    const dbPost = transformToDbPost(updatedPost);
    const { data, error } = await supabase
      .from('posts')
      .update(dbPost)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating post with ID ${id}:`, error);
      toast.error("Failed to update post");
      throw error;
    }
    
    toast.success("Post updated successfully");
    return transformDatabasePost(data);
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    toast.error("Failed to update post");
    throw error;
  }
};

const deletePost = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting post with ID ${id}:`, error);
      toast.error("Failed to delete post");
      throw error;
    }
    
    toast.success("Post deleted successfully");
  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    toast.error("Failed to delete post");
    throw error;
  }
};

const getPostCategories = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('category')
      .order('category')
      .is('category', 'not.null');
    
    if (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
      return [];
    }
    
    // Extract unique categories
    const categories = [...new Set(data.map(post => post.category))];
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    toast.error("Failed to fetch categories");
    return [];
  }
};

export const postService = {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getPostCategories,
};
