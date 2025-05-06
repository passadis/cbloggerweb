
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
