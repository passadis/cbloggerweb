
export type Post = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  category: string;
  date: string;
  tags: string[];
  featured_image: string;
  status: "published" | "draft";
  created_at: string;
  updated_at: string;
};

// We define our database schema with our custom tables
export type Database = {
  public: {
    Tables: {
      posts: {
        Row: Post;
        Insert: Omit<Post, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};
