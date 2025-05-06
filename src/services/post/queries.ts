
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { transformDatabasePost } from "./transformers";
import type { Post } from "./types";

export const getAllPosts = async (): Promise<Post[]> => {
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

export const getPostById = async (id: string): Promise<Post | null> => {
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

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
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

export const getPostCategories = async (): Promise<string[]> => {
  try {
    // First try to fetch unique categories from the database
    const { data, error } = await supabase
      .from('posts')
      .select('category')
      .not('category', 'is', null);
    
    if (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
      return ["Azure", "Microsoft 365", "DevOps"]; // Default categories
    }
    
    // Extract unique categories
    const uniqueCategories = [...new Set(data.map(post => post.category))];
    
    // If no categories found in the database, return our three standard categories
    if (uniqueCategories.length === 0) {
      return ["Azure", "Microsoft 365", "DevOps"];
    }
    
    return uniqueCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    toast.error("Failed to fetch categories");
    return ["Azure", "Microsoft 365", "DevOps"]; // Default categories
  }
};

export const getPostsByCategory = async (category: string): Promise<Post[]> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category', category)
      .order('date', { ascending: false });
      
    if (error) {
      console.error(`Error fetching posts for category ${category}:`, error);
      toast.error("Failed to fetch posts");
      return [];
    }
    
    return data.map(transformDatabasePost);
  } catch (error) {
    console.error(`Error fetching posts for category ${category}:`, error);
    toast.error("Failed to fetch posts");
    return [];
  }
};
