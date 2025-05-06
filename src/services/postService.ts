
import { toast } from "sonner";

export interface Post {
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
}

// Mock database storage - in a real app, this would be replaced with Supabase
const LOCAL_STORAGE_KEY = "blog_posts";

// Initialize with some mock data if storage is empty
const initializeStorage = () => {
  const existingPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!existingPosts) {
    const initialPosts: Post[] = [
      {
        id: "1",
        title: "The Ultimate Guide to Build Your Custom AI Server",
        content: "<p>This is a sample content for your blog post.</p>",
        excerpt: "Learn how to build a powerful custom AI server using Azure services.",
        slug: "ultimate-guide-custom-ai-server",
        category: "Azure",
        date: "2023-03-26",
        tags: ["AI", "Azure", "Cloud"],
        featuredImage: "https://placehold.co/600x400?text=AI+Server",
        status: "published",
      },
      {
        id: "2",
        title: "The Brand New Azure AI Agent Service at Your Fingertips",
        content: "<p>Explore the new Azure AI Agent Service.</p>",
        excerpt: "Get to know the latest Azure AI Agent Service and how it can help your business.",
        slug: "azure-ai-agent-service",
        category: "Azure",
        date: "2023-02-15",
        tags: ["AI", "Azure", "Agent"],
        featuredImage: "https://placehold.co/600x400?text=Azure+AI",
        status: "published",
      },
      {
        id: "3",
        title: "Microsoft 365 Copilot: The Ultimate Productivity Assistant",
        content: "<p>Boost your productivity with Microsoft 365 Copilot.</p>",
        excerpt: "Learn how Microsoft 365 Copilot can revolutionize your workflow.",
        slug: "microsoft-365-copilot",
        category: "Microsoft 365",
        date: "2023-04-10",
        tags: ["Microsoft 365", "Copilot", "Productivity"],
        featuredImage: "https://placehold.co/600x400?text=Microsoft+Copilot",
        status: "published",
      },
      {
        id: "4",
        title: "DevOps Automation: Streamline Your CI/CD Pipeline",
        content: "<p>Streamline your development process with DevOps automation.</p>",
        excerpt: "Discover how to optimize your CI/CD pipeline for maximum efficiency.",
        slug: "devops-automation",
        category: "DevOps",
        date: "2023-05-20",
        tags: ["DevOps", "Automation", "CI/CD"],
        featuredImage: "https://placehold.co/600x400?text=DevOps",
        status: "draft",
      },
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialPosts));
  }
};

// Initialize the local storage on module load
initializeStorage();

const getAllPosts = async (): Promise<Post[]> => {
  try {
    const posts = localStorage.getItem(LOCAL_STORAGE_KEY);
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    toast.error("Failed to fetch posts");
    return [];
  }
};

const getPostById = async (id: string): Promise<Post | null> => {
  try {
    const posts = await getAllPosts();
    return posts.find(post => post.id === id) || null;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    toast.error("Failed to fetch post");
    return null;
  }
};

const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const posts = await getAllPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    toast.error("Failed to fetch post");
    return null;
  }
};

const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  try {
    const posts = await getAllPosts();
    const newPost = {
      ...post,
      id: crypto.randomUUID(),
    };
    
    posts.push(newPost);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
    toast.success("Post created successfully");
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    toast.error("Failed to create post");
    throw error;
  }
};

const updatePost = async (id: string, updatedPost: Omit<Post, "id">): Promise<Post> => {
  try {
    const posts = await getAllPosts();
    const postIndex = posts.findIndex(post => post.id === id);
    
    if (postIndex === -1) {
      toast.error("Post not found");
      throw new Error("Post not found");
    }
    
    const post = {
      ...updatedPost,
      id,
    };
    
    posts[postIndex] = post;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
    toast.success("Post updated successfully");
    return post;
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    toast.error("Failed to update post");
    throw error;
  }
};

const deletePost = async (id: string): Promise<void> => {
  try {
    const posts = await getAllPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    
    if (filteredPosts.length === posts.length) {
      toast.error("Post not found");
      throw new Error("Post not found");
    }
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredPosts));
    toast.success("Post deleted successfully");
  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    toast.error("Failed to delete post");
    throw error;
  }
};

const getPostCategories = async (): Promise<string[]> => {
  try {
    const posts = await getAllPosts();
    const categories = [...new Set(posts.map(post => post.category))];
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
