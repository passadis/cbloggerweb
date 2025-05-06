
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { transformDatabasePost, transformToDbPost } from "./transformers";
import type { Post, CreatePostInput, UpdatePostInput } from "./types";

export const createPost = async (post: CreatePostInput): Promise<Post> => {
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

export const updatePost = async (id: string, updatedPost: UpdatePostInput): Promise<Post> => {
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

export const deletePost = async (id: string): Promise<void> => {
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
