
import type { Post, CreatePostInput, UpdatePostInput } from './types';
import { getAllPosts, getPostById, getPostBySlug, getPostCategories } from './queries';
import { createPost, updatePost, deletePost } from './mutations';

// Export all types
export type { 
  Post,
  CreatePostInput,
  UpdatePostInput
};

// Export main service object with all methods
export const postService = {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getPostCategories,
};
