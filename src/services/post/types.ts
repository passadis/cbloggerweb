
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

// Input types for post operations
export type CreatePostInput = Omit<Post, "id">;
export type UpdatePostInput = CreatePostInput;
